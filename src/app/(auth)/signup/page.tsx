"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createClient } from "@/supabase/client";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { signup } from "@/app/(auth)/actions";
import { toast } from "@/components/ui/use-toast";

type IFormInputs = z.infer<typeof signUpSchema>;

function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: IFormInputs) => {
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp(data);

    if (error) {
      toast({
        description: error.message,
        icon: "error",
        variant: "destructive",
      });
      return;
    }

    const { data: profile } = await supabase.from("profile").insert({
      userId: user?.id,
      email: user?.email,
      id: crypto.randomUUID(),
    });

    toast({
      description: "Account created successfully!",
      icon: "link",
    });
    router.push("/");
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
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          >
            <Icons.password className="size-4 fill-grey" />
          </Input>
        </div>
        <p className="body-s text-grey">
          Password must contain at least 8 characters
        </p>
        <div className="">
          <Button formAction={signup}>Create new account</Button>
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
