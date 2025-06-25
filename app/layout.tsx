import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { CustomCursor } from "@/components/custom-cursor";

// Google font setup
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KIITease - KIIT University Student Platform",
  description:
    "Section swapping, teacher reviews, notes sharing, and more for KIIT University students",
  generator: "v0.dev",
} satisfies import("next").Metadata;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieConsent />
          <CustomCursor />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

