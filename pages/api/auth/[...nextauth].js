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
      await fetch(`${process.env.BASE_URL}/api/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return true;
    },
    // async session({ session, user, token }) {
    //   console.log("user info in session cb: ", user);
    //   console.log("session: ", session);
    //   session.user.id = user.id;
    //   return session;
    // },
    async jwt({ token, user, account, profile, isNewUser }) {
      token.id = token.sub;
      delete token.sub;
      return token;
    },
  },
});
