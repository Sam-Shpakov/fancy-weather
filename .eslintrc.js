module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest": true
    },
    "extends": [
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "jsx": true,
        "useJSXTextNode": true
    },
    "plugins": [
        "@typescript-eslint/eslint-plugin"
    ],
    "rules": {
        "no-unused-vars": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-dupe-class-members": "error",
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/rule-name": "error",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/class-literal-property-style": "error",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@@typescript-eslint/explicit-member-accessibility": "error",
    }
};