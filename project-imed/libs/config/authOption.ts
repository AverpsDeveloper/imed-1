import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "@/libs/models/userModel";
import dbInit from "./dbInit";
import aminUserModel from "@/libs/models/aminUserModel";


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbInit();
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const user: any = await aminUserModel.findOne({
            email: credentials.email,
          });

          if (user && (credentials.password == user.password)) {
            return user;
          }
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    }),
    CredentialsProvider({
      id: "user-signin",
      name: "Sign in User",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbInit();
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const user: any = await userModel.findOne({
            email: credentials.email,
          });

          if (user && (credentials.password == user.password)) {
            return user;
          }
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  }
};