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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTotalOrders = async () => {
    const response = await axios.get("/api/order");
    setOrders(response.data.orders);
    console.log("Orders", response.data.orders);
  };

  const handleStatusChange = async (id: any, status: any) => {
    try {
      const response = await axios.put(`/api/orderStatus/${id}`, { status });
      toast.success(response.data.message);
      fetchTotalOrders();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handlePaymentStatusChange = async (id: any, paymentStatus: any) => {
    try {
      const response = await axios.put(`/api/orderStatus/${id}`, {
        paymentStatus,
      });
      toast.success(response.data.message);
      fetchTotalOrders();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
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
        placeholder="Search by order id, customer name, email, phone..."
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
            <TableHead className="text-center text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders
            .filter(
              (order: any) =>
                order.name.toLowerCase().includes(search.toLowerCase()) ||
                order.email.toLowerCase().includes(search.toLowerCase()) ||
                order.phone.toLowerCase().includes(search.toLowerCase()) ||
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
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger>
                      <button className=" flex justify-center border py-1 border-black bg-transparent text-white dark:border-white relative group transition duration-200">
                        <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                        <span className="relative text-sm font-semibold py-1 px-2">
                          View Details
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg scrollbar scrollbar-none overflow-scroll h-full md:max-h-[520px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold text-gray-800">
                          Order Details
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        <div className="space-y-4">
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Customer Name
                            </h1>
                            <p className="text-gray-600">{order.name}</p>
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Customer Email
                            </h1>
                            <p className="text-gray-600">{order.email}</p>
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Customer Phone
                            </h1>
                            <p className="text-gray-600">{order.phone}</p>
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Shipping Address
                            </h1>
                            <p className="text-gray-600">
                              {order.shippingAddress.address},{" "}
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.postalCode},{" "}
                              {order.shippingAddress.country}
                            </p>
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Order Items
                            </h1>
                            <ul className="list-disc list-inside text-gray-600">
                              {order.orderItems.map((item: any) => (
                                <li key={item._id} className="ml-4">
                                  {item.product.name} x {item.quantity} ({" "}
                                  {item.size.toUpperCase()} |{" "}
                                  {item.color[0].toUpperCase() +
                                    item.color.slice(1)}{" "}
                                  )
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Total Price
                            </h1>
                            <p className="text-gray-600">
                              PKR {order.totalPrice.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Payment Method
                            </h1>
                            <p className="text-gray-600">
                              {order.paymentMethod.toUpperCase()}
                            </p>
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Payment Status
                            </h1>
                            <Select
                              onValueChange={(value: any) => {
                                handlePaymentStatusChange(order._id, value);
                              }}
                            >
                              <SelectTrigger className="w-fit mt-1">
                                <SelectValue
                                  placeholder={
                                    <span>
                                      {order.paymentStatus[0].toUpperCase() +
                                        order.paymentStatus.slice(1)}{" "}
                                    </span>
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="canceled">
                                  Canceled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Order Status
                            </h1>
                            <Select
                              onValueChange={(value: any) => {
                                handleStatusChange(order._id, value);
                              }}
                            >
                              <SelectTrigger className="w-fit mt-1">
                                <SelectValue
                                  placeholder={
                                    <span>
                                      {order.status[0].toUpperCase() +
                                        order.status.slice(1)}{" "}
                                    </span>
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="canceled">
                                  Canceled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-700">
                              Date of Order
                            </h1>
                            <p className="text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()} -{" "}
                              {new Date(order.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <br />
                          <br />
                          <br />
                        </div>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
