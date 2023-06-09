const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class', '.dark-mode'],
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ['var(--iv-pt-sans-font)', ...fontFamily.sans],
      body: ['var(--iv-pt-sans-font)', ...fontFamily.sans],
      title: ['var(--iv-pt-serif-font)', ...fontFamily.serif],
    },
    colors: {
      primary: {
        10: '#FDE8E9',
        900: '#ED1C24',
      },
      secondary: {
        10: '#FBF7F0',
        900: '#D6B46A',
      },
      blue: {
        10: '#E6F6FC',
        900: '#06A7E1',
      },
      green: {
        10: '#EDF8EC',
        900: '#50B847',
      },
      black: {
        900: 'black',
      },
      white: {
        900: 'white',
      },
    },
    extend: {
      container: {
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '1140px',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-headings': theme('colors.secondary.900'),
            h1: {
              fontWeight: 700
            },
          },
        },
      }),
      objectPosition: {
        'custom': '0 -240px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
}
