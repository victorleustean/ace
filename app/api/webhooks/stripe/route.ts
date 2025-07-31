import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { UserSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );
    } catch(error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Webhook signature verification failed:', error);
        return new NextResponse(`Webhook error: ${errorMessage}`, {
            status: 400,
        });
    }

    console.log('Processing webhook event:', event.type);

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object;
                
                console.log('Checkout session completed:', {
                    sessionId: session.id,
                    userId: session.metadata?.userId,
                    subscriptionId: session.subscription
                });

                if (!session?.metadata?.userId) {
                    console.error('Missing userId in session metadata');
                    return new NextResponse("User ID is required", { status: 400});
                }

                if (!session.subscription) {
                    console.error('No subscription found in completed session');
                    return new NextResponse("No subscription found", { status: 400});
                }

                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );

                console.log('Retrieved subscription:', {
                    id: subscription.id,
                    customerId: subscription.customer,
                    priceId: subscription.items.data[0]?.price?.id,
                    itemCurrentPeriodEnd: subscription.items.data[0]?.current_period_end
                });

                if (!subscription.items.data[0]?.price?.id) {
                    console.error('No price ID found in subscription');
                    return new NextResponse("Price ID is required", { status: 400});
                }

                // Get customer ID safely
                const customerId = typeof subscription.customer === 'string' 
                    ? subscription.customer 
                    : subscription.customer?.id;

                if (!customerId) {
                    console.error('No customer ID found');
                    return new NextResponse("Customer ID is required", { status: 400});
                }

                // Get the billing period end from the subscription item
                const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
                if (!currentPeriodEnd) {
                    console.error('No current_period_end found in subscription item');
                    return new NextResponse("Billing period end is required", { status: 400});
                }

                // Check if subscription already exists
                const existingSubscription = await db.query.UserSubscription?.findFirst({
                    where: eq(UserSubscription.stripeSubscriptionId, subscription.id)
                });

                const subscriptionData = {
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(currentPeriodEnd * 1000),
                };

                if (existingSubscription) {
                    console.log('Subscription already exists, updating instead');
                    await db.update(UserSubscription)
                        .set(subscriptionData)
                        .where(eq(UserSubscription.stripeSubscriptionId, subscription.id));
                } else {
                    console.log('Creating new subscription');
                    await db.insert(UserSubscription).values({
                        userId: session.metadata.userId,
                        stripeSubscriptionId: subscription.id,
                        stripeCustomerId: customerId,
                        ...subscriptionData,
                    });
                }

                console.log('Successfully processed user subscription');
                break;
            }

            case "invoice.payment_succeeded": {
                const invoice = event.data.object;
                
                // Access subscription property safely from the raw object
                const subscriptionId = (invoice as { subscription?: string | Stripe.Subscription }).subscription;
                
                console.log('Invoice payment succeeded:', {
                    invoiceId: invoice.id,
                    subscriptionId: subscriptionId
                });

                // Check if invoice has a subscription and it's a string
                if (!subscriptionId || typeof subscriptionId !== 'string') {
                    console.log('Invoice has no subscription or subscription is not a string, skipping update');
                    return new NextResponse('Invoice processed (no subscription)', { status: 200 });
                }

                const subscription = await stripe.subscriptions.retrieve(subscriptionId);

                console.log('Retrieved subscription for invoice:', {
                    id: subscription.id,
                    priceId: subscription.items.data[0]?.price?.id,
                    itemCurrentPeriodEnd: subscription.items.data[0]?.current_period_end
                });

                if (!subscription.items.data[0]?.price?.id) {
                    console.error('No price ID found in subscription for invoice update');
                    return new NextResponse("Price ID is required", { status: 400});
                }

                // Get the billing period end from the subscription item
                const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
                if (!currentPeriodEnd || currentPeriodEnd <= 0) {
                    console.error('Invalid current_period_end timestamp:', currentPeriodEnd);
                    return new NextResponse("Invalid period end date", { status: 400});
                }

                const periodEndDate = new Date(currentPeriodEnd * 1000);
                
                if (isNaN(periodEndDate.getTime())) {
                    console.error('Invalid date created from timestamp:', currentPeriodEnd);
                    return new NextResponse("Invalid date conversion", { status: 400});
                }

                await db.update(UserSubscription).set({
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: periodEndDate,
                }).where(eq(UserSubscription.stripeSubscriptionId, subscription.id));

                console.log('Successfully updated user subscription');
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return new NextResponse('Webhook received', { status: 200 });
    } catch (error: unknown) {
        const errorStack = error instanceof Error ? error.stack : 'No stack trace available';
        console.error('Error processing webhook:', error);
        console.error('Error stack:', errorStack);
        return new NextResponse('Webhook processing failed', { status: 500 });
    }
}