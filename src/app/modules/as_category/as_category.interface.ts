import { Model } from "mongoose"

export type ICategory = {
    icon: string,
    title: string,
    questions:{
        question: string,
        type:"boolean" | "plain",
    }[],
    status:"active" | "deleted"
}

export type CategoryModel = Model<ICategory>