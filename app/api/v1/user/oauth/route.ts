import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { connectToDatabase } from "@/lib/database/db.connect";
import Users from "@/lib/models/user.model";
import { IUser, LoginResponse } from "@/lib/utils/definitions";

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse>> {
    try {
        await connectToDatabase()
        const reqBody = await request.json();
        const { email } = reqBody

        const user = await Users.findOne<IUser | null>({ email })
        console.log('oauth user :: ', user)

        if (user) {
            return NextResponse.json({
                user,
                message: 'OAuth Login Success!',
                status: 200,
                success: true
            })
        }

        const newUser: IUser = await Users.create({
            email,
            password: "No password for OAuth users"
        })

        return NextResponse.json({
            user: newUser,
            message: 'New OAuth user created!',
            status: 200,
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({
            message: error?.message,
            status: 500,
            success: false
        })
    }
}