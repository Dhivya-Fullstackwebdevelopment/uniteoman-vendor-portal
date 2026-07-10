/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D61CA8',
        secondary: '#8B2EF5',
        accent: '#4B6EF5',
      },
    },
  },
  plugins: [],
}