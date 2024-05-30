"use client";
import { Hero } from "@/components/home/hero";
import Content from "@/components/home/hero/content";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import img1 from "@/assets/home1.jpeg";
import img2 from "@/assets/home2.jpeg";
import img3 from "@/assets/home3.jpeg";
const words = [
  { text: "Sync", className: "text-white text-5xl" },
  { text: "Your", className: "text-white text-5xl" },
  { text: "Fashion,", className: "text-primary text-5xl" },
  { text: "Define", className: "text-white text-5xl" },
  { text: "Your", className: "text-white text-5xl" },
  { text: "Style.", className: "text-primary text-5xl" },
];

const page = () => {
  return (
    <div className="min-h-[200vh]">
      <div className="h-screen relative">
        <Hero
          images={[img1.src, img2.src, img3.src]}
          children={
            <div className="text-white z-20 flex flex-col md:items-center px-8">
              <h1 className="mb-5 font-bold text-4xl sm:text-5xl md:text-center md:hidden">
                Sync Your
                <span className="text-primary"> Fashion,</span>, Define Your
                <span className="text-primary">Style.</span>
              </h1>
              <Content
                words={words}
                className="hidden md:flex"
                cursorClassName="bg-primary hidden md:block"
              />
              <p className="md:text-center font-semibold sm:text-lg md:text-2xl xl:w-2/3">
                Explore carefully curated collections and receive personalized
                recommendations, effortlessly crafting your unique style. Dive
                into the latest trends, synchronize your preferences, and
                express your individuality with StyleSync.
              </p>
              <Link
                href="/products"
                className="rounded-full mt-10 font-bold sm:text-lg md:text-xl px-8 py-3 border border-white bg-transparent text-black  dark:border-white relative group transition duration-200"
              >
                <div className="flex rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <button className="relative w-full">
                  Explore Our Products
                </button>
              </Link>
            </div>
          }
          className="h-screen w-full"
        />
        <div className="w-full z-20 absolute bottom-0 bg-secondary border-y-2 border-primary h-14 flex items-center text-white">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            className="w-full"
          >
            <p className="tracking-wider text-sm sm:text-base">
              <span className="text-primary">Free Shipping</span> on Orders Over{" "}
              <span className="text-primary">PKR 5000.00</span>. Price Match
              Guarantee. Safe & Secure Shopping. 100% Safe Payment.
              <span className="text-primary"> Free Returns</span>.
            </p>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default page;
