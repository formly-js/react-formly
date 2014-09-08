var webpack = require('webpack');

module.exports = {
  output: {
    path: 'dist',
    filename: 'react-formly.js',
    library: 'ReactFormly',
    libraryTarget: 'umd'
  },

  externals: {
    react: 'React'
  },

  debug: false,
  devtool: false,
  entry: './index.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['','.js']
  },

  module: {
    loaders: [
      { test: /src\/.*\.js$/, loader: 'jsx-loader' }
    ]
  }
};