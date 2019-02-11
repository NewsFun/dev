module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['plugin:vue/essential', 'standard'],
  plugins: ['vue'],
  rules: {
  //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'space-before-function-paren': 'off',
    'semi': 'off',
  //   'indent': 'off',
  //   'object-curly-spacing': 'off',
  //   'quotes': 'off',
  //   'no-eval': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
