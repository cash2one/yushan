const tb = require('./tpl/table.ejs');
const searchTb = require('./tpl/searchTable.ejs');
require('static/vendor/jquery.tablesorter.min');
require('./wu.css');
const utils = require('utils');
const apiUrl = require('static/js/api');

let datas = {};

$(() => {
  $('.sub').click(function () {
    utils.ajax(apiUrl.getApiUrl('getSKWord'), {
      appid: $('.appid').val(),
      date: $('.time').val(),
    }).done(function (data) {
      datas = data;
      $('#tb').html(tb({ data: datas }));
      $('#myTable').tablesorter();
    });
  });
  $(document).on('click', '.js-op', function () {
    var key = $(this).data('key');
    var list = datas[key];
    $('#tb1').html(searchTb({ data: list }));
    $('#myTable1').tablesorter();
  });

  $('#btn').click(function () {
    $('#tb').html(tb({ data: datas }));
    $('#myTable').tablesorter();
  });

  $('.export').click(function () {
    utils.formSubmit(apiUrl.getApiUrl('addKeyWords'), { data: JSON.stringify([{ plan: '计划1', unit: '单元1', matchModel: '短语-同义包含', isuse: '启用', price: '0.45', url: 'http://yxy.yushan.mobi/yuxuey/lp1?c1=4849216d176b4e27af9116822e472cb1&c2=002&c3=lp1&c4=y2&baidu_sem={keywordid}_{keyword}', keywords: ['111', '2222', '33333'] },
      { plan: '计划1', unit: '单元2', matchModel: '短语-同义包含', isuse: '启用', price: '0.45', url: 'http://yxy.yushan.mobi/yuxuey/lp1?c1=4849216d176b4e27af9116822e472cb1&c2=002&c3=lp1&c4=y2&baidu_sem={keywordid}_{keyword}', keywords: ['111', '2222', '33333'] },
      { plan: '计划2', unit: '单元1', matchModel: '短语-同义包含', isuse: '启用', price: '0.45', url: 'http://yxy.yushan.mobi/yuxuey/lp1?c1=4849216d176b4e27af9116822e472cb1&c2=002&c3=lp1&c4=y2&baidu_sem={keywordid}_{keyword}', keywords: ['111', '2222', '33333'] }]) });
  });
});
