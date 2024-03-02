"use client";
import { Hero } from "@/components/home/hero";
import Content from "@/components/home/hero/content";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import { useCartStore } from "@/store/cartStore";
const words = [
  {
    text: "Welcome",
    className: "text-white text-5xl lg:text-6xl",
  },
  {
    text: "to",
    className: "text-white text-5xl lg:text-6xl",
  },
  {
    text: "Coderush",
    className: "text-primary text-5xl lg:text-6xl",
  },
  {
    text: "Website",
    className: "text-white text-5xl lg:text-6xl",
  },
];

const page = () => {
  return (
    <div className="min-h-[200vh]">
      <div className="h-screen relative">
        <Hero
          images={[
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://img.freepik.com/free-photo/clothing-store-seen-from-front_32991-2568.jpg?t=st=1708985562~exp=1708989162~hmac=9e612c743f688e535e50e0958b7d7ed52a100c97a107af79483ae281948155c5&w=1800",
            "https://img.freepik.com/free-photo/printing-press-machine-mass-production-action_91128-4369.jpg?t=st=1708985595~exp=1708989195~hmac=36a02d010abc28909127128c369c1f4d20c82eba8f7cb64267b3eb21817ae150&w=1800",
          ]}
          children={
            <div className="text-white z-20 flex flex-col items-center px-8">
              <h1 className="font-bold text-4xl sm:text-5xl text-center md:hidden">
                Welcome to <span className="text-primary">CodeRush</span>{" "}
                Website
              </h1>
              <Content
                words={words}
                cursorClassName="bg-yellow-500 hidden md:block"
              />
              <p className="text-center font-semibold sm:text-lg md:text-2xl xl:w-2/3">
                Empowering Your Shopping Experience: Where Convenience Meets
                Quality. Explore Limitless Possibilities at [Ecommerce Store
                Name] - Your Gateway to Seamless Shopping Satisfaction.
              </p>
              <Link
                href="/products"
                className="rounded-full mt-10 font-bold sm:text-lg md:text-xl px-8 py-3 border border-white bg-transparent text-black  dark:border-white relative group transition duration-200"
              >
                <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:-bottom-2 group-hover:-right-2 transition-all duration-200" />
                <span className="relative">Explore Our Products</span>
              </Link>
            </div>
          }
          className="h-screen w-full"
        />
        <div className="w-full z-20 absolute bottom-0 bg-black border-y-2 border-primary h-14 flex items-center text-white">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            className="w-full"
          >
            <p className=" tracking-wider">
              <span className="text-primary">Free Shipping</span> on Orders Over
              $100. Price Match Guarantee. Safe & Secure Shopping. 100% Safe
              Payment.
              <span className="text-primary"> Free Returns</span>.
            </p>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default page;
