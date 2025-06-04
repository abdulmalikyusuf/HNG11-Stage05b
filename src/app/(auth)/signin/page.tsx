"use client";

import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authenticate } from "@/lib/actions/user";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { signInSchema, type SignInSchema } from "@/lib/schema";

function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: SignInSchema) => {
    setPending(true);
    const formdata = new FormData();
    formdata.set("email", data.email);
    formdata.set("password", data.password);
    const res = await authenticate(undefined, formdata);

    if (res) {
      toast({
        description: res,
        icon: "error",
        title: "Uh oh! Something went wrong.",
        variant: "destructive",
      });
      setPending(false);
      return;
    }
    router.push("/");
    setPending(false);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl leading-normal font-bold md:heading-m text-grey-dark">
          Login
        </h2>
        <p className="body-m text-grey">
          Add your details below to get back into the app
        </p>
      </div>
      <form
        className="flex flex-col gap-6"
        onSubmit={(...args) => handleSubmit(onSubmit)(...args)}
      >
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Email address</small>
          <Input
            placeholder="e.g. alex@mail.com"
            {...register("email")}
            error={errors.email?.message}
          >
            <Icons.email className="size-4 fill-grey" />
          </Input>
        </div>
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Password</small>
          <Input
            placeholder="Enter your password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          >
            <Icons.password className="size-4 fill-grey" />
          </Input>
        </div>
        <div className="">
          <Button>
            {pending ? <Loader2 className="animate-spin size-4" /> : "Login"}
          </Button>
        </div>
        <p className="text-center body-m">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-purple block md:inline-flex">
            Create account
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignInPage;
