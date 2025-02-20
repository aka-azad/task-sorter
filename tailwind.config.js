import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        default: {
          primary: "#0284c7",

          secondary: "#F5A8EE",

          accent: "#8DCA72",

          neutral: "#0369a1",

          "base-100": "#C9E7E8",

          info: "#fda4af",

          success: "#166534",

          warning: "#facc15",

          error: "#be123c",
        },
      },
      {
        nightTheme: {
          primary: "#c4d831",

          secondary: "#402B93",

          accent: "#1B522F",

          neutral: "#0369a1",

          "base-100": "#173536",

          info: "#fda4af",

          success: "#166534",

          warning: "#facc15",

          error: "#be123c",
        },
      },
    ],
  },
};
