import z from "zod";

const createPackageZodSchema = z.object({
    body:z.object({
    name: z.string().min(1, "Name is required"),
    features: z.array(z.string()).min(1, "Features is required"),
    price: z.number().min(0, "Price is required"),
    recurring:z.enum(['month','year']),
    
})
})


const updatePackageZodSchema = z.object({
    body:z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    recurring:z.enum(['month','year']).optional(),
    discount: z.number().optional(),
})
})

export const PackageValidation = {
    createPackageZodSchema,
    updatePackageZodSchema
}