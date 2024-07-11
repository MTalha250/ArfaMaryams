"use client";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import PhotosUploader from "@/components/admin/uploader";
import axios from "axios";
import { CiCircleMinus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactLoading from "react-loading";

const page = () => {
  const [images, setImages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [fabric, setFabric] = useState("");
  const [trouser, setTrouser] = useState("");
  const [inner, setInner] = useState("");
  const [dopatta, setDopatta] = useState("");
  const [embroidery, setEmbroidery] = useState("");
  const [weight, setWeight] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/product/${id}`);
      const product = response.data.product;
      setImages(product.images);
      setColors(product.colors);
      setSizes(product.sizes);
      setName(product.name);
      setPrice(product.price);
      setDiscount(product.discount);
      setCategory(product.category);
      setStock(product.stock == 1 ? "yes" : "no");
      setDescription(product.description);
      setFabric(product.fabric);
      setTrouser(product.trouser);
      setInner(product.inner);
      setDopatta(product.dopatta);
      setEmbroidery(product.embroidery);
      setWeight(product.weight);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (
      !name ||
      !price ||
      !category ||
      sizes.length === 0 ||
      colors.length === 0 ||
      images.length === 0
    ) {
      toast.error(
        "Please fill in all required fields and ensure sizes, colors, and images are selected."
      );
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.put(`/api/product/${id}`, {
        name,
        price: parseFloat(price as string),
        discount: discount ? parseFloat(discount as string) : 0,
        images,
        sizes: sizes.sort((a, b) => b.localeCompare(a)),
        colors,
        category,
        stock: stock === "yes" ? 1 : 0,
        description,
        fabric,
        trouser,
        inner,
        dopatta,
        embroidery,
        weight: weight ? parseFloat(weight as string) : 0,
      });
      toast.success("Product updated successfully");
      setImages([]);
      setColors([]);
      setColorInput("");
      setSizes([]);
      setName("");
      setPrice("");
      setDiscount("");
      setCategory("");
      setStock("");
      setDescription("");
      setFabric("");
      setTrouser("");
      setInner("");
      setDopatta("");
      setEmbroidery("");
      setWeight("");
      router.push("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
  };

  const addColor = () => {
    if (colorInput && !colors.includes(colorInput)) {
      setColors([...colors, colorInput]);
      setColorInput("");
    }
  };

  const handleSizeChange = (size: string) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <ReactLoading type="bars" color="#1c1c1c" />
        </div>
      ) : (
        <div className="py-10 px-4 md:px-8 bg-gray-50 min-h-screen">
          <h1 className="text-4xl font-extrabold text-gray-700 tracking-wider mb-10 text-center">
            Update Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images <span className="text-red-500">*</span>
              </label>
              <PhotosUploader
                addedPhotos={images}
                onChange={(newImages) => setImages(newImages)}
                maxPhotos={5}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount (if any - in %)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  In Stock <span className="text-red-500">*</span>
                </label>
                <select
                  id="stock"
                  name="stock"
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="sizes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sizes <span className="text-red-500">*</span>
                </label>
                <div id="sizes" className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="s"
                      onChange={() => handleSizeChange("s")}
                      className="form-checkbox"
                      checked={sizes.includes("s")}
                    />
                    <span className="ml-2">Small (S)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="m"
                      onChange={() => handleSizeChange("m")}
                      className="form-checkbox"
                      checked={sizes.includes("m")}
                    />
                    <span className="ml-2">Medium (M)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="l"
                      onChange={() => handleSizeChange("l")}
                      className="form-checkbox"
                      checked={sizes.includes("l")}
                    />
                    <span className="ml-2">Large (L)</span>
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="colorInput"
                  className="block text-sm font-medium text-gray-700"
                >
                  Colors <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="colorInput"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="bg-primary text-white p-2"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap space-x-2 space-y-1">
                  {colors.map((color, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-0.5 text-sm font-medium bg-black/10 text-primary"
                    >
                      {color}{" "}
                      <CiCircleMinus
                        className="ml-1 cursor-pointer"
                        onClick={() =>
                          setColors(colors.filter((c) => c !== color))
                        }
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="premium">Premium</option>
                <option value="formals">Formals</option>
                <option value="semi-formals">Semi-Formals</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fabric"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fabric
                </label>
                <input
                  type="text"
                  id="fabric"
                  name="fabric"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="trouser"
                  className="block text-sm font-medium text-gray-700"
                >
                  Trouser
                </label>
                <input
                  type="text"
                  id="trouser"
                  name="trouser"
                  value={trouser}
                  onChange={(e) => setTrouser(e.target.value)}
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="inner"
                  className="block text-sm font-medium text-gray-700"
                >
                  Inner
                </label>
                <input
                  type="text"
                  id="inner"
                  name="inner"
                  value={inner}
                  onChange={(e) => setInner(e.target.value)}
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="dopatta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dopatta
                </label>
                <input
                  type="text"
                  id="dopatta"
                  name="dopatta"
                  value={dopatta}
                  onChange={(e) => setDopatta(e.target.value)}
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="embroidery"
                  className="block text-sm font-medium text-gray-700"
                >
                  Embellishment
                </label>
                <input
                  type="text"
                  id="embroidery"
                  name="embroidery"
                  value={embroidery}
                  onChange={(e) => setEmbroidery(e.target.value)}
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="mt-1 block w-full border border-gray-300  shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <Link
              href="/admin/products"
              type="submit"
              className="text-center font-bold w-full bg-transparent hover:bg-transparent py-3 border border-black text-black dark:border-white relative group transition duration-200"
            >
              <div className="absolute bottom-0 right-0 bg-neutral-300 h-full w-full group-hover:scale-x-95 group-hover:scale-y-75 transition-all duration-200" />
              <span className="relative">Cancel</span>
            </Link>
            <button
              type="submit"
              className="font-bold w-full bg-transparent hover:bg-transparent py-3 border border-black text-white dark:border-white relative group transition duration-200"
              disabled={isSubmitting}
            >
              <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-95 group-hover:scale-y-75 transition-all duration-200" />
              <span className="relative">
                {isSubmitting ? "Submitting..." : "Update Product"}
              </span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default page;