import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./order.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/sendResponse";

const createOrder = catchAsync(async (req: Request, res: Response) => {

    const data = req.body
    const user = req.user
    data.user = (user as any)?.id;
    const result = await OrderService.createOrderToDB(data);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Order created successfully',
        data: result,
    });
    
})

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrdersFromDB(req.user!,req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'All orders fetched successfully',
        data: result.data,
        pagination: result.pagination,
    });
})


const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getSingleOrderDetails(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Order fetched successfully',
        data: result,
    });
})

const downloadTemplate = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.downloadTemplateFromDB(req.params.id,req.query.q as string,res);
})

const getAllTransactions = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getTransactionFromDb(req.user!,req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'All transactions fetched successfully',
        data: result.data,
        pagination: result.pagination,
    });
})



export const OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    downloadTemplate,
    getAllTransactions
}