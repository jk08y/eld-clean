/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Clean Color Palette for a Native App Feel
        primary: '#06B6D4',    // Cyan/Sky Blue - Main action color (clean, fresh)
        secondary: '#34D399',  // Mint Green - Secondary action/success color
        accent: '#F97316',     // Orange - For sales/alerts/promotions
        neutral: '#1F2937',    // Dark Slate Gray - Main text color (Improved contrast)
        'base-100': '#FFFFFF', // Pure White for background
        'base-200': '#F3F4F6', // Light gray background/dividers
        'base-300': '#E5E7EB', // Border color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
