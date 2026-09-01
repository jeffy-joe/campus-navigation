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
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#5b46f6', // mockup main purple
          700: '#4c35e6',
          800: '#3c28c4',
          900: '#2b19a3',
          950: '#1b0d77',
        },
        navy: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155'
        },
        campus: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          accent: '#5B46F6',
          softIndigo: '#EEF2FF',
          softPurple: '#F5F3FF',
          softRose: '#FFF1F2',
          softAmber: '#FFFBEB',
          softEmerald: '#ECFDF5',
          softCyan: '#ECFEFF'
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(91, 70, 246, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(91, 70, 246, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.6)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      keyframes: {
        dash: {
          to: {
            strokeDashoffset: '-24',
          },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        }
      },
      animation: {
        'route-dash': 'dash 1.2s linear infinite',
        'pulse-slow': 'pulseSlow 2.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
