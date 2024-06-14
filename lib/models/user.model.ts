import mongoose from "mongoose";
import { IUser } from "@/lib/utils/definitions";

const { Schema, models, model } = mongoose

const usersSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: [true, 'Please enter different email addresses'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const Users = models.users || model<IUser>('users', usersSchema)

export default Users;