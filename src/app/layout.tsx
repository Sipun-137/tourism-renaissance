import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Torism Resinanace",
  description: "the evolution of the tourism sector",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Ruslan+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className=" flex flex-col ">{children}</main>
        </GlobalState>
        <Footer/>
      </body>
    </html>
  );
}
