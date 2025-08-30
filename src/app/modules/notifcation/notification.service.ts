import { JwtPayload } from "jsonwebtoken"
import QueryBuilder from "../../builder/QueryBuilder"
import { Notification } from "./notification.model"
import mongoose, { Types } from "mongoose"

const getALLNotification = async (query:Record<string,any>,user:JwtPayload)=>{
  const notificationQuery = new QueryBuilder(Notification.find({recievers:{
    $in:[user.id]
  }}),query).paginate().sort()
  const [notifications,pagination]= await Promise.all([
    notificationQuery.modelQuery.lean(),
    notificationQuery.getPaginationInfo()
  ])
const unread = await Notification.countDocuments({
  recievers:{
    $in:[user.id]
  },
  readers: { $nin: [new mongoose.Types.ObjectId(user.id)] }
});

  return {data:{
    notifications:notifications.map((item:any)=>{
        
        return {
          ...item,
          isRead:item.readers?.map((item:Types.ObjectId)=>item.toString()).includes(user.id)
        }
      
    }),
    unread:unread
  },pagination}
}

const readAllNotification = async (user:JwtPayload)=>{
  const notification = await Notification.updateMany({recievers:{
    $in:[user.id]
  },readers:{$nin:[user.id]}},{
    $addToSet:{readers:user.id}
  })
  return notification
}

const readOneNotification = async (user:JwtPayload,id:string)=>{
  const notification = await Notification.updateOne({_id:id,recievers:{
    $in:[user.id]
  },readers:{$nin:[user.id]}},{
    $addToSet:{readers:user.id}
  })
  return notification
}

export const NotificationService = {
  getALLNotification,
  readAllNotification,
  readOneNotification
}
