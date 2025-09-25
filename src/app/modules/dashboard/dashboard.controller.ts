import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { DashboardService } from "./dashboard.service";
import sendResponse from "../../../shared/sendResponse";

const getAnalatycs = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.getAnalatycsDataFromDB(req.query.year as string);
    sendResponse(res, {
        statusCode: 200,
        message: "Analytics data fetched successfully",
        data: result,
        success: true,
    });
});

export const DashboardController = {
    getAnalatycs,
};