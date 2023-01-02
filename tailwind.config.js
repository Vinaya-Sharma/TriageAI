/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Inter var, sans-serif",
        { fontFeatureSettings: '"cv11", "ss01"' },
      ],
    },
    extend: {
      colors: {
        myGrey: "#98A2B2",
        white: "#FFFFFF",
        backGrey: "#f7f8fB",
      },
    },
  },
  plugins: [],
};
