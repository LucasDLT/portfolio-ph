import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Shadows_Into_Light } from "next/font/google";
import { Poiret_One } from "next/font/google";
import { ContextProvider } from "@/context/context";
import { Toaster } from "sonner";
import "./globals.css";

const shadows = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-shadows",
});

const bellota = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bellota",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  className={`sm:scroll-smooth ${geistSans.variable} ${geistMono.variable} ${shadows.variable} ${bellota.variable}`}
>
<ContextProvider>
  <body className="antialiased">
    {children}
  </body>
  <Toaster />
  </ContextProvider>

</html>
  );
}
