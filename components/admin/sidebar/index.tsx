import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoGridSharp } from "react-icons/io5";
const Sidebar = () => {
  return (
    <div className="w-1/5 bg-secondary text-white p-10 shadow-lg border-r-8 border-primary">
      <ul className="text-lg space-y-4">
        <li className="flex items-center space-x-3 border-b border-primary py-2">
          <MdDashboard className="text-primary" />{" "}
          <Link
            href="/admin"
            className="hover:text-primary transition duration-300 ease-in-out"
          >
            Dashboard
          </Link>
        </li>
        <li className="flex items-center space-x-3 border-b border-primary py-2">
          <FaUser className="text-primary" />{" "}
          <Link
            href="/admin/users"
            className="hover:text-primary transition duration-300 ease-in-out"
          >
            Users
          </Link>
        </li>
        <li className="flex items-center space-x-3 border-b border-primary py-2">
          <IoGridSharp className="text-primary" />{" "}
          <Link
            href="/admin/products"
            className="hover:text-primary transition duration-300 ease-in-out"
          >
            Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
