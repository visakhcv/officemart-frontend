/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'home-blue':'#1B1E5C',
        'light-gray':'#F5F5FD'
      },
      fontFamily: {
        'custom-sans': ['Headland One', 'serif'],
      }
    },
  },
  plugins: [],
}