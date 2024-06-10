import { auth as authMiddleware } from "@/auth/auth.config"
import { NextResponse } from "next/server"

const protectedRoutes = [
    '/dashboard',
    '/settings',
]

const authRoutes = [
    '/signup',
    '/login',
]

export default authMiddleware((request) => {
    const { auth, nextUrl } = request
    const isLoggedIn = !!auth
    const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))
    const isAuthRoute = authRoutes.some((route) => nextUrl.pathname.startsWith(route))

    if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = new URL("/login", nextUrl.origin)
        return NextResponse.redirect(loginUrl)
    }
    else if (isAuthRoute && isLoggedIn) {
        const dashboardUrl = new URL("/dashboard", nextUrl.origin)
        return NextResponse.redirect(dashboardUrl)
    }
})

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};