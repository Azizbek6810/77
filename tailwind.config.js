/** @type {import('tailwindcss').Config} */
export default {
  content: ['*.html'],
  theme: {
    extend: {
      colors:{
        black: "#000",
        primary: "#28cb8b",
        secondary: "#263238",
        info: "#2194f3",
        white: {
          DEFAULT: "#fff",
          100:"#f5f7fa"
        }
      }
    },
  },
}

