"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";

export const createStripeUrl = async () => {
    try {
        // Temporary fix - replace with your actual domain
        const returnUrl = process.env.NODE_ENV === 'production' 
            ? "https://yourdomain.com/store" 
            : "http://localhost:3000/store";
        console.log("Generated returnUrl:", returnUrl); // Debug the URL
        const { userId } = await auth();
        const user = await currentUser();

        if(!userId || !user) {
            throw new Error("Neautorizat");
        }

        // Check if user has email
        if (!user.emailAddresses || user.emailAddresses.length === 0) {
            throw new Error("Nu s-a găsit adresa de email");
        }

        const userSubscription = await getUserSubscription();

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: returnUrl,
            });

            return { data: stripeSession.url }; 
        }
       
        const stripeSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: "FinHub gold",
                            description: "Inimi Nelimitate"
                        },
                        unit_amount: 500,
                        recurring: {
                            interval: "month",
                        },
                    },
                },
            ],
            metadata: {
                userId,
            },
            success_url: returnUrl,
            cancel_url: returnUrl,
        });

        return { data: stripeSession.url };
    } catch (error) {
        console.error("Stripe URL creation error:", error);
        throw error; // Re-throw to be caught by the client
    }
};