"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { profileFormSchema } from "@/lib/schema";
import { updateUser } from "@/lib/actions/user";

type IFormInputs = z.infer<typeof profileFormSchema>;

function ProfileForm({
  userId,
  defaultValues,
  profilePhoto = null,
}: {
  defaultValues: { firstName: string; lastName: string; email: string };
  profilePhoto: string | null;
  userId: string;
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
    <form
      action={async (formData) => {
        try {
          await updateUser(formData).then(() =>
            toast({
              description: "Your changes have been successfully saved!",
              icon: "save",
            })
          );
        } catch (error) {
          console.log(error);
          toast({
            description: "Error in updating Profile",
            icon: "save",
            variant: "destructive",
          });
        }
      }}
    >
      <div className="flex flex-col gap-6">
        <input type="hidden" name="userId" value={userId} />
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
            <p className="body-s md:body-m text-grey whitespace-nowrap">
              Email*
            </p>
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
      </div>
      <div className="border-t border-borders p-4 md:py-6 md:px-10">
        <div className="md:flex justify-end">
          <Button className="w-full md:w-fit" type="submit">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;
