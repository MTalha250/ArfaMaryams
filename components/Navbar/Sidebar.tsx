import { useState } from "react";
import { motion } from "framer-motion";
import { navLinks } from "@/constants";
import Link from "next/link";

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
        <Link href="/login" className="fixed bottom-5 right-5 z-50">
          Login
        </Link>
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
