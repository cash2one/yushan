module.exports = {
  entry: require('./webpack-config/entry.config.js'),

  output: require('./webpack-config/output.dev.config.js'),

  module: require('./webpack-config/module.config.js'),

  resolve: require('./webpack-config/resolve.config.js'),

  plugins: require('./webpack-config/plugins.dev.config.js'),

  eslint: require('./webpack-config/vendor/eslint.config.js'),

  postcss: require('./webpack-config/vendor/postcss.config.js'),

  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.199.173:5281/',
        pathRewrite: {'/api': '/'},
        secure: false,
      },
    },
  },
};
