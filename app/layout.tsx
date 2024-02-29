"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { storeInitializer } from "@/lib/actions/storeInitializer";
import useAuthStore from "@/store/authStore";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, setStatus } = useAuthStore();
  useEffect(() => {
    storeInitializer();
    if (user) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Coderush</title>
      </head>
      <body className={inter.className}>
        <Navbar />
        <div>{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
