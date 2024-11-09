import { ThemeProvider } from "@/components/ui/theme-provider"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { fontSans } from "@/lib/fonts";
import "./globals.css";
import { SiteHeader } from "@/components/ui/site-header";




export const metadata: Metadata = {
  title: "DesertForest Alpha",
  description: "A system to ease sale from scratch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'${inter.className} flex-col items-center justify-between'}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            

           <div className=" w-full  mx-auto flex p-0 ">
            {children}</div>
            
        </ThemeProvider>
      </body>
     
    </html>
  );
}

