import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AsCategoryService } from "./as_category.service";
import sendResponse from "../../../shared/sendResponse";
import { getSingleFilePath } from "../../../shared/getFilePath";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const icon = getSingleFilePath(req.files, 'image');
    console.log(icon);
    
    req.body.icon = icon
        const result = await AsCategoryService.createCategoryToDB(req.body);
    
        sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Category Created Successfully',
                data: result
        });
    
})

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
        const result = await AsCategoryService.getAllCategoryFromDB();
    
        sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Category fetched successfully',
                data: result
        });
    
})

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await AsCategoryService.getSingleCategoryFromDB(id);
    
        sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Category fetched successfully',
                data: result
        });
    
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
        const id = req.params.id;
        const icon = getSingleFilePath(req.files, 'image');
        console.log(icon);
        
        if(icon){
            req.body.icon = icon
        }
        const result = await AsCategoryService.updateCategoryToDB(id, req.body);
    
        sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Category updated successfully',
                data: result
        });
    
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await AsCategoryService.deleteCategoryFromDB(id);
    
        sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Category deleted successfully',
                data: result
        });
    
})

export const AsCategoryController = {
        createCategory,
        getAllCategory,
        getSingleCategory,
        updateCategory,
        deleteCategory
}