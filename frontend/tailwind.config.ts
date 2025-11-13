import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./libs/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["from-[#A51E22]", "to-red-600"],
  theme: {
    extend: {
      screens: {
        'custom': { 'min': '1320px', 'max': '1600px' },
      },
      colors: {
        ...colors
      },
      textColor: {
        customRed: "#A51E22",
        primary: "#565656",
        secondary: "#C3C6D1",
        tertiary: "#858997",
        danger: "#FF675B",
        label: "#C7C7C7",
        dark: "#4d4d4d",
        light: {
          100: "#809FB8",
          200: "#87C6E8",
        },
        success: {
          100: "#1AD598",
        },
      },
      backgroundColor: {
        customRed: "#A51E22",
        primary: "#87C6E8",
        secondary: "#F5F5F5",
        danger: "#FF675B",
        bg: "#F8F8F8",
        light: {
          100: "#C3C6D129",
        },
        success: {
          100: "#1AD5984D",
          200: "#28B1A5",
        },
      },
      borderColor: {
        primary: "#87C6E8",
        secondary: "#F5F5F5",
        tertiary: "#E5E5E5",
        danger: "#FF675B",
        dark: "#4d4d4d",
        light: {
          100: "##D9E1E7CC",
        },
        success: {
          100: "#28B1A5",
        },
      },
      fontSize: {
        lg: "36px",
        md: "20px",
        sm: "14px",
        xs: "12px",
      },
      lineHeight: {
        lg: "50px",
        md: "27px",
        sm: "21px",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans Variable", "sans-serif"],
        sans: ["Plus Jakarta Sans Variable", "sans-serif"],
        body: ["Plus Jakarta Sans Variable", "sans-serif"],
        Bebas: ["MyFont", "sans-serif"],
        mono: ['var(--font-bebas-neue)'],
      },
      boxShadow: {
        primaryBtn: "0px 4px 8px #0000001F",
        sidebar: "18px 4px 35px #00000005",
        card: "0px 4px 4px #0000000A",
        chartCard: "0px 10px 30px #13171F33",
      },
    },
  },
  plugins: [],
});
export default config;
