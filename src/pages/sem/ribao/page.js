/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
require('static/vendor/jquery-ui.min');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/list.min');

require('static/css/reset.css');
require('static/css/jquery-ui.min.css');
require('./page.css');

const utils = require('utils');
const apiUrl = require('static/js/api');

$(() => {
  $('.nav-li span').click(function () {
    $(this).addClass('ck');
    $(this).siblings().removeClass('ck');
  });
  $('input').blur(function(){
    // console.log('lll');
  });
});
