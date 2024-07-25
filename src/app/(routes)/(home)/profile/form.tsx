"use client";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileFormSchema } from "@/lib/schema";

type IFormInputs = z.infer<typeof profileFormSchema>;

function ProfileForm({
  defaultValues,
  profilePhoto,
}: {
  defaultValues: { firstName: string; lastName: string; email: string };
  profilePhoto: string;
}) {
  const {
    register,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-3 h-full p-5 rounded-xl bg-grey-light">
        <p className="body-m whitespace-nowrap w-60">Profile picture</p>
        <ImageUpload profilePhoto={profilePhoto} />
      </div>
      <div className="flex flex-col gap-3 p-5 rounded-xl bg-grey-light">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-1 md:gap-4">
          <p className="body-s md:body-m text-grey whitespace-nowrap">
            First name*
          </p>
          <div className="col-span-2">
            <Input
              placeholder="e.g. John"
              className=""
              {...register("firstName")}
              error={errors.firstName?.message}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-1 md:gap-4">
          <p className="body-s md:body-m text-grey whitespace-nowrap">
            Last name*
          </p>
          <div className="col-span-2">
            <Input
              placeholder="e.g. Appleseed"
              className="col-span-2 w-full"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-1 md:gap-4">
          <p className="body-s md:body-m text-grey whitespace-nowrap">Email*</p>
          <div className="col-span-2">
            <Input
              placeholder="e.g. email@example.com"
              className="col-span-2 w-full"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileForm;
