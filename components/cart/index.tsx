import React from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import CartItem from "./cartItem";
import Link from "next/link";
const Cart = () => {
  const { items, clearCart, getTotalPrice } = useCartStore();
  const { data, update } = useSession();
  const user = data?.user;
  const handleUpdate = async (items: any) => {
    await update({
      ...data,
      user: {
        ...user,
        cart: items,
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-none">
        <MdOutlineShoppingBag className="inline-block text-2xl hover:scale-125 transition duration-200" />
        {user && (
          <span className="text-black -top-2 -right-1 h-4 w-4 absolute bg-primary rounded-full p-0.5 text-[10px] flex justify-center items-center">
            {items.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl w-[450px] h-[70vh] p-5">
        {user ? (
          <div className="w-full h-full">
            {items.length ? (
              <div className="h-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Cart</h2>
                  <button
                    onClick={() => clearCart(user?.id, handleUpdate)}
                    className="rounded-lg py-1 px-3 border border-black bg-transparent text-black dark:border-white relative group transition duration-200"
                  >
                    <div className="rounded-lg absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                    <span className="relative text-sm font-semibold">
                      Clear
                    </span>
                  </button>
                </div>
                <div className="flex flex-col justify-between h-full pt-3 pb-10">
                  <div className="h-[70%] overflow-scroll scrollbar-none">
                    {items.map((item: any) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={
                          item.images[0] ||
                          "https://via.placeholder.com/150?text=No+Image"
                        }
                        quantity={item.quantity}
                      />
                    ))}
                  </div>

                  <div className="text-sm">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>{getTotalPrice()} PKR</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Delivery</p>
                      <p>
                        {getTotalPrice() > 5000 ? (
                          <span className="font-semibold text-green-600">
                            Free
                          </span>
                        ) : (
                          "250 PKR"
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>Total</p>
                      <p>
                        {getTotalPrice() + (getTotalPrice() > 5000 ? 0 : 250)}{" "}
                        PKR
                      </p>
                    </div>
                    <Link
                      href="/checkout"
                      className="flex justify-center items-center mt-5 w-full rounded-lg py-2 px-3 border border-black bg-transparent text-black dark:border-white relative group transition duration-200"
                    >
                      <div className="rounded-lg absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-95 group-hover:scale-y-75 transition-all duration-200" />
                      <span className="relative font-semibold">Checkout</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-lg lg:text-xl font-semibold">
                No items in cart
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-lg lg:text-xl font-semibold">
            Please login to view your cart
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;