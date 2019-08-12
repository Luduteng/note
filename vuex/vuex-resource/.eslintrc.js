module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 'off',
    'semi': 'off',
    'lines-between-class-members': 'off',
    'no-underscore-dangle': 'off',
    'comma-dangle': 'off',
    'prefer-destructuring': 'off',
    'no-trailing-spaces': 'off',
    'arrow-body-style': 'off',
    'no-use-before-define': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
