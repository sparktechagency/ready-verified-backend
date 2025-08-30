import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TemplateService } from "./template.service";
import sendResponse from "../../../shared/sendResponse";
import { getSingleFilePath } from "../../../shared/getFilePath";

const createTemplate = catchAsync(async (req: Request, res: Response) => {
        const payload = req.body;
        const image = getSingleFilePath(req.files, 'image');
        payload.image = image
        const result = await TemplateService.createTemplateIntoDB(payload);
    
        sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Template Created Successfully',
                data: result
        });
});


const getAllTemplates = catchAsync(async (req: Request, res: Response) => {
    const result = await TemplateService.getAllTemplateFromDB(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Templates fetched successfully',
        data: result.data,
        pagination: result.pagination
    });
});

const updateTemplate = catchAsync(async (req: Request, res: Response) => {
    const image = getSingleFilePath(req.files, 'image');
    if (image) {
        req.body.image = image
    }
    const result = await TemplateService.updateTemplateToDB(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Template updated successfully',
        data: result
    });
});

const deleteTemplate = catchAsync(async (req: Request, res: Response) => {
    const result = await TemplateService.deleteTemplateFromDB(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Template deleted successfully',
        data: result
    });
});

const getTemplate = catchAsync(async (req: Request, res: Response) => {
    const result = await TemplateService.getSingleTemplateFromDB(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Template fetched successfully',
        data: result
    });
});

export const TemplateController = {
    createTemplate,
    getAllTemplates,
    updateTemplate,
    deleteTemplate,
    getTemplate
};
