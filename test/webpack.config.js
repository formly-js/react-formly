module.exports = {
  entry: './test/index.js',
  output: {
    filename: './test/index-built.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }
    ]
  }
};