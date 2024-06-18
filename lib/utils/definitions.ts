import { ColumnDef } from "@tanstack/react-table";
import { Schema } from "mongoose";
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

export interface IUser extends Document {
    _id: string
    username?: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
}

export interface INote extends Document {
    _id: string;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'ToDo' | 'In Progress' | 'Cancelled' | 'Done' | 'Backlog';
    label: 'Bug' | 'Feature' | 'Documentation';
    user: typeof Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export type LoginResponse = {
    message: string
    status: number
    success: boolean
    user?: IUser
}

export type LinkItemProps = {
    label: string
    href: string
    isActive?: boolean
    icon?: React.ReactElement
}

export const ZNoteSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters.", }),
    description: z.string().min(3, { message: "Description must be at least 3 characters.", }),
    priority: z.string().min(1),
    status: z.string().min(1),
    label: z.string().min(1),
})

export type NoteFormData = z.infer<typeof ZNoteSchema>

export type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: Array<TData>
}