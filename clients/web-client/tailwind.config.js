/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A5D6A7", // verde pastel
        secondary: "#81C784",
        accent: "#C8E6C9",
        background: "#F1F8E9",
        text: "#2E7D32"
      }
    }
  },
  plugins: []
};
