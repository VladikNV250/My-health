import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          300: '#eb694f',
          400: '#e95639',
          500: '#E74424',
          600: '#cf3d20',
        },
        slate: {
          150: '#EDF1F6',
        },
        second: '#E79924',
        third: '#7EE724',
      },
      position: {
        '1/2m': '-50%',
      }
    },
  },
  plugins: [],
};
export default config;
