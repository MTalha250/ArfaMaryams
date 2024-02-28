"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
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
import { storeInitializer } from "@/lib/actions/storeInitializer";
import useAuthStore from "@/store/authStore";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const Login = () => {
  const { setStatus } = useAuthStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const { email, password } = values;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Logged in successfully!");
      storeInitializer();
      setStatus("success");
      router.push("/");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">
        Welcome <span className="text-white bg-primary px-2 italic">Back!</span>{" "}
      </h1>
      <div className=" min-w-[300px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Link
                href="/register"
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Don't have an account? Sign up
              </Link>
            </div>
            <Button type="submit">
              {isSubmitting ? "Submitting..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
