module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // 'prettier',
    // 'prettier/vue',
    // 'plugin:prettier/recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    // 'prettier'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console':'off',
    'no-var':'off',
    "no-control-regex": 'off',
    "no-array-constructor":'off'
  }
}
