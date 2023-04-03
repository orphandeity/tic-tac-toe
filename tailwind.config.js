const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        small: "10px",
        large: "15px",
      },
      colors: {
        _darkNavy: "#1A2A33",
        _darkNavySemi: "#1F3641",
        _silver: "#A8BFC9",
        _silverHover: "#DBE8ED",
        _lightBlue: "#31C3BD",
        _lightBlueHover: "#65E9E4",
        _lightYellow: "#F2B137",
        _lightYellowHover: "#FFC860",
      },
      fontFamily: {
        sans: ["OutfitVariable", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        headingLg: "40px",
        headingMd: "24px",
        headingSm: "20px",
        headingXs: "16px",
        body: "14px",
      },
      letterSpacing: {
        headingLg: "2.5px",
        headingMd: "1.5px",
        headingSm: "1.25px",
        headingXs: "1px",
        body: "0.8px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
