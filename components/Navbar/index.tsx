"use client";
import React, { use, useEffect, useState } from "react";
import { navLinks } from "@/constants";
import { MdOutlineShoppingBag } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const pathname = usePathname();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100 || pathname !== "/") {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  });

  return (
    <div
      className={
        scroll
          ? "z-50 fixed bg-white text-black shadow-lg px-8 py-5 w-full flex items-center justify-between"
          : "z-50 fixed bg-transparent text-white px-8 py-5 w-full flex items-center justify-between"
      }
    >
      <Link href="/" className="flex font-bold font-bask text-3xl">
        Website <span className="text-primary">.</span>
      </Link>
      <ul className="font-bold items-center justify-center space-x-5 lg:space-x-10 md:flex hidden">
        {navLinks.map((link, index) => (
          <li>
            <Link
              href={link.href}
              className="flex items-center hover:text-primary transition duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:block font-semibold text-sm space-x-5">
        <Link href="/cart">
          <MdOutlineShoppingBag className="inline-block text-2xl" />
        </Link>
        <Link
          href="/login"
          className={
            scroll
              ? "rounded-full mt-10 p-3 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
              : "rounded-full mt-10 p-3 border border-white bg-transparent text-black  dark:border-white relative group transition duration-200"
          }
        >
          <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:-bottom-1 group-hover:-right-1 transition-all duration-200" />
          <span className="relative">Login/Signup</span>
        </Link>
      </div>
      <Sidebar />
    </div>
  );
};

export default Navbar;
