/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-10px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};