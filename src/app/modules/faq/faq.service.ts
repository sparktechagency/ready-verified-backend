import { StatusCodes } from 'http-status-codes';

import { IFaq } from './faq.interface';
import { Faq } from './faq.model';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';


const createFaqToDB = async (payload: IFaq): Promise<IFaq> => {
    const faq = await Faq.create(payload);
    if (!faq) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created Faq');
    }
  
    return faq;
};

const faqsFromDB = async (): Promise<IFaq[]> => {
    const faqs = await Faq.find({});
    return faqs;
};
  
const deleteFaqToDB = async (id: string): Promise<IFaq | undefined> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid ID');
    }
  
    await Faq.findByIdAndDelete(id);
    return;
};
  
const updateFaqToDB = async (id: string, payload: IFaq): Promise<IFaq> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid ID');
    }
  
    const updatedFaq = await Faq.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
    if (!updatedFaq) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to updated Faq');
    }
  
    return updatedFaq;
};
  
export const FaqService = {
    createFaqToDB,
    updateFaqToDB,
    faqsFromDB,
    deleteFaqToDB,
};  