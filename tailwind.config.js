/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F4E7FF",
          100: "#E3C8FF",
          200: "#CDA0FF",
          300: "#B373FF",
          400: "#9A47FF",
          500: "#7F00FF",
          600: "#6300CC",
          700: "#480099",
          800: "#2D0066",
          900: "#16003C",
        },
        blush: {
          50: "#FFF0F6",
          100: "#FFD6E7",
          200: "#FFB3C7",
          300: "#FF8FB0",
          400: "#FF6C9A",
          500: "#FF4A85",
        },
        peach: {
          50: "#FFF5E8",
          100: "#FFE3C8",
          200: "#FFCC9F",
          300: "#FFB574",
          400: "#FF9B4A",
          500: "#FF8200",
        },
      },
    },
  },
  plugins: [],
}

