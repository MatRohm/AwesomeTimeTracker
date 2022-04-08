const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcDir = path.resolve(__dirname, './src/');
const distDir = path.resolve(__dirname, './_dist/');

// BUILD CSS
// Do not use file-loader and css-loader together
// either inject file via file-loader with style-loder/url
// OR inject css directly via css-loader with style-loader in html dom
const clientBaseConfig = {
    entry: [path.resolve(srcDir, 'app.tsx')],
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use:[MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                loader: 'file-loader',
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin(
            {
                title: 'Custom template',
                template: path.resolve(srcDir, 'index.html'),
            },
        ),
        new CopyWebpackPlugin({ patterns: [{ from: path.resolve(srcDir, 'assets/icon.ico'), to: distDir }] }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: distDir,
    },
};

module.exports = clientBaseConfig;