module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'no-null', 'const-case', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'sort-keys': 'off',
    'sort-imports': 'off',
    'no-ternary': 'off',
    'no-undefined': 'off',
    'spaced-comment': 'off',
    'no-null/no-null': 2,
    'react/prop-types': 'off',
    'no-magic-numbers': ['error', {ignore: [0, 1]}],
    'max-lines-per-function': 'off',
    'multiline-comment-style': 'off',
    'const-case/uppercase': 'error',
    'init-declarations': 'off',
    radix: 'off',
  },
};
