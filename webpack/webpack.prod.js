const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  stats: 'errors-warnings',
  output: {
    filename: '[name].[contenthash].bundle.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          filename: '[name].[contenthash].bundle.js'
        }
      }
    }
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
  },
});