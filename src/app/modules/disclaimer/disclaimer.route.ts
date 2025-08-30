import express from 'express';
import { DisclaimerController } from './disclaimer.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { DisclaimerValidation } from './disclaimer.validation';

const router = express.Router();

router.route('/')
    .get(validateRequest(DisclaimerValidation.getDisclaimerZodSchema),DisclaimerController.getDisclaimer)
    .post(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),validateRequest(DisclaimerValidation.createDisclaimerZodSchema), DisclaimerController.createDisclaimer)


export const DisclaimerRoutes = router;