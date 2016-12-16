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
});
