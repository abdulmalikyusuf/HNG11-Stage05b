"use client";

import { useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkSchema } from "@/lib/schema";

import { Button } from "@/components/ui/button";
import Image1 from "@/assets/image/let's get started.png";
import AddLink from "@/components/ui/add-link";
import { toast } from "@/components/ui/use-toast";
import { platforms as allPlatforms } from "./platforms";
import type { SocialLink } from "@/types";
import { addPlatforms } from "@/lib/actions/platform";

export function Form({ socialLinks }: { socialLinks: SocialLink[] }) {
  const [canAddMoreFields, setCanAddMoreFields] = useState(true);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(LinkSchema),
    defaultValues: { socialLinks },
  });

  const filterDuplicates = (linksArray: SocialLink[]) => {
    const seen = new Set();
    return linksArray.filter((item) => {
      const duplicate = seen.has(`${item.url}-${item.platform}`);
      seen.add(`${item.url}-${item.platform}`);
      return !duplicate;
    });
  };

  const { fields, remove, append } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const showSaveButton = Boolean(socialLinks) && Boolean(fields);

  const appendField = () => {
    const platformsToFilter = allPlatforms.map((platform) => platform.value);
    // Extract the platforms present in the links array
    const presentPlatforms = fields.map((socialLink) => socialLink.platform);

    // Find the platforms that are missing in the links array
    const missingPlatforms = platformsToFilter.filter(
      (platform) => !presentPlatforms.includes(platform)
    );
    const nextPlatform = missingPlatforms.at(0);

    if (nextPlatform === undefined) {
      setCanAddMoreFields(false);
      return;
    }
    append({
      platform: nextPlatform,
      url: "https://www.github.com/johnappleseed",
    });
  };

  const onValid = async (data: { socialLinks: SocialLink[] }) => {
    try {
      const { success } = await addPlatforms(data);
      if (success) {
        toast({
          description: `Successfully added ${data.socialLinks.length} links`,
          icon: "link",
        });
      } else {
        toast({
          description: "An error occurred",
          icon: "error",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);

      toast({
        description: "An error occurred",
        icon: "error",
        variant: "destructive",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="bg-white rounded-xl w-full"
    >
      <div className="p-6 md:p-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl leading-normal font-bold md:heading-m text-grey-dark">
            Customize your links
          </h2>
          <p className="text-grey body-m">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Button
            className="text-center"
            variant="secondary"
            type="button"
            onClick={() => appendField()}
            disabled={!canAddMoreFields}
          >
            {canAddMoreFields
              ? "+ Add new link"
              : "No more social platform left"}
          </Button>
          {fields.length > 0 ? (
            fields.map((item, i) => (
              <AddLink
                key={item.platform}
                index={i}
                onRemove={remove}
                register={register}
                control={control}
                error={
                  Array.isArray(errors.socialLinks) &&
                  errors.socialLinks?.at(i)?.url?.message
                }
              />
            ))
          ) : (
            <div className="rounded-xl flex justify-center items-center gap-3 p-5 bg-grey-light">
              <div className="flex flex-col justify-center items-center gap-10">
                <Image
                  src={Image1}
                  width={250}
                  height={160}
                  alt=""
                  className="max-md:w-[124px] max-md:h-20"
                />
                <div className="text-center">
                  <h2 className="text-2xl leading-normal font-bold md:heading-m text-grey-dark">
                    Let’s get you started
                  </h2>
                  <p className="mt-6 text-grey body-m">
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We’re
                    here to help you share your profiles with everyone!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showSaveButton && (
        <div className="border-t border-borders p-4 md:py-6 md:px-10">
          <div className="md:flex justify-end">
            <Button className="w-full md:w-fit" type="submit">
              Save
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
