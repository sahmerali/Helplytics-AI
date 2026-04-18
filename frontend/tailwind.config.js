/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#1a2b25',
          800: '#223026',
        },
        teal: {
          600: '#0f8b71',
          500: '#12a688',
        },
        beige: {
          50: '#fcfbf9',
          100: '#fdfbf7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
