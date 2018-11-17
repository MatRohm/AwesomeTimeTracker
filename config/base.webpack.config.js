const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const srcDir = path.resolve(__dirname, "../src/");

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
                    loader: 'style-loader/url',
                },
                {
                    loader: 'file-loader',
                    options: {
                        name: 'style.[ext]',
                    }
                }]
            }
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
        path: path.resolve(__dirname, "../_app"),
    }
};

module.exports = clientBaseConfig;