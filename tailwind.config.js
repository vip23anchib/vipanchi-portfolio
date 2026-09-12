/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transit: {
          dark: '#0C0E14',
          board: '#12151F',
          card: '#181C28',
          hover: '#202636',
          border: '#283044',
          muted: '#8B949E',
          light: '#F3F4F6',
        },
        metro: {
          backend: '#0057B8',   // Vignelli Blue
          data: '#FF6319',      // Subway Orange
          ml: '#80397B',        // Metropolitan Purple
          frontend: '#00933C',  // Transit Green
          yellow: '#FFD100',    // Signage Yellow
          amber: '#F59E0B',
          red: '#EE352E',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'station-pulse': 'stationPulse 2s ease-in-out infinite',
        'train-pulse': 'trainPulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        stationPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.35)', opacity: '0.6' },
        },
        trainPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(255, 209, 0, 0.8))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(255, 209, 0, 1))' },
        }
      }
    },
  },
  plugins: [],
}
