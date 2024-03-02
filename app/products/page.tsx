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
        {products.map((product: any) => (
          <Card
            key={product._id}
            id={product._id}
            img={product.images[0]}
            img2={product.images[1]}
            img3={product.images[2]}
            img4={product.images[3]}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
