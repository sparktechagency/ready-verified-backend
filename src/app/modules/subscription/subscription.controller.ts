import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SubscriptionService } from "./subscription.service";
import sendResponse from "../../../shared/sendResponse";

const purchaseSubscription = catchAsync(async (req:Request,res:Response)=>{

    const id = req.params.id;
    const user = req.user;

    const result = await SubscriptionService.purchaseSubscriptionFromDB(id,user!);

    sendResponse(res,{
        statusCode:200,
        message:"Subscription purchased successfully",
        data:result,
        success:true
    })
})


const userSubscription = catchAsync(async (req:Request,res:Response)=>{
    const user = req.user;

    const result = await SubscriptionService.getUserSubscriptionFromDb(user!);

    sendResponse(res,{
        statusCode:200,
        message:"User subscription retrieved successfully",
        data:result,
        success:true
    })
})


export const SubscriptionController = {
    purchaseSubscription,
    userSubscription
}