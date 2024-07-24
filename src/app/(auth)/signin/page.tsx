import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signin } from "@/app/(auth)/actions";

function SignInPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="heading-m text-grey-dark">Login</h2>
        <p className="body-m text-grey">
          Add your details below to get back into the app
        </p>
      </div>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Email address</small>
          <Input placeholder="e.g. alex@mail.com" name="email" />
        </div>
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Email address</small>
          <Input
            placeholder="Enter your password"
            name="password"
            type="password"
          />
        </div>
        <div className="">
          <Button formAction={signin}>Login</Button>
        </div>
        <p className="text-center body-m">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-purple">
            Create account
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignInPage;
