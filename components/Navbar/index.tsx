"use client";
import React, { useEffect, useState } from "react";
import { navLinks } from "@/constants";
import { MdOutlineShoppingBag } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import useAuthStore from "@/store/authStore";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const pathname = usePathname();
  const { user, clearUser } = useAuthStore();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  });

  return (
    <div
      className={
        scroll || pathname !== "/"
          ? "z-50 fixed bg-white text-black shadow-lg px-8 py-5 w-full flex items-center justify-between"
          : "z-50 fixed bg-transparent text-white px-8 py-5 w-full flex items-center justify-between"
      }
    >
      <Link href="/" className="flex font-bold font-bask text-3xl">
        Website <span className="text-primary">.</span>
      </Link>
      <ul className="font-bold items-center justify-center space-x-5 lg:space-x-10 md:flex hidden">
        {navLinks.map((link, index) => (
          <li key={index}>
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
        {user?.name ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0">
              <div
                className={
                  scroll || pathname !== "/"
                    ? "rounded-full p-3 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
                    : "rounded-full p-3 border border-white bg-transparent text-black  dark:border-white relative group transition duration-200"
                }
              >
                <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:-bottom-1 group-hover:-right-1 transition-all duration-200" />
                <span className="relative">Hi, {user?.name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Dialog>
                <DialogTrigger className="rounded-sm px-2 py-1.5 text-sm transition duration-200 hover:bg-neutral-100 w-full">
                  Edit Profile
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">abc</DialogContent>
              </Dialog>
              <DropdownMenuItem
                className="hover:bg-red-100 cursor-pointer text-center block"
                onClick={() => clearUser()}
              >
                Logout
              </DropdownMenuItem>
              {user?.role == "admin" && (
                <DropdownMenuSeparator className="bg-neutral-200" />
              )}
              {user?.role == "admin" && (
                <DropdownMenuItem className="mt-1 cursor-pointer text-center block bg-primary">
                  <Link href="/admin">Admin</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className={
              scroll || pathname !== "/"
                ? "rounded-full mt-10 p-3 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
                : "rounded-full mt-10 p-3 border border-white bg-transparent text-black  dark:border-white relative group transition duration-200"
            }
          >
            <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:-bottom-1 group-hover:-right-1 transition-all duration-200" />
            <span className="relative">Login/Signup</span>
          </Link>
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default Navbar;
