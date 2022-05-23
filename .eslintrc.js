module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript/recommended",
        "@vue/eslint-config-prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module",
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-multi-spaces": ["error"],
        "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    },
};
