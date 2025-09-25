import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router
  .route('/profile')
  .get(auth(), UserController.getUserProfile)
  .patch(
    auth(),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = UserValidation.updateUserZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return UserController.updateProfile(req, res, next);
    }
  );

router
  .route('/professional-details')
  .patch(
    auth(),
    fileUploadHandler(),
    validateRequest(UserValidation.setProfessionalDetailsZodSchema),
    UserController.setProfessionalDetails

  );

router
  .route('/')
  .post(
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  )
  .get(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), UserController.getAllUsers);


router.route("/certificate")
.get(auth(),UserController.getCertificates)

router.route("/collection")
.get(auth(),UserController.getUserCollectionsFromDB)

router
  .route('/:id')
  .get(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), UserController.getSingleUser)
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),UserController.lockUnlockUser)

export const UserRoutes = router;
