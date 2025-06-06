"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SignUpFormData, signupSchema } from "../../schema";

export default function SignUpView() {
  const trpc = useTRPC();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const signUpMutation = useMutation(
    trpc.auth.signup.mutationOptions({
      onSuccess: () => {
        toast.success("Welcome!", {
          description: "Thanks for joining Kartya. You can explore now.",
        });
        router.push("/");
      },

      onError: (error) => {
        toast.error("Oops! Something went wrong.", {
          description: error.message,
        });
      },
    })
  );

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpFormData) => {
    // console.log(values);
    signUpMutation.mutate(values);
  };

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      // type="text"
                      placeholder="johndoe"
                      {...field}
                      disabled={signUpMutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    Your store will be available at:{" "}
                    {field.value && (
                      <>
                        <b>{field.value}</b>
                        .store.com
                      </>
                    )}
                  </FormDescription>
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
                    <Input
                      type="email"
                      placeholder="john@mail.com"
                      {...field}
                      disabled={signUpMutation.isPending}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your email.</FormDescription> */}
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
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="1JohnD@e"
                        {...field}
                        disabled={signUpMutation.isPending}
                        className="pr-9"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={signUpMutation.isPending}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  {/* <FormDescription>This is your password.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={signUpMutation.isPending}
              type="submit"
              className="w-full"
            >
              {signUpMutation.isPending ? (
                <>
                  <Spinner />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
