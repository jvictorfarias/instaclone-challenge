module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'eslint-disable-next-line react/jsx-filename-extension': 'off',
    'react/jsx-filename-extension': 'off',
    'arrow-parens': 'off',
    'no-underscore-dangle': 'off',
    'react/prop-types': 'off',
  },
};
