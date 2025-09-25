import { Request, Response } from "express"

import Stripe from "stripe"
import { handleSubscriptionCreated } from "../handlers/handleSubscriptionCreated"
import config from "../config"
import stripe from "../config/stripe"
import { handleAssessmentCheckout } from "../handlers/handleAssessmentCheckout"
import { handleTemplateCheckout } from "../handlers/handleTemplateCheckout"

export const handleStripeWebhook = async (req:Request,res:Response) => {
    const sig = req.headers['stripe-signature']
    const event = stripe.webhooks.constructEvent(req.body,sig!,config.stripe.webhook_secret!)
    switch (event.type) {
        case "customer.subscription.created":
            await handleSubscriptionCreated(event.data.object)
        
        case "checkout.session.completed":
            const object = event.data.object;
            
            const metadata = object.metadata;
            if(metadata?.assessmentId){
                await handleAssessmentCheckout(object as Stripe.Checkout.Session)
            }
            else if(metadata?.order_id){
                await handleTemplateCheckout(metadata.order_id,(object as any).payment_intent)
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).json({received:true})
}