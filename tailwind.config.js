/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        easter: {
          pink: '#FFB6C1',
          blue: '#ADD8E6',
          yellow: '#FFFACD',
          purple: '#E6E6FA',
          green: '#98FB98'
        }
      },
      animation: {
        'hop': 'hop 0.8s ease-in-out infinite',
      },
      keyframes: {
        hop: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

