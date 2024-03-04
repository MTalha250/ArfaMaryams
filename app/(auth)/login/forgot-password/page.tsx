"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    code: z
      .string()
      .min(6, { message: "Code must be 6 characters long" })
      .max(6, { message: "Code must be 6 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const { code, password } = values;
    // const result = await signIn("credentials", {
    //   password,
    //   redirect: false,
    // });
    // if (result?.error) {
    //   toast.error(result.error);
    // } else {
    //   toast.success("Logged in successfully!");
    //   router.push("/");
    //   if (user) {
    //     initCart(user.cart);
    //     initWishlist(user.wishlist);
    //   }
    // }
    setIsSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center flex-col min-h-screen px-8 md:px-16">
      <h1 className="text-3xl font-semibold mb-3">
        Reset your <span className="bg-primary px-2 italic">Password!</span>{" "}
      </h1>{" "}
      <p className="text-center text-sm text-gray-400 mb-5">
        Please enter the code sent to your email and your new password.
      </p>
      <div className="w-full max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-end w-full gap-3">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button className="flex justify-center rounded border p-2 border-black bg-transparent text-black  dark:border-white relative group transition duration-200">
                <div className="rounded absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <span className="relative text-sm font-semibold whitespace-nowrap">
                  Send Code
                </span>
              </button>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/login"
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Go back to login?
            </Link>
            <Button
              type="submit"
              className="rounded-full font-bold w-full bg-transparent hover:bg-transparent py-3 border border-black dark:border-white relative group transition duration-200"
            >
              <div className="rounded-full absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-95 group-hover:scale-y-75 transition-all duration-200" />
              <span className="relative text-black">
                {isSubmitting ? "Submitting..." : "Change Password"}
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
