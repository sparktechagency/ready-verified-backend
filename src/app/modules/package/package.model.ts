import mongoose from "mongoose";
import { IPackage, PackageModel } from "./package.interface";

const packageSchema = new mongoose.Schema<IPackage,PackageModel>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    recurring:{
        type:String,
        enum:["month","year","week"],
        required:true
    },
    price_id: {
        type: String,
    },
    payment_link: {
        type: String,
    },
    product_id: {
        type: String,
    },
    features: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["active", "deleted"],
    }
},{
    timestamps: true,
})


export const Package = mongoose.model<IPackage,PackageModel>("Package",packageSchema);