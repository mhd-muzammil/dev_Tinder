/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <- correct glob to find your JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // keep if you want daisyui
  ],
  daisyui: {
    themes: ["dark"],
  },
};