const merge = require('webpack-merge');
const clientBaseConfig = require('./base.webpack.config');

const devConfig = {
  devtool: 'source-maps',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
};

const webpackConfig = merge(clientBaseConfig, devConfig);
module.exports = webpackConfig;
