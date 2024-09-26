/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4746F4',       // Primary Blue
          light: '#6A74F4',         // Light variant for hover states
          dark: '#2F34D8',          // Dark variant for active states
        },
        secondary: {
          DEFAULT: '#FFA726',       // Soft Orange
          light: '#FFB95C',         // Light variant for hover states
          dark: '#C7781C',          // Dark variant for active states
        },
        accent: '#F5F5F5',           // Light Gray for backgrounds
        text: '#333333',             // Dark Gray for text
      },
    },
  },
  plugins: [],
}
