/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blau
          dark: '#1e40af',
        },
        secondary: {
          DEFAULT: '#10b981', // Grün
        },
        accent: {
          DEFAULT: '#f59e0b', // Orange
        },
        background: '#f9fafb',
      },
    },
  },
  plugins: [],
}