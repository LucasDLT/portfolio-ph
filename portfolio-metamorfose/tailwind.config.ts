import { bellota } from "@/app/layout";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        shadows: ['var(--font-shadows)'],
        bellota: ['var(--font-bellota)'],
      },
    },
  },
  plugins: [],
};
