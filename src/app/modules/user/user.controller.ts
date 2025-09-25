import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const result = await UserService.createUserToDB(userData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User created successfully',
      data: result,
    });
  }
);

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserProfileFromDB(user!);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

//update profile
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    const result = await UserService.updateProfileToDB(user!, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);


const setProfessionalDetails = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const resume_url = getSingleFilePath(req.files, 'doc');
  console.log(resume_url);
  
  const data = {
    proffessional_details: {
      ...req.body,
      resume_url,
    }
  }
  const result = await UserService.setProfessionalDetailsIntoDB(user!, data);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Professional details updated successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUserFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All users fetched successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUserFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single user fetched successfully',
    data: result,
  });
});


const lockUnlockUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.lockUnlockUserFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User locked/unlocked successfully',
    data: result,
  });
});


const getCertificates = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserCertificateAndDocumentsFromDB(req.user!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Certificates fetched successfully',
    data: result,
  });
});

const getUserCollectionsFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserCollectionsFromDB(req.user!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Collections fetched successfully',
    data: result,
  });
})

export const UserController = { createUser, getUserProfile, updateProfile, setProfessionalDetails, getAllUsers, getSingleUser, lockUnlockUser, getCertificates, getUserCollectionsFromDB };
