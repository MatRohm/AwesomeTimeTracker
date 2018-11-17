const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const createElectronReloadWebpackPlugin = require("electron-reload-webpack-plugin");
const merge = require('webpack-merge');

console.log("app", path.resolve(__dirname, "./_dist/bundle.js"));

// Create one plugin for both renderer and main process
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
    // Other 'electron-connect' options
    path: path.resolve(__dirname, "./main.js"),
    logLevel: 0,
});

const clientConfig = {
    entry: [path.resolve("./src/typescript/UI/app.tsx")],
    devtool: "inline-source-map",
    target: "web",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: "Custom template",
                template: path.resolve("./src/index.html"),
            },
        )
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "_dist"),
    },
    watch: true,
};

const electonConfig = merge(clientConfig, {
    target: "electron-renderer",
    plugins: [
        ElectronReloadWebpackPlugin(),
    ],
});

module.exports = [clientConfig, electonConfig];
