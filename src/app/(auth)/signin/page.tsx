import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { signin } from "@/app/(auth)/actions";
import Form from "./form";

function SignInPage() {
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
      <form className="flex flex-col gap-6">
        <Form />
        <div className="">
          <Button formAction={signin}>Login</Button>
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
