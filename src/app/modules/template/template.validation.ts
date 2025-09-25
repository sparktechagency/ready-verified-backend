import z from "zod";

const createTemplateZodSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title is required' }),
        image: z.any({ required_error: 'Image is required' }),
        type: z.enum(['resume', 'cover-letter','guide'], { required_error: 'Type is required' }),
        price: z.string({ required_error: 'Price is required' }),
        description: z.string().optional()
    })
    
})

const updateTemplateZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        image: z.any().optional(),
        type: z.enum(['resume', 'cover-letter','guide']).optional(),
        price: z.string().optional(),
        description: z.string().optional()
    })
})

export const TemplateValidation = {
    createTemplateZodSchema,
    updateTemplateZodSchema
}