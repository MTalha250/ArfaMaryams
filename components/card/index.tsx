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
    <div className="relative">
      <Link href={`/product/${id}`} className="block text-black border p-3">
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
        </div>

        <p className="my-1 font-bold truncate">{name}</p>
        <p className="my-1 font-light">{price} PKR</p>
      </Link>
      <div className="z-10 absolute bg-primary/50 w-10 h-10 rounded-full bottom-24 left-1/2 -translate-x-1/2 flex justify-center items-center">
        +
      </div>
    </div>
  );
}

export default Card;
