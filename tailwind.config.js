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
        obsidian: {
          DEFAULT: '#080B10',
          50: '#141A24',
          100: '#10151E',
          200: '#0C1017',
          300: '#080B10',
          400: '#05070A',
        },
        surface: {
          950: '#0A0E15',
          900: '#0F141E',
          850: '#131A26',
          800: '#182130',
          700: '#222E42',
          600: '#334155',
        },
        cyan: {
          glow: '#00F2FE',
          electric: '#00D2B4',
        },
        emerald: {
          telemetry: '#10B981',
          accent: '#059669',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(0, 242, 254, 0.25)',
          slate: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'grid-scroll': 'gridScroll 20s linear infinite',
        'radar': 'radar 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      backgroundImage: {
        'cyber-grid': "radial-gradient(rgba(0, 242, 254, 0.12) 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
