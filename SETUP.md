# filedownload

## 초기화

```
npm init -y
```

## node 버전 지정

- volta 설치

    nvm은 수동이고 volta는 프로젝트 설정으로 자동변경이 가능하다

    ```
    # PowerShell에서 실행
    winget install Volta.Volta
    ```

- package.json 수정

    ```json
    "engines": {
        "node": "18.20.0"
    },
    "volta": {
        "node": "18.20.0"
    },
    ```

## webpack 설치

```
npm install --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server
```

## webpack plugin 설치

### html-webpack-plugin 설치

html에 bundle된 javascript 자동 주입

html에는 main.js를 추가할 필요 없음

`webpack.config.js`에 plugin 추가

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        templateParameters: {
            env: process.env.NODE_ENV === "production" ? "(운영용)" : "(개발용)",
        },
        filename: "index.html",
    }),
],

```

### clean-webpack-plugin 설치

npm script 수행 전 build결과물 자동삭제

```
npm install --save-dev clean-webpack-plugin
```

`webpack.config.js`에 plugin 추가

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        templateParameters: {
            env: process.env.NODE_ENV === "production" ? "(운영용)" : "(개발용)",
        },
        filename: "index.html",
    }),
    new CleanWebpackPlugin(),   // 선언
],

```

### DefinePlugin 추가 (설치❌)

별도의 환경변수를 추가하여 javascript에서 활용 할 수 있다

- webpack.config.js

    ```javascript
    plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        templateParameters: {
        env: process.env.NODE_ENV === "production" ? "(운영용)" : "(개발용)",
        },
        filename: "index.html",
    }),
    new webpack.DefinePlugin({
        "process.env": {
        NODE_ENV: JSON.stringify("production"),   // 기본제공 됨
        BROWSER: JSON.stringify(true),
        },
        userDefinedProperties : 1111111111
    }),
    new CleanWebpackPlugin(),
    ],
    ```

- main.js

    ```javascript
    console.log("userDefinedProperties", userDefinedProperties);
    ```

## babel 설치

```
npm install --save-dev @babel/core @babel/cli @babel/preset-env babel-loader

npm install --save-dev babel-plugin-minify-constant-folding babel-plugin-minify-dead-code-elimination babel-plugin-minify-guarded-expressions

npm install --save-dev @babel/plugin-transform-runtime @babel/plugin-transform-class-properties @babel/plugin-proposal-decorators
```

- webpack.config.js

    ```javascript
    var BABEL_LOADER_OPTIONS = {
    plugins: [
        "@babel/plugin-transform-runtime",
        "babel-plugin-minify-constant-folding",
        "babel-plugin-minify-guarded-expressions",
        [
        "babel-plugin-minify-dead-code-elimination",
        {
            keepFnName: true,
            keepClassName: true,
        },
        ],
    ],
    presets: [
        [
        "@babel/preset-env",
        {
            debug: true,
            loose: true,
            exclude: [
            "@babel/plugin-transform-parameters",
            "@babel/plugin-transform-typeof-symbol",
            "@babel/plugin-transform-template-literals",
            ],
        },
        ],
    ],
    comments: false,
    };

    ```

- .babelrc 파일 생성

    ```json
    {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": {
                        "safari": "14"
                    }
                }
            ]
        ],
        "env": {
            "development": {
                "plugins": [
                    [
                        "@babel/plugin-proposal-decorators",
                        {
                            "legacy": true
                        }
                    ],
                    [
                        "@babel/plugin-transform-class-properties",
                        {
                            "loose": true
                        }
                    ]
                ]
            },
            "production": {
                "plugins": [
                    [
                        "@babel/plugin-proposal-decorators",
                        {
                            "legacy": true
                        }
                    ],
                    [
                        "@babel/plugin-transform-class-properties",
                        {
                            "loose": true
                        }
                    ]
                ]
            }
        }
    }
    ```

