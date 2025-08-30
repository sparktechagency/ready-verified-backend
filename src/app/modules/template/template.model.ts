import mongoose from "mongoose";
import { ITemplate, TemplateModel } from "./template.interface";

const templateSchema = new mongoose.Schema<ITemplate,TemplateModel>({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["resume", "cover-letter"],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})


export const Template = mongoose.model<ITemplate, TemplateModel>("Template", templateSchema)