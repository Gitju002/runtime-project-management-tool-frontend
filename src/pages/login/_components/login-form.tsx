import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/schema";
import { ArrowRight } from "lucide-react";
import { useLoginMutation } from "@/store/api/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/userInfo";
import { Loader2 } from "lucide-react";
export default function LoginForm() {
  const [login, { isLoading: isSubmitting, error, isSuccess }] =
    useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    disabled: isSubmitting,
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const response = await login(values).unwrap();
      // console.log(response);
      dispatch(
        setCredentials({
          name: response?.data?.user?.name,
          token: response?.data?.token,
          role: response?.data?.user?.role,
        })
      );
      if (response?.data?.user?.role === "Admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="transition-all duration-200 dark:border-teal-shade">
                <Input type="email" placeholder="your@email.com" {...field} />
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
              <FormControl className="transition-all duration-200 dark:border-teal-shade">
                <Input type="password" placeholder="********" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex ">
          <Button
            className="ms-auto  w-full  transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35 "
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" /> Signin in...
              </>
            ) : (
              "Sign in"
            )}
            <ArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
