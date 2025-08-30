import z from "zod";
import { ASSESSMENT_STATUS } from "../../../enums/user";

const createAssessmentZodSchema = z.object({
    body: z.object({
        personal_information: z.string({ required_error: 'Personal information is required' }),
        professional_information: z.string({ required_error: 'Professional information is required' }),
        other_information: z.string({ required_error: 'Other information is required' }),
        qna: z.string({ required_error: 'QNA is required' }),
        category: z.string({ required_error: 'Category is required' }),
        date: z.string({ required_error: 'Date is required' }),
        start_time: z.string({ required_error: 'Start time is required' }),
        end_time: z.string({ required_error: 'End time is required' }),
        doc: z.any({ required_error: 'Doc is required' }),
    })
});

const changeStatusZodSchema = z.object({
    body: z.object({
        status: z.nativeEnum(ASSESSMENT_STATUS)
    })
})

export const AssessmentValidation = {
    createAssessmentZodSchema,
    changeStatusZodSchema
}