import mongoose from "mongoose";
import { CategoryModel, ICategory } from "./as_category.interface";

const categorySchema = new mongoose.Schema<ICategory,CategoryModel>({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    questions:[{
        question: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["boolean", "plain"],
            required: true
        },
    }],
    status: {
        type: String,
        enum: ["active", "deleted"],
        default: "active"
    }
},{
    timestamps: true
})

export const Category = mongoose.model<ICategory, CategoryModel>("Category", categorySchema)