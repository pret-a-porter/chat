const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(path.join(__dirname, 'src', 'app')),
  entry: {
    app: path.resolve(path.join(__dirname, 'src', 'app', 'index.js'))
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.resolve(path.join(__dirname, 'src')),
    hot: true,
    historyApiFallback: {
      index: '/app/index.html'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: [
            'es2015',
            'react'
          ],
          plugins: []
        },
        include: [
          path.resolve(__dirname, 'src', 'app')
        ]
      }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[path]__[local]--[hash:base64:5]'
          }
        }, {
          loader: 'postcss-loader'
        }]
      }
    ]
  }
};
