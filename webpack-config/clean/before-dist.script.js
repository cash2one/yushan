var fs = require('fs');
var rimraf = require('rimraf');
var dirVars = require('../base/dir-vars.config.js');
rimraf(dirVars.distDir, fs, function cb() {
  console.log('dist目录已清空');
});
