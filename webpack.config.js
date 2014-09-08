module.exports = {
  entry: './demo.js',
  output: {
    filename: './demo-built.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};