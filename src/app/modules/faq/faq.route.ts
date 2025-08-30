import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { FaqController } from './faq.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FaqValidation } from './faq.validation';
const router = express.Router();

router
    .route('/')
    .post(
        validateRequest(FaqValidation.createFaqZodSchema),
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        FaqController.createFaq
    )
    .get(
        FaqController.getFaqs
    );

router
    .route('/:id')
    .delete(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        FaqController.deleteFaq
    )
    .patch(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        FaqController.updateFaq
    );

export const FaqRoutes = router;