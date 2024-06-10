import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { connectToDatabase } from "@/lib/database/db.connect";
import Users, { IUser } from "@/lib/models/user.model";
import { LoginResponse } from "@/lib/utils/definitions";

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse>> {
    try {
        await connectToDatabase()
        const reqBody = await request.json();
        const { email, password } = reqBody

        const user = await Users.findOne<IUser | null>({ email })

        if (!user) {
            return NextResponse.json({
                message: 'User Not Found!',
                status: 400,
                success: false,
            })
        }
        const passwordMatched = await bcrypt.compare(password, user.password)

        if (!passwordMatched) {
            return NextResponse.json({
                message: "Invalid Credentials!",
                status: 400,
                success: false,
            })
        }

        return NextResponse.json({
            user,
            message: 'Login Success!',
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