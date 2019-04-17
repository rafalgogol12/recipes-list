const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin('style.css', { allChunks: false });

module.exports = {
  entry: [
    // "babel-polyfill",
    "./src/index.tsx",
    './src/styles/style.scss'
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, './public/assets'),
    publicPath: '/assets',
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: ["babel-loader", "awesome-typescript-loader"]},
      {
        test: /\.(css|scss)$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules'],
              sourceMap: true
            }
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  plugins: [
    extractSass
  ]
};