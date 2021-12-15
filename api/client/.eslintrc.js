module.exports = {
  extends: ['plugin:import/errors', 'plugin:import/warnings'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'import'],
  root: true,
  rules: {
    'simple-import-sort/imports': 'warn',
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        allowSeparatedGroups: true,
        ignoreMemberSort: false,
      },
    ],
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
  },
};
