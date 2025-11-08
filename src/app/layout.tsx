import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProviderWrapper } from "@/components/providers/session-provider";
import { FaviconLoader } from "@/components/FaviconLoader";
import { JoinMovementForm } from "@/components/JoinMovementForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transporters for Tinubu 2027 - Campaign for Good Governance",
  description: "Transporters for Tinubu 2027 - A strategic initiative to mobilize Nigeria's transportation sector for continued good governance and development.",
  keywords: ["Transporters for Tinubu 2027", "Nigeria", "Transportation", "Good Governance", "Campaign", "2027 Elections"],
  authors: [{ name: "Transporters for Tinubu 2027" }],
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    ],
  },
  openGraph: {
    title: "Transporters for Tinubu 2027",
    description: "A strategic initiative to mobilize Nigeria's transportation sector for continued good governance",
    url: "/",
    siteName: "Transporters for Tinubu 2027",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transporters for Tinubu 2027",
    description: "A strategic initiative to mobilize Nigeria's transportation sector for continued good governance",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <FaviconLoader />
        <SessionProviderWrapper>
          {children}
          <JoinMovementForm />
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
