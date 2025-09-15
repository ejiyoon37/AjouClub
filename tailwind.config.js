/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    
      colors: {
        white: '#FFFFFF',
        'white-85': 'rgba(255, 255, 255, 0.85)',
        black: '#14181B',
        'bg': 'rgba(0, 0, 0, 0.5)',

        red: {
          50: '#FFE8E8',
          300: '#FE5454',
        },

        gray: {
          50: '#F6F7F8',
          100: '#E9EDF0',
          200: '#C9D1D9',
          300: '#B7BFC8',
          400: '#A0AAB0', 
          500: '#808A96',
          600: '#6E757D',
          700: '#5A6167',
          800: '#3F454A',
          900: '#262931',
        },

        blue: {
          50: '#EAF0FF',
          100: '#E0E8FF',
          200: '#BFD0FF',
          300: '#3168FF',
          400: '#2C5EE6',
          500: '#2753CC',
          600: '#254EBF',
          700: '#1D3E99',
          800: '#162F73',
          900: '#112459',
        },},

        fontFamily: {
            sans: ['"Wanted Sans"', 'system-ui', 'sans-serif'],
        },
        },
        
    plugins: [
      require('@tailwindcss/line-clamp'),
    ],

    } 
}
