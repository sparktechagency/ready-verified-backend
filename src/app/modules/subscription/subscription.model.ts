import mongoose from "mongoose";
import { ISubscription, SubscriptionModel } from "./subscription.interface";

const subscriptionSchema = new mongoose.Schema<ISubscription,SubscriptionModel>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true,
    },
    
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "expired"],
        default: "active",
    },
    price:{
        type: Number,
        required: true,
    },
    subscriptionId: {
        type: String,
    }
    
},{
    timestamps: true,
})


export const Subscription = mongoose.model<ISubscription, SubscriptionModel>("Subscription", subscriptionSchema);