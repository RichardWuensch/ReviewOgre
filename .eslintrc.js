module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest": true,
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: ['error', 'always'],
    "react/react-in-jsx-scope": "off",
    "prefer-regex-literals": "off",
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
