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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        veg: {
          DEFAULT: "hsl(var(--veg))",
          foreground: "hsl(var(--veg-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Semantic artisan aliases to ensure backwards compatibility with any existing classnames
        cream: {
          50: '#FAF8F5',
          100: '#F6F1EA',
          200: '#EFE7DC',
          300: '#E2D5C3',
          400: '#D5C3AB',
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
          700: '#22583F',
          800: '#1B4733',
          900: '#143526',
        },
        charcoal: {
          600: '#736B63',
          700: '#4A4641',
          800: '#2D2A26',
          900: '#1C1917',
          950: '#121110',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 16px -2px rgba(28, 25, 23, 0.06), 0 2px 4px -1px rgba(28, 25, 23, 0.03)',
        'warm': '0 10px 25px -4px rgba(200, 90, 50, 0.12)',
        'drawer': '-10px 0 40px -5px rgba(28, 25, 23, 0.25)',
      }
    },
  },
  plugins: [],
};
