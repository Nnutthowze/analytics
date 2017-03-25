// const webpack = require('webpack');
const path = require('path');

// process.traceDeprecation = true;

module.exports = {
  // the entry file for the bundle
  entry: { app: './client/src/App.js' },
  // the bundle file we will get in the result
  output: {
    path: './client/dist/js',
    filename: '[name].js',
  },

  module: {
    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      },
    }],
  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true,
};
