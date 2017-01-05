/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tb = require('./tb/table.ejs');
const tb1 = require('./tb/table1.ejs');
require('static/vendor/jquery-ui.min');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/list.min');
require('static/vendor/bootstrap-editable.min');

require('static/css/reset.css');
require('static/css/jquery-ui.min.css');
require('static/css/bootstrap-editable.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  var arr1 = $('#date1').val().split('/');
  var arr2 = $('#date2').val().split('/');
  var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
  var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
  sum('', currentAccount.appid, e, s)
});

function sum(zhe, appid, edate, sdate) {
  utils.ajax(apiUrl.getApiUrl('getRiBao'), {
    zhe: zhe,
    appid: appid,
    edate: edate,
    sdate: sdate,
  }).done(function (data) {
    console.log(data);
   /* for(var i=0;i<data[0].length;i++){
      data[0][i].active_rate=(data[0][i].active_rate*100).toFixed(2);
    }*/
    $('.tmp').html(tb({data: data[0]}));
    $('#table1').tablesorter();
    var options = {
      valueNames: ['time', 'xitong', 'acsum', 'down_sum', 'active_sum', 'liu_cun', 'down_rate', 'active_rate', 'liucun_rate', 'down_cb', 'active_cb', 'liucun_cb', 'some_cost', 'view', 'pv', 'pv_rate', 'pv_dan', 'page_active', 'btn_active', 'some_remainder', 're_point', 'shuoming']
    };
    var userList = new List('users', options);

    /****************表1结束*/
    var biao2 = [];
    for (var i = 0; i < data[1].length; i++) {

      for (var j = 0; j < data[1][i].length; j++) {
        // console.log(j);
        // data[1][i][j].date = data[0][i].date;

        biao2.push(data[1][i][j])
      }
    }
    console.log(biao2);
    $('.tmp1').html(tb1({data: biao2}));
    $('#table2').tablesorter();
    var options2 = {
      listClass: 'list1',
      sortClass:'sort1',
      searchClass: 'search1',
      valueNames: ['date','qudao','tui_jihua','ji_cost','ji_view','ji_pv','ji_pvrate','ji_pvdan','ji_btnview','ji_btnpv','ji_btncost','ji_btnviewb','ji_btncostb','ji_pagecost','ji_pageactive','ji_pageactivecb','ji_btnactive','ji_btnactivecb','ji_active','ji_activecb','remark']
    };
    var userList2 = new List('users2', options2);

    /************************/
    $('.tou_liu').editable();
    $('.beizhu').editable();
    $('.liucun1').editable();
    $('.page_active1').editable();
    $('.btn_active1').editable();
    $('.re_point1').editable();
    $('.remark1').editable();
    $('.ji_pageactive1').editable();
  });
}

