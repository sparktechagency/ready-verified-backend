import express from 'express';
import { AsCategoryController } from './as_category.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation} from './as_category.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.route('/')
    .get(AsCategoryController.getAllCategory)
    .post(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),fileUploadHandler(),validateRequest(CategoryValidation.createCategoryZodSchema),AsCategoryController.createCategory);

router.route('/:id')
    .get(AsCategoryController.getSingleCategory)
    .patch(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),fileUploadHandler(),validateRequest(CategoryValidation.updateCategoryZodSchema),AsCategoryController.updateCategory)
    .delete(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),AsCategoryController.deleteCategory)

export const AsCategoryRoutes = router;