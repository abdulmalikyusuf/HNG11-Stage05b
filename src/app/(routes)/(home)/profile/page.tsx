import { Button } from "@/components/ui/button";
import ProfileForm from "./form";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { updateProfileInfo } from "./actions";

async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/error");
  }
  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("userId", user.id)
    .single();

  return (
    <form action={updateProfileInfo} className="bg-white rounded-xl flex-1">
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
            profilePhoto={data?.photo}
            defaultValues={{
              firstName: data?.firstName as string,
              lastName: data?.lastName as string,
              email: data?.email as string,
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
