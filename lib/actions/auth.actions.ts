'use server'

import { connectToDatabase } from "../database/db.connect";
import Users, { IUser } from "@/lib/models/user.model";
import { LoginFormData, SignupFormData, ZSignupSchema } from "../utils/definitions";
import bcrypt from 'bcrypt';
import { signIn } from "@/auth/auth.config";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function SignupAction(formData: SignupFormData) {
    const validatedFields = ZSignupSchema.safeParse(formData)
    console.log('valiatedFields :: ', validatedFields)

    // TODO: remove before deployment
    // await sleep();

    if (!validatedFields.success) {
        const serverValidationErrors = Object.fromEntries(validatedFields?.error?.issues.map(({ path, message }) => [path[0], message]))
        return {
            errors: serverValidationErrors,
            success: false
        }
    }
    try {
        await connectToDatabase()
        const { email, password, confirmPassword } = validatedFields.data
        const user = await Users.findOne<IUser | null>({ email })
        console.log('user exists :: ', user)

        if (user) {
            return {
                formError: 'Users Already Exists!',
                success: false
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new Users({
            email,
            password: hashedPassword
        })
        let savedUser: IUser = await newUser.save()
        savedUser = JSON.parse(JSON.stringify(savedUser))
        console.log('saved user :: ', savedUser)

        return {
            message: 'User Successfully Created',
            user: savedUser,
            success: true
        }


    } catch (error: any) {
        return {
            formError: 'Server Error: Failed to signup!',
            status: 500,
            success: false
        }
    }
}

export async function LoginAction(formData: LoginFormData) {
    try {
        const { email, password } = formData
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        formError: 'Invalid credentials.',
                        message: error.message,
                        status: 500,
                        success: false
                    }
                default:
                    return {
                        formError: 'Server Error: Failed to Login!',
                        message: error.message,
                        status: 500,
                        success: false
                    }
            }
        }
        throw error;
    }

    redirect("/dashboard")
}