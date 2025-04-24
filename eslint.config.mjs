import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";  // 호환성
import _import from "eslint-plugin-import";

import localRules from "eslint-plugin-local-rules";
import optimizeRegex from "eslint-plugin-optimize-regex";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

// eslint-disable-next-line es/no-import-meta
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var flatCompat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    {
        extends: [
            ...fixupConfigRules(
                flatCompat.extends(
                    "eslint:recommended",
                    "plugin:es/restrict-to-es2018",
                    "plugin:no-unsanitized/recommended-legacy",
                    "plugin:jsdoc/recommended"
                )
            ),
        ],
        plugins: {
            import: fixupPluginRules(_import),
            "local-rules": localRules,
            "optimize-regex": optimizeRegex,
            sonarjs,
            unicorn,
        },
        ignores: [
            "node_modules/**",
            "js/tests/*",
            "js/vendor/**",
            "dist/**",
            "public/images/*",
            "scripts/*",
            "*.sh",
            "*.xml",
            "eslint-local-rules.js",
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            ecmaVersion: 2020,
            sourceType: "module",
        },
        settings: {
            polyfills: [
                "Array.findLast",
                "Array.flat",
                "Array.flatMap",
                "document.exitFullscreen",
                "navigator.locks",
                "Object.fromEntries",
                "Promise.allSettled",
                "Promise.withResolvers",
                "queueMicrotask",
                "reportError",
                "requestIdleCallback",
                "scheduler",
                "structuredClone",
                "WeakRef",
            ],

            lintAllEsApis: true,
        },

        rules: {
            "array-callback-return": 2,
            "block-scoped-var": 2,
            "brace-style": [2, "stroustrup"],
            "comma-style": [2, "last"],
            complexity: [2, 18],
            "consistent-this": [2, "self"],
            "consistent-return": 0,
            curly: [2, "all"],
            "default-param-last": 2,
            "dot-notation": 2,
            "eol-last": 2,
            eqeqeq: [2, "smart"],
            "for-direction": 2,
            "func-call-spacing": [2, "never"],
            "guard-for-in": 1,

            "id-length": [
                2,
                {
                    min: 1,
                    max: 29,
                },
            ],

            "keyword-spacing": [2, {}],
            "linebreak-style": 2,
            "max-classes-per-file": [1, 4],
            "max-depth": [2, 5],
            "max-len": [2, 120],
            "max-params": [2, 7],
            "no-alert": 2,
            "no-caller": 2,
            "no-console": 0,

            "no-constant-condition": [
                2,
                {
                    checkLoops: false,
                },
            ],

            "no-constructor-return": 2,
            "no-dupe-else-if": 2,
            "no-else-return": 2,

            "no-empty-function": [
                2,
                {
                    allow: ["constructors"],
                },
            ],

            "no-eq-null": 2,
            "no-eval": 2,
            "no-extend-native": 2,
            "no-extra-bind": 2,

            "no-extra-parens": [
                1,
                "all",
                {
                    conditionalAssign: false,
                },
            ],

            "no-floating-decimal": 2,
            "no-global-assign": 2,

            "no-implicit-coercion": [
                2,
                {
                    allow: ["!!", "+"],
                },
            ],

            "no-implied-eval": 2,
            "no-import-assign": 2,
            "no-invalid-this": 0,
            "no-irregular-whitespace": 2,
            "no-lone-blocks": 2,
            "no-lonely-if": 2,
            "no-loop-func": 2,
            "no-loss-of-precision": 1,
            "no-mixed-spaces-and-tabs": 2,
            "no-multi-str": 2,
            "no-negated-condition": 2,
            "no-new": 2,
            "no-new-func": 2,
            "no-new-wrappers": 2,
            "no-prototype-builtins": 0,

            "no-restricted-properties": [
                2,
                {
                    property: "innerHTML",
                },
                {
                    property: "outerHTML",
                },
            ],

            "no-return-assign": 2,
            "no-return-await": 2,
            "no-script-url": 2,
            "no-self-compare": 2,
            "no-sequences": 2,
            "no-setter-return": 2,
            "no-shadow-restricted-names": 2,
            "no-trailing-spaces": 2,
            "no-throw-literal": 2,
            "no-undef": 0,
            "no-undef-init": 2,
            "no-unmodified-loop-condition": 2,
            "no-unneeded-ternary": 2,
            "no-unused-expressions": 2,

            "no-unused-vars": [
                2,
                {
                    vars: "local",
                    args: "after-used",
                },
            ],

            "no-useless-call": 2,

            "no-useless-computed-key": [
                2,
                {
                    enforceForClassMembers: true,
                },
            ],

            "no-useless-concat": 2,
            "no-useless-constructor": 2,
            "no-useless-return": 2,

            "no-use-before-define": [
                2,
                {
                    functions: false,
                },
            ],

            "no-void": 2,
            "no-with": 2,
            "no-whitespace-before-property": 2,
            "object-shorthand": [2],

            "one-var": [
                2,
                {
                    initialized: "never",
                },
            ],

            "operator-assignment": 2,

            "prefer-arrow-callback": [
                2,
                {
                    allowNamedFunctions: true,
                },
            ],

            "prefer-const": [
                2,
                {
                    destructuring: "all",
                },
            ],

            "prefer-destructuring": [
                1,
                {
                    object: true,
                    array: false,
                },
            ],

            "prefer-numeric-literals": 2,
            "prefer-regex-literals": 1,
            "prefer-rest-params": 1,
            "prefer-spread": 1,
            "prefer-template": 1,
            "rest-spread-spacing": 2,
            semi: [2, "always"],
            "space-before-function-paren": [2, "never"],
            "space-in-parens": [2, "never"],
            "space-infix-ops": 2,

            "space-unary-ops": [
                2,
                {
                    words: false,
                    nonwords: false,
                },
            ],

            "spaced-comment": [2, "always"],
            strict: [2, "function"],
            "switch-colon-spacing": 2,
            "unicode-bom": 2,

            "wrap-iife": [
                2,
                "inside",
                {
                    functionPrototypeMethods: true,
                },
            ],

            yoda: [2, "never"],

            indent: [
                2,
                4,
                {
                    SwitchCase: 1,
                    outerIIFEBody: "off",

                    FunctionDeclaration: {
                        parameters: "first",
                    },

                    FunctionExpression: {
                        parameters: "first",
                    },

                    CallExpression: {
                        arguments: "first",
                    },

                    ArrayExpression: "first",
                    ObjectExpression: "first",
                    ignoredNodes: ["JSXElement"],
                },
            ],

            "no-restricted-syntax": [
                "error",
                {
                    selector: "CallExpression[callee.name='gSetTimeout']",
                    message: "Forbidden function call.",
                },
                {
                    selector: "CallExpression[callee.name='api_req']",
                    message:
                        "This function is deprecated, use api.req(), api.screq() or api.send() depending your use-case.",
                },
            ],

            "es/no-atomics": 2,
            "es/no-bigint": "off",
            "es/no-exponential-operators": 2,
            "es/no-object-fromentries": "off",
            "es/no-promise-all-settled": "off",
            "es/no-regexp-lookbehind-assertions": 2,
            "es/no-regexp-named-capture-groups": 2,
            "es/no-regexp-s-flag": 2,
            "es/no-regexp-unicode-property-escapes": "off",
            "es/no-trailing-function-commas": 2,
            "local-rules/classes": 2,
            "local-rules/good-boy": 2,
            "local-rules/hints": 2,
            "local-rules/misc-warnings": 1,
            "local-rules/open": 2,
            "optimize-regex/optimize-regex": 2,
            "sonarjs/cognitive-complexity": [1, 48],

            "sonarjs/no-duplicate-string": [
                1,
                {
                    threshold: 6,
                },
            ],

            "unicorn/catch-error-name": [
                2,
                {
                    name: "ex",
                },
            ],

            "unicorn/consistent-destructuring": 1,
            "unicorn/consistent-empty-array-spread": 1,
            "unicorn/consistent-function-scoping": 1,
            "unicorn/error-message": 2,
            "unicorn/no-abusive-eslint-disable": 2,
            "unicorn/no-array-push-push": 1,
            "unicorn/no-await-in-promise-methods": 2,
            "unicorn/no-instanceof-array": 2,
            "unicorn/no-invalid-remove-event-listener": 2,
            "unicorn/no-length-as-slice-end": 2,
            "unicorn/no-magic-array-flat-depth": 1,
            "unicorn/no-negation-in-equality-check": 2,
            "unicorn/no-single-promise-in-promise-methods": 2,
            "unicorn/no-this-assignment": 2,
            "unicorn/no-typeof-undefined": 2,
            "unicorn/no-useless-fallback-in-spread": 2,
            "unicorn/no-useless-promise-resolve-reject": 1,
            "unicorn/no-useless-spread": 1,
            "unicorn/no-useless-switch-case": 2,
            "unicorn/prefer-array-some": 2,
            "unicorn/prefer-date-now": 2,
            "unicorn/prefer-default-parameters": 1,
            "unicorn/prefer-dom-node-dataset": 2,
            "unicorn/prefer-includes": 1,
            "unicorn/prefer-keyboard-event-key": 1,
            "unicorn/prefer-logical-operator-over-ternary": 2,
            "unicorn/prefer-math-min-max": 1,
            "unicorn/prefer-modern-dom-apis": 1,
            "unicorn/prefer-modern-math-apis": 1,
            "unicorn/prefer-native-coercion-functions": 2,
            "unicorn/prefer-negative-index": 2,
            "unicorn/prefer-object-from-entries": 1,
            "unicorn/prefer-set-has": 1,
            "unicorn/prefer-set-size": 1,
            "unicorn/prefer-spread": 1,
            "unicorn/prefer-structured-clone": 1,
            "unicorn/prefer-ternary": 1,
        },
    },
]);
