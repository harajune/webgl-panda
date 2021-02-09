const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js'
  },
  module: {
      rules: [
          {
              test: /\.ts$/,
              loader: 'ts-loader'
          }
      ]
  },
  resolve: {
      extensions: ['.ts', '.js']
  },
  devtool: 'inline-source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from:'src/index.html', to:'./'} 
      ]
    }),
  ]
}