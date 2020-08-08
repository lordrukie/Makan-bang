module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-restricted-globals': 0,
    'no-alert': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
