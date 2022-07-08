import NextAuth from "next-auth";
import GooglrProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GooglrProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {},
});


