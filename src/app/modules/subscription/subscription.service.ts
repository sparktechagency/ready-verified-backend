import { JwtPayload } from "jsonwebtoken";
import stripe from "../../../config/stripe";
import ApiError from "../../../errors/ApiError";
import { Package } from "../package/package.model";
import { Subscription } from "./subscription.model";

const purchaseSubscriptionFromDB = async (id: string,user:JwtPayload) => {

    const plan = await Package.findById(id);

    if(!plan) {
        throw new ApiError(404, "Plan not found")
    }

    console.log(plan);
    
    const session = await stripe.checkout.sessions.create({
        mode:"subscription",
        line_items:[{
         price:plan.price_id,
         quantity:1
        }
        ],
        customer_email:user.email,
        success_url:"http://localhost:3000/subscription/success",
        cancel_url:"http://localhost:3000/subscription/cancel"
    })

    return session.url
    
}

const getUserSubscriptionFromDb = async (user:JwtPayload)=>{
    const subscription = await Subscription.findOne({user:user.id}).populate("package")
    return subscription
}


export const SubscriptionService = {
    purchaseSubscriptionFromDB,
    getUserSubscriptionFromDb
}