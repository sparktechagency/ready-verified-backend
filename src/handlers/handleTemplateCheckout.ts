import { Order } from "../app/modules/order/order.model";
import { Template } from "../app/modules/template/template.model";
import { User } from "../app/modules/user/user.model";
import { ORDER_STATUS } from "../enums/order";
import { emailHelper } from "../helpers/emailHelper";
import { sendNotification } from "../helpers/notificationHelper";
import { emailTemplate } from "../shared/emailTemplate";

export const handleTemplateCheckout =async (orderId: string,paymentId?:string) => {
try {
    
    const order = await Order.findOne({ _id: orderId }).lean();

    if(!order){
        console.log("order not found");
        return
    }

    const template = await Template.findOne({ _id: order.template }).lean();

    if(!template){
        console.log("template not found");
        return
    }

    const trxId = `TRX${Math.floor(Math.random() * 1000000)}`

    await Order.findOneAndUpdate({ _id: orderId }, { file: template.file,status:ORDER_STATUS.COMPLETED,trxId:trxId,paymentId:paymentId }, { new: true });

    const user  = await User.findOneAndUpdate({ _id: order.user }, { $inc: { "tier_resume_taken": 1 } }, { new: true });

    await sendNotification({
        title:`${user?.name} just downloaded your resume`,
        message:`${user?.name} just downloaded your resume`,
        recievers:[],
        path:"user"
    })
    const emailTemplatef = emailTemplate.fileSentTemplate({name:user?.name!,email:user?.email!,file:`/download/${template._id}?q=${user?._id}`})
    await emailHelper.sendEmail(emailTemplatef);

} catch (error) {
    console.log(error);
    
}

};