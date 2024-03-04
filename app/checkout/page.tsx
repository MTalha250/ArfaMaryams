"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters long" }),
});
const page = () => {
  const { data } = useSession();
  const { items, getTotalPrice } = useCartStore();
  const router = useRouter();
  const user = data?.user;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // try {
    //   const response = await axios.post("/api/register", values);
    //   toast.success(response.data.message);
    //   router.push("/login");
    // } catch (error: any) {
    //   toast.error(error.response.data.message);
    // }
    setIsSubmitting(false);
    form.reset();
  }
  // if (!user?.email || items.length === 0) {
  //   router.push("/");
  // }

  return (
    <div className="px-8 md:px-16 pt-32 pb-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-5">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <h2 className="text-xs font-bold">Personal Info</h2>
              <div className="border-y py-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <h2 className="text-xs font-bold">Payment Info:</h2>
              <div className="border-y py-5">
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on Delivery (COD)</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button
                type="submit"
                className="rounded-full font-bold w-full bg-transparent hover:bg-transparent py-3 border border-black text-black dark:border-white relative group transition duration-200"
              >
                <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-95 group-hover:scale-y-75 transition-all duration-200" />
                <span className="relative">
                  {isSubmitting ? "Submitting..." : "Place Order"}
                </span>
              </Button>
            </form>
          </Form>
        </div>
        <div className="md:pl-10 w-full md:border-l border-neutral-600">
          <h2 className="text-2xl font-bold mb-5">Your Cart</h2>
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-black p-2 my-2 flex justify-between"
            >
              <div className="w-2/3">
                <img
                  src={item.images[0]}
                  alt=""
                  className="w-20 h-20 object-cover rounded float-left mr-3.5"
                />
                <h1 className="font-semibold text-sm">{item.name}</h1>
                <h1 className="text-sm">Size: sm</h1>
                <h1 className="text-sm">Qty: {item.quantity}</h1>
              </div>
              <span className="text-sm font-bold">{item.price} PKR</span>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{getTotalPrice()} PKR</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>
                {getTotalPrice() > 5000 ? (
                  <span className="font-semibold text-green-600">Free</span>
                ) : (
                  "250 PKR"
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>{getTotalPrice() + (getTotalPrice() > 5000 ? 0 : 250)} PKR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;