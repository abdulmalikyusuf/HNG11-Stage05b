import { Fragment } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectSeparator,
} from "@/components/ui/select";
import { Icons } from "@/components/ui/icons";
import {
  Control,
  Controller,
  FieldErrors,
  UseFieldArrayRemove,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { z } from "zod";
import { LinkSchema } from "@/lib/schema";

const options = [
  {
    label: "Github",
    value: "github",
    icon: <Icons.github className="size-4" />,
  },
  {
    label: "LinkedIn",
    value: "linkedin",
    icon: <Icons.linkedin className="size-4" />,
  },
  {
    label: "Youtube",
    value: "youtube",
    icon: <Icons.youtube className="size-4" />,
  },
  {
    label: "Codewars",
    value: "codewars",
    icon: <Icons.codewars className="size-4" />,
  },
  {
    label: "Dev.to",
    value: "devTo",
    icon: <Icons.devTo className="size-4 fill-grey-light" />,
  },
  {
    label: "FreeCodeCamp",
    value: "freeCodeCamp",
    icon: <Icons.freeCodeCamp className="size-4" />,
  },
];
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
        {/* <Controller control={control} name={`userLinks.${index}.platform`}/> */}
        <Controller
          render={({ field }) => {
            const selectedOption = options.filter(
              (item) => item.value === field.value
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
                  {options.map((option) => (
                    <Fragment key={option.value}>
                      <SelectItem value={option.value}>
                        <span className="inline-flex items-center gap-3">
                          {option.icon}
                          {option.label}
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
