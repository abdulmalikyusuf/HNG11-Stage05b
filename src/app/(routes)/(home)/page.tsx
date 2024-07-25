"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LinkSchema } from "@/lib/schema";

import { Button } from "@/components/ui/button";
import Image1 from "@/assets/image/let's get started.png";
import AddLink from "@/components/ui/add-link";
import { updateProfile } from "@/app/(routes)/(home)/profile/actions";
import { createClient } from "@/supabase/client";

type UseFormInputs = z.infer<typeof LinkSchema>;

function LinksPage() {
  const [links, setLinks] = useState<null | UseFormInputs["userLinks"]>(null);
  const supabase = createClient();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(LinkSchema),
    defaultValues: {
      userLinks: links
        ? links
        : [
            {
              platform: "github",
              link: "https://www.github.com/johnappleseed",
            },
          ],
    },
  });

  useEffect(() => {
    fetchLinks().then((res) => {
      setLinks(res?.links as UseFormInputs["userLinks"]);
      reset({
        userLinks: res?.links || [
          {
            platform: "github",
            link: "https://www.github.com/johnappleseed",
          },
        ],
      });
    });
  }, []);

  const filterDuplicates = (linksArray) => {
    const seen = new Set();
    return linksArray.filter((item) => {
      const duplicate = seen.has(`${item.link}-${item.platform}`);
      seen.add(`${item.link}-${item.platform}`);
      return !duplicate;
    });
  };
  const fetchLinks = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const userId = session?.user?.id as string;

    const { data, error } = await supabase
      .from("profile")
      .select("*") // Adjust to select specific columns if needed
      .eq("userId", userId)
      .single(); // Use ;
    return data;
  };
  const { fields, remove, append } = useFieldArray({
    control,
    name: "userLinks",
  });

  const appendField = () => {
    const platformsToFilter = [
      "github",
      "freeCodeCamp",
      "codewars",
      "youtube",
      "linkedin",
      "devTo",
    ];
    // Extract the platforms present in the links array
    const presentPlatforms = fields.map((link) => link.platform);

    // Find the platforms that are missing in the links array
    const missingPlatforms = platformsToFilter.filter(
      (platform) => !presentPlatforms.includes(platform)
    );
    if (missingPlatforms.length === 0) return;
    append({
      platform: missingPlatforms.at(0),
      link: "https://www.github.com/johnappleseed",
    });
  };
  console.log(fields);

  const onValid = (data: {
    userLinks: {
      platform: string;
      link: string;
    }[];
  }) => {
    updateProfile({ links: filterDuplicates(fields) });
  };
  const onInvalid = (err) => console.log(err, fields);

  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
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
          >
            + Add new link
          </Button>
          {fields.length > 0 ? (
            fields.map((item, i) => (
              <AddLink
                key={item.link}
                index={i}
                onRemove={remove}
                register={register}
                control={control}
                error={
                  Array.isArray(errors.userLinks) &&
                  errors.userLinks?.at(i)?.link?.message
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

export default LinksPage;