## ESlint

- 참고 링크
    - https://medium.com/ekino-france/migrate-to-eslint-9-x-29727f790249

    - https://velog.io/@iberis/%EC%82%AC%EB%82%B4-ESLint-Prettier-%EA%B3%B5%EC%9C%A0-%EC%84%A4%EC%A0%95-%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0feat.-pnpm-eslint-9

    - https://developer.skao.int/projects/ska-ems-portal-webapp/en/latest/eslintSetup.html

    - https://github.com/bloomberg/stricli/blob/main/eslint.config.mjs

    - https://github.com/issue-ops/parser/blob/main/eslint.config.mjs

- ESLint 설치

    ```
    npm install --save-dev eslint eslint-plugin-compat eslint-plugin-es eslint-plugin-local-rules eslint-plugin-no-unsanitized eslint-plugin-optimize-regex eslint-plugin-sonarjs eslint-plugin-unicorn

    npm install globals @eslint/js @eslint/eslintrc -D

    npm install --save-dev eslint-plugin-jsdoc eslint-plugin-import

    npm install @eslint/compat -D
    ```

- eslint.config.mjs 생성

    ```javascript
    import path from "node:path";
    import { fileURLToPath } from "node:url";

    import { defineConfig } from "eslint/config";
    import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";  //호환성
    import _import from "eslint-plugin-import";

    import localRules from "eslint-plugin-local-rules";
    import optimizeRegex from "eslint-plugin-optimize-regex";
    import sonarjs from "eslint-plugin-sonarjs";
    import unicorn from "eslint-plugin-unicorn";
    import globals from "globals";
    import js from "@eslint/js";
    import { FlatCompat } from "@eslint/eslintrc";

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const flatCompat = new FlatCompat({
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

                parserOptions: {
                    ecmaFeatures: {},
                },
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
    ```

