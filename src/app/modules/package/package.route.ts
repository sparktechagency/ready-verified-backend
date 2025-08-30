import express from 'express';
import { PackageController } from './package.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { PackageValidation } from './package.validation';

const router = express.Router();

router.route('/')
    .get(PackageController.getAllPackage)
    .post(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),validateRequest(PackageValidation.createPackageZodSchema),PackageController.createPackage);

router.route('/:id')
    .patch(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),validateRequest(PackageValidation.updatePackageZodSchema),PackageController.updatePackage)
    .delete(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),PackageController.deletePackage)

export const PackageRoutes = router;