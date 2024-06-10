import { authenticateLogin } from "@/lib/helpers/auth.helpers";
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
                    const serverValidationErrors = Object.fromEntries(validatedFields?.error?.issues.map(({ path, message }) => [path[0], message]))
                    return null;
                }

                const { email, password } = validatedFields.data
                const authResult = await authenticateLogin(email, password)

                console.log('AuthResult :: ', authResult)
                return authResult
            },
        }),
    ],

})