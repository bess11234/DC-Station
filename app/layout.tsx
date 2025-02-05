import type { Metadata } from "next";

import { Noto_Sans_Thai } from "next/font/google";

import "./globals.css";

const font = Noto_Sans_Thai({ weight: "variable", fallback: ["system-ui", "arial"] });

export const metadata: Metadata = {
  title: {
    template: "%s | DC Station",
    default: "DC Station"
  },
  description: "Project for finding new house to animals likes cat, dog.",
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
