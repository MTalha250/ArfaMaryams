import Link from "next/link";
import React, { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useWishlistStore } from "@/store/wishlistStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  id: string;
  img: string | undefined;
  img2: string | undefined;
  img3: string | undefined;
  img4: string | undefined;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  stock: number;
}

function Card({
  id,
  img,
  img2,
  img3,
  img4,
  name,
  description,
  price,
  sizes,
  colors,
  stock,
}: Props) {
  const { inWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { data, update } = useSession();
  const user = data?.user;
  const { addItem } = useCartStore();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const router = useRouter();
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
  return (
    <div className="relative group w-full">
      <Link
        href={`/products/${id}`}
        className="block text-black border p-3 rounded-lg shadow-md"
      >
        <div className="relative">
          <div
            id="imgs"
            className="w-full h-[50vh] flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
          >
            {img && (
              <img
                src={img}
                alt=""
                className="w-full h-full snap-start snap-always shrink-0"
              />
            )}
            {img2 && (
              <img
                src={img2}
                alt=""
                className="w-full h-full snap-start snap-always shrink-0"
              />
            )}
            {img3 && (
              <img
                src={img3}
                alt=""
                className="w-full h-full snap-start snap-always shrink-0"
              />
            )}
            {img4 && (
              <img
                src={img4}
                alt=""
                className="w-full h-full snap-start snap-always shrink-0"
              />
            )}
          </div>
        </div>

        <p className="my-1 font-semibold truncate">{name}</p>
        <p className="text-neutral-500 text-sm truncate">{description}</p>
        <p className="my-1 text-primary">
          <span className="font-bold">PKR </span>
          {price}.00
        </p>
      </Link>
      {stock > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-primary opacity-0 group-hover:opacity-100 z-10 absolute bg-primary/80 w-10 h-10 rounded-full bottom-28 left-[40%] transform -translate-x-1/2 flex justify-center items-center shadow-md transitioon duration-300">
            <span className="text-white text-xl">+</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-5">
            <div className="mb-5 flex gap-3 items-center">
              <p className="text-gray-600">Size:</p>
              <div className="flex gap-2">
                {sizes.map((s: string) => (
                  <button
                    key={s}
                    className={`px-3 py-1 text-sm rounded-md border border-gray-300 ${
                      s == size ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setSize(s)}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5 flex gap-3 items-center">
              <p className="text-gray-600">Color:</p>
              <div className="flex gap-2">
                {colors.map((c: string) => (
                  <button
                    key={c}
                    className={`px-3 py-1 text-sm rounded-md border border-gray-300 ${
                      c == color ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setColor(c)}
                  >
                    {c[0].toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <DropdownMenuItem
              onClick={() => {
                if (user) {
                  if (!size || !color) {
                    toast.error("Please select size and color");
                    return;
                  }
                  if (!size) {
                    toast.error("Please select size");
                    return;
                  }
                  if (!color) {
                    toast.error("Please select color");
                    return;
                  }
                  addItem(
                    {
                      id,
                      images: [img, img2, img3, img4],
                      name,
                      price,
                      size,
                      color,
                    },
                    user.id,
                    handleUpdate
                  );
                  toast.success("Added to cart");
                  setSize("");
                  setColor("");
                } else {
                  toast.error("Please login to add to cart");
                  router.push("/login");
                }
              }}
              className="mt-5 ml-auto flex justify-center border py-1 border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
            >
              <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
              <span className="relative text-sm font-semibold py-1 px-2">
                Add to Cart
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
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
                  images: [img, img2, img3, img4],
                  name,
                  price,
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
        className={
          "hover:bg-primary opacity-0 group-hover:opacity-100 z-10 absolute bg-primary/80 w-10 h-10 rounded-full bottom-28 transform -translate-x-1/2 flex justify-center items-center shadow-md transition duration-300 " +
          (stock > 0 ? "left-[60%]" : "left-1/2")
        }
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
