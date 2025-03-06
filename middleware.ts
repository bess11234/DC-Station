import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // FIXED Optimised Image // Unable to display images needs to add folders in /public
  matcher: [
    "/((?!api|_next/static|_next/image||animals|bank|bg|gallery|github|images|knowledges|uploads|favicon.ico).*)",
    "/",
    "/find-house/:path*",
    "/found-house/:path*",
    "/concat/:path*",
    "/dashboard/:path*",
  ],
};
