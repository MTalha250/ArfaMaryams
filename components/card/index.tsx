import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  img: string | null;
  img2: string | null;
  img3: string | null;
  img4: string | null;
  name: string;
  price: number;
}

function Card({ id, img, img2, img3, img4, name, price }: Props) {
  return (
    <Link href={`/product/${id}`} className="text-black">
      <div className="relative">
        <div
          id="imgs"
          className="w-full flex overflow-scroll snap-x snap-mandatory scrollbar-none"
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
        <span className="absolute bg-white/50 py-1 px-2.5 rounded-full top-3/4 left-1/2 -translate-x-1/2">
          +
        </span>
      </div>

      <p className=" text-[10px] md:text-[10px] lg:text-xs my-1 font-light truncate">
        {name}
      </p>
      <p className="text-[10px] md:text-[9px]  lg:text-xs my-1 font-light">
        {price} PKR
      </p>
    </Link>
  );
}

export default Card;
