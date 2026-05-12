import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0B0D10',
          surface: '#14171C',
          elevated: '#1C2128',
        },
        border: {
          DEFAULT: '#2A2F37',
          muted: '#1F242B',
        },
        text: {
          primary: '#E8EAED',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        accent: {
          quantum: '#7C5CFF',
          data: '#00D9C0',
          warn: '#FFB547',
          down: '#FF5C7C',
        },
        editorial: {
          cream: '#F5F1E8',
          ink: '#1A1D21',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 92, 255, 0.15), transparent 70%)',
        'subtle-grid': 'linear-gradient(rgba(42, 47, 55, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 47, 55, 0.4) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-32': '32px 32px',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
