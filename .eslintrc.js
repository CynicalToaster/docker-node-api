module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    $dockerApi: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': ['off'],
    'no-underscore-dangle': ['off'],
    'array-callback-return': ['off'],
    'class-methods-use-this': ['off'],
    'import/no-cycle': ['off'],
    'teemill/vertical-align': ['off'],
    'linebreak-style': ['off'],

    'no-multi-spaces': [
      'off',
      {
        exceptions: {
          'Property': true,
          'AssignmentPattern': true,
          'ImportDeclaration': true,
          'VariableDeclarator': true,
          'AssignmentExpression': true,
        },
      },
    ],

    'key-spacing': ['off'],
  },
  plugins: [
    'teemill',
  ],
};
