import z from "zod";

const createCategoryZodSchema = z.object({
    body: z.object({
        image: z.any({ required_error: 'Icon is required' }),
        title: z.string({ required_error: 'Title is required' }),
        questions: z.string({ required_error: 'Questions is required' })
    })
})

const updateCategoryZodSchema = z.object({
    body: z.object({
        image: z.any().optional(),
        title: z.string().optional(),
        questions: z.string().optional()
    })
})

export const CategoryValidation = {
    createCategoryZodSchema,
    updateCategoryZodSchema
}