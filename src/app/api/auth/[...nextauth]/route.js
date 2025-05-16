import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUserByEmail } from "../../../lib/user";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
      
        try {
          const user = await getUserByEmail(credentials.email);
          if (!user) {
            console.log("No user found with email:", credentials.email);
            throw new Error("Invalid email or password");
          }
      
          // Check if user is verified
          if (!user.isVerified) {
            console.log("User not verified:", credentials.email);
            throw new Error("not_verified");
          }
      
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            console.log("Invalid password for user:", credentials.email);
            throw new Error("Invalid email or password");
          }
      
          console.log("User authenticated successfully:", user.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/pages/authorization/log_in",
    signOut: "/",
    error: "/pages/authorization/log_in",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };