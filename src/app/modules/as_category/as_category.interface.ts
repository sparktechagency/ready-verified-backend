import { Model } from "mongoose"

export type ICategory = {
    icon: string,
    title: string,
    questions:{
        question: string,
        type:"boolean" | "plain",
    }[]
}

export type CategoryModel = Model<ICategory>