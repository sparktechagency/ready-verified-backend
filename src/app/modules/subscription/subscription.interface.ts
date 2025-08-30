import { Model, Types } from "mongoose"

export type ISubscription = {
    user:Types.ObjectId,
    package:Types.ObjectId,
    startDate:Date,
    endDate:Date,
    price: number,
    status:"active"|"expired"|"inactive",
    subscriptionId?:string
}

export type SubscriptionModel = Model<ISubscription>