import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { SubscriptionController } from './subscription.controller';


const router = express.Router();

router.route('/:id')
    .post(auth(),SubscriptionController.purchaseSubscription)

router.route('/')
    .get(auth(),SubscriptionController.userSubscription)

export const SubscriptionRoutes = router;