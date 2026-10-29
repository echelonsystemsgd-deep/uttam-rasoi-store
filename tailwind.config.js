/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F5EFE6',
          300: '#EAE1D2',
          400: '#DCCFBC',
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#F9EBE5',
          200: '#F3D2C5',
          500: '#C85A32',
          600: '#B24925',
          700: '#8E3618',
          800: '#712A12',
          900: '#541F0C',
        },
        amberSpice: {
          50: '#FDF8F0',
          100: '#FBF0DE',
          400: '#E79B48',
          500: '#D48B38',
          600: '#B87227',
          700: '#94581C',
        },
        forestSage: {
          50: '#F2F6F4',
          100: '#E1ECE6',
          500: '#3D6857',
          700: '#2C4A3E',
          800: '#223B31',
          900: '#172720',
        },
        charcoal: {
          700: '#4A4A4A',
          800: '#2E2E2E',
          900: '#1F1F1F',
          950: '#141414',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(200, 90, 50, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'warm': '0 12px 30px -6px rgba(200, 90, 50, 0.16)',
        'drawer': '-10px 0 40px -5px rgba(0, 0, 0, 0.22)',
      }
    },
  },
  plugins: [],
};
