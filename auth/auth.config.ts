import {
  authenticateCredentialsLogin,
  authenticateOAuthLogin,
} from "@/lib/helpers/auth.helpers";
import { IUser, ZLoginSchema } from "@/lib/utils/definitions";
import NextAuth, { DefaultSession } from "next-auth";
import credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      userId: IUser["_id"];
      email: IUser["email"];
      password: IUser["password"];
    } & DefaultSession["user"];
    currTime: string;
  }
  interface User extends IUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      userId: IUser["_id"];
      email: IUser["email"];
      password: IUser["password"];
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 60 * 30, // 30 mins
    strategy: "jwt",
    updateAge: 60 * 10,
  },
  trustHost: true,
  providers: [
    GitHub({
      profile: async (data) => {
        const oauthLoginResult = await authenticateOAuthLogin(data.email!);
        return oauthLoginResult!;
      },
    }),
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, request) => {
        console.log("Credentials :: ", credentials);
        const validatedFields = ZLoginSchema.safeParse(credentials);
        console.log("ValidatedFields :: ", validatedFields);
        if (!validatedFields.success) {
          const serverValidationErrors = Object.fromEntries(
            validatedFields?.error?.issues.map(({ path, message }) => [
              path[0],
              message,
            ])
          );
          return null;
        }

        const { email, password } = validatedFields.data;
        const authResult = await authenticateCredentialsLogin(email, password);

        console.log("AuthResult :: ", authResult);
        return authResult;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user, trigger }) => {
      console.log("--- jwt callback ---");
      console.log("token :: ", token);
      console.log("---------------------");
      if (user) {
        const jwtPayload = {
          user: {
            userId: user._id,
            email: user.email!,
            password: user.password,
          },
        };
        return jwtPayload;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        // session.user = token.user as User
        const expireDateTimeIST = new Date(session.expires).toLocaleString(
          undefined,
          { timeZone: "Asia/Kolkata" }
        );
        const currentDateTimeIST = new Date().toLocaleString(undefined, {
          timeZone: "Asia/Kolkata",
        });

        session = {
          ...session,
          user: {
            ...session.user,
            // ...token.user
            userId: token.user.userId,
            email: token.user.email,
            password: token.user.password,
          },
          currTime: currentDateTimeIST,
          expires: expireDateTimeIST as Date & string,
        };
      }

      return session;
    },
  },
});
