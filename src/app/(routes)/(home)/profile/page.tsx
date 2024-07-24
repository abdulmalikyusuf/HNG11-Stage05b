import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";

function ProfilePage() {
  return (
    <div className="bg-white rounded-xl flex-1">
      <div className="flex flex-col gap-10 p-10">
        <div className="flex flex-col gap-2">
          <h2 className="heading-m text-grey-dark">Profile Details</h2>
          <p className="text-grey body-m">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 h-full p-5 rounded-xl bg-grey-light">
            <p className="body-m whitespace-nowrap w-60">Profile picture</p>
            <ImageUpload imageUploaded />
          </div>
          <div className="flex flex-col gap-3 p-5 rounded-xl bg-grey-light">
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="body-m text-grey whitespace-nowrap">First name*</p>
              <Input placeholder="e.g. John" className="col-span-2 w-full" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="body-m text-grey whitespace-nowrap">Last name*</p>
              <Input placeholder="e.g. Appleseed" className="col-span-2 w-full" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="body-m text-grey whitespace-nowrap">Email*</p>
              <Input
                placeholder="e.g. email@example.com"
                className="col-span-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-borders py-6 px-10">
        <div className="flex justify-end">
          <Button className="w-fit">Save</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
