import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "instrument-sans": ["var(--font-instrument-sans)", ...fontFamily.sans],
    },
    colors: {
      purple: {
        DEFAULT: "hsl(var(--purple))",
        hover: "hsl(var(--purple-hover))",
        light: "hsl(var(--purple-light))",
      },
      grey: {
        DEFAULT: "hsl(var(--grey))",
        dark: "hsl(var(--grey-dark))",
        light: "hsl(var(--grey-light))",
      },
      borders: "hsl(var(--borders))",
      white: "hsl(var(--white))",
      red: "hsl(var(--red))",
    },
    boxShadow: {
      "active-selection": "0px 0px 32px 0px #633CFF40",
      shadow: "0px 0px 32px 0px #0000001A",
    },
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;
