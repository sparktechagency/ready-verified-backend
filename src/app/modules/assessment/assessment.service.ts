import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../user/user.model';
import { IAssessment } from './assessment.interface';
import { Assessment } from './assessment.model';
import stripe from '../../../config/stripe';
import { ASSESSMENT_STATUS, USER_BADGE, USER_ROLES } from '../../../enums/user';
import { generateZoomLink, getAccessToken } from '../../../helpers/zoomHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import { emailHelper } from '../../../helpers/emailHelper';
import { sendNotification } from '../../../helpers/notificationHelper';
import { JwtPayload } from 'jsonwebtoken';
import { generateBadge, generateCirtificate } from '../../../helpers/pdfHelper';
import config from '../../../config';

const createAssessmentToDB = async (
  payload: Partial<IAssessment>
): Promise<string> => {
  const user = await User.findOne({ _id: payload.user });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User doesn't exist!");
  }


// under 14days assessment
  const isExistAssessMent = await Assessment.findOne({ user: payload.user,category:payload.category,createdAt:{$lte:new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000)} });
  if (isExistAssessMent) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You already have an assessment scheduled. Please wait for 14 days before scheduling another assessment.'
    );
  }

  payload.end_time = new Date(new Date(payload.start_time!).getTime() + 30 * 60000);
  payload.date = new Date(new Date(payload.start_time!));
  const result = await Assessment.create(payload);

  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create assessment');
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Assessment of ${user.name}.For 1 assessments and 1 interview`,
          },
          unit_amount: 290 * 100,
        },
        quantity: 1,
      },
    ],
    customer_email: user.email,
    success_url: `${config.url.client_url}/profile`,
    cancel_url: `${config.url.client_url}`,
    metadata: { assessmentId: result._id.toString() },
  });

  if (!session.url) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create assessment');
  }

  return session.url;
};

const getAllAssessmentFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload
) => {

  
  const AssessmentQuery = new QueryBuilder(
    Assessment.find([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN].includes(user.role) ? {isPaid: true} : { status: ASSESSMENT_STATUS.COMPLETED }),
    query
  )
    .search(['personal_information.name'])
    .filter()
    .paginate();



  const [assessments, paginaion] = await Promise.all([
    AssessmentQuery.modelQuery
      .populate([
        {
          path: 'user',
          select: 'name email subscription image',
          populate: {
            path: 'subscription',
            select: 'price',
          },
        },
        {
          path:'category',
          select:'title'
        }
      ])
      .sort()
      .select(
        [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN].includes(user.role)
          ? ''
          : ''
      )
      .lean(),
    AssessmentQuery.getPaginationInfo(),
  ]);

  

  

  return {
    assessments: assessments,

    paginaion,
  };
};

const getSingleAssessmentFromDB = async (
  id: string,
  user: JwtPayload
): Promise<IAssessment | null> => {
  if ([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN].includes(user.role)) {
    const result = await Assessment.findById(id).populate([
      {
        path: 'user',
        select: 'name email subscription image',
        populate: {
          path: 'subscription',
          select: 'price',
        },
      },
      {
        path: 'category',
        select: 'title',
      },
      {
        path: 'user',
        select: 'name email subscription image',
        populate: {
          path: 'subscription',
          select: 'price',
        },
      },]);
    return result;
  }
  const result = await Assessment.findById(id).select(
    'personal_information.name level personal_information.overview professional_information.skills personal_information.address'
  );
  return result;
};

const updateAssessmentToDB = async (
  id: string,
  payload: Partial<IAssessment>
): Promise<IAssessment | null> => {
 
  const result = await Assessment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

 
  return result;
};

const deleteAssessmentFromDB = async (
  id: string
): Promise<IAssessment | null> => {
  const result = await Assessment.findByIdAndUpdate(
    
  )
  return result;
};

const changeStatusIntoDB = async (
  id: string,
  status: ASSESSMENT_STATUS,
  mark?: number
) => {
  if (
    [
      ASSESSMENT_STATUS.CANCELLED,
      ASSESSMENT_STATUS.REJECTED,
      ASSESSMENT_STATUS.CANCELLED,
    ].includes(status)
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "You can't change the status");
  }

  const assessment = await Assessment.findById(id);
  if (!assessment) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Assessment doesn't exist!");
  }

  if (
    assessment.status === ASSESSMENT_STATUS.LINK_SENT &&
    status !== ASSESSMENT_STATUS.COMPLETED
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "You can't change the status");
  }

  if(status == ASSESSMENT_STATUS.COMPLETED){
    const result = await generateCirtificate(assessment,mark)
    // const badge = await generateBadge((assessment as any)._id)
    return result
  }

  const result = await Assessment.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true }
  );
  return result;
};

const sendZoomMeetingLinkToAllAssessments = async () => {
  // Current UTC time
  const now = new Date();

  // Round down to the start of the current minute (UTC)
  const currentTime = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(), // minutes
    0,                   // seconds
    0                    // ms
  ));

  // 30 minutes later (UTC)
  const futureTime = new Date(currentTime.getTime() + 30 * 60 * 1000);

  const assessments = await Assessment.find({
    status: ASSESSMENT_STATUS.APPROVED,
    isPaid: true,
    start_time: { $lt: futureTime, $gte: currentTime }, // strictly between now and +30min
  }).lean();

  console.log("Current UTC:", currentTime.toISOString());
  console.log("Future UTC:", futureTime.toISOString());
  console.log("Assessments:", assessments);

  if (!assessments.length) return;

  for (const assessment of assessments) {
    const link = await generateZoomLink();
    const user = await User.findOne({ _id: assessment.user }).lean();

    await Assessment.findOneAndUpdate(
      { _id: assessment._id },
      { zoomLink: link, status: ASSESSMENT_STATUS.LINK_SENT }
    );

    const template = emailTemplate.zoomLinkTemplate({
      name: user?.name!,
      email: user?.email!,
      zoomLink: link,
    });

    await emailHelper.sendEmail(template);

    await sendNotification({
      title: `${user?.name} is scheduled for an interview`,
      message: `${user?.name} is waiting for an interview. Please check your dashboard to join.`,
      path: "assessment",
      recievers: [],
      refernceId: assessment._id,
    });
  }
};



const cirtificateVerificationUrl = async (id: string) => {
  const assessment = await Assessment.findById(id)
};

export const AssessmentService = {
  createAssessmentToDB,
  getAllAssessmentFromDB,
  updateAssessmentToDB,
  deleteAssessmentFromDB,
  changeStatusIntoDB,
  sendZoomMeetingLinkToAllAssessments,
  getSingleAssessmentFromDB,
};
