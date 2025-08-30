import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { NotificationController } from './notification.controller';

const router = express.Router();
router.get('/', auth(), NotificationController.getALLNotification);
router.patch('/read-all', auth(), NotificationController.readAllNotification);
router.patch('/read/:id', auth(), NotificationController.readOneNotification);
export const NotificationRoutes = router;