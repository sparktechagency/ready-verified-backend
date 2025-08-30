import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    contact: z.string({ required_error: 'Contact is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    profile: z.string().optional(),
  }),
});

const updateUserZodSchema = z.object({
  name: z.string().optional(),
  contact: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  location: z.string().optional(),
  image: z.string().optional(),
});

const setProfessionalDetailsZodSchema = z.object({
  body: z.object({
    job_title: z.string().optional(),
    industry: z.string().optional(),
    experience: z.string().optional(),
    linkedin_url: z.string().url().optional(),
    skills: z.string().optional(),
    languages: z.string().optional(),
    resume_url: z.string().optional(),
  })
})
export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  setProfessionalDetailsZodSchema
};
