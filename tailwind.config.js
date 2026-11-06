/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#5a8eff',
          500: '#3568f6',
          600: '#1f47db',
          700: '#1937b0',
          800: '#172f8a',
          900: '#162a6e',
          950: '#101a45',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ece9fe',
          200: '#dad5fd',
          300: '#bcaafb',
          400: '#9a7bf5',
          500: '#7c54ed',
          600: '#6a35e1',
          700: '#5828c6',
          800: '#4a24a1',
          900: '#3f2180',
          950: '#271356',
        },
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(22, 42, 110, 0.10), 0 4px 24px -4px rgba(22, 42, 110, 0.08)',
        glow: '0 0 0 1px rgba(53, 104, 246, 0.08), 0 8px 40px -8px rgba(53, 104, 246, 0.35)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'bounce-dot': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'pulse-soft': 'pulse-soft 1.6s ease-in-out infinite',
        'bounce-dot': 'bounce-dot 1.2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
