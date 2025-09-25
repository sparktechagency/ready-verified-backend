import z from "zod";
import { ASSESSMENT_STATUS, USER_BADGE } from "../../../enums/user";

const createAssessmentZodSchema = z.object({
    body: z.object({
        personal_information: z.string({ required_error: 'Personal information is required' }),
        professional_information: z.string({ required_error: 'Professional information is required' }),
        other_information: z.string({ required_error: 'Other information is required' }),
        qna: z.string({ required_error: 'QNA is required' }),
        category: z.string({ required_error: 'Category is required' }),
        start_time: z.string({ required_error: 'Start time is required' }),
        doc: z.any({ required_error: 'Doc is required' }),
    })
});

const changeStatusZodSchema = z.object({
    body: z.object({
        status: z.nativeEnum(ASSESSMENT_STATUS),
    })
})


const updateAssessmentZodSchema = z.object({
    body: z.object({
        personal_information: z.string().optional(),
        professional_information: z.string().optional(),
        other_information: z.string().optional(),
        qna: z.string().optional(),
        category: z.string().optional(),
        date: z.string().optional(),
        start_time: z.string().optional(),
        end_time: z.string().optional(),
        doc: z.any().optional(),
        badge:z.nativeEnum(USER_BADGE).optional()
    })
});

// make a funtion who can return a zod schema based on the status


export const AssessmentValidation = {
    createAssessmentZodSchema,
    changeStatusZodSchema,
    updateAssessmentZodSchema
}