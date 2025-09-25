import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Template } from "../template/template.model";
import stripe from "../../../config/stripe";
import { Order } from "./order.model";
import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { ORDER_STATUS } from "../../../enums/order";
import { USER_ROLES } from "../../../enums/user";
import path from "path";
import { Response } from "express";
import config from "../../../config";
const createOrderToDB = async (payload: Partial<IOrder>) => {
    const user = await User.findOne({ _id: payload.user }).populate('subscription').select("+tier_resume_taken").lean()
    if (!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
    }

    

    const isFree = (user.subscription && (user.subscription as any)?.price != 0) && (!user.tier_resume_taken || user.tier_resume_taken <2)

    
    const template = await Template.findOne({ _id: payload.template }).lean()
    if (!template) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Template doesn't exist!");
    }
    const order = await Order.create({
        user: payload.user,
        template: payload.template,
        price: isFree ? 0 : template.price,
      })

      if (!order) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Order creation failed!");
      }

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Order of ${user.name} For ${template.title}`,
              },
              unit_amount: isFree ? 0 : template.price * 100,
            },
            quantity: 1,
          },
        ],
        customer_email: user.email,
        success_url: `${config?.url?.client_url}/profile/my-collection`,
        cancel_url: `${config?.url?.client_url}`,
        metadata: {
          order_id: order._id.toString(),
        }
      })


      return checkoutSession.url
    
}


const getAllOrdersFromDB = async (user: JwtPayload,query:Record<string,any>) => {
    const OrderQuery = new QueryBuilder(Order.find([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN].includes(user.role) ? {status:ORDER_STATUS.COMPLETED} : {user:user.id,status:ORDER_STATUS.COMPLETED}), query).paginate().sort()

    const [orders, pagination] = await Promise.all([
        OrderQuery.modelQuery.populate([
            {
                path: 'template',
                select: 'title description price thumbnail'
            },
            {
                path: 'user',
                select: 'name email contact image'
            }
        ]).lean(),
        OrderQuery.getPaginationInfo(),
    ]);

    return { data: orders, pagination };
}


const getSingleOrderDetails = async (id: string) => {
    const order = await Order.findById(id).populate([{
        path: 'template',
        select: 'title file'
    },{
        path: 'user',
        select: 'name email contact image'
    }]).lean()
    return order
}


const downloadTemplateFromDB = async (template_id:string,user_id:string,res:Response) => {
    const order = await Order.findOne({ template: template_id,user:user_id }).lean()

    if(!order){
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access!");
    }


    const filePath = path.join(process.cwd(), 'uploads', order?.file!);

    res.download(filePath);

}

const getTransactionFromDb = async (user: JwtPayload,query:Record<string,any>) => {
  const OrderQuery = new QueryBuilder(Order.find({ user: user.id }), query).sort().paginate()
  const [orders, pagination] = await Promise.all([
    OrderQuery.modelQuery.populate('template user').lean(),
    OrderQuery.getPaginationInfo(),
  ])

  return { data: orders, pagination }
}



export const OrderService = {
    createOrderToDB,
    getAllOrdersFromDB,
    getSingleOrderDetails,
    downloadTemplateFromDB,
    getTransactionFromDb
}