"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LinkSchema } from "@/lib/schema";

import { Button } from "@/components/ui/button";
import Image1 from "@/assets/image/let's get started.png";
import { Icons } from "@/components/ui/icons";
import AddLink from "@/components/ui/add-link";

type UseFormInputs = z.infer<typeof LinkSchema>;

function LinksPage() {
  const [show, setShow] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(LinkSchema),
    defaultValues: {
      userLinks: [
        {
          platform: "github",
          link: "https://www.github.com/johnappleseed",
        },
      ],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "userLinks",
  });

  useEffect(() => {
    console.log(fields.length);

    if (fields.length === 0) setShow(false);
  }, [fields]);

  const onValid = (data) => console.log(data);
  const onInvalid = (err) => console.log(err, fields);

  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
      className="bg-white rounded-xl w-full"
    >
      <div className="p-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="heading-m text-grey-dark">Customize your links</h2>
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
            onClick={() => {
              if (show) {
                append({
                  platform: "github",
                  link: "https://www.github.com/johnappleseed",
                });
              } else {
                setShow(true);
              }
            }}
          >
            + Add new link
          </Button>
          {show ? (
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
                <Image src={Image1} width={250} height={160} alt="" />
                <div className="text-center">
                  <h2 className="heading-m text-grey-dark">
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
      <div className="border-t border-borders py-6 px-10">
        <div className="flex justify-end">
          <Button className="w-fit" type="submit">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

export default LinksPage;
