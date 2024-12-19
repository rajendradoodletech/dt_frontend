"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { SiteHeader } from "@/components/ui/site-header";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
  session, // Pass session here
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex-col items-center justify-between`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            {/* Header */}
            <SiteHeader />

            {/* Main Content */}
            <div className="w-full mx-auto flex p-0">{children}</div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
