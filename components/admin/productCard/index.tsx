import Link from "next/link";
import React from "react";
interface Props {
  id: string;
  images: string[];
  name: string;
  price: number;
  discount: number;
  sizes: string[];
  colors: string[];
  stock: number;
  handleDelete: (id: string) => void;
}

function ProductCard({
  id,
  images,
  name,
  price,
  discount,
  sizes,
  colors,
  stock,
  handleDelete,
}: Props) {
  return (
    <div className="relative w-full">
      <div className="block text-black border p-5 shadow-md">
        <div className="relative">
          <div
            id="imgs"
            className="w-full h-[48vh] flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full h-full snap-start snap-always shrink-0"
              />
            ))}
          </div>
          {stock === 0 && (
            <div className="absolute bg-black/40 w-full h-full top-0 left-0 flex items-center justify-center">
              <div className="bg-white/90 p-3 shadow-xl">
                <p className="text-2xl font-bold text-center text-gray-800">
                  Out of Stock
                </p>
              </div>
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-0 left-0 bg-primary text-white p-1 ">
              {discount}% OFF
            </div>
          )}
        </div>

        <p className="my-1 font-bold text-lg truncate">{name}</p>
        <div className="flex gap-2 my-1">
          {sizes.map((s: string) => (
            <button
              key={s}
              className="px-3 py-1 text-sm border border-gray-300"
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-2 my-1 whitespace-nowrap flex-wrap">
          {colors.map((c: string) => (
            <button
              key={c}
              className="px-3 py-1 text-sm border border-gray-300"
            >
              {c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <p className="my-1 text-primary font-semibold">
          PKR {(price - (price * discount) / 100).toLocaleString()}
          {discount > 0 && (
            <span className="ml-2 line-through text-neutral-500 text-sm">
              PKR {price.toLocaleString()}
            </span>
          )}
        </p>
        <div className="flex my-1 gap-3 w-full">
          <button
            onClick={() => handleDelete(id)}
            className="w-full flex justify-center border py-1 border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
          >
            <div className="absolute bottom-0 right-0 bg-neutral-200 h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
            <span className="relative text-sm font-semibold py-1 px-2">
              Delete
            </span>
          </button>
          <Link
            href={`/admin/update-product/${id}`}
            className="w-full flex justify-center border py-1 border-black bg-transparent text-white dark:border-white relative group transition duration-200"
          >
            <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
            <span className="relative text-sm font-semibold py-1 px-2">
              Update
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
