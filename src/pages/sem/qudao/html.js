const content = require('./content.ejs');
const layout = require('layout');

module.exports = layout.init({
  pageTitle: '渠道',
}).run(content());
