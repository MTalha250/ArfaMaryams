import { useState } from "react";
import { motion } from "framer-motion";
import { navLinks } from "@/constants";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import Profile from "../profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const variants = {
  initial: {
    scaleX: 0,
  },
  open: {
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  closed: {
    scaleX: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, clearUser } = useAuthStore();

  return (
    <motion.div className="md:hidden" animate={open ? "open" : "closed"}>
      <motion.div
        className="text-2xl font-bold z-50 fixed top-0 flex items-center p-10 right-0 bottom-0 bg-white w-[300px] text-secondary origin-right h-screen"
        variants={variants}
      >
        <ul className="space-y-5">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link onClick={() => setOpen(false)} href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {user?.name ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0 fixed bottom-5 right-5 pb-2 px-5">
              <div className="rounded-full pb-2 px-5 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200">
                <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:-bottom-1 group-hover:-right-1 transition-all duration-200" />
                <span className="relative text-sm">Hi, {user?.name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div onClick={() => setOpen(false)}>
                <Profile />
              </div>
              <DropdownMenuItem
                className="cursor-pointer text-center block"
                onClick={() => {
                  clearUser();
                  setOpen(false);
                }}
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
          <div
            className="fixed bottom-5 right-5"
            onClick={() => setOpen(false)}
          >
            <Link
              href="/login"
              className="rounded-full pb-2 px-5 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
            >
              <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:-bottom-1 group-hover:-right-1 transition-all duration-200" />
              <span className="relative text-sm">Login/Signup</span>
            </Link>
          </div>
        )}
      </motion.div>
      <button
        className="fixed z-50 top-7 right-10"
        onClick={() => setOpen((prev: any) => !prev)}
      >
        <svg width="25" height="25" viewBox="0 0 23 23">
          <motion.path
            strokeWidth="3"
            stroke="#F5AE3A"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <motion.path
            strokeWidth="3"
            stroke="#F5AE3A"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
          />
          <motion.path
            strokeWidth="3"
            stroke="#F5AE3A"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default Sidebar;
