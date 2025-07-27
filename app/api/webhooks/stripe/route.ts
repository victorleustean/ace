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
    } catch(error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, {
            status: 400,
        });
    }

    // Process the webhook event
    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            
            if (!session?.metadata?.userId) {
                return new NextResponse("User ID is required", { status: 400});
            }

            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            await db.insert(UserSubscription).values({
                userId: session.metadata.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000,
                ),
            });
        }

        if (event.type === "invoice.payment_succeeded") {
            const invoice = event.data.object as Stripe.Invoice;
            
            const subscription = await stripe.subscriptions.retrieve(
                invoice.subscription as string
            );

            await db.update(UserSubscription).set({
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000,
                ),
            }).where(eq(UserSubscription.stripeSubscriptionId, subscription.id));
        }

        return new NextResponse('Webhook received', { status: 200 });
    } catch (error: any) {
        console.error('Error processing webhook:', error);
        return new NextResponse('Webhook processing failed', { status: 500 });
    }
}