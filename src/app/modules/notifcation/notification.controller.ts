import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { NotificationService } from "./notification.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getALLNotification = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const user = req.user;
  const result = await NotificationService.getALLNotification(query, user!);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Notification retrieved successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

const readAllNotification = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await NotificationService.readAllNotification(user!);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Notification read successfully',
    data: result,
  });
});

const readOneNotification = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  const result = await NotificationService.readOneNotification(user!, id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Notification read successfully',
    data: result,
  });
});


export const NotificationController = {
  getALLNotification,
  readAllNotification,
  readOneNotification,
};