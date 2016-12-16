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
        target: 'http://123.57.136.122:8080',
        pathRewrite: {'/api': '/mockjsdata/2/'},
        secure: false,
      },
    },
  },
};
