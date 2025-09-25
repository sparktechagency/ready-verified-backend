import { Model, Types } from "mongoose"
import { ORDER_STATUS } from "../../../enums/order";

export type IOrder = {
    user:Types.ObjectId,
    template:Types.ObjectId,
    file?:string;
    status:ORDER_STATUS;
    price?:number;
    paymentId?:string;
    trxId?:string
}


export type OrderModel = Model<IOrder>