function pos(date,type,active,jihuaid,all) {
  utils.ajaxPost(apiUrl.getApiUrl('getP'), {
    appid:currentAccount.appid,
    date:date,
    type:type,
    active:active,
    jihuaid:jihuaid,
    active_all:all,
  }).done(function (data) {
    console.log(data);
  });
}
$(() => {
  $('#date1').attr('value', utils.getDateStr(-2));
  $('#date2').attr('value', utils.getDateStr(-1));
  $('#zhe').val('1');
  $("input[id='date1']").datepicker();
  $("input[id='date2']").datepicker();

  $('.nav-li span').click(function () {
    $(this).addClass('ck');
    $(this).siblings().removeClass('ck');
  });
  $('.li1').click(function () {
    $('.ribao1').show();
    $('.jihua1').hide();
  });
  $('.li2').click(function () {
    $('.ribao1').hide();
    $('.jihua1').show();
  });
  $(document).on('click', '.tijiao', function () {


   /* if($(this).parents('th').attr('class').toString() == 'tou'){
        console.log('aaa')
      // if($(this).parents('th').find('a').attr('class').toString() == 'tou_liu'){

        $(this).parents('th').siblings('.lcl').text($(this).parent().siblings('.editable-input').find('input').val()+'率');
        $(this).parents('th').siblings('.liucb').text($(this).parent().siblings('.editable-input').find('input').val()+'成本');
        pos('',currentAccount.appid, '', '', '', 'all', '', false,$(this).parent().siblings('.editable-input').find('input').val(),'');

      // }
    }else{*/

      if ($(this).parents('span').attr('class').toString() == 'liu_cun') {

        const $tr = $(this).closest('tr');
        const liucun = parseFloat($tr.find('.editable-input').find('input').val());
        const sum = parseFloat($tr.find('.active_sum').text());
        const xiaofei = parseFloat($tr.find('.acsum').text());

        pos($tr.find('.time').text(),'liucun',liucun,'','');
        $tr.find('.liucun_rate').text(((liucun/sum) * 100) .toFixed(2)+ '%');
        $tr.find('.liucun_cb').text((xiaofei/liucun).toFixed(2));

      } else if ($(this).parents('span').attr('class').toString() == 'page_active') {
        // pos(parseFloat($(this).parent().siblings('.editable-input').find('input').val()), currentAccount.appid, '', $(this).parents('td').siblings('.time').text(), '', 'all', '', false,'','');
        // let a=parseInt($(this).parents('td').siblings('.btn_active').find('a').text())+ parseInt($(this).parent().siblings('.editable-input').find('input').val());
        // let b=(parseFloat($(this).parents('td').siblings('.acsum').text())/a).toFixed(2);
        // let c=((a/parseFloat($(this).parents('td').siblings('.down_sum').text()))*100).toFixed(2)+"%";
        // let d=((parseFloat($(this).parents('td').siblings('.liu_cun').find('a').text())/a)*100).toFixed(2)+"%";
        // $(this).parents('td').siblings('.active_sum').text(a);
        // $(this).parents('td').siblings('.active_cb').text(b);
        // $(this).parents('td').siblings('.active_rate').text(c);
        // $(this).parents('td').siblings('.liucun_rate').text(d);


      } else if ($(this).parents('span').attr('class').toString() == 'btn_active') {
        const $tr1 = $(this).closest('tr');
        const btn = parseFloat($tr1.find('.editable-input').find('input').val());
        let a=parseInt($tr1.find('.page_active').text())+ parseInt($tr1.find('.editable-input').find('input').val());
        let b=(parseFloat($tr1.find('.acsum').text())/a).toFixed(2);
        let c=((a/parseFloat($tr1.find('.down_sum').text()))*100).toFixed(2)+"%";
        let d=((parseFloat($tr1.find('.liu_cun').find('a').text())/a)*100).toFixed(2)+"%";
        pos($tr1.find('.time').text(),'btn',btn,'','');
        $tr1.find('.active_sum').text(a);
        $tr1.find('.active_cb').text(b);
        $tr1.find('.active_rate').text(c);
        $tr1.find('.liucun_rate').text(d);

      } else if ($(this).parents('span').attr('class').toString() == 're_point') {
        // pos(parseFloat($(this).parent().siblings('.editable-input').find('input').val()), currentAccount.appid, '', $(this).parents('td').siblings('.time').text(), '', 'fandian', '',false,'','');
        // let a=(parseFloat($(this).parents('td').siblings('.some_cost').text())/(parseFloat($(this).parent().siblings('.editable-input').find('input').val())+1)).toFixed(2);
        // let b=(a/parseFloat($(this).parents('td').siblings('.down_sum').text())).toFixed(2);
        // let c=(a/parseFloat($(this).parents('td').siblings('.liu_cun').find('a').text())).toFixed(2);
        // let d=(a/parseFloat($(this).parents('td').siblings('.active_sum').text())).toFixed(2);
        //
        // $(this).parents('td').siblings('.acsum').text(a);
        // $(this).parents('td').siblings('.down_cb').text(b);
        // $(this).parents('td').siblings('.liucun_cb').text(c);
        // $(this).parents('td').siblings('.active_cb').text(d);

      } else if ($(this).parents('span').attr('class').toString() == 'shuoming') {
        const $tr1 = $(this).closest('tr');
        const btn = parseFloat($tr1.find('.editable-input').find('textarea').val());
        // pos($tr1.find('.time').text(),'btn',btn,'');

      } else if ($(this).parents('span').attr('class').toString() == 'ji_pageactive') {
        const $tr2 = $(this).closest('tr');
        let p = $(this).parents('p').attr('class');
        let sum=$('#table2').find('.'+p).find('.ji_pageactive1');
        let tol=0;
        for(let i=0;i<sum.length;i++){
          tol+=parseFloat(sum.eq(i).text());
        }
        tol=tol+parseInt($tr2.find('.editable-input').find('input').val())-parseFloat($(this).parents('.ji_pageactive').find('.ji_pageactive1').text());
        console.log(tol);
        const h5 = parseFloat($tr2.find('.editable-input').find('input').val());
        let a=parseInt($tr2.find('.ji_btnactive').text()) + parseInt($tr2.find('.editable-input').find('input').val());
        let b=(parseFloat($tr2.find('.ji_cost').text())/a).toFixed(2);
        let c=(parseFloat($tr2.find('.ji_pagecost').text())/parseFloat($tr2.find('.editable-input').find('input').val())).toFixed(2);
        pos($tr2.find('.date').text(),'h5',h5,$tr2.attr('title'),tol);
        $tr2.find('.ji_active').text(a);
        $tr2.find('.ji_activecb').text(b);
        $tr2.find('.ji_pageactivecb').text(c);
      }else if ($(this).parents('span').attr('class').toString() == 'remark') {
        // pos('',currentAccount.appid, $(this).parent().siblings('.editable-input').find('textarea').val(), $(this).parents('td').siblings('.date').text(), '', 'plan', $(this).parents('td').siblings('.tui_jihua').text(), false,'','');

      }
    // }

  });

  $('#table1').tablesorter();
  var arr1 = $('#date1').val().split('/');
  var arr2 = $('#date2').val().split('/');
  var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
  var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
  sum(1,currentAccount.appid, e, s)
  /*$('#date1').change(function () {
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
    sum($('#zhe').val(),currentAccount.appid, e, s)
  });
  $('#date2').change(function () {

  });*/
  $('.look-jihua').click(function(){
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
    sum('',currentAccount.appid, e, s)
  });
 /* $('#zhe').change(function () {
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
    sum($(this).val(), currentAccount.appid, e, s)
  });*/
 let non=1;
 $('.zk').click(function(){
   if(non==1){
     $(this).text('合并');
     $('.m1').hide();
     $('.m2').show();
     non=0;
   }else{
     $(this).text('展开');
     $('.m2').hide();
     $('.m1').show();
     non=1;
   }
 });
  $('.out').click(function(){
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
    utils.formSubmit(apiUrl.getApiUrl('setOut'), {
      zhe: '',
      appid: currentAccount.appid,
      name: currentAccount.username,
      edate: e,
      sdate: s,
    })
  })
});
