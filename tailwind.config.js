/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#14a800',
        secondary: {
          light: '#82aba1',
          DEFAULT: '#13544e'
        },
        card: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#374151'
        },
        tertiary: {
          light: '#f3f3f6',
          DEFAULT: '#001e00',
          dark: '#1b3a13'
        },
        theme: {
          light: '#f3f5f7',
          dark: '#1f2937'
        },
        tag: {
          DEFAULT: '#e4ebe4',
          dark: '#d1d5db'
        }
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
        heading: ['Georgia', 'serif']
      },
      screens: {
        sm: '576px',
        // => @media (min-width: 576px) { ... }

        md: '960px',
        // => @media (min-width: 960px) { ... }

        lg: '1440px'
        // => @media (min-width: 1440px) { ... }
      }
    }
  },
  plugins: [require('flowbite')]
}
