import { Model } from "mongoose";

export type ITemplate = {
    file: string;
    title: string;
    type:"resume" | "cover-letter"|"guide"
    price: number;
    description?: string;
    status:"active"|"inactive",
    thumbnail?:string,
    features?:string[]
    isPremium?:boolean
    tags?:string[]
}

export type TemplateModel = Model<ITemplate>;
