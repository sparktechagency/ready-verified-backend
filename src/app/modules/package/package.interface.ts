import { Model } from "mongoose";

export type IPackage = {
    name: string;
    price: number;
    recurring:"month"|"year"|"week";
    features: string[];
    price_id?: string;
    payment_link?: string;
    product_id?: string;
    status?: "active"|"deleted";
}


export type PackageModel = Model<IPackage>