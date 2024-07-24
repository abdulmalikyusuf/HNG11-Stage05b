import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
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
      primary: {
        foreground: "hsl(var(--primary-foreground))",
      },
      grey: {
        DEFAULT: "hsl(var(--grey))",
        dark: "hsl(var(--grey-dark))",
        light: "hsl(var(--grey-light))",
      },
      borders: "hsl(var(--borders))",
      secondary: {},
      white: "hsl(var(--white))",
      red: "hsl(var(--red))",
    },
    boxShadow: {
      "active-selection": "0px 0px 32px 0px #633CFF40",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
