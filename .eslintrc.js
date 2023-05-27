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
        semi: ['warn', 'always'],
        "react/react-in-jsx-scope": "off",
        "prefer-regex-literals": "off",
        "react/prop-types": "off"

    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
