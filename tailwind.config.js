/** @type {import('tailwindcss').Config} */
import animatedTailwind  from 'tailwindcss-animated'
export default {
  content: [
	"./index.html",
	"./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
	extend: {
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif"],
    },
  },
  },
  plugins: [
    animatedTailwind
  ],
}
