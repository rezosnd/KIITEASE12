import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { connectToDatabase } from "@/lib/db"
import { generateReferralCode } from "@/lib/auth"

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter({
    db: (async () => {
      const { db } = await connectToDatabase()
      return db
    })(),
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "free",
          referralCode: generateReferralCode(profile.name),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role || "free"
        session.user.referralCode = user.referralCode
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role || "free"
        token.referralCode = user.referralCode
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}
