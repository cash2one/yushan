/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');


require('static/css/reset.css');
require('static/vendor/Tabullet');
require('./page.css');

const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();

});

$(() => {
  $(document).on('click','.del',function(){
    $(this).parents('tr').remove();
  });

  $('.left-1').click(function(){
    var l=$('.ci').eq(0).val().replace('，', ',');
    var strAry= l.split(',');
    var html='';
    for(let i=0;i<strAry.length;i++){
      html+='<tr>';
      html+='<td>' +$('.yuanyin').eq(0).val();
      html+='</td>';
      html+='<td>' +strAry[i];
      html+='</td>';
      html+='<td><button class="del" disabled>删除</button></td>';
      html+='</tr>';
    }

    $('#myTable .list').prepend(html);
    $('.yuanyin').eq(0).val('');
    $('.ci').eq(0).val('');
  });
  $('.left-2').click(function(){
    var l=$('.ci').eq(1).val().replace('，', ',');
    var strAry= l.split(',');
    var html='';
    for(let i=0;i<strAry.length;i++){
      html+='<tr>';
      html+='<td>' +$('.yuanyin').eq(1).val();
      html+='</td>';
      html+='<td>' +strAry[i];
      html+='</td>';
      html+='<td><button class="del" disabled>删除</button></td>';
      html+='</tr>';
    }

    $('#table .list').prepend(html);
    $('.yuanyin').eq(1).val('');
    $('.ci').eq(1).val('');
  });


  /*utils.ajax(apiUrl.getApiUrl('getSKWord'), {
    appid: $('.appid').val(),
    date: $('.time').val(),
  }).done(function (data) {
    datas = data;
    $('#tb').html(tb({ data: datas }));
    $('#myTable').tablesorter();
  });*/

});
