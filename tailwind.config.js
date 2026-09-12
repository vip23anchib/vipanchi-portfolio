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
        paper: {
          bg: '#FAF8F4',
          card: '#FFFFFF',
          warm: '#F4EFE6',
          muted: '#EAE4D9',
          border: '#DDD6C9',
          dark: '#1E222B',
        },
        ink: {
          primary: '#1A1E29',
          secondary: '#4A5262',
          muted: '#768092',
          light: '#A0A9B8',
        },
        metro: {
          backend: '#1B5FA8',   // Classic Transit Blue
          data: '#E05A2B',      // Warm Transit Coral/Orange
          ml: '#7E347D',        // Deep Transit Violet
          frontend: '#1B824C',  // Rich Forest Transit Green
          gold: '#D99B16',      // Warm Station Gold
          accent: '#C73E3A',    // Transit Crimson
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'paper': '0 4px 20px -2px rgba(30, 34, 43, 0.08), 0 2px 6px -1px rgba(30, 34, 43, 0.04)',
        'paper-lg': '0 12px 36px -4px rgba(30, 34, 43, 0.12), 0 4px 12px -2px rgba(30, 34, 43, 0.06)',
        'paper-card': '0 2px 8px -1px rgba(30, 34, 43, 0.06), 0 1px 3px rgba(30, 34, 43, 0.04)',
        'tactile': '0 8px 24px -3px rgba(30, 34, 43, 0.15)',
      },
      animation: {
        'station-pulse': 'stationPulse 2.5s ease-in-out infinite',
        'pin-bounce': 'pinBounce 2s ease-in-out infinite',
      },
      keyframes: {
        stationPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.25)', opacity: '0.6' },
        },
        pinBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
}
