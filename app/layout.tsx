"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { Welcome } from "@/components/welcome";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [seconds, setSeconds] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds((prevSeconds) => prevSeconds - 1);
  //   }, 1000);

  //   if (seconds === 0) {
  //     clearInterval(interval);
  //   }

  //   return () => clearInterval(interval);
  // }, [seconds]);

  return (
    <html lang="en" className="scrollbar scrollbar-none sm:scrollbar-thin">
      <head>
        <title>StyleSync</title>
        <link rel="icon" href="/logo.png" />
      </head>

      <body className={inter.className}>
        {seconds > 0 ? (
          <Welcome seconds={seconds} />
        ) : (
          <SessionProvider>
            <Navbar />
            <div>{children}</div>
            <Footer />
            <Toaster
              toastOptions={{
                style: {
                  bottom: "1rem",
                  right: "1rem",
                },
              }}
            />
          </SessionProvider>
        )}
      </body>
    </html>
  );
}
