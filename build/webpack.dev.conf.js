var webpack = require('webpack')
var path = require('path')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
module.exports = {
  entry: {
    index: ['./index.js', '../build/dev-client.js']
  },
  context: path.resolve(__dirname, '../src'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}