import { Model, Types } from "mongoose";

export type INotification = {
  title: string;
  message: string;
  recievers:Types.ObjectId[];
  readers?: Types.ObjectId[];
  path:"assessment"|"user"
  refernceId?:Types.ObjectId;
};

export type NotificationModel = Model<INotification>;

