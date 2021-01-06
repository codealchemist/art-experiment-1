const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['.js']
  },
  devServer: {
    publicPath: "/",
    contentBase: "./public",
    hot: true
  }
}
