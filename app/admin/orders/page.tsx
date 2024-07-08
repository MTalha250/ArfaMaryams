"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

const page = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTotalOrders = async () => {
    const response = await axios.get("/api/order");
    setOrders(response.data.orders);
  };
  useEffect(() => {
    fetchTotalOrders();
  }, []);
  return (
    <div className="py-10 px-4 md:px-8 bg-gray-50 h-[80vh] overflow-scroll">
      <h1 className="text-4xl font-extrabold text-gray-700 tracking-wider mb-10 text-center">
        All Orders
      </h1>
      <input
        type="text"
        className="w-full border-b bg-transparent focus:outline-none"
        placeholder="Search by name, email, phone, address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table className="mt-5 text-[15px] whitespace-nowrap">
        <TableCaption>A list of all orders placed by orders</TableCaption>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary text-white">
            <TableHead className="text-center text-white">Name</TableHead>
            <TableHead className="text-center text-white">Email</TableHead>
            <TableHead className="text-center text-white">Phone</TableHead>
            <TableHead className="text-center text-white">Address</TableHead>
            <TableHead className="text-center text-white">
              Order Items
            </TableHead>
            <TableHead className="text-center text-white">
              Total Price (PKR)
            </TableHead>
            <TableHead className="text-center text-white">
              Payment Method
            </TableHead>
            <TableHead className="text-center text-white">
              Payment Status
            </TableHead>
            <TableHead className="text-center text-white">
              Order Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders
            .filter(
              (order: any) =>
                order.name.toLowerCase().includes(search.toLowerCase()) ||
                order.email.toLowerCase().includes(search.toLowerCase()) ||
                order._id.toLowerCase().includes(search.toLowerCase())
            )
            .map((order: any) => (
              <TableRow key={order._id}>
                <TableCell className="text-center">{order.name}</TableCell>
                <TableCell className="text-center">{order.email}</TableCell>
                <TableCell className="text-center">{order.phone}</TableCell>
                <TableCell className="text-center">
                  {order.shippingAddress.address}
                </TableCell>
                <TableCell className="text-center">
                  {order.orderItems.map((item: any) => (
                    <div key={item._id}>
                      {item.product.name} - {item.quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell className="text-center">
                  {order.totalPrice.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  {order.paymentMethod.toUpperCase()}
                </TableCell>
                <TableCell className="text-center">
                  {order.paymentStatus[0].toUpperCase() +
                    order.paymentStatus.slice(1)}
                </TableCell>
                <TableCell className="text-center">
                  {order.status[0].toUpperCase() + order.status.slice(1)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
