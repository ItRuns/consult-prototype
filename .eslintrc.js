module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: '@itruns',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'max-len': ['error', 120],
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'prefer-template': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'promise/always-return': 0,
    'no-console': 0,
    'func-names': 0,
    'no-param-reassign': 0,
  }
}
