import mongoose from "mongoose";
import { IOrder, OrderModel } from "./order.interface";
import { ORDER_STATUS } from "../../../enums/order";

const orderSchema = new mongoose.Schema<IOrder,OrderModel>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
        required: true,
    },
    file: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING,
    },
    price: {
        type: Number,
    },
    paymentId: {
        type: String,
    },
    trxId: {
        type: String,
    }
},{
    timestamps: true
})

export const Order = mongoose.model<IOrder,OrderModel>("Order", orderSchema)