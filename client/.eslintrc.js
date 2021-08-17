module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
        "plugin:vue/essential",
        "@vue/standard",
        "@vue/typescript"
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "semi": 0,
        "quotes": 0,
        "space-before-function-paren": 0,
        "vue/html-self-closing": 0,
        "no-console": 0,
        "indent": ["error", 4],
        "eol-last": 0,
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
        "brace-style": "off",
        "comma-dangle": "off",
        "no-unneeded-ternary":"off"
    },
    parserOptions: {
      parser: "@typescript-eslint/parser"
    }
  }