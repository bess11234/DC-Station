import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // First is converted to boolean that indirect NOT operation
      // Second is converted to boolean that indirect NOT operation
      // This mean that 'auth.user is `truthy`'
      const isOnDashBoard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashBoard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
