"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import axios from "axios";
const page = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-32 px-8 md:px-16">
      <h1 className="font-bold text-3xl">Products</h1>
      <div className="grid grid-cols-4 gap-10 my-10">
        <Card
          id="1"
          img="https://via.placeholder.com/150"
          img2="https://via.placeholder.com/150"
          img3="https://via.placeholder.com/150"
          img4="https://via.placeholder.com/150"
          name="Product 1"
          price={100}
        />
        <Card
          id="1"
          img="https://via.placeholder.com/150"
          img2="https://via.placeholder.com/150"
          img3="https://via.placeholder.com/150"
          img4="https://via.placeholder.com/150"
          name="Product 1"
          price={100}
        />
        <Card
          id="1"
          img="https://via.placeholder.com/150"
          img2="https://via.placeholder.com/150"
          img3="https://via.placeholder.com/150"
          img4="https://via.placeholder.com/150"
          name="Product 1"
          price={100}
        />
        <Card
          id="1"
          img="https://via.placeholder.com/150"
          img2="https://via.placeholder.com/150"
          img3="https://via.placeholder.com/150"
          img4="https://via.placeholder.com/150"
          name="Product 1"
          price={100}
        />
      </div>
    </div>
  );
};

export default page;
