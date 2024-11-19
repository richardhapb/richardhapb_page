const astroEslintParser = require('astro-eslint-parser');
const astroPlugin = require('eslint-plugin-astro');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // Asegúrate de incluir el proyecto de TypeScript si es necesario
        // project: './tsconfig.json',
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      astro: astroPlugin,
    },
    rules: {
      // Tus reglas personalizadas
      'astro/no-unused-css-selector': 'warn',
    },
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
