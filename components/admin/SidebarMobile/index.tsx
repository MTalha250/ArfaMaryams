import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";

const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger className="absolute left-8 top-28 md:hidden">
        <IoMenu className="text-3xl" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[240px] bg-primary text-white p-10 shadow-lg border-r-8 border-secondary"
      >
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <ul className="mt-6 text-lg space-y-4">
          <li className="flex items-center space-x-3 border-b border-white py-2">
            <MdDashboard />{" "}
            <Link href="/admin">
              <SheetClose>Dashboard</SheetClose>
            </Link>
          </li>
          <li className="flex items-center space-x-3 border-b border-white py-2">
            <FaUser />{" "}
            <Link href="/admin/users">
              <SheetClose>Users</SheetClose>
            </Link>
          </li>
          <li className="flex items-center space-x-3 border-b border-white py-2">
            <IoGridSharp />{" "}
            <Link href="/admin/products">
              <SheetClose>Products</SheetClose>
            </Link>
          </li>
          <li className="flex items-center space-x-3 border-b border-white py-2">
            <MdAddBox />{" "}
            <Link href="/admin/add-product">
              <SheetClose>Add Product</SheetClose>
            </Link>
          </li>
          <li className="flex items-center space-x-3 border-b border-white py-2">
            <BsFillCartCheckFill />{" "}
            <Link href="/admin/orders">
              <SheetClose>Orders</SheetClose>
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
