import z from "zod";

const createOrderZodSchema = z.object({
    body: z.object({
        template: z.string({ required_error: 'Template is required' }),
    })
});


export const OrderValidation = {
    createOrderZodSchema
}