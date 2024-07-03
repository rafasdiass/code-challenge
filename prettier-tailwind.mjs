// prettier-tailwind.mjs
import prettierConfig from './prettier.config.cjs';
import tailwindPlugin from 'prettier-plugin-tailwindcss';

export default {
  ...prettierConfig,
  plugins: [tailwindPlugin]
};
