/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tmp = require('./tb/table.ejs');
const tmp1 = require('./tb/tableGood.ejs');
const tmp2 = require('./tb/tableBad.ejs');
require('static/vendor/jquery-ui.min');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/list.min');

require('static/css/reset.css');
require('static/css/jquery-ui.min.css');
require('./page.css');

const utils = require('utils');
const apiUrl = require('static/js/api');

var i = 1;

function top200(str, name, us) {
  var arr = $('#date').val().split('/');
  var date = arr[2] + '-' + arr[0] + '-' + arr[1];
   $('.q').remove();
   $('.key').text('');
   $('.yc').text('');
   $('.zc').text('');
   $('.yz').text('');
   $('.look1').text('');
   $('.llow').text('');
   $('.lhigh').text('');
   $('.clow').text('');
   $('.chigh').text('');
  shua(str, date, name, us);
  utils.ajax(apiUrl.getApiUrl('getTop'), {
    appid: str,
    date: date,
    user: name,
    us: us,
    page: 'new_Top200关键词',
  }).done(function (data) {
     // console.log(data);
     var el;
     el = data;
     console.log(el);
     for (let i = 0; i < el.length; i++) {
       if (el[i].view_change < 0) {
         el[i].view_change = '<span style="color: #00B19D !important;">' + el[i].view_change + '</span>';
       } else {
         el[i].view_change = '<span style="color: #E60012 !important;">' + '+' + el[i].view_change + '</span>';
       }
       if (el[i].pv_change < 0) {
         el[i].pv_change = '<span style="color: #00B19D !important;">' + el[i].pv_change + '</span>';
       } else {
         el[i].pv_change = '<span style="color: #E60012 !important;">' + '+' + el[i].pv_change + '</span>';
       }
       if (el[i].cost_change < 0) {
         el[i].cost_change = '<span style="color: #00B19D !important;">' + el[i].cost_change + '</span>';
       } else {
         el[i].cost_change = '<span style="color: #E60012 !important;">' + '+' + el[i].cost_change + '</span>';
       }
       if (el[i].h5_down_change < 0) {
         el[i].h5_down_change = '<span style="color: #00B19D !important;">' + el[i].h5_down_change + '</span>';
       } else {
         el[i].h5_down_change = '<span style="color: #E60012 !important;">' + '+' + el[i].h5_down_change + '</span>';
       }
       if (el[i].h5_chengben_change < 0) {
         el[i].h5_chengben_change = '<span style="color: #00B19D !important;">' + el[i].h5_chengben_change + '</span>';
       } else {
         el[i].h5_chengben_change = '<span style="color: #E60012 !important;">' + '+' + el[i].h5_chengben_change + '</span>';
       }
       if (el[i].pv_rate_change < 0) {
         el[i].pv_rate_change = '<span style="color: #00B19D !important;">' + el[i].pv_rate_change + '%</span>';
       } else {
         el[i].pv_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].pv_rate_change + '%</span>';
       }
       if (el[i].active_change < 0) {
         el[i].active_change = '<span style="color: #00B19D !important;">' + el[i].active_change + '</span>';
       } else {
         el[i].active_change = '<span style="color: #E60012 !important;">' + '+' + el[i].active_change + '</span>';
       }
       if (el[i].active_rate_change < 0) {
         el[i].active_rate_change = '<span style="color: #00B19D !important;">' + el[i].active_rate_change + '%</span>';
       } else {
         el[i].active_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].active_rate_change + '%</span>';
       }
       if (el[i].active_chengben_change < 0) {
         el[i].active_chengben_change = '<span style="color: #00B19D !important;">' + el[i].active_chengben_change + '</span>';
       } else {
         el[i].active_chengben_change = '<span style="color: #E60012 !important;">' + '+' + el[i].active_chengben_change + '</span>';
       }
       if (el[i].button_click_change < 0) {
         el[i].button_click_change = '<span style="color: #00B19D !important;">' + el[i].button_click_change + '</span>';
       } else {
         el[i].button_click_change = '<span style="color: #E60012 !important;">' + '+' + el[i].button_click_change + '</span>';
       }
       if (el[i].button_cost_change < 0) {
         el[i].button_cost_change = '<span style="color: #00B19D !important;">' + el[i].button_cost_change + '</span>';
       } else {
         el[i].button_cost_change = '<span style="color: #E60012 !important;">' + '+' + el[i].button_cost_change + '</span>';
       }
     }
    $('#tmp').html(tmp({ el: el }));
    $('#table1').tablesorter();
    /* $("#table1 tbody").empty();
     $(".table1").append(html);
     $("#table1").trigger("update");
     $("#table1").tablesorter();
     if (us == '泰佛之家' || us == '貔貅') {
     $("#table1 thead tr th").eq(10).hide();
     $("#table1 thead tr th").eq(11).hide();
     $(".button_down").hide();
     $(".button_cost").hide();
     } else {
     $("#table1 thead tr th").eq(10).show();
     $("#table1 thead tr th").eq(11).show();
     $(".button_down").show();
     $(".button_cost").show();
     }*/

     if (i == 1) {
       $('.active_change,.active_chengben').hide();
       $('#table1 thead th').eq(6).hide();
       $('#table1 thead th').eq(7).hide();
       $('.h5_cost,.h5_chengben').show();
       $('#table1 thead th').eq(8).show();
       $('#table1 thead th').eq(9).show();
       i=2;
     } else if (i == 2) {
       $('.h5_cost,.h5_chengben').hide();
       $('#table1 thead th').eq(8).hide();
       $('#table1 thead th').eq(9).hide();
       $('#table1 thead th').eq(6).show();
       $('#table1 thead th').eq(7).show();
       $('.active_change,.active_chengben').show();
       i=1;
     }
     var options = {
     valueNames: ['keyword', 'plan', 'unit', 'cost_change', 'view_change', 'pv_change', 'active_change',
     'active_chengben', 'h5_cost', 'h5_chengben', 'button_down', 'button_cost', 'good_xu', 'good_jihua',
     'good_danyuan', 'good_key', 'good_yuanyin', 'good_jielun', 'bad_xu', 'bad_jihua', 'bad_danyuan', 'bad_key', 'bad_yuanyin', 'bad_jielun']
     };

     var userList = new List('users', options);
  });
}
function shua(str, date, name, us) {
  $('.q1').remove();
  $('.q2').remove();
  utils.ajax(apiUrl.getApiUrl('getKeyCount'), {
    appid: str,
    date: date,
    user: name,
    us: us,
    page: 'new_关键词',
  }).done(function (data) {
    var el = data;
    console.log(el);
    $('.key').text(el.count);
    $('.yc').text(el.badcount);
    $('.yz').text(el.goodcount);
    $('.zc').text(el.normalcount);
    try {
      $('.llow').text(el.param.low);
      $('.lhigh').text(el.param.high);
      $('.clow').text(el.param.chengben_low);
      $('.chigh').text(el.param.chengben_high);
      if (el.param.type == 'view') {
        $('.look1').text('展现');
      } else if (el.param.type == 'pv') {
        $('.look1').text('点击');
      } else if (el.param.type == 'cost') {
        $('.look1').text('消费');
      } else {
        $('.look1').text('');
      };
      console.log(el.good);
      $('#tmp1').html(tmp1({ el: el.good }));
      $('#cool').tablesorter();
      var options1 = {
        listClass: 'listn',
        searchClass:'searchn',
        valueNames: [ 'good_xu','good_jihua','good_danyuan','good_key','good_yuanyin','good_jielun']
      };
      var userList1 = new List('users2', options1);
    } catch (ex) {
      console.log(ex.message);
    }
    $('#tmp2').html(tmp2({ el: el.bad }));
    $('#yichang').tablesorter();
    var options2 = {
      listClass: 'listy',
      searchClass:'searchy',
      valueNames: [ 'bad_xu','bad_jihua','bad_danyuan','bad_key','bad_yuanyin','bad_jielun']
    };
    var userList = new List('users1', options2);
  });
}


