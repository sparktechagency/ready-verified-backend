import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { AssessmentController } from './asessment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AssessmentValidation } from './asessment.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
const router = express.Router();

router.route('/')
    .get(auth(),AssessmentController.getAllAssessments)
    .post(auth(),fileUploadHandler(),validateRequest(AssessmentValidation.createAssessmentZodSchema),AssessmentController.createAssessment)

router.patch('/change-status/:id',auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),validateRequest(AssessmentValidation.changeStatusZodSchema),AssessmentController.changeStatus)
router.route('/:id')
    .patch(auth(),fileUploadHandler(),AssessmentController.updateAssessment)
    .delete(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),AssessmentController.deleteAssessment)
    .get(auth(),AssessmentController.getAssessment)

export const AssessmentRoutes = router;