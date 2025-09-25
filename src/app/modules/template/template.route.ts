import express from 'express';
import { TemplateController } from './template.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { TemplateValidation } from './template.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.route('/')
    .get(TemplateController.getAllTemplates)
    .post(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),fileUploadHandler(),validateRequest(TemplateValidation.createTemplateZodSchema),TemplateController.createTemplate)

router.route('/:id')
    .get(TemplateController.getTemplate)
    .patch(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),fileUploadHandler(),validateRequest(TemplateValidation.updateTemplateZodSchema),TemplateController.updateTemplate)
    .delete(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),TemplateController.deleteTemplate)

export const TemplateRoutes = router;