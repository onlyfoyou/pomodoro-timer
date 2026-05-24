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
        primary: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#fad7a5',
          300: '#f6b96c',
          400: '#f19331',
          500: '#ed7a16',
          600: '#de600c',
          700: '#b8490d',
          800: '#923a12',
          900: '#763111',
        },
      },
      fontFamily: {
        mono: ['"SF Mono"', '"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['"Inter"', '"SF Pro Display"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      animation: {
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
