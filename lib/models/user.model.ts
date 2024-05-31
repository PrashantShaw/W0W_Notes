import mongoose from "mongoose";

const { Schema, models, model } = mongoose
const userSchema = new Schema({
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

const User = models.users || model('user', userSchema)

export default User;