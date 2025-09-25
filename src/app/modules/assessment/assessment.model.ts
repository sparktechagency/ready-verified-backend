import mongoose from "mongoose";
import { AssessmentModel, IAssessment } from "./assessment.interface";
import { ASSESSMENT_STATUS, JOB_LEVEL, USER_BADGE } from "../../../enums/user";

const assessmentSchema = new mongoose.Schema<IAssessment,AssessmentModel>({
    personal_information:{
        type:{
            name: String,
            email: String,
            contact: String,
            headline: String,
            address: String,
            overview: String
        }
    },
    professional_information: {
        type: {
            job_title: String,
            company: String,
            experience: String,
            linkedin_url: String,
            skills: [String],
            resume_url: String,
            work_experience: String
        }
    },
    other_information:{
        type:{
        educational_background: String,
        language: String,
        volunter_experience: String,
        publications: String,
        references: String
        }
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: Object.values(ASSESSMENT_STATUS),
        default: ASSESSMENT_STATUS.PENDING
    },
    qna: [
        {
            question: {
                type: String
            },
            answer: {
                type: String
            }
        }
    ],
    end_time: {
        type: Date,
        default: Date.now
    },
    start_time: {
        type: Date,
        default: Date.now
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentId:{
        type: String
    },
    level:{
        type: String,
        enum:Object.values(JOB_LEVEL)
    },
    badge:{
        type: String,
    },
    zoomLink:{
        type: String
    },
    cirtificate:{
        type: String
    },
    verificationCode: {
        type: String
    },
    mark:{
        type: Number,
    },
    duration: {
        type: String
    }

},{
    timestamps: true
})


export const Assessment = mongoose.model<IAssessment, AssessmentModel>("Assessment", assessmentSchema);