import Link from "next/link";
import React from "react";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
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
  const { data } = useSession();
  const user = data?.user;
  const { addItem } = useCartStore();
  const router = useRouter();
  return (
    <div className="relative">
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
        className="z-10 absolute bg-primary/50 w-10 h-10 rounded-full bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center shadow-md"
      >
        <span className="text-white text-xl">+</span>
      </button>
    </div>
  );
}

export default Card;
