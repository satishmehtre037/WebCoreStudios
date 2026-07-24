import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { constructMetadata } from "@/lib/seo";
import { GlobalProviders } from "@/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <GlobalProviders>
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
