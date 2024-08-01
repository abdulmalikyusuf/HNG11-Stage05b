import { Fragment } from "react";
import {
  Control,
  Controller,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectSeparator,
} from "@/components/ui/select";
import { platforms } from "@/app/(routes)/(home)/platforms";
import { LinkSchema } from "@/lib/schema";

type UseFormInputs = z.infer<typeof LinkSchema>;
type Props = {
  index: number;
  onRemove: UseFieldArrayRemove;
  register: UseFormRegister<{
    userLinks: {
      platform: string;
      link: string;
    }[];
  }>;
  control: Control<
    {
      userLinks: {
        platform: string;
        link: string;
      }[];
    },
    any
  >;
  error: string;
};
function AddLink({ index, onRemove, register, control, error }: Props) {
  return (
    <div className="bg-grey-light p-5 rounded-xl flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <button type="button" className="inline-flex items-center gap-2">
          <svg
            width="12"
            height="6"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="12" height="1" fill="#737373" />
            <rect y="5" width="12" height="1" fill="#737373" />
          </svg>
          <span className="text-base font-bold text-grey">
            Link #{index + 1}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="capitalize body-m text-grey"
        >
          remove
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <small className="body-s text-grey-dark">Platform</small>
        <Controller
          render={({ field }) => {
            const selectedOption = platforms.filter(
              (platform) => platform.value === field.value
            );

            return (
              <Select
                key={field.value}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue>
                    <span className="inline-flex items-center gap-3 capitalize">
                      {selectedOption.at(0)?.icon}
                      {selectedOption.at(0)?.label}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <Fragment key={platform.value}>
                      <SelectItem value={platform.value}>
                        <span className="inline-flex items-center gap-3 capitalize">
                          {platform.icon}
                          {platform.label}
                        </span>
                      </SelectItem>
                      <SelectSeparator />
                    </Fragment>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
          name={`userLinks.${index}.platform`}
          control={control}
        />
      </div>
      <div className="flex flex-col gap-1">
        <small className="body-s text-grey-dark">Link</small>
        <Input
          {...register(`userLinks.${index}.link`)}
          placeholder="e.g. https://www.github.com/johnappleseed"
          error={error}
        />
      </div>
    </div>
  );
}

export default AddLink;
