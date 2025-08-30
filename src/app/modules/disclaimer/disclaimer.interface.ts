import { Model } from "mongoose";

export type IDisclaimer = {
    content: string;
    type:"terms" | "privacy" | "about"
}

export type DisclaimerModel = Model<IDisclaimer>