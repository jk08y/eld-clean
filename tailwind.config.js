/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D9488',    // Teal
        secondary: '#3B82F6',  // Bright Blue
        accent: '#FACC15',     // Sunny Yellow
        neutral: '#374151',    // Dark Slate Gray
        'base-100': '#F8FAFC', // Very Light Gray-Blue
        'base-200': '#F1F5F9',
        'base-300': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
