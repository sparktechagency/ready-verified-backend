import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DisclaimerService } from "./disclaimer.service";

const createDisclaimer = catchAsync(async (req:Request,res:Response)=>{
    const result = await DisclaimerService.createDisclaimerIntoDB(req.body);
    sendResponse(res,{
        statusCode:200,
        message:"Disclaimer created successfully",
        data:result,
        success:true

    })
})


const getDisclaimer = catchAsync(async (req:Request,res:Response)=>{
    const result = await DisclaimerService.getDisclaimerFromDB(req.query?.type as string);
    sendResponse(res,{
        statusCode:200,
        message:"Disclaimer fetched successfully",
        data:result,
        success:true

    })
})


export const DisclaimerController = {
    createDisclaimer,
    getDisclaimer
}