import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.route('/')
    .post(auth(),validateRequest(OrderValidation.createOrderZodSchema),OrderController.createOrder)
    .get(auth(),OrderController.getAllOrders)

router.get("/transactions",auth(),OrderController.getAllTransactions)
router.get("/download/:id",OrderController.downloadTemplate)

router.route('/:id')
    .get(auth(),OrderController.getSingleOrder)



export const OrderRoutes = router;