module.exports = {
  darkMode: ['class', '.dark-mode'],
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'PT-Sans', 'sans-serif'],
      title: ['Inter', 'system-ui', 'sans-serif'],
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
    },
    extend: {
      container: {
        screens: {
          sm: '100%',
          md: '100%',
          lg: '940px',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
