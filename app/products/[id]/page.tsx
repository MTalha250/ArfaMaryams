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
    <div className="pt-32 px-8 md:px-16 mb-10 flex flex-col md:flex-row">
      <Slider photos={product?.images} />
      <div className="mt-10 md:mt-0 w-full md:w-1/2 md:pl-10 bg-white">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          {product?.name}
        </h1>
        <p className="text-lg mb-4 text-gray-600">
          Price: {product?.price} PKR
        </p>
        <div className="mb-5">
          <p className="text-lg mb-2 text-gray-600">Size:</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm rounded-md border border-gray-300">
              S
            </button>
            <button className="px-4 py-2 text-sm rounded-md border border-gray-300">
              M
            </button>
            <button className="px-4 py-2 text-sm rounded-md border border-gray-300">
              L
            </button>
            <button className="px-4 py-2 text-sm rounded-md border border-gray-300">
              XL
            </button>
          </div>
        </div>
        <hr className="mb-4 border-gray-200" />
        <div className="w-full flex gap-4 mb-4">
          <button className="w-1/2 px-8 py-2 rounded-md bg-white text-black font-bold transition duration-200 hover:bg-primary  border-2 border-black hover:border-primary">
            Add to Wishlist
          </button>
          <button className="w-1/2 animate-shimmer items-center justify-center rounded-md border border-primary bg-[linear-gradient(110deg,#E17489,40%,#E1E1E1,60%,#E17489)] bg-[length:200%_100%] px-6 font-medium text-black transition-colors">
            Add to Cart
          </button>
        </div>
        <p className="text-base text-gray-700 leading-relaxed">
          {product?.description}
        </p>
      </div>
    </div>
  );
};

export default page;
