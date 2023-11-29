module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: [
    // 'eslint:recommended',
    '@tencent/eslint-config-tencent',
  ],
  rules: {
    'max-classes-per-file': 'off',
    'space-before-function-paren': 'off',
    // 单行最大长度
    'max-len': ['error', { code: 3000 }],
    'no-unused-vars': 1,
  },
  globals: {
    vscode: true,
  },
};

