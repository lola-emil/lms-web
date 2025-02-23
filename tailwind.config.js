/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["autumn"],
  },
  plugins: [
    require("daisyui")
  ],
}

