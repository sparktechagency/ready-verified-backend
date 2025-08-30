import z from "zod";

const createDisclaimerZodSchema = z.object({
    body: z.object({
        content: z.string(),
        type: z.enum(["terms", "privacy", "about"])
    })
})


const getDisclaimerZodSchema = z.object({
    query: z.object({
        type: z.enum(["terms", "privacy", "about"])
    })
})


export const DisclaimerValidation = {
    createDisclaimerZodSchema,
    getDisclaimerZodSchema
}