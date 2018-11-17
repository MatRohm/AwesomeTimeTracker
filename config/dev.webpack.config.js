const path = require("path");
const createElectronReloadWebpackPlugin = require("electron-reload-webpack-plugin");
const merge = require('webpack-merge');
const clientBaseConfig = require('./base.webpack.config');

// Create one plugin for both renderer and main process
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
  // Other 'electron-connect' options
  path: path.resolve(__dirname, "../main.js"),
  logLevel: 0,
});

const devConfig = {
  devtool: "inline-source-map",
  watch: true,
};

const electonConfig = {
  target: "electron-renderer",
  plugins: [
    ElectronReloadWebpackPlugin(),
  ],
};

const webpackConfig = merge(clientBaseConfig, devConfig, electonConfig);
module.exports = [webpackConfig];