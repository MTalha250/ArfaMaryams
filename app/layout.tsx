"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Coderush</title>
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <div>{children}</div>
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
