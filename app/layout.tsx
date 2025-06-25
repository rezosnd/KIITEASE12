import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import CustomCursor from "@/components/custom-cursor";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/auth-provider"; // Client component wrapper
import { authOptions } from "@/lib/auth"; // Your auth config

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KIITease - KIIT University Student Platform",
  description:
    "Section swapping, teacher reviews, notes sharing, and more for KIIT University students",
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CookieConsent />
            <CustomCursor />
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}


