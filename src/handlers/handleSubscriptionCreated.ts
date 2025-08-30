import mongoose from "mongoose";
import Stripe from "stripe";
import { User } from "../app/modules/user/user.model";
import { Subscription } from "../app/modules/subscription/subscription.model";
import { Package } from "../app/modules/package/package.model";
import stripe from "../config/stripe";

export const handleSubscriptionCreated = async (event: Stripe.Subscription) => {
    const mongooseSession = await mongoose.startSession();
    try {
        mongooseSession.startTransaction();
        // console.log(event);
        
        const subscription = await stripe.subscriptions.retrieve(event.id);
        if(!subscription){
            console.log("subscription not found");
            return
        }
        // console.log(subscription);
        

        const price_id = subscription?.items?.data[0]?.price.id;
        if(!price_id){
            console.log("price_id not found");
            return
        }
        const packageData = await Package.findOne({price_id});
        if(!packageData){
            console.log("package not found");
            return
        }
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        if(!customer){
            console.log("customer not found");
            return
        }

        
        

        const user = await User.findOne({email: (customer as any).email}).lean()

        if(!user){
            console.log("user not found");
            return
        }

        const existingSubscription = await Subscription.findById(user.subscription)
        if(existingSubscription){

            await Subscription.findByIdAndUpdate(user.subscription,{status:"inactive"},{session:mongooseSession})
        }

        const startDate = new Date();
        const endDate = packageData.recurring =="week"? new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000):packageData.recurring=="month"? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000):new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000)
        

        const newSubscription = await Subscription.create({
            subscriptionId: event.id,
            status: "active",
            user: user._id,
            package: packageData._id,
            startDate:startDate,
            endDate:endDate,
            price:packageData.price,
        })

        await User.findByIdAndUpdate(user._id,{subscription:newSubscription._id},{session:mongooseSession})


        await mongooseSession.commitTransaction()
        await mongooseSession.endSession()

    
        
    } catch (error) {
        await mongooseSession.abortTransaction()
        await mongooseSession.endSession()
        console.log(error);
        
        
    }
    
}