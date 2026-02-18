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
        'theme-primary': '#1F3E76',
        'theme-primary-fg': '#FFFFFF',
        'theme-secondary': '#FFFFFF',
        'theme-secondary-fg': '#343D48',
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
        quicklend: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#baddff',
          300: '#8cbff6',
          400: '#5ea1ed',
          500: '#3083e4',
          600: '#0066db',
          700: '#0254b6',
          800: '#084695',
          900: '#0d3e7b',
          950: '#0a2851',
        },
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(251, 191, 36, 0.6)" },
        },
        "pulse-glow-blue": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 102, 219, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 102, 219, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-glow-blue": "pulse-glow-blue 2s ease-in-out infinite",
      },
    },
  },
  plugins: [rotateX],
}
export default config
