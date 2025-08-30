import { Model } from "mongoose";

export type ITemplate = {
    image: string;
    title: string;
    type:"resume" | "cover-letter";
    price: number;
}

export type TemplateModel = Model<ITemplate>;
