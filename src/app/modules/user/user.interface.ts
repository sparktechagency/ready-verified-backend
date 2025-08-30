import { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type IUser = {
  name: string;
  role: USER_ROLES;
  contact: string;
  email: string;
  password: string;
  location: string;
  image?: string;
  status: 'active' | 'delete';
  verified: boolean;
  suffix?: string;
  street_address?: string;
  secondary_street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  date_of_birth?: Date;
  gender?: string;
  ethic?: string;
  education?: string;
  school_name?: string;
  graduation_year?: string;
  additional_languages?: string;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
  subscription?: Types.ObjectId;

  proffessional_details?: {
    job_title: string;
    industry: string;
    experience:number;
    linkedin_url?: string;
    skills: string[];
    languages: string[];
    resume_url: string;
  },
  
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
