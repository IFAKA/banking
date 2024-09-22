"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { getAuthFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./CustomInput";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: AuthFormProps) => {
  const { push } = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authFormSchem = getAuthFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof authFormSchem>>({
    resolver: zodResolver(authFormSchem),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof authFormSchem>) {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const newUser = await signUp({
          email: data.email,
          password: data.password,
          address1: data.address1!,
          city: data.city!,
          dateOfBirth: data.dateOfBirth!,
          firstName: data.firstName!,
          lastName: data.lastName!,
          postalCode: data.postalCode!,
          ssn: data.ssn!,
          state: data.state!,
        });

        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn(data);

        if (response) push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="flex cursor-pointer items-center gap-1">
          <Image
            alt="Horizon Logo"
            src={"/icons/logo.svg"}
            width={34}
            height={34}
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="firstName" />
                    <CustomInput control={form.control} name="lastName" />
                  </div>
                  <CustomInput control={form.control} name="address1" />
                  <CustomInput control={form.control} name="city" />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="state" />
                    <CustomInput control={form.control} name="postalCode" />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="dateOfBirth" />
                    <CustomInput control={form.control} name="ssn" />
                  </div>
                </>
              )}
              <CustomInput control={form.control} name="email" />
              <CustomInput control={form.control} name="password" />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={20} className="animate-spin" />
                      <span>Loading</span>
                    </div>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : type === "sign-up" ? (
                    "Sign up"
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-formal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={
                type === "sign-in"
                  ? "/sign-up"
                  : type === "sign-up"
                  ? "/sign-in"
                  : "/"
              }
              className="form-link"
            >
              {type === "sign-in"
                ? "Sign up"
                : type === "sign-up"
                ? "Sign In"
                : "Home"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
