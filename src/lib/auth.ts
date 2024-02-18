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
      // username: string;
      // role: "user" | "admin";
    } & DefaultSession["user"];
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  providers: [
    GithubProvider({
      profile(profile) {
        return {
          role: profile.role ?? "user",
          id: profile.id,
          username: profile.login ?? "",
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          // role: user.role,
        },
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = () => getServerSession(authOptions);

export default authOptions;
