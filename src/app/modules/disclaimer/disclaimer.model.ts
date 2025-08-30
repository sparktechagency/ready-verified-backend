import mongoose from "mongoose";
import { DisclaimerModel, IDisclaimer } from "./disclaimer.interface";

const disclaimerSchema = new mongoose.Schema<IDisclaimer,DisclaimerModel>({
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["terms", "privacy", "about"],
        required: true
    }
})

export const Disclaimer = mongoose.model<IDisclaimer, DisclaimerModel>("Disclaimer", disclaimerSchema)