- eslint-local-rules.js 생성

    ```javascript
    'use strict';

    function traverse(node) {
        while (node) {
            switch (node.type) {
                case 'CallExpression':
                    node = node.callee;
                    break;
                case 'MemberExpression':
                    node = node.object;
                    break;
                case 'Identifier':
                    return node;
                default:
                    node = null;
                    break;
            }
        }
        return false;
    }

    function xpath(node, path) {
        path = String(path).split('/');

        var i = 0;
        var l = path.length;

        while (node && l > i) {
            const loc = path[i++].split('[');

            if ((node = node[loc[0]]) && loc.length > 1) {
                const [prop, value] = loc[1].slice(0, -1).split('=');

                if (node[prop] !== value) {
                    node = null;
                    break;
                }
            }
        }

        return node || false;
    }

    module.exports = {
        'open': {
            meta: {
                docs: {
                    description: 'Ensure safe window.open() calls.',
                    category: 'possible-errors',
                    recommended: true
                },
                schema: []
            },
            create(context) {
                return {
                    Identifier(node) {
                        if (node.name === 'open') {
                            const parent = xpath(node, 'parent/type');
                            const args = 'MemberExpression' === parent ? xpath(node, 'parent/parent/arguments')
                                : parent === 'CallExpression' && xpath(node, 'parent/arguments');

                            if (args && (args.length < 3
                                || !String(args[2].value).includes('noopener')
                                || !String(args[2].value).includes('noreferrer'))) {

                                let a0 = args[0] || false;
                                if (a0.type === 'BinaryExpression') {
                                    do {
                                        a0 = a0.left || false;
                                    }
                                    while (a0.type === 'BinaryExpression');
                                }
                                if (a0.type === 'CallExpression') {
                                    a0 = a0.callee.name;
                                }
                                else if (a0.type === 'Literal') {
                                    a0 = a0.value;
                                }

                                if (!/^(?:GET|POST|https:\/\/mega\.(?:nz|io)|get(?:App)?BaseUrl)\b/.test(a0)) {

                                    context.report(node,
                                        'If this is a window.open() call, it must be explicitly invoked with noopener|noreferrer.'
                                    );
                                }
                            }
                        }
                    },
                };
            }
        },
        'good-boy': {
            meta: {
                docs: {
                    description: 'Eslint rules for some safe practices.',
                    category: 'possible-errors',
                    recommended: true
                },
                schema: []
            },
            create(context) {
                return {
                    FunctionExpression(node) {

                        if (node.id && node.id.name === 'populate_l') {
                            const escaped = new Set();
                            const unescaped = new Map();
                            const {body = false} = node.body;

                            for (let i = body.length; i--;) {
                                let {left, right} = xpath(body[i], 'expression[type=AssignmentExpression]');

                                if ((left = traverse(left)).name === 'l') {

                                    switch ((right = traverse(right)).name) {
                                        case 'l': {
                                            const p = xpath(right, 'parent/property');
                                            unescaped.set(right, p.name || p.value);
                                            break;
                                        }
                                        case 'escapeHTML': {
                                            const p = xpath(left, 'parent/property');
                                            escaped.add(p.name || p.value);

                                            const [a0] = xpath(right, 'parent/arguments');
                                            if (a0.type === 'CallExpression' && traverse(a0).name === 'l') {

                                                context.report(a0,
                                                    'This will yield a TypeError if the locale string becomes ' +
                                                    'unavailable, wrap it in a template-literal if you do *really* ' +
                                                    'have to mutate it prior to the escapeHTML() call.');
                                            }
                                            break;
                                        }
                                        default:
                                            if (right.type === 'Identifier') {

                                                context.report(right, `Missing call to escapeHTML(${right.name}*)`);
                                            }
                                    }
                                }
                            }

                            for (const [node, value] of unescaped) {

                                if (!escaped.has(value)) {

                                    context.report(node, `Missing call to escapeHTML(l['${value}'])`);
                                }
                            }
                        }
                    },
                };
            }
        },
        'hints': {
            meta: {
                docs: {
                    description: 'ESLint rule for some miscellaneous stuff.',
                    category: 'possible-errors',
                    recommended: true
                },
                schema: []
            },
            create(context) {
                return {
                    MemberExpression(node) {
                        if (node.parent.type === 'AssignmentExpression') {
                            const {
                                object: {
                                    name: o,
                                    property: {name: op} = false
                                },
                                parent: {
                                    right: {type: as} = false
                                },
                                property: {name: p}
                            } = node;

                            if (o === "$" && p === "dialog") {
                                context.report(node,
                                    'Overwriting $.dialog is discouraged, handling of' +
                                    ' new dialogs should be achieved through M.safeShowDialog(), see MR!1419');
                            }
                            else if ((o === 'location' && p === 'href')
                                || p === "location" && (o === "window" || o === 'self')) {

                                context.report(node,
                                    'Assigning to (self|window).location.* will not work over our browser extension.');
                            }
                            else if (op === 'prototype' && as === 'ArrowFunctionExpression') {

                                context.report(node, 'Unexpected arrow-function assignment on prototypal method.');
                            }
                        }
                    },
                    NewExpression(node) {
                        if (node.callee.name === 'MegaPromise' && !node.arguments.length && node.parent.type !== 'CallExpression') {
                            context.report(node,
                                'New code should use the native Promise implementation instead of MegaPromise, ' +
                                'or provide an executor to the MegaPromise constructor. ' +
                                'The promisify() helper function is worth looking into as well.');
                        }
                    },
                    Identifier(node) {
                        // Enforce the use of toArray.apply(null, arguments)
                        if (node.name === "arguments" && xpath(node, 'parent/callee/property/name') !== 'apply') {
                            // do not complain about safe property access (i.e. length, or by idx)
                            if (xpath(node, 'parent/property/type') === false) {
                                context.report(node, 'The `arguments` object must not be passed or leaked anywhere.');
                            }
                        }
                    },
                    TryStatement(node) {
                        context.report(node,
                            'The use of try/catch statements can impact performance, they must be isolated ' +
                            'to a minimal function so that the main code is not affected. ' +
                            'I.e. consider using our tryCatch() helper.');
                    }
                };
            }
        },
        'misc-warnings': {
            meta: {
                docs: {
                    description: 'ESLint rule for some miscellaneous stuff.',
                    category: 'enhancements',
                    recommended: true
                },
                schema: []
            },
            create(context) {
                return {
                    MemberExpression(node) {
                        const obj = node.object.name;
                        const prop = node.property.name;

                        if (prop === 'forEach') {
                            context.report(node, 'Prefer for() loops instead of Array.forEach');
                        }
                        else if (obj === 'localStorage' && !/^test|[Dd]ebug/.test(prop)) {
                            context.report(node, 'Do not abuse localStorage, ' +
                                'consider using sessionStorage or M.setPersistentData() instead.');
                        }
                    }
                };
            }
        },
        'classes': {
            meta: {
                docs: {
                    description: 'ESLint rules for es6+ classes and related.',
                    category: 'suggestion',
                    recommended: 'strict'
                },
                schema: []
            },
            create(context) {
                return {
                    ClassBody(node) {
                        // xxx: Based on typescript-eslint/no-extraneous-class.ts
                        const {parent, body} = node;

                        if (parent && !parent.superClass) {

                            if (body.length === 0) {

                                context.report(node, 'Unexpected empty class.');
                            }
                            else {
                                let onlyStatic = true;
                                let onlyConstructor = true;

                                for (const prop of body) {

                                    if (prop.kind === 'constructor') {

                                        if (prop.value.params.length) {
                                            onlyStatic = false;
                                            onlyConstructor = false;
                                        }
                                    }
                                    else {
                                        onlyConstructor = false;

                                        if ('static' in prop && !prop.static) {
                                            onlyStatic = false;
                                        }
                                    }

                                    if (!(onlyStatic || onlyConstructor)) {
                                        break;
                                    }
                                }

                                if (onlyConstructor) {
                                    context.report(node, 'Unexpected class with only a constructor.');
                                }
                                if (onlyStatic) {
                                    context.report(node, 'Unexpected class with only static properties.');
                                }
                            }
                        }
                    },
                    VariableDeclaration(node) {
                        // xxx: like no-implicit-globals, but only for const/let (aka, lexicalBindings)

                        if (node.kind === "const" || node.kind === "let") {

                            if (node.parent && node.parent.type === 'Program') {

                                context.report(node, `Unexpected globally-scoped '${node.kind}' usage.`);
                            }
                        }
                    }
                };
            }
        }
    };
    ```

## Prettier 설치



## EditorConfig 설정

- EditorConfig Extension 설치 [다운로드](https://marketplace.visualstudio.com/items/?itemName=EditorConfig.EditorConfig)

- .editorconfig 생성

    ```
    # editorconfig.org
    root = true

    [*]
    charset = utf-8
    end_of_line = lf
    insert_final_newline = true
    indent_size = 4
    indent_style = space
    max_line_length = 120
    trim_trailing_whitespace = true
    ```

## OS 상관없이 NODE_ENV 설정 하려면

1. cross-env 설치

    ```
    npm install --save-dev cross-env
    ```

2. package.json script 추가

    ```json
    "scripts": {
    "build": "cross-env webpack",
    "start": "cross-env webpack serve",
    "build-prod": "cross-env NODE_ENV=production webpack",
    "start-prod": "cross-env NODE_ENV=production webpack serve"
    }
    ```

## 참고

 - [프론트엔드-개발환경](https://velog.io/@jakeseo_me/series/프론트엔드-개발환경)
 - [Webpack프로젝트](https://velog.io/@tkdals0978/Webpack5-loader)
