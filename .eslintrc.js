module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true
    },
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: ["react"],
  parser: "babel-eslint",
  rules: {
    "react/prop-types": 0
  }
};
