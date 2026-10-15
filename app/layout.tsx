import type { Metadata } from "next";
import { Syne, Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://markmenezes.com"),
  title: "Mark Menezes — UX Designer by Day. Problem Solver by Choice.",
  description:
    "Product / UX designer turning real-time systems and AI into interfaces people actually understand. Currently designing autonomous delivery at Arrive AI. Open to full-time roles in the US.",
  openGraph: {
    title: "Mark Menezes — Product / UX Designer",
    description:
      "Turning real-time systems and AI into interfaces people actually understand. Currently designing autonomous delivery at Arrive AI.",
    url: "https://markmenezes.com",
    siteName: "Mark Menezes",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${instrument.variable} ${spaceMono.variable} font-sans`}
      >
        <ThemeProvider>
          <SmoothScroll>
            <Cursor />
            <div className="grain" aria-hidden="true" />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
