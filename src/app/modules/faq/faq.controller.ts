import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FaqService } from './faq.service';

const createFaq = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await FaqService.createFaqToDB(payload);
  
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faq Created Successfully',
        data: result
    });
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await FaqService.updateFaqToDB(id, payload);
  
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faq Updated Successfully',
        data: result
    });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await FaqService.deleteFaqToDB(id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faq Deleted Successfully',
      data: result,
    });
});
  
const getFaqs = catchAsync(async (req: Request, res: Response) => {
    const result = await FaqService.faqsFromDB();
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faq retrieved Successfully',
      data: result,
    });
});

export const FaqController = {
    createFaq,
    updateFaq,
    deleteFaq,
    getFaqs
};  