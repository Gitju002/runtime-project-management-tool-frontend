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

export function LoginForm() {
  const [login, { isLoading: loading, isError, error, isSuccess }] =
    useLoginMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    disabled: loading,
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      await login(values)
        .unwrap()
        .then(() => {
          router.push("/user");
        });
      console.log("isSuccess", isSuccess);
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
              <FormControl>
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
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex ">
          <Button className="ms-auto  w-full" type="submit" disabled={loading}>
            Sign In
            <ArrowRight className="" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
