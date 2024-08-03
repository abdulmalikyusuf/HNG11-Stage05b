import { Icons } from "@/components/ui/icons";
import { PlatformWithLabelAndIcon } from "@/types";

export const platforms: PlatformWithLabelAndIcon[] = [
  {
    label: "Github",
    value: "github",
    icon: <Icons.github className="size-4 fill-grey" />,
  },
  {
    label: "LinkedIn",
    value: "linkedin",
    icon: <Icons.linkedin className="size-4 fill-grey" />,
  },
  {
    label: "Youtube",
    value: "youtube",
    icon: <Icons.youtube className="size-4 fill-grey" />,
  },
  {
    label: "Codewars",
    value: "codewars",
    icon: <Icons.codewars className="size-4 fill-grey" />,
  },
  {
    label: "Dev.to",
    value: "devTo",
    icon: (
      <Icons.devTo className="size-4 fill-grey [&_path:not(:first-child)]:fill-white" />
    ),
  },
  {
    label: "FreeCodeCamp",
    value: "freeCodeCamp",
    icon: <Icons.freeCodeCamp className="size-4 fill-grey" />,
  },
  {
    label: "Twitter",
    value: "twitter",
    icon: <Icons.twitter className="size-4 fill-grey" />,
  },
  {
    label: "Twitch",
    value: "twitch",
    icon: <Icons.twitch className="size-4 fill-grey" />,
  },
  {
    label: "Frontend Mentor",
    value: "frontendMentor",
    icon: <Icons.frontendMentor className="size-4 fill-grey" />,
  },
  {
    label: "Hashnode",
    value: "hashnode",
    icon: <Icons.hashnode className="size-4 fill-grey" />,
  },
  {
    label: "Stack Overflow",
    value: "stackOverflow",
    icon: <Icons.stackOverflow className="size-4 fill-grey" />,
  },
  {
    label: "Codepen",
    value: "codepen",
    icon: <Icons.codepen className="size-4 fill-grey" />,
  },
];
