/** @type {import('prettier').Config} */
const config = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
};

module.exports = config;
