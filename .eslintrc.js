module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
