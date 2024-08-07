import React, { useEffect, useState } from "react";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { signOut, useSession } from "next-auth/react";
import logo from "@/assets/logo.webp";
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
import { BiSolidChevronDown } from "react-icons/bi";
import { motion } from "framer-motion";

const Navbar = () => {
  const { items, initCart } = useCartStore();
  const [activeDropdown, setActiveDropdown] = useState(-1);
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
          : "z-50 fixed bg-transparent text-[#FDF8ED] px-8 py-5 w-full flex items-center justify-between"
      }
    >
      <Link
        href="/"
        className="flex items-center justify-center  d transition-colors duration-300"
      >
        <img src={logo.src} alt="logo" className="w-10" />
        <h1 className="ml-1 sm:ml-2 font-bold text-lg sm:text-xl">
          Arfa
          <span className="text-[#B5C1C7] font-bask italic font-bold">&</span>
          Maryam's
        </h1>
      </Link>
      <div className="font-bold items-center justify-center space-x-5 lg:space-x-10 md:flex hidden">
        {navLinks.map((link, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveDropdown(index)}
            onMouseLeave={() => setActiveDropdown(-1)}
            className="relative"
          >
            <Link
              href={link.href}
              className={
                scroll || pathname !== "/"
                  ? "flex items-center border-b-2 border-transparent pb-1 hover:border-primary transition duration-300"
                  : "flex items-center border-b-2 border-transparent pb-1 hover:border-white transition duration-300"
              }
            >
              {link.label}
              {link.children && (
                <BiSolidChevronDown className="inline-block ml-1" />
              )}
            </Link>
            {link.children && activeDropdown === index && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { duration: 0.3, type: "spring" },
                }}
                className="absolute top-full left-0 z-10"
              >
                <div className="bg-white p-5 rounded-lg w-64 shadow-lg mt-2">
                  {link.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      href={child.href}
                      className="block p-2 text-base text-black hover:bg-neutral-300 rounded transition-colors duration-200 border-b border-neutral-200 last:border-0"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="font-semibold text-sm items-center space-x-2 md:space-x-5">
        <Wishlist />
        <Cart />
        {user?.name ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0 hidden md:inline">
              <div
                className={
                  scroll || pathname !== "/"
                    ? "p-3 border border-black bg-transparent  dark:border-white relative group transition duration-200"
                    : "p-3 border border-white bg-transparent   dark:border-white relative group transition duration-200"
                }
              >
                <div className="absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <span className="relative text-white">Hi, {user?.name}</span>
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
                  className="flex justify-center border py-1 border-black bg-transparent  dark:border-white relative group transition duration-200"
                >
                  <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                  <span className="relative text-sm font-semibold text-white">
                    Admin
                  </span>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className={
              scroll || pathname !== "/"
                ? "mt-10 p-3 border border-black bg-transparent dark:border-white relative group transition duration-200 hidden md:inline"
                : "mt-10 p-3 border border-white bg-transparent  dark:border-white relative group transition duration-200 hidden md:inline"
            }
          >
            <div className="absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
            <span className="relative text-white">Login/Signup</span>
          </Link>
        )}
        <div className="w-24" />
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;
