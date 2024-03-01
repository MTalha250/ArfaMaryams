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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
const page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  const fetchTotalUsers = async () => {
    const response = await axios.get("/api/register");
    setUsers(response.data.result);
  };

  const handleRoleChange = async (id: any, role: any) => {
    try {
      const response = await axios.put(`/api/update/${id}`, { role });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="mb-5 font-bold text-4xl text-primary text-clip leading-tight border-b-4 border-primary pb-2">
        All Users
      </h1>
      <Table className="mt-5 text-[15px]">
        <TableCaption>
          A list of all users registered on the platform
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary text-white">
            <TableHead className="text-center text-white">Name</TableHead>
            <TableHead className="text-center text-white">Email</TableHead>
            <TableHead className="text-center text-white">Phone</TableHead>
            <TableHead className="text-center text-white">Address</TableHead>
            <TableHead className="text-center text-white">Role</TableHead>
            <TableHead className="text-center text-white">Verified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell className="text-center">{user.name}</TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="text-center">{user.phone}</TableCell>
              <TableCell className="text-center">{user.address}</TableCell>
              <TableCell className="text-center">
                <Select
                  onValueChange={(value: any) => {
                    handleRoleChange(user._id, value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={user.role} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-center flex justify-center">
                {user.isVerified ? (
                  <IoCheckmarkDoneCircle className="text-3xl text-green-600" />
                ) : (
                  <IoMdCloseCircle className="text-3xl text-red-600" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
