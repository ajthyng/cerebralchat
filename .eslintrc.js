module.exports = {
  root: true,
  extends: [
    "standard",
    "plugin:react/recommended"
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks'
  ],
  globals: {
    fetch: false
  },
  rules: {
    'no-unused-vars': "off",
    'react/prop-types': "off"
  }
};
