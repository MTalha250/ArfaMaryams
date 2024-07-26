"use client";
import { Hero } from "@/components/home/hero";
import Content from "@/components/home/hero/content";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import img1 from "@/assets/home1.webp";
import img2 from "@/assets/home2.webp";
import img3 from "@/assets/home3.webp";
const words = [
  { text: "Where", className: "text-white text-4xl xl:text-5xl" },
  { text: "Purchasing", className: "text-white text-4xl xl:text-5xl" },
  { text: "Meets,", className: "text-white text-4xl xl:text-5xl" },
  { text: "Happiness", className: "text-white text-4xl xl:text-5xl" },
  { text: "&", className: "text-white text-4xl xl:text-5xl" },
  { text: "Satisfaction", className: "text-white text-4xl xl:text-5xl" },
];

const page = () => {
  return (
    <div className="min-h-[200vh]">
      <div className="h-dvh relative">
        <Hero
          images={[img1.src, img2.src, img3.src]}
          children={
            <div className="text-white z-20 flex flex-col md:items-center px-8">
              <h1 className="mb-5 font-bold text-4xl sm:text-5xl md:text-center md:hidden">
                Where Purchasing Meets Happiness & Satisfaction
              </h1>
              <Content
                words={words}
                className="hidden md:flex"
                cursorClassName="bg-white hidden md:block"
              />
              <p className="md:text-center font-semibold sm:text-lg md:text-2xl xl:w-2/3">
                Explore carefully curated collections and receive personalized
                recommendations, effortlessly crafting your unique style. Dive
                into the latest trends, synchronize your preferences, and
                express your individuality with Arfa & Maryam's.
              </p>
              <Link
                href="/products"
                className="mt-10 sm:text-lg md:text-xl px-8 py-3 border border-white bg-transparent text-black  dark:border-white relative group transition duration-200"
              >
                <div className="flex absolute bottom-0 right-0 bg-primary  h-full w-full -z-10 group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <button className="relative w-full text-white">
                  Explore Our Products
                </button>
              </Link>
            </div>
          }
          className="h-screen w-full"
        />
        <div className="w-full z-20 absolute bottom-0 bg-primary border-y-2 border-white h-14 flex items-center text-white">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            className="w-full"
          >
            <p className="tracking-wider text-sm sm:text-base">
              <span className="font-bold">Free Shipping</span> on all orders
              over PKR 10,000. Price Match Guarantee. Safe & Secure Shopping.
              100% Safe Payment.
              <span className="font-bold"> Free Returns</span>.
            </p>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default page;