$(() => {
  var user;
  var name;
  var us;
  $('.choose2 span').click(function () {
    $(this).addClass('active1');
    $(this).siblings().removeClass('active1');
  });

  $('.tablesorter').tablesorter();
  $('#date').attr('value', utils.getDateStr(-1));
  // arr = $('#date').val().split('/');
  $("input[id='date']").datepicker();
  function upLoad(userid, name1, us1) {
    user = userid;
    name = name1;
    us = us1;
    top200(userid, name1, us1);
    /* if (us == '泰佛之家' || us == '貔貅') {
     $('.r1').text('关注');
     $('.r2').hide();
     $("#table1 thead tr th").eq(8).text('H5关注');
     $("#table1 thead tr th").eq(9).text('H5关注成本');
     $("#table1 thead tr th").eq(10).hide();
     $("#table1 thead tr th").eq(11).hide();
     $(".button_down").hide();
     $(".button_cost").hide();
     } else {
     $(".r1").text("下载");
     $(".r2").show();
     $("#table1 thead tr th").eq(8).text("H5下载");
     $("#table1 thead tr th").eq(9).text("H5下载成本");
     $("#table1 thead tr th").eq(10).show();
     $("#table1 thead tr th").eq(11).show();
     $(".button_down").show();
     $(".button_cost").show();
     }*/
  }
  upLoad('1', '2', '4');
  $('#date').unbind('change').bind('change', function () {
    // arr = $('#date').val().split('/');
    top200(user, name, us);
  });
  $('.rili').hover(
    function () {
      $(this).attr('src', './images/ri-ck.png');
    }, function () {
    $(this).attr('src', './images/ri.png');
  }
  );
  $('.rili').click(function () {
    $('#date').datepicker('show');
  });

  $('.r1').click(function () {
    $('.active_change,.active_chengben').hide();
    $('#table1 thead th').eq(6).hide();
    $('#table1 thead th').eq(7).hide();
    $('.h5_cost,.h5_chengben').show();
    $('#table1 thead th').eq(8).show();
    $('#table1 thead th').eq(9).show();
    i = 1;
  });
  $('.r2').click(function () {
    $('.h5_cost,.h5_chengben').hide();
    $('#table1 thead th').eq(8).hide();
    $('#table1 thead th').eq(9).hide();
    $('#table1 thead th').eq(6).show();
    $('#table1 thead th').eq(7).show();
    $('.active_change,.active_chengben').show();
    i = 2;
  });
  $('.l1').click(function () {
    $('.cost').show();
    $('.unusual').hide();
    $('.high').hide();
  });
  $('.l2').click(function () {
    $('.cost').hide();
    $('.unusual').show();
    $('.high').hide();
  });
  $('.l3').click(function () {
    $('.cost').hide();
    $('.unusual').hide();
    $('.high').show();
  });
  $('.btn').click(function (e) {
   var pv1 = $('.pv1').val();
   var pv2 = $('.pv2').val();
   var what = $('#sele').val();
   var h_cost = $('.pv3').val();
   var l_cost = $('.pv4').val();
    utils.ajax(apiUrl.getApiUrl('getParameter'), {
      appid: user,
      high: pv1,
      low: pv2,
      type: what,
      chengben_high: h_cost,
      chengben_low: l_cost,
      user: name,
      us: us,
      page: 'new_关键词设置',
    }).done(function (data) {
      console.log(data);
      $('.analysis').hide();
      var arr1 = $('#date').val().split('/');
      var date1 = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
      shua(user, date1, name, us);
    });
  });

  $('.cancel').click(function () {
    $('.analysis').hide();
  });
  $('.canshu').click(function () {
    $('.analysis').show();
  });
});
