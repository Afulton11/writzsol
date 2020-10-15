// https://github.com/leerob/mastering-nextjs/blob/master/.eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    exmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'get-off-my-lawn'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-no-literals': 0,
    'react/display-name': 0,
    'react/no-unescaped-entities': 0,
    'sort-keys': 0,
    'objects/no-object-properties-one-line': 0,
    'node/no-unpublished-require': 0,
    'no-undef': 'error',
    camelcase: [
      'error',
      {
        allow: [
          'consumer_key',
          'consumer_secret',
          'access_token',
          'access_token_secret'
        ]
      }
    ]
  }
};
