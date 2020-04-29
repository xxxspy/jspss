const path = require('path');
const config = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

const PROD = process.env.NODE_ENV === 'production';

let plugins = [];

PROD ? [
    plugins.push(new UglifyJsPlugin())
  ] : '';

module.exports = {
  entry: path.resolve(__dirname, config.main),
  devtool: 'source-map',
  output: {
    library: process.env.NAME,
    libraryTarget: process.env.TARGET,
    path: __dirname,
    filename: (PROD) ? `build/${config.name}.min.js` : `build/${config.name}.js`
  },
  module: {
    rules: [
      {test: /\.es6?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.ts?$/, exclude: /node_modules/, loader: 'ts-loader'},
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  // plugins: plugins,
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //     }),
  //   ],
  // },
  externals: {
    '@tensorflow/tfjs': ['@tensorflow/tfjs', 'tf-node']
  }
};
