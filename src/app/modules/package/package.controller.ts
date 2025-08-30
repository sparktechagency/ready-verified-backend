import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PackageService } from "./package.service";
import sendResponse from "../../../shared/sendResponse";

const createPackage = catchAsync(async (req:Request,res:Response)=>{
    const result = await PackageService.createPlanIntoDb(req.body);

    sendResponse(res,{
        statusCode:200,
        message:"Package created successfully",
        data:result,
        success:true,
    })
})

const getAllPackage = catchAsync(async (req:Request,res:Response)=>{
    const result = await PackageService.getAllPackageFromDb();

    sendResponse(res,{
        statusCode:200,
        message:"Package fetched successfully",
        data:result,
        success:true,
    })
})


const updatePackage = catchAsync(async (req:Request,res:Response)=>{
    const result = await PackageService.updatePackageFromDb(req.params.id,req.body);

    sendResponse(res,{
        statusCode:200,
        message:"Package updated successfully",
        data:result,
        success:true,
    })
})

const deletePackage = catchAsync(async (req:Request,res:Response)=>{
    const result = await PackageService.deletePackageFromDb(req.params.id);

    sendResponse(res,{
        statusCode:200,
        message:"Package deleted successfully",
        data:result,
        success:true,
    })
})

export const PackageController = {
    createPackage,
    getAllPackage,
    updatePackage,
    deletePackage,
}