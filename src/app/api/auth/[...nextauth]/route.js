
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: "868p6gg1ry4r1p",
      clientSecret: "WPL_AP1.JYXSKW9h1Mkaw8Rd.LdbFaQ==",
    }),
    FacebookProvider({
      clientId: "868p6gg1ry4r1p",
      clientSecret: "WPL_AP1.JYXSKW9h1Mkaw8Rd.LdbFaQ==",
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  secret: "uz8OEOLlN5TR9ClU1Gyz2DIZz1fjFxB3iNweTAJJy/g=",
  callbacks: {
    async signIn(user, account, profile) {
      console.log("LinkedIn sign-in successful");
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
