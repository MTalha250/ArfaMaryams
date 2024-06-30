"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import MultiRangeSlider from "multi-range-slider-react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import ReactLoading from "react-loading";
import { CiFilter } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/search/${search}`);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearch("");
    }
  };

  return (
    <div className="pt-32 px-8 md:px-16">
      <h1 className="font-bold text-4xl text-center">All Products</h1>
      <div className="flex my-10">
        <div className="hidden md:block md:w-1/4 lg:w-1/5 shrink-0 pr-5">
          <h1 className="font-bold text-2xl text-center mb-5">Filters</h1>
          <label className="flex items-center gap-2">
            <Checkbox />
            <h2 className="font-semibold">Formals</h2>
          </label>
          <label className="flex items-center gap-2 my-2">
            <Checkbox />
            <h2 className="font-semibold">Semi-Formals</h2>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox />
            <h2 className="font-semibold">Casuals</h2>
          </label>

          <p className="mt-5 font-semibold text-sm">Price Range (PKR):</p>
          <MultiRangeSlider
            min={1000}
            minValue={1000}
            max={10000}
            maxValue={10000}
            step={500}
            stepOnly
            ruler={false}
            style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
            barLeftColor="#E1E1E1"
            barInnerColor="#fcb6c4"
            barRightColor="#E1E1E1"
            thumbLeftColor="white"
            thumbRightColor="white"
          />
          <button className="mt-5 ml-auto flex justify-center border py-1 border-black bg-transparent text-black  dark:border-white relative group transition duration-200">
            <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
            <span className="relative text-sm font-semibold py-1 px-2">
              Apply
            </span>
          </button>
        </div>
        <div className="md:border-l md:pl-5 w-full">
          <div className="flex gap-3 sm:gap-10 w-full items-end">
            <h2 className="font-semibold shrink-0 border p-2 text-xs sm:text-sm">
              {products.length} {products.length > 1 ? "Products" : "Product"}
            </h2>
            <div className="flex items-end w-full gap-2">
              <input
                type="text"
                className="text-sm sm:text-base w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 p-2 fond-bold"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="flex justify-center border py-1 border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
              >
                <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <span className="flex items-center gap-1 relative text-sm font-semibold py-1 px-5">
                  <BiSearchAlt className="sm:text-lg" />{" "}
                  <span className="hidden md:inline">Search</span>
                </span>
              </button>
            </div>
          </div>
          <Sheet>
            <SheetTrigger className="md:hidden flex items-center gap-2 mt-5 ml-auto border border-black py-1 px-2">
              <CiFilter className="text-xl" />
              <span className="font-semibold text-sm">Filters</span>
            </SheetTrigger>
            <SheetContent>
              <h1 className="font-bold text-2xl text-center mb-5">Filters</h1>
              <label className="flex items-center gap-2">
                <Checkbox />
                <h2 className="font-semibold">Formals</h2>
              </label>
              <label className="flex items-center gap-2 my-2">
                <Checkbox />
                <h2 className="font-semibold">Semi-Formals</h2>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <h2 className="font-semibold">Casuals</h2>
              </label>

              <p className="mt-5 font-semibold text-sm">Price Range (PKR):</p>
              <MultiRangeSlider
                min={1000}
                minValue={1000}
                max={10000}
                maxValue={10000}
                step={500}
                stepOnly
                ruler={false}
                style={{
                  border: "none",
                  boxShadow: "none",
                  padding: "15px 10px",
                }}
                barLeftColor="#E1E1E1"
                barInnerColor="#fcb6c4"
                barRightColor="#E1E1E1"
                thumbLeftColor="white"
                thumbRightColor="white"
              />
              <button className="mt-5 ml-auto flex justify-center border py-1 border-black bg-transparent text-black  dark:border-white relative group transition duration-200">
                <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <span className="relative text-sm font-semibold py-1 px-2">
                  Apply
                </span>
              </button>
            </SheetContent>
          </Sheet>
          {loading ? (
            <div className="flex justify-center items-center h-[70vh]">
              <ReactLoading type="bars" color="#E17489" />
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 mb-10">
                {products.map((product: any) => (
                  <Card
                    key={product._id}
                    id={product._id}
                    img={product.images[0]}
                    img2={product.images[1]}
                    img3={product.images[2]}
                    img4={product.images[3]}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    sizes={product.sizes}
                    colors={product.colors}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
