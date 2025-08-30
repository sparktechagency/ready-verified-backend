import mongoose from "mongoose";
import Stripe from "stripe";
import { User } from "../app/modules/user/user.model";
import { Assessment } from "../app/modules/assessment/assessment.model";

export const handleAssessmentCheckout = async (data:Stripe.Checkout.Session) => {
    const mongoSession = await mongoose.startSession();

    try {
        mongoSession.startTransaction();

        const user = await User.findOne({email:data.customer_email});

        const assessmentId = data.metadata?.assessmentId;

        if(!user || !assessmentId) return;

        await Assessment.findOneAndUpdate({ _id: assessmentId }, {isPaid:true},{session:mongoSession});

        console.log(assessmentId);
        

        await mongoSession.commitTransaction();
        await mongoSession.endSession();
        
    } catch (error) {
        console.log(error);
        
        await mongoSession.abortTransaction();
        await mongoSession.endSession();
        
    }
}