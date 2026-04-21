/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        void: '#030508',
        obsidian: '#080d14',
        ink: '#0e1621',
        slate: '#1a2333',
        muted: '#8892a4',
        ghost: '#c4cdd9',
        snow: '#eef2f7',
        azure: '#4f8ef7',
        cyan: '#00d4ff',
        violet: '#8b5cf6',
        ember: '#ff6b35',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
