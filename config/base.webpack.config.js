const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const srcDir = path.resolve(__dirname, "../src/");
const distDir = path.resolve(__dirname, "../_app/");

// BUILD CSS
// Do not use file-loader and css-loader together
// either inject file via file-loader with style-loder/url 
// OR inject css directly via css-loader with style-loader in html dom
const clientBaseConfig = {
    entry: [path.resolve(srcDir, "app.tsx")],
    target: "web",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        sourceMap: true,
                        convertToAbsoluteUrls: true
                    }
                }, "css-loader"]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin(
            {
                title: "Custom template",
                template: path.resolve(srcDir, "index.html"),
            },
        ),
        new CopyWebpackPlugin([
            { from: path.resolve(srcDir, "assets/icon.ico"), to: distDir }
        ])
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: distDir,
    }
};

module.exports = clientBaseConfig;