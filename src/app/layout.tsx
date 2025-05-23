import type { Metadata } from "next";

import { DM_Sans } from "next/font/google";

import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AG Gallery",
  description: "Agajanian Gallery (AG Gallery)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <div className="mx-auto size-full md:max-w-full lg:max-w-6xl 2xl:max-w-7xl">
          <div className="bg-foreground/[0.05] lg:bg-foreground/[0.01] fixed top-0 right-0 left-0 -z-50 mx-auto size-full shadow-sm md:max-w-full lg:max-w-[calc(72rem-30px)] 2xl:max-w-[calc(80rem-40px)]" />
          <Header />
          <div className="mt-24 px-4 md:mt-28 md:px-10">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
