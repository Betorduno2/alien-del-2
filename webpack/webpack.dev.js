const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../www'), // Reemplaza contentBase por static
    },
    hot: true, // Activa la recarga en caliente (Hot Module Replacement)
    port: 8080,
  },
});