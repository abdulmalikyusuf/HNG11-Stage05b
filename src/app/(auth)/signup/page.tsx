import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signup } from "@/app/(auth)/actions";
import Form from "./form";

function SignUpPage() {
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
      <form className="flex flex-col gap-6">
        <Form />
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
