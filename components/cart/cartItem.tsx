import React from "react";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { IoIosClose } from "react-icons/io";
interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem = ({ id, name, price, image, quantity }: Props) => {
  const { data, update } = useSession();
  const user = data?.user;
  const { addItem, removeItem, deleteItem } = useCartStore((state) => state);
  const handleUpdate = async (items: any) => {
    await update({
      ...data,
      user: {
        ...data?.user,
        cart: items,
      },
    });
  };
  return (
    <div className="mt-2 flex items-center border-b border-gray-300 drop-shadow-sm py-2">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 mr-4 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-semibold mb-1">{name}</h3>
        <p className="text-gray-600 text-sm">PKR {price}.00</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => removeItem(id, user?.id, handleUpdate)}
            className="transition duration-300 flex justify-center items-center bg-primary hover:bg-yellow-600 text-white rounded-full mr-2 focus:outline-none text-sm w-5 h-5"
          >
            -
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={() =>
              addItem({ id, name, price, image }, user?.id, handleUpdate)
            }
            className="transition duration-300 flex justify-center items-center bg-primary hover:bg-yellow-600 text-white rounded-full ml-2 focus:outline-none text-sm w-5 h-5"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => deleteItem(id, user?.id, handleUpdate)}
        className="transition duration-300 flex justify-center items-center text-white bg-primary hover:bg-yellow-600 w-5 h-5 rounded-full focus:outline-none"
      >
        <IoIosClose />
      </button>
    </div>
  );
};

export default CartItem;
