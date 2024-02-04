import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "./db/prisma";
import {
  type DefaultSession,
  type NextAuthOptions,
  getServerSession,
} from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      role: "user" | "admin";
    } & DefaultSession["user"];
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      profile(profile) {
        return {
          role: profile.role ?? "user",
          id: profile.id,
          username: profile.login,
          ...profile,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: session.user.role,
        username: session.user.username,
      },
    }),
    async signIn({ user }) {
      try {
        // await prisma.developer.upsert({
        //   where: {
        //     userId: user.id,
        //   },
        //   update: {},
        //   create: {
        //     userId: user.id,
        //   },
        // });
      } catch (error) {
        throw new Error("Error on sign in. Please try again.");
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = () => getServerSession(authOptions);

export default authOptions;
