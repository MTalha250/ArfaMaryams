import Link from "next/link";
import React, { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useWishlistStore } from "@/store/wishlistStore";
interface Props {
  id: string;
  img: string | undefined;
  img2: string | undefined;
  img3: string | undefined;
  img4: string | undefined;
  name: string;
  price: number;
}

function Card({ id, img, img2, img3, img4, name, price }: Props) {
  const { inWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { data } = useSession();
  const user = data?.user;
  const { addItem } = useCartStore();
  const router = useRouter();
  return (
    <div className="relative group">
      <Link
        href={`/products/${id}`}
        className="block text-black border p-3 rounded-lg shadow-md"
      >
        <div className="relative">
          <div
            id="imgs"
            className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
          >
            {img && (
              <img
                src={img}
                alt=""
                className="w-full snap-start snap-always shrink-0"
              />
            )}
            {img2 && (
              <img
                src={img2}
                alt=""
                className="w-full snap-start snap-always shrink-0"
              />
            )}
            {img3 && (
              <img
                src={img3}
                alt=""
                className="w-full snap-start snap-always shrink-0"
              />
            )}
            {img4 && (
              <img
                src={img4}
                alt=""
                className="w-full snap-start snap-always shrink-0"
              />
            )}
          </div>
        </div>

        <p className="my-1 font-bold truncate">{name}</p>
        <p className="my-1 font-light">{price} PKR</p>
      </Link>
      <button
        onClick={() => {
          if (user) {
            addItem(
              {
                id,
                images: [img, img2, img3, img4],
                name,
                price,
              },
              user.id
            );
            toast.success("Added to cart");
          } else {
            toast.error("Please login to add to cart");
            router.push("/login");
          }
        }}
        className="opacity-0 group-hover:opacity-100 z-10 absolute bg-primary/80 w-10 h-10 rounded-full bottom-20 left-[40%] transform -translate-x-1/2 flex justify-center items-center shadow-md transitioon duration-300"
      >
        <span className="text-white text-xl">+</span>
      </button>
      <button
        onClick={() => {
          if (user) {
            if (inWishlist(id)) {
              removeFromWishlist(id, user.id);
              toast.success("Removed from wishlist");
            } else {
              addToWishlist(
                {
                  id,
                  images: [img, img2, img3, img4],
                  name,
                  price,
                },
                user.id
              );
              toast.success("Added to wishlist");
            }
          } else {
            toast.error("Please login to add to wishlist");
            router.push("/login");
          }
        }}
        className="opacity-0 group-hover:opacity-100 z-10 absolute bg-primary/80 w-10 h-10 rounded-full bottom-20 left-[60%] transform -translate-x-1/2 flex justify-center items-center shadow-md transitioon duration-300"
      >
        {inWishlist(id) ? (
          <MdFavorite className="text-white text-xl" />
        ) : (
          <MdFavoriteBorder className="text-white text-xl" />
        )}
      </button>
    </div>
  );
}

export default Card;
