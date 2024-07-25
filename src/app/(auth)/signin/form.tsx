"use client";

import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IFormInputs = z.infer<typeof signInSchema>;

function Form() {
  const {
    register,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });
  return (
    <>
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
    </>
  );
}

export default Form;
