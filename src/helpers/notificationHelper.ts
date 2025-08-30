import { Socket } from "socket.io";
import { INotification } from "../app/modules/notifcation/notification.interface";
import { Notification } from "../app/modules/notifcation/notification.model";
import { User } from "../app/modules/user/user.model";
import { USER_ROLES } from "../enums/user";

export async function sendNotification(notification: INotification) {
    try {
        const admins = await User.find({ role: {
            $in: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN]
        } }).lean()

        const adminIds = admins.map((admin: any) => admin._id)
        notification.recievers = adminIds

        const noti = await Notification.create(notification)

        const io = (global as any).io as Socket
        for (const admin of admins) {
            io.emit(`notification::${admin._id}`, noti)
        }
    } catch (error) {
        console.log(error);
        
    }

}