"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ProductCard from "@/components/admin/productCard";
import toast from "react-hot-toast";

const page = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/product");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`/api/product/${id}`);
      toast.success("Product deleted successfully");
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-10 px-4 md:px-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-700 tracking-wider mb-10 text-center">
        All Products
      </h1>
      <input
        type="text"
        className="w-full border-b bg-transparent focus:outline-none"
        placeholder="Search by name or id..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <ReactLoading type="bars" color="#1c1c1c" />
        </div>
      ) : products.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 mb-10">
            {products
              .filter(
                (product: any) =>
                  product.name.toLowerCase().includes(search.toLowerCase()) ||
                  product._id.toLowerCase().includes(search.toLowerCase())
              )
              .map((product: any) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  images={product.images}
                  name={product.name}
                  price={product.price}
                  discount={product.discount}
                  sizes={product.sizes}
                  colors={product.colors}
                  stock={product.stock}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh] text-center text-lg text-gray-600 tracking-wide mt-10">
          <span>No Products Found</span>
        </div>
      )}
    </div>
  );
};

export default page;
