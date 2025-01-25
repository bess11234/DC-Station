import type { Metadata } from "next";

import { Noto_Sans_Thai } from "next/font/google";

import "./globals.css";

const font = Noto_Sans_Thai({weight: "variable"});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
