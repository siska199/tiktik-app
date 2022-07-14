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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await fetch("http://localhost:3000/api/signIn", {
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
      return true;
    },
  },
});
