import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { ASSESSMENT_STATUS, USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import unlinkFile from '../../../shared/unlinkFile';
import generateOTP from '../../../util/generateOTP';
import { IUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Assessment } from '../assessment/assessment.model';
import { Order } from '../order/order.model';
import { Template } from '../template/template.model';

const createUserToDB = async (payload: Partial<IUser>): Promise<IUser> => {
  
  const createUser = await User.create(payload);
  if (!createUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
  }

  //send email
  const otp = generateOTP();
  const values = {
    name: createUser.name,
    otp: otp,
    email: createUser.email!,
  };
  const createAccountTemplate = emailTemplate.createAccount(values);
  emailHelper.sendEmail(createAccountTemplate);

  //save to DB
  const authentication = {
    oneTimeCode: otp,
    expireAt: new Date(Date.now() + 3 * 60000),
  };
  await User.findOneAndUpdate(
    { _id: createUser._id },
    { $set: { authentication } }
  );

  return createUser;
};

const getUserProfileFromDB = async (
  user: JwtPayload
): Promise<Partial<IUser>> => {
  const { id } = user;
  const isExistUser = await User.findById(id).populate({
    path: 'subscription',
    select: 'package',
    populate: {
      path: 'package',
      select: 'name',
    },
  });
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return isExistUser;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //unlink file here
  if (payload.image && isExistUser.image && isExistUser.image !== payload.image) {
    unlinkFile(isExistUser.image);
  }

  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};


const setProfessionalDetailsIntoDB = async (
  user: JwtPayload,
  payload: Pick<Partial<IUser>, 'proffessional_details'>
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  if(isExistUser?.proffessional_details?.resume_url && isExistUser?.proffessional_details?.resume_url && isExistUser?.proffessional_details?.resume_url !== payload.proffessional_details?.resume_url){
    unlinkFile(isExistUser.proffessional_details.resume_url);

    
  }

  if(payload?.proffessional_details?.skills){
    payload.proffessional_details.skills = (payload.proffessional_details.skills as any as string).split(',');
  }
  if(payload?.proffessional_details?.languages){
    payload.proffessional_details.languages = (payload.proffessional_details.languages as any as string).split(',');
  }

  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
}

const getAllUserFromDB = async (query:Record<string,any>) => {
  const userQuery = new QueryBuilder(User.find({verified:true},{name:1,email:1,contact:1,subscription:1,status:1,image:1}), query).filter().paginate().sort().search(['name', 'email','contact'])
  const [users, pagination] = await Promise.all([
    userQuery.modelQuery.populate({
      path: 'subscription',
      select: 'package',
      populate: {
        path: 'package',
        select: 'name',
      }
    }).lean(),
    userQuery.getPaginationInfo(),
  ]);

  
  return { data: users?.map((item:any)=>({...item,subscription:item.subscription?.package?.name||""})), pagination }
};

const getSingleUserFromDB = async (id: string) => {
  const isExistUser = await User.findById(id).populate({
    path: 'subscription',
    select: 'package',
    populate: {
      path: 'package',
      select: 'name',
    }
  }).lean();
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }
  return isExistUser;
};

const lockUnlockUserFromDB = async (id: string) => {
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }
  const updateDoc = await User.findOneAndUpdate({ _id: id }, { status: isExistUser.status === 'active' ? 'delete' : 'active' }, {
    new: true,
  });
  return updateDoc;
};


const getUserCertificateAndDocumentsFromDB = async (user: JwtPayload) => {
const { id } = user;

const isExistUser = await User.findById(id).lean()
if (!isExistUser) {
  throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
}

const assessments = await Assessment.find({ user: id, status: ASSESSMENT_STATUS.COMPLETED }).lean();

const certificates = []

for (const assessment of assessments) {
  const certificate = assessment?.cirtificate
  if (certificate) {
    certificates.push(certificate)
  }
  const badge = assessment?.badge
  if (badge) {
    certificates.push(badge)
  }
}

return certificates
  
}

const getUserCollectionsFromDB = async (user: JwtPayload) => {
  const { id } = user;
  const isExistUser = await User.findById(id).lean();
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }
  const template = await Order.find({ user: id, status: 'completed' }).populate('template').lean();

  return template;
}



export const UserService = {
  createUserToDB,
  getUserProfileFromDB,
  updateProfileToDB,
  setProfessionalDetailsIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  lockUnlockUserFromDB,
  getUserCertificateAndDocumentsFromDB,
  getUserCollectionsFromDB
};
