"use client";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Card from "@/components/card";
import { useParams } from "next/navigation";
import axios from "axios";

const page = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/category/${category}`);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pt-32 px-8 md:px-16">
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800">
          {category[0].toUpperCase() + category.slice(1)}
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          Discover all products in the category of{" "}
          {category[0].toUpperCase() + category.slice(1)}. Explore our wide
          selection now.
        </p>
      </div>
      <span className="font-semibold shrink-0 border p-2 text-xs sm:text-sm">
        {products.length} {products.length > 1 ? "Products" : "Product"}
      </span>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <ReactLoading type="bars" color="#000000" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5 mb-10">
          {products.map((product: any) => (
            <Card
              key={product._id}
              id={product._id}
              images={product.images}
              name={product.name}
              price={product.price}
              discount={product.discount}
              sizes={product.sizes}
              colors={product.colors}
              stock={product.stock}
              reviews={product.reviews}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[75vh] text-center text-lg text-gray-600 tracking-wide mt-10">
          <span>No products found</span>
        </div>
      )}
    </div>
  );
};

export default page;
