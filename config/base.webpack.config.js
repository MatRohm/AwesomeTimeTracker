const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const srcDir = path.resolve(__dirname, "../src/");

const clientBaseConfig = {
    entry: [path.resolve(srcDir, "typescript/UI/app.tsx")],
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
                template: path.resolve(srcDir, "index.html"),
            },
        )
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../_dist"),
    }
};

module.exports = clientBaseConfig;