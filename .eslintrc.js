/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'vuetify',
    './.eslintrc-auto-import.json',
    '@vue/standard',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
