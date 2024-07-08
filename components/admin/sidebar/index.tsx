import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoGridSharp } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
const Sidebar = () => {
  return (
    <div className="hidden md:block w-1/4 bg-primary text-white p-10 shadow-lg border-r-8 border-secondary">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <ul className="mt-6 text-lg space-y-4">
        <li className="flex items-center space-x-3 border-b border-white py-2">
          <MdDashboard /> <Link href="/admin">Dashboard</Link>
        </li>
        <li className="flex items-center space-x-3 border-b border-white py-2">
          <FaUser /> <Link href="/admin/users">Users</Link>
        </li>
        <li className="flex items-center space-x-3 border-b border-white py-2">
          <IoGridSharp /> <Link href="/admin/products">Products</Link>
        </li>
        <li className="flex items-center space-x-3 border-b border-white py-2">
          <MdAddBox /> <Link href="/admin/add-product">Add Product</Link>
        </li>
        <li className="flex items-center space-x-3 border-b border-white py-2">
          <BsFillCartCheckFill /> <Link href="/admin/orders">Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
