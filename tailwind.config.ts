import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        medcyan: {
          DEFAULT: '#00d4ff',
          50: '#e5faff',
          100: '#b3f0ff',
          200: '#80e7ff',
          300: '#4dddff',
          400: '#1ad4ff',
          500: '#00d4ff',
          600: '#00a9cc',
          700: '#007f99',
          800: '#005566',
          900: '#002a33',
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'reverse-spin': 'reverseSpin 6s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px 0 rgba(57, 255, 20, 0.4)' },
          '50%': { opacity: '.5', boxShadow: '0 0 10px 0 rgba(57, 255, 20, 0.2)' },
        },
        reverseSpin: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
