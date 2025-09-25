import mongoose from "mongoose";
import { ITemplate, TemplateModel } from "./template.interface";

const templateSchema = new mongoose.Schema<ITemplate,TemplateModel>({
    file: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["resume", "cover-letter","guide"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    thumbnail: {
        type: String
    },
    features: {
        type: [String]
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String]
    }
},{
    timestamps: true
})


export const Template = mongoose.model<ITemplate, TemplateModel>("Template", templateSchema)