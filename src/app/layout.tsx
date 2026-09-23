import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dayrent Tjiang | Full Stack Developer",
  description: "Personal portfolio of Dayrent Tjiang",
  icons: {
    icon: [
      { url: "/favicon.ico?v=dayrent-photo", sizes: "16x16 32x32 48x48 256x256" },
      { url: "/dayrent-icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=dayrent-photo",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    title: "Dayrent Tjiang | Full Stack Developer",
    description: "Personal portfolio of Dayrent Tjiang",
    images: [{ url: "/dayrent-icon.png", width: 512, height: 512, alt: "Dayrent Tjiang" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dayrent Tjiang | Full Stack Developer",
    description: "Personal portfolio of Dayrent Tjiang",
    images: ["/dayrent-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
