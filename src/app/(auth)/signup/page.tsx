"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { signUpSchema, type SignUpSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { signUp } from "@/lib/actions/auth";
import { authenticate } from "@/lib/actions/user";

function SignUpPage() {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    setPending(true);

    const { error, success, message } = await signUp(data);

    if (error) {
      toast({
        description: error,
        icon: "error",
        variant: "destructive",
      });
    }
    if (success) {
      toast({
        description: "Account created successfully!",
        icon: "link",
      });
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
      }
      setPending(false);
      router.push("/");
    }
    setPending(false);
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl leading-normal font-bold md:heading-m text-grey-dark">
          Create account
        </h2>
        <p className="body-m text-grey">
          Let’s get you started sharing your links!
        </p>
      </div>
      <form
        className="flex flex-col gap-6"
        onSubmit={(...args) => handleSubmit(onSubmit)(...args)}
      >
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Email address</small>
          <Input
            placeholder="e.g. alex@mail.com"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          >
            <Icons.email className="size-4 fill-grey" />
          </Input>
        </div>
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Create password</small>
          <Input
            placeholder="At least 8 characters"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          >
            <Icons.password className="size-4 fill-grey" />
          </Input>
        </div>
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Confirm password</small>
          <Input
            placeholder="At least 8 characters"
            type="password"
            {...register("password_confirmation")}
            error={errors.password_confirmation?.message}
          >
            <Icons.password className="size-4 fill-grey" />
          </Input>
        </div>
        <p className="body-s text-grey">
          Password must contain at least 8 characters
        </p>
        <div className="">
          <Button>
            {pending ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              "Create new account"
            )}
          </Button>
        </div>
        <p className="text-center body-m">
          Already have an account?{" "}
          <Link href="/signin" className="text-purple block md:inline-flex">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignUpPage;
