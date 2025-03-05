import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    ignores: ['webpack.config.js', 'node_modules/', 'dist/'],
  },
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  eslintPluginPrettierRecommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
];
