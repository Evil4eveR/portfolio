/**
 * src/auth.ts
 * Auth.js v5 (next-auth@5) configuration — App Router compatible.
 *
 * Docs: https://authjs.dev/getting-started
 *
 * After upgrading from next-auth v4:
 *   1. Replace any import from "next-auth" with "next-auth" (same package, new export paths)
 *   2. Replace [...nextauth]/route.ts with the handlers exported below
 *   3. Replace useSession from "next-auth/react" — still works the same
 *   4. Replace getServerSession() with auth() from this file
 */

import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Uncomment and configure the providers you need:
    // GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach user id to the session if needed
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",   // customize your sign-in page path
  },
});
