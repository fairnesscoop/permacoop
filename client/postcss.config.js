const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.svelte', './src/template.html'],
  safelist : {
    standard : [/^(event-)\w*/],
    deep : [/^(theme-dark)/]
  },
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    purgecss,
    cssnano({
      preset: 'default',
    }),
  ]
};
