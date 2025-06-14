import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'validation.name_required' }).min(1, 'validation.name_min_length'),
    email: z.string({ required_error: 'validation.email_required' }).email('validation.email_invalid'),
    password: z.string({ required_error: 'validation.password_required' }).min(1, 'validation.password_min_length')
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'validation.email_required' }).email('validation.email_invalid'),
    password: z.string({ required_error: 'validation.password_required' })
  })
});
