module.exports = {
  extends: ['plugin:import/errors', 'plugin:import/warnings'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['simple-import-sort', 'import'],
  root: true, // For configuration cascading.
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
