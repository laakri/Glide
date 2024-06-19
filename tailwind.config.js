/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        sunset: {
          ...require("daisyui/src/theming/themes")["sunset"],
          primary: "#72ddf7",
        },
      },

      "light",
      "dark",
      "synthwave",
      "night",
      "luxury",
      "black",
      "dracula",
      "forest",
    ],
  },
};
