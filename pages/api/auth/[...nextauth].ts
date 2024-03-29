import NextAuth from "next-auth";
import GooglrProvider from "next-auth/providers/google";


export default NextAuth({
  providers: [
    GooglrProvider({
      clientId : process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      
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
    async jwt({ token, user, account, profile, isNewUser }) {
      token.id = token.sub;
      return token;
    },
    async session({session, user,token}){
      return {...session, user : {...session.user, id : token.id}}
    },
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
  },
  debug: false,
});
