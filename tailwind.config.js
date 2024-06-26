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
        lofi: {
          ...require("daisyui/src/theming/themes")["lofi"],
          primary: "#0F1035",
          secondary: "#365486",
          accent: "#156173",
        },
      },

      "sunset",
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
