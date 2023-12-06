import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "@/libs/models/userModel";
import dbInit from "./dbInit";
import aminUserModel from "@/libs/models/adminUserModel";
import { generateOtp, hashOtp, verifyOtp } from "../utils/optUtils";
import { sendMail } from "../utils/emailUtil";

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
          }).lean();

          if (user && (credentials.password == user.password)) {
            if (user.isTfa) {
              const otp = await generateOtp();
              // const otp = 7777;
              const ttl = 1000 * 60 * 60 * 5; // 5 day
              const expires = Date.now() + ttl;
              const data = `${user.email}.${otp}.${expires}`;
              const tfaHash = `${hashOtp(data)}.${expires}`;
              await aminUserModel.findByIdAndUpdate(user._id, { tfaHash, lastActive: new Date() });
              await sendMail("longin otp",user.email, otp);
            }
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
      id: "tfa-credentials",
      name: "Two Factor Auth",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        opt: { label: "Otp", type: "text" }
      },
      async authorize(credentials: any) {
        console.log("otp", credentials)
        try {
          await dbInit();
          if (!credentials?.email || !credentials?.otp) {
            return null;
          }
          const user: any = await aminUserModel.findOne({
            email: credentials.email,
          }).lean();
          console.log("opt-user", user);
          const [tfaHash, expires] = user.tfaHash.split('.');
          if (Date.now() > +expires) {
            throw new Error('OTP expired!')
          }
          const data = `${credentials.email}.${credentials?.otp}.${expires}`;
          const isValid = verifyOtp(tfaHash, data);
          console.log("isValie", isValid);
          if (isValid) {
            return { ...user, isTfaAuth: true };
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
          }).lean();

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
    session: async ({ session, trigger, token, newSession }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...token,
          ...newSession
        },
      };
    },
    jwt: async ({ token, user, trigger }) => {
      // console.log("JWT Callback", { token, user });
      if (trigger === "update") {
        try {
          const user = await aminUserModel.findById(token._id);
          token = { ...token, ...user };
        } catch (error) {
        }
      }
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          ...u,
          id: u._id
        };
      }
      return token;
    },
  }
};