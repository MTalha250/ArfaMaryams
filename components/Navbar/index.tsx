import React, { use, useEffect, useState } from "react";
import { navLinks } from "@/constants";
import { MdOutlineShoppingBag } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { signOut, useSession } from "next-auth/react";
import { MdFavoriteBorder } from "react-icons/md";
import logo from "@/assets/logo.png";
import { useCartStore } from "@/store/cartStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profile from "../profile";
import toast from "react-hot-toast";

const Navbar = () => {
  const { items, initCart } = useCartStore();
  const { data } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    if (user) {
      initCart(user.cart);
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
              className="flex items-center hover:text-primary transition duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:block font-semibold text-sm items-center space-x-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <MdFavoriteBorder className="inline-block text-2xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user ? (
              <div>Wishlist</div>
            ) : (
              <div className="w-72 h-[50vh] flex items-center justify-center text-lg lg:text-xl font-semibold rounded-lg shadow-lg">
                Login to view wishlist
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="relative outline-none">
            <MdOutlineShoppingBag className="inline-block text-2xl" />
            {user && (
              <span className="text-black -top-2 -right-1 h-4 w-4 absolute bg-primary rounded-full p-0.5 text-[10px] flex justify-center items-center">
                {items.length}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user ? (
              <div>Cart</div>
            ) : (
              <div className="w-72 h-[50vh] flex items-center justify-center text-lg lg:text-xl font-semibold rounded-lg shadow-lg">
                Login to view cart
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
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
                  className="py-1 text-center block bg-primary"
                >
                  Admin
                </Link>
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
