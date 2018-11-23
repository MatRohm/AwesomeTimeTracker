const clientBaseConfig = require('./dev.webpack.config');
const merge = require('webpack-merge');
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');
const path = require('path');

// Create one plugin for both renderer and main process
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
  // Other 'electron-connect' options
  path: path.resolve(__dirname, '../src/main.js'),
  logLevel: 0,
});

const electonConfig = {
  watch: true,
  target: 'electron-renderer',
  plugins: [
    ElectronReloadWebpackPlugin(),
  ],
};

const webpackConfig = merge(clientBaseConfig, electonConfig);
module.exports = webpackConfig;
