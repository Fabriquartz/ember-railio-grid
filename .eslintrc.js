module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    browser: true,
    es6: true
  },
  rules: {
    "array-bracket-spacing": "off",
    "object-curly-spacing":  ["error", "always"],

    "quotes":      ["error", "single", { allowTemplateLiterals: true }],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "indent":      ["error", 2, { FunctionExpression: { body: 1 },
                                  CallExpression: { arguments: "off" } }],
    "key-spacing": ["error", { multiLine: { beforeColon: false },
                               align:     { beforeColon: false, on: "value" } }],
    "max-len":     ["error", { code: 85 }],

    "max-statements-per-line": "off",
    "new-cap":                 "off",
    "operator-linebreak":      "off"
  },
  overrides: [
    // node files
    {
      files: [
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
    }
  ]
};
