const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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

var webpackConfigs = {
    dev: {
        devServer: {
            port: 8089,
            hot: true,
            static: path.resolve(__dirname, "public"),
        },
        entry: "./src/index.js", // 애플리케이션 진입점
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "filedownloader.js",
        },
        optimization: {
            // We no not want to minimize our code.
            minimize: false,
            sideEffects: true,
            usedExports: true,
        },
        module: {
            rules: [
                {
                    test: /\.css$/, // CSS 파일 처리
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/, // 이미지 파일 처리
                    type: "asset/resource",
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: BABEL_LOADER_OPTIONS,
                        },
                    ],
                },
            ],
        },
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
                    NODE_ENV: JSON.stringify("development"),
                    BROWSER: JSON.stringify(true),
                },
                userDefinedProperties: JSON.stringify("devdev"),
            }),
            new CleanWebpackPlugin(),
        ],
        mode: "development",
    },
    dist: {
        entry: "./src/index.js", // 애플리케이션 진입점
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "filedownloader.js",
        },
        optimization: {
            // We no not want to minimize our code.
            minimize: false,
            sideEffects: true,
            usedExports: true,
        },
        module: {
            rules: [
                {
                    test: /\.css$/, // CSS 파일 처리
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|gif)$/, // 이미지 파일 처리
                    type: "asset/resource",
                },
            ],
        },
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
                    NODE_ENV: JSON.stringify("production"),
                    BROWSER: JSON.stringify(true),
                },
                userDefinedProperties: 1111111111,
            }),
            new CleanWebpackPlugin(),
        ],
        mode: "production",
    },
};

module.exports =
  webpackConfigs[process.env.NODE_ENV == "production" ? "dist" : "dev"];
