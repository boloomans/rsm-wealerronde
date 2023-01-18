// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors
module.exports = {
  plugins: {
    tailwindcss: {config: './tailwind.config.js'}, // or name of your tailwind config file
    autoprefixer: {},
  },
};
