import type { Config } from 'tailwindcss'
const plugin = require('tailwindcss/plugin')

// @ts-ignore
const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-x-180': {
      transform: 'rotateX(180deg)',
    },
  })
})

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'theme-primary-dark': '#0F2137',
        'theme-primary-light': '#254887',
        'theme-gradient-1-from': '#1E3C72',
        'theme-gradient-1-to': '#2A5298',
        'theme-gradient-2-from': '#FFFDE6',
        'theme-gradient-2-to': '#E0EFFA',
        'theme-light-gray': 'rgba(224,239,250,0.35)',
        'theme-button-primary': '#1F3E76',
        'theme-dark-gray': '#343D48',
        'theme-teal': '#3FDBB1',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [rotateX],
}
export default config
