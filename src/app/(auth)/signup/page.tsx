import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { signup } from "@/app/(auth)/actions";

function SignUpPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="heading-m text-grey-dark">Create account</h2>
        <p className="body-m text-grey">
          Let’s get you started sharing your links!
        </p>
      </div>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Email address</small>
          <Input
            placeholder="e.g. alex@mail.com"
            type="email"
            name="email"
            id="email"
          >
            <Icons.email className="size-4 fill-grey" />
          </Input>
        </div>
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Create password</small>
          <Input
            placeholder="At least 8 characters"
            name="password"
            id="password"
          />
        </div>
        <div className="flex flex-col gap-2">
          <small className="body-s text-grey-dark">Confirm password</small>
          <Input
            placeholder="At least 8 characters"
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>
        <p className="body-s text-grey">
          Password must contain at least 8 characters
        </p>
        <div className="">
          <Button formAction={signup}>Create new account</Button>
        </div>
        <p className="text-center body-m">
          Already have an account?{" "}
          <Link href="/signin" className="text-purple">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignUpPage;
