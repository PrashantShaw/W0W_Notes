import { ZLoginSchema } from "@/lib/utils/definitions";
import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/login',
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
                console.log('ValidatedFields :: ', validatedFields)
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