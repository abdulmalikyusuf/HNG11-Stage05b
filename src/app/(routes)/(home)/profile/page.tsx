"use client";

import { Button } from "@/components/ui/button";
import ProfileForm from "./form";
import { createClient } from "@/supabase/client";
import { updateProfileInfo } from "./actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Database } from "@/supabase/database.types";
import { toast } from "@/components/ui/use-toast";

function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const [profile, setProfile] = useState<
    null | Database["public"]["Tables"]["profile"]["Row"]
  >(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/error");
        return;
      }

      const { data: profileData, error } = await supabase
        .from("profile")
        .select()
        .eq("userId", data.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(profileData);
    };

    fetchProfile();
  }, []);

  return (
    <form
      action={async (formData) => {
        try {
          await updateProfileInfo(formData).then(({ message }) =>
            toast({
              description: "Your changes have been successfully saved!",
              icon: "save",
            })
          );
        } catch (error) {
          console.log(error);
          toast({
            description: error.message,
            icon: "save",
            variant: "destructive",
          });
        }
      }}
      className="bg-white rounded-xl flex-1"
    >
      <div className="flex flex-col gap-10 p-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl leading-normal font-bold md:heading-m text-grey-dark">
            Profile Details
          </h2>
          <p className="text-grey body-m">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <ProfileForm
            key={profile?.firstName}
            profilePhoto={profile?.photo}
            defaultValues={{
              firstName: profile?.firstName as string,
              lastName: profile?.lastName as string,
              email: profile?.email as string,
            }}
          />
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

export default ProfilePage;
