"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/admin/card";
import axios from "axios";
const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState([]);

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  const fetchTotalUsers = async () => {
    const response = await axios.get("/api/register");
    setTotalUsers(response.data.result);
  };
  return (
    <div>
      <h1 className="mb-5 font-bold text-4xl text-primary text-clip leading-tight border-b-4 border-primary pb-2">
        Dashboard
      </h1>
      <div className="flex my-3 flex-wrap">
        <Card name="Total Users" value={totalUsers.length} />
      </div>
    </div>
  );
};

export default Dashboard;
