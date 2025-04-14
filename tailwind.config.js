/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#097ef8",
          "primary-content": "#f7f7f5",
          "secondary": "#1e1e1e",
          "secondary-content": "#cdcdcd",
          "accent": "#9848e8",
          "accent-content": "#e9ddfd",
          "neutral": "#191918",
          "neutral-content": "#cbcbcb",
          "base-100": "#f7f7f5",
          "base-200": "#d7d7d5",
          "base-300": "#b7b7b6",
          "base-content": "#1f1f1f",
          "info": "#27918d",
          "info-content": "#010707",
          "success": "#27918d",
          "success-content": "#010707",
          "warning": "#ff6d00",
          "warning-content": "#160400",
          "error": "#f64932",
          "error-content": "#150201",

          "--rounded-box": ".25rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.25rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      }
    ]
  },
  plugins: [
    require("daisyui")
  ],
}

