import { Model, Types } from "mongoose";
import { ASSESSMENT_STATUS, JOB_LEVEL, USER_BADGE } from "../../../enums/user";

export type IAssessment = {
    personal_information:{
        name: string,
        email: string,
        contact: string;
        headline: string;
        address: string;
        overview: string
    },

    professional_information: {
        job_title: string,
        company: string,
        experience: string,
        linkedin_url: string,
        skills: string[],
        resume_url: string,
        work_experience:string;

    },

    other_information:{
        educational_background: string,
        language: string,
        volunter_experience: string;
        publications?: string;
        references?: string;
    },

    qna:{
        question: string,
        answer: string
    }[],

    category:Types.ObjectId;
    date:Date;
    start_time:Date;
    end_time:Date;
    isPaid:boolean;
    paymentId?:string;
    status:ASSESSMENT_STATUS
    user:Types.ObjectId;
    level:JOB_LEVEL;
    badge:string;
    zoomLink?:string;
    cirtificate?:string,
    verificationCode?:string,
    mark?:number,
    duration?:string

}

export type AssessmentModel = Model<IAssessment>