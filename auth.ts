import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

import z from "zod"

export async function authenticate(email: string, password: string) {
  const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKENDPORT}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
       email,
       password
    }),
  });
  if (!response.ok)
    return null
  return (await response.json()).message;
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z.object({
            email: z.string().email(),
            password: z.string().min(3),
          })
          .safeParse(credentials);

          if (parsedCredentials.success){
              const { email, password } = parsedCredentials.data

              const user = await authenticate(email, password)
              if (!user) return null
              return user
          }
            return null
  
        },
      }),
    ],
  
  });