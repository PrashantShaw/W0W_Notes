import { signOut } from "@/auth/auth.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const DOMAIN = process.env.DOMAIN || ''
    try {
        await signOut({ redirect: false })
        return NextResponse.redirect(DOMAIN + '/login')

    } catch (error: any) {
        return NextResponse.json({
            message: error?.message,
            status: 500,
            success: false
        })
    }
}