/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ⚠️ PLACEHOLDER brand blue — swap for the official CMC hex when provided.
        // Everything keys off `brand`, so changing these 4 values re-skins the site.
        brand: {
          DEFAULT: '#2C6BC0',
          dark: '#15315E',
          light: '#4D96E6',
          fg: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
