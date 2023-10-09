/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary_green': '#6ecb96',
        'primary_pink': '#ff8194' 
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
