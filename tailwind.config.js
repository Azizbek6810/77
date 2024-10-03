/** @type {import('tailwindcss').Config} */
export default {
  content: ['*.html'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#16191D"
        },
        primary: "#28cb8b",
        secondary: "#263238",
        info: "#2194f3",
        white: {
          DEFAULT: "#fff",
          100: "#f5f7fa"
        },
        grey: "#F0F3F7"
      },
      fontFamily: {
        'inter': ["Inter"]
      },
      boxShadow: {
        '3xl': '0px 4px 16px 0px rgba(23, 24, 26, 0.02)',
        '4xl': '0px 4px 15px 0px rgba(56, 143, 243, 0.12)'
      }
    },
  },
}

