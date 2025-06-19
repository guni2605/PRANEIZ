/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        cursive: ['"Dancing Script"', "cursive"],
        serifElegant: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
}



