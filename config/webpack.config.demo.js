const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const config = require('./webpack.config.base');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.ts'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css"
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../src/demo'),
        to: path.resolve(__dirname, '../demo')
      }]
    })
  ],
  output: {
    path: path.join(__dirname, '../demo'),
    publicPath: '/',
    filename: "index.js",
    chunkFilename: '[name].js',
    libraryTarget: "umd",
    libraryExport: config.libraryExport,
    library: config.libraryName,
    umdNamedDefine: true,
  },
  module: {
    rules: [{
        test: /.ts?$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ],
        loader: 'ts-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts']
  },
  devtool: 'source-map'
};