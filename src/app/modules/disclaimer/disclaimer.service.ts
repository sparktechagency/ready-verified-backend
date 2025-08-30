import { IDisclaimer } from "./disclaimer.interface";
import { Disclaimer } from "./disclaimer.model";

const createDisclaimerIntoDB = async (disclaimer: IDisclaimer) => {
    const isExist = await Disclaimer.findOne({ type: disclaimer.type });
    if (isExist) {
        return await Disclaimer.findByIdAndUpdate(isExist._id, disclaimer, { new: true });
    }
    
    return await Disclaimer.create(disclaimer);
}


const getDisclaimerFromDB = async (type: string) => {
    return await Disclaimer.findOne({ type });
}


export const DisclaimerService = {
    createDisclaimerIntoDB,
    getDisclaimerFromDB
}