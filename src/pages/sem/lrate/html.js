const content = require('./content.ejs');
const layout = require('layout-without-nav');

module.exports = layout.init({
  pageTitle: '页面转化率',
}).run(content());
