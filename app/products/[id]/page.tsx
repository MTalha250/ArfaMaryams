"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "@/components/ItemPage/slider";
import ReactLoading from "react-loading";
import Reviews from "@/components/ItemPage/reviews";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const { inWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { data, update } = useSession();
  const user = data?.user;
  const { addItem } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/product/${id}`
      );
      setProduct(response.data.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (items: any) => {
    await update({
      ...data,
      user: {
        ...data?.user,
        cart: items,
      },
    });
  };
  const handleWishlistUpdate = async (wishlist: any) => {
    await update({
      ...data,
      user: {
        ...data?.user,
        wishlist: wishlist,
      },
    });
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <ReactLoading type="bars" color="#E17489" width={100} />
    </div>
  ) : (
    <div className="pt-32 px-8 md:px-16 mb-10">
      <div className="flex flex-col md:flex-row">
        <Slider photos={product?.images} />
        <div className="mt-10 md:mt-0 w-full md:w-1/2 md:pl-10 bg-white">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            {product?.name}
          </h1>
          <p className="text-lg mb-4 text-gray-600">
            Price: PKR {product?.price}.00
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
          <div className="w-full flex gap-4 my-4">
            <button
              onClick={() => {
                if (user) {
                  if (inWishlist(id)) {
                    removeFromWishlist(id, user.id, handleWishlistUpdate);
                    toast.success("Removed from wishlist");
                  } else {
                    addToWishlist(
                      {
                        id,
                        images: product?.images,
                        name: product?.name,
                        price: product?.price,
                      },
                      user.id,
                      handleWishlistUpdate
                    );
                    toast.success("Added to wishlist");
                  }
                } else {
                  toast.error("Please login to add to wishlist");
                  router.push("/login");
                }
              }}
              className="group px-6 py-2 bg-white text-black font-bold transition duration-200 hover:bg-primary  border-2 border-black hover:border-primary w-fit"
            >
              {inWishlist(id) ? (
                <MdFavorite className="text-2xl group-hover:scale-125 transition duration-200" />
              ) : (
                <MdFavoriteBorder className="text-2xl group-hover:scale-125 transition duration-200" />
              )}
            </button>
            <div className="flex items-center text-lg text-gray-800 border w-fit">
              <button
                className="py-1 px-2"
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
              >
                -
              </button>
              <span className="font-bold border-x py-1 px-2 inline-block">
                {count}
              </span>
              <button
                className="py-1 px-2"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                if (user) {
                  for (let i = 0; i < count; i++) {
                    addItem(
                      {
                        id,
                        images: product?.images,
                        name: product?.name,
                        price: product?.price,
                      },
                      user.id,
                      handleUpdate
                    );
                  }
                  toast.success("Added to cart");
                } else {
                  toast.error("Please login to add to cart");
                  router.push("/login");
                }
              }}
              className="group animate-shimmer items-center justify-center border border-primary bg-[linear-gradient(110deg,#E17489,40%,#E1E1E1,60%,#E17489)] bg-[length:200%_100%] px-6 py-2 font-medium text-black transition-colors"
            >
              <MdOutlineShoppingBag className="text-2xl group-hover:scale-125 transition duration-200" />
            </button>
          </div>
          <p className="text-base text-gray-700 leading-relaxed text-justify">
            {product?.description}
          </p>
        </div>
      </div>
      <Reviews
        reviews={[
          {
            name: "John Doe",
            email: "johndoe@gmail.com",
            rating: 3,
            title: "Great Product",
            review:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio voluptates dolorum repudiandae reiciendis. Cumque illo quo blanditiis fugiat, earum culpa, nemo delectus error maiores repudiandae molestiae enim suscipit? Repellat, aperiam!",
            created_at: new Date(),
          },
        ]}
        userEmail="johndoe@gmail.com"
        onSubmitReview={() => {}}
        onDeleteReview={() => {}}
        className="mt-10"
      />
    </div>
  );
};

export default page;
