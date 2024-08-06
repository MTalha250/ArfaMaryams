"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import WhatsApp from "@/components/WhatsApp";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar scrollbar-none sm:scrollbar-thin">
      <head>
        <title>Arfa & Maryam's</title>
        <link rel="icon" href="/logo.webp" />
        <Script>
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1183582436018103');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1183582436018103&ev=PageView&noscript=1"
          />
        </noscript>
      </head>

      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <div>{children}</div>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: "#212F38",
                color: "#FDF8EC",
              },
            }}
          />
          <WhatsApp />
        </SessionProvider>
      </body>
    </html>
  );
}
