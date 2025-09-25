import mongoose from "mongoose";
import Stripe from "stripe";
import { User } from "../app/modules/user/user.model";
import { Assessment } from "../app/modules/assessment/assessment.model";
import { ASSESSMENT_STATUS, JOB_LEVEL } from "../enums/user";
import { sendNotification } from "../helpers/notificationHelper";

export const handleAssessmentCheckout = async (data:Stripe.Checkout.Session) => {
    const mongoSession = await mongoose.startSession();

    try {
        mongoSession.startTransaction();

        const user = await User.findOne({email:data.customer_email});

        const assessmentId = data.metadata?.assessmentId;

        if(!user || !assessmentId) return;
        await User.findOneAndUpdate({ _id: user._id }, {$inc:{asessment_complete:1}},{session:mongoSession});

        const assessmentTaken = await Assessment.countDocuments({user:user._id,status:ASSESSMENT_STATUS.COMPLETED},{session:mongoSession});
        let level = JOB_LEVEL.LEVEL_A;

        switch (assessmentTaken+1) {
            case 1:
                level = JOB_LEVEL.LEVEL_A;
                break;
            case 2:
                level = JOB_LEVEL.LEVEL_B;
                break;
            case 3:
                level = JOB_LEVEL.LEVEL_C;
                break;
            case 4:
                level = JOB_LEVEL.LEVEL_D;
                break;
            case 5:
                level = JOB_LEVEL.LEVEL_E;
                break;
            case 6:
                level = JOB_LEVEL.LEVEL_F;
                break;
            default:
                break;
        }

        await Assessment.findOneAndUpdate({ _id: assessmentId }, {isPaid:true,level:level},{session:mongoSession});

        await sendNotification({
            title:"New Assessment",
            message:`New Assessment request from ${user.name}`,
            path:"assessment",
            refernceId:assessmentId as any,
            recievers:[]
        })

        await mongoSession.commitTransaction();
        await mongoSession.endSession();
        
    } catch (error) {
        console.log(error);
        
        await mongoSession.abortTransaction();
        await mongoSession.endSession();
        
    }
}