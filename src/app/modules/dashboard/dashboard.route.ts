import express from 'express';
import { DashboardController } from './dashboard.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.route('/')
    .get(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),DashboardController.getAnalatycs)

export const DashboardRoutes = router;