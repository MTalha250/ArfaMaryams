"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "@/components/slider";
const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/product/${id}`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-32 px-8 md:px-16 mb-10">
      <Slider photos={product?.images} />
    </div>
  );
};

export default page;
