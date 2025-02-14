import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,ts,js,jsx,mdx}', './server.js'],
  safelist: [],
  theme: {
    extend: {
      colors: {
        'title-dark': 'lab(80.574 30.6 -11.24)',
        'title-light': 'lab(58.739 56.873 -7.396)',
      },
      spacing: {
        'negative-4': '-4px',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
        blog: ['Montserrat', 'Pretendard', 'sans-serif'],
        bloglist: ['Montserrat', 'GangwonEdu', 'Pretendard', 'sans-serif'],
      },
      animation: {
        dots: 'dots 1.5s infinite steps(1, end)',
      },
      keyframes: {
        dots: {
          '0%': { '--dots': '"Loading"' },
          '25%': { '--dots': '"Loading."' },
          '50%': { '--dots': '"Loading.."' },
          '75%': { '--dots': '"Loading..."' },
          '100%': { '--dots': '"Loading."' },
        },
      },
    },
  },
  plugins: [typography],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
