import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RFIDpro - Advanced RFID Solutions for Indian Schools",
  description: "Professional RFID Attendance & GSM Tracking Systems for school buses and educational institutions. Product ID: RF5228Q. Price: ₹11,999. Contact: 9361992255",
  keywords: "RFID, attendance system, school bus tracking, GSM module, student attendance, India, Chennai",
  openGraph: {
    title: "RFIDpro - RFID Attendance Systems for Schools",
    description: "Professional RFID Attendance & GSM Tracking Systems designed for school buses and Indian educational institutions. ₹11,999",
    url: "https://rfidpro.in",
    siteName: "RFIDpro",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "RFIDpro Logo"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "RFIDpro - RFID Solutions for Schools",
    description: "Professional RFID Attendance & GSM Tracking Systems for Indian schools. ₹11,999",
    images: ["/logo.png"]
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
