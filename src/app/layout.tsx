import type { Metadata } from "next";

import { DM_Sans } from "next/font/google";

import "./globals.css";

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
    <html lang="en" className="size-full">
      <body className={`${dmSans.variable} size-full font-sans antialiased`}>
        <div className="mx-auto size-full max-w-md md:max-w-2xl lg:max-w-6xl xl:max-w-7xl">
          <Header />
          <div className="mt-24">{children}</div>
        </div>
      </body>
    </html>
  );
}
