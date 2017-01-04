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
  fad('all');
  fad('zh');
});

function fad(type) {
  utils.ajax(apiUrl.getApiUrl('getBlacWords'), {
    appid:currentAccount.appid,
    type:type,
  }).done(function (data) {
    console.log(data);
  });

}
function ajx(words,type,source){
  utils.ajaxPost(apiUrl.getApiUrl('setBlacWords'), {
    appid:currentAccount.appid,
    words:words,
    type:type,
    yuanyin:source,
  }).done(function (data) {
    console.log(data);
  });
}
$(() => {
  fad('all');
  fad('zh');
  $(document).on('click','.del',function(){
    $(this).parents('tr').remove();
  });

  $('.left-1').click(function(){
    var l=$('.ci').eq(0).val().replace(/，/ig ,',');
    console.log(l);
    var strAry= l.split(',');
    console.log(strAry);
    var html='';
    ajx(JSON.stringify(strAry),'all',$('.yuanyin').eq(0).val());
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
    var l=$('.ci').eq(1).val().replace(/，/ig ,',');
    var strAry= l.split(',');
    var html='';
    ajx(JSON.stringify(strAry),'zh',$('.yuanyin').eq(1).val());
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


});
