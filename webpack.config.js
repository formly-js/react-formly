module.exports = {
  entry: './index.js',
  output: {
    filename: 'dist/react-formly.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};