/* eslint-disable no-undef */

const prettierConfig = {
    ...require('@quave/eslint-config-quave/prettier.config')
  };
  
  module.exports = {
    ...prettierConfig,
    plugins: [require('prettier-plugin-tailwindcss')]
  };
  