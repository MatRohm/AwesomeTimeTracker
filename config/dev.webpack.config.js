const merge = require('webpack-merge');
const clientBaseConfig = require('./base.webpack.config');
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');
const path = require('path');


// Create one plugin for both renderer and main process
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
  // Other 'electron-connect' options
  path: path.resolve(__dirname, '../src/main.js'),
  logLevel: 0,
});

const devConfig = {
  devtool: 'source-maps',
  output: {
    devtoolModuleFilenameTemplate: '[resource-path]',
  },
  watch: true,
  target: 'electron-renderer',
  plugins: [
    ElectronReloadWebpackPlugin(),
  ],
};

const webpackConfig = merge(clientBaseConfig, devConfig);
module.exports = [webpackConfig];
