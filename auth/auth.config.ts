import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized: ({ request, auth }) => {
            const { nextUrl } = request
            console.log('auth :: ', auth)
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
                return null;
            },
        }),
    ],

})