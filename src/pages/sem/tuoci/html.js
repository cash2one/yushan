const content = require('./content.ejs');
const layout = require('layout');

module.exports = layout.init({
  pageTitle: '拓词',
}).run(content());
