'use server'

import { connectToDatabase } from "@/lib/database/db.connect";
import Users from "@/lib/models/user.model";
import { IUser, LoginFormData, SignupFormData, ZSignupSchema } from "@/lib/utils/definitions";
import bcrypt from 'bcrypt';
import { signIn } from "@/auth/auth.config";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { getNormalObject } from "@/lib/utils";

export async function SignupAction(formData: SignupFormData) {
    const validatedFields = ZSignupSchema.safeParse(formData)
    console.log('valiatedFields :: ', validatedFields)

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
        savedUser = getNormalObject(savedUser)
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

export async function CredentialsLoginAction(formData: LoginFormData) {
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
// NOTE: cant redirect from inside of try/catch block, hence signIn()'s redirect wont work inside try/catch block
export const OAuthLoginAction = async (provider: string) => {
    let redirectUrl;
    try {
        redirectUrl = await signIn(provider, { redirect: false })
    } catch (error: any) {
        return {
            formError: 'Failed to Login with ' + provider,
            message: error.message,
            status: 500,
            success: false
        }
    }
    redirect(redirectUrl)
}