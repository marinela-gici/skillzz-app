/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main': '#f8fafc',
      },
      boxShadow: {
        'box': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
