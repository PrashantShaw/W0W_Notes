import { z } from "zod";

export const ZSignupSchema = z.object({
    email: z.string().email({
        message: "Must be a valid email.",
    }),
    password: z.string().min(6, {
        message: "password must be at least 6 characters.",
    }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not Match!',
    path: ['confirmPassword']
})

export const ZLoginSchema = z.object({
    email: z.string().email({
        message: "Must be a valid email.",
    }),
    password: z.string().min(1, {
        message: "Required!",
    }),
})

export type SignupFormData = z.infer<typeof ZSignupSchema>
export type LoginFormData = z.infer<typeof ZLoginSchema>