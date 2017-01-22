const content = require('./content.ejs');
const layout = require('layout');

module.exports = layout.init({
  pageTitle: '分组管理详情',
}).run(content());
