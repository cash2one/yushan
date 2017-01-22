const content = require('./content.ejs');
const layout = require('layout');

module.exports = layout.init({
  pageTitle: '新建账户',
}).run(content());
