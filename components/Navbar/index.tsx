import React, { use, useEffect, useState } from "react";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { signOut, useSession } from "next-auth/react";
import logo from "@/assets/logo.png";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profile from "../profile";
import toast from "react-hot-toast";
import Cart from "../cart";
import Wishlist from "../wishlist";

const Navbar = () => {
  const { items, initCart } = useCartStore();
  const { initWishlist } = useWishlistStore();
  const { data, update } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    if (user) {
      initCart(user.cart);
      initWishlist(user.wishlist);
    }
  }, [user]);

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
      <Link
        href="/"
        className="flex items-center justify-center  d transition-colors duration-300"
      >
        <img src={logo.src} alt="logo" className="w-10" />
        <span className="ml-2 font-semibold text-xl">
          Style
          <span className="text-2xl text-primary font-bask italic font-bold">
            Sync
          </span>
        </span>
      </Link>
      <ul className="font-bold items-center justify-center space-x-5 lg:space-x-10 md:flex hidden">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="flex items-center hover:text-primary border-b-2 border-transparent pb-1 hover:border-primary transition duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="font-semibold text-sm items-center space-x-2 md:space-x-5">
        <Wishlist />
        <Cart />
        {user?.name ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0 hidden md:inline">
              <div
                className={
                  scroll || pathname !== "/"
                    ? "rounded-full p-3 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
                    : "rounded-full p-3 border border-white bg-transparent text-black  dark:border-white relative group transition duration-200"
                }
              >
                <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <span className="relative">Hi, {user?.name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Profile />
              <DropdownMenuItem
                className="cursor-pointer text-center block"
                onClick={() => {
                  signOut({
                    redirect: false,
                  });
                  toast.success("Logged out successfully");
                }}
              >
                Logout
              </DropdownMenuItem>
              {user?.role == "admin" && (
                <DropdownMenuSeparator className="bg-neutral-200" />
              )}
              {user?.role == "admin" && (
                <Link
                  href="/admin"
                  className="flex justify-center rounded-lg border py-1 border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
                >
                  <div className="rounded-lg absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                  <span className="relative text-sm font-semibold">Admin</span>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className={
              scroll || pathname !== "/"
                ? "rounded-full mt-10 p-3 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200 hidden md:inline"
                : "rounded-full mt-10 p-3 border border-white bg-transparent text-black  dark:border-white relative group transition duration-200 hidden md:inline"
            }
          >
            <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
            <span className="relative">Login/Signup</span>
          </Link>
        )}
        <div className="w-24" />
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;
