import { ZLoginSchema } from "@/lib/utils/definitions";
import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials";

const protectedRoutes = [
    '/settings',
]

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized: ({ request, auth }) => {
            console.log('auth :: ', auth)
            const { nextUrl } = request
            const isLoggedIn = !!auth
            const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))
            const isDashbaord = nextUrl.pathname.startsWith('/dashboard')
            console.log('isDashbaord :: ', isDashbaord, isLoggedIn)

            // FIXME: login not redirecting to dashboard
            if (isDashbaord) {
                if (isLoggedIn) return true;
                return false;
            }
            // else if (isProtectedRoute && !isLoggedIn) {
            //     const loginUrl = new URL("/login", nextUrl)
            //     return Response.redirect(loginUrl);
            // } 
            else if (isLoggedIn) {
                const dashboardUrl = new URL('/dashboard', nextUrl)
                return Response.redirect(dashboardUrl);
            }

            return true;
        },
    },
    providers: [
        credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials, request) => {
                console.log('Credentials :: ', credentials)
                const validatedFields = ZLoginSchema.safeParse(credentials)
                if (!validatedFields.success) {
                    return null;
                }
                const { email, password } = validatedFields.data
                const user = { email }
                // TODO: search for user and match the password

                return user
            },
        }),
    ],

})