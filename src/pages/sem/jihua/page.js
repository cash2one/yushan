/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tmp = require('./tb/table.ejs');
const tmp1 = require('./tb/table1.ejs');
const tmp2 = require('./tb/table2.ejs');

const ri = require('./images/ri.png');
const ck = require('./images/ri-ck.png');

require('static/vendor/jquery-ui.min');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/list.min');

require('static/css/reset.css');

require('static/css/jquery-ui.min.css');
require('./page.css');

const pieChart = require('./charts/pie');

const eventBus = require('static/js/eventBus');
const store = require('static/js/store');

let flag=1;
let flow='';
let flow1='';
let str;

const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  upload(currentAccount.appid);
});

function check() {
  if ($(this).is(':checked')) {
    if ($(this).index() == 0) {
      $('#table1 thead tr th').eq(1).show();
      $('.cost').show();
    } else if ($(this).index() == 1) {
      $('#table1 thead tr th').eq(2).show();
      $('.view').show();
    } else if ($(this).index() == 2) {
      $('#table1 thead tr th').eq(3).show();
      $('.pv').show();
    } else if ($(this).index() == 3) {
      $('#table1 thead tr th').eq(4).show();
      $('.down').show();
    } else if ($(this).index() == 5) {
      $('#table1 thead tr th').eq(6).show();
      $('.activety').show();
    } else if ($(this).index() == 7) {
      $('#table1 thead tr th').eq(5).show();
      $('.down_chengben').show();
    } else if ($(this).index() == 9) {
      $('#table1 thead tr th').eq(7).show();
      $('.active_chengben').show();
    } else if ($(this).index() == 11) {
      $('#table1 thead tr th').eq(8).show();
      $('.btn_cost').show();
    }else if($(this).index() == 13){
      $("#table1 thead tr th").eq(9).show()
      $(".button_view").show()
    }else if($(this).index() == 15){
      $("#table1 thead tr th").eq(10).show()
      $(".button_click").show()
    }
  } else {
    if ($(this).index() == 0) {
      $('#table1 thead tr th').eq(1).hide();
      $('.cost').hide();
    } else if ($(this).index() == 1) {
      $('#table1 thead tr th').eq(2).hide();
      $('.view').hide();
    } else if ($(this).index() == 2) {
      $('#table1 thead tr th').eq(3).hide();
      $('.pv').hide();
    } else if ($(this).index() == 3) {
      $('#table1 thead tr th').eq(4).hide();
      $('.down').hide();
    } else if ($(this).index() == 5) {
      $('#table1 thead tr th').eq(6).hide();
      $('.activety').hide();
    } else if ($(this).index() == 7) {
      $('#table1 thead tr th').eq(5).hide();
      $('.down_chengben').hide();
    } else if ($(this).index() == 9) {
      $('#table1 thead tr th').eq(7).hide();
      $('.active_chengben').hide();
    } else if ($(this).index() == 11) {
      $('#table1 thead tr th').eq(8).hide();
      $('.btn_cost').hide();
    }else if($(this).index() == 13){
      $("#table1 thead tr th").eq(9).hide()
      $(".button_view").hide()
    }else if($(this).index() == 15){
      $("#table1 thead tr th").eq(10).hide()
      $(".button_click").hide()
    }
  }
}

function ajx(y, m, d, str) {
  flag=1;
  var date = y + '-' + m + '-' + d;
  utils.ajax(apiUrl.getApiUrl('getPlan'), {
    appid: str,
    date: date,
  }).done(function (data) {
    console.log(data);
    var el = data;
    var arr_legend = [];
    var arr_cost = [];
    var tit = '各计划消费占比';
    $('.what').text('各计划数据统计');
    $('.tiao').html('<span class="jh">计划</span>');
    $("input[type='checkbox']").prop('checked', true);
    for (var i = 0; i < el.length; i++) {
      arr_legend.push(el[i].name);
      arr_cost.push(el[i].cost);
      if (el[i].cost_change < 0) {
        el[i].cost_change = '<span style="color: #00B19D !important;">' + el[i].cost_change + '</span>';
      } else {
        el[i].cost_change = '<span style="color: #E60012 !important;">' + '+' + el[i].cost_change + '</span>';
      }
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
      if (el[i].chengben_change < 0) {
        el[i].chengben_change = '<span style="color: #00B19D !important;">' + el[i].chengben_change + '</span>';
      } else {
        el[i].chengben_change = '<span style="color: #E60012 !important;">' + '+' + el[i].chengben_change + '</span>';
      }
      if (el[i].button_cost_change < 0) {
        el[i].button_cost_change = '<span style="color: #00B19D !important;">' + el[i].button_cost_change + '</span>';
      } else {
        el[i].button_cost_change = '<span style="color: #E60012 !important;">' + '+' + el[i].button_cost_change + '</span>';
      }
      if (el[i].pv_rate_change < 0) {
        el[i].pv_rate_change = '<span style="color: #00B19D !important;">' + el[i].pv_rate_change + '%</span>';
      } else {
        el[i].pv_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].pv_rate_change + '%</span>';
      }
      if (el[i].h5_down_change < 0) {
        el[i].h5_down_change = '<span style="color: #00B19D !important;">' + el[i].h5_down_change + '</span>';
      } else {
        el[i].h5_down_change = '<span style="color: #E60012 !important;">' + '+' + el[i].h5_down_change + '</span>';
      }
      if (el[i].h5_down_rate_change < 0) {
        el[i].h5_down_rate_change = '<span style="color: #00B19D !important;">' + el[i].h5_down_rate_change + '%</span>';
      } else {
        el[i].h5_down_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].h5_down_rate_change + '%</span>';
      }
      if (el[i].activity_change < 0) {
        el[i].activity_change = '<span style="color: #00B19D !important;">' + el[i].activity_change + '</span>';
      } else {
        el[i].activity_change = '<span style="color: #E60012 !important;">' + '+' + el[i].activity_change + '</span>';
      }
      if (el[i].activity_chengben_change < 0) {
        el[i].activity_chengben_change = '<span style="color: #00B19D !important;">' + el[i].activity_chengben_change + '</span>';
      } else {
        el[i].activity_chengben_change = '<span style="color: #E60012 !important;">' + '+' + el[i].activity_chengben_change + '</span>';
      }
      if (el[i].activity_rate_change < 0) {
        el[i].activity_rate_change = '<span style="color: #00B19D !important;">' + el[i].activity_rate_change + '%</span>';
      } else {
        el[i].activity_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].activity_rate_change + '%</span>';
      }
      if(el[i].baidu_click_button_change<0){
        el[i].baidu_click_button_change='<span style="color: #00B19D !important;">'+el[i].baidu_click_button_change+'</span>';
      }else{
        el[i].baidu_click_button_change='<span style="color: #E60012 !important;">'+'+'+el[i].baidu_click_button_change+'</span>';
      }
      if(el[i].baidu_view_button_change<0){
        el[i].baidu_view_button_change='<span style="color: #00B19D !important;">'+el[i].baidu_view_button_change+'</span>';
      }else{
        el[i].baidu_view_button_change='<span style="color: #E60012 !important;">'+'+'+el[i].baidu_view_button_change+'</span>';
      }
    }
    $('#tb').html(tmp({ el: el }));
    $('#table1').tablesorter();
    try {
      var options = {
        valueNames: ['jihua', 'cost', 'view', 'pv', 'down', 'down_chengben', 'activety', 'active_chengben', 'btn_cost','button_view','button_click']
      };
      var userList = new List('users', options);
    } catch (e) {
      console.log(e);
    }
    pieChart.renderPie(tit, arr_legend, arr_cost);
  });


}

function unit(unit, y, m, d, str) {
  flag=2;
  var date = y + '-' + m + '-' + d;
  utils.ajax(apiUrl.getApiUrl('getUnit'), {
    appid: str,
    plan: unit,
    date: date,
  }).done(function (data) {
    console.log(data);
    var el = data;
    var arr_legend = [];
    var arr_cost = [];
    var tit = '各单元消费占比';
    $('.what').text('各单元数据统计');
    $('.tiao').html('<span class="jh">计划</span> ><span class="dy">单元</span>');
    $("input[type='checkbox']").prop('checked', true);
    for (var i = 0; i < el.length; i++) {
      arr_legend.push(el[i].danyuan);
      arr_cost.push(el[i].cost);
      if (el[i].cost_change < 0) {
        el[i].cost_change = '<span style="color: #00B19D !important;">' + el[i].cost_change + '</span>';
      } else {
        el[i].cost_change = '<span style="color: #E60012 !important;">' + '+' + el[i].cost_change + '</span>';
      }
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
      if (el[i].chengben_change < 0) {
        el[i].chengben_change = '<span style="color: #00B19D !important;">' + el[i].chengben_change + '</span>';
      } else {
        el[i].chengben_change = '<span style="color: #E60012 !important;">' + '+' + el[i].chengben_change + '</span>';
      }
      if (el[i].button_cost_change < 0) {
        el[i].button_cost_change = '<span style="color: #00B19D !important;">' + el[i].button_cost_change + '</span>';
      } else {
        el[i].button_cost_change = '<span style="color: #E60012 !important;">' + '+' + el[i].button_cost_change + '</span>';
      }
      if (el[i].pv_rate_change < 0) {
        el[i].pv_rate_change = '<span style="color: #00B19D !important;">' + el[i].pv_rate_change + '%</span>';
      } else {
        el[i].pv_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].pv_rate_change + '%</span>';
      }
      if (el[i].h5_down_change < 0) {
        el[i].h5_down_change = '<span style="color: #00B19D !important;">' + el[i].h5_down_change + '</span>';
      } else {
        el[i].h5_down_change = '<span style="color: #E60012 !important;">' + '+' + el[i].h5_down_change + '</span>';
      }
      if (el[i].h5_down_rate_change < 0) {
        el[i].h5_down_rate_change = '<span style="color: #00B19D !important;">' + el[i].h5_down_rate_change + '%</span>';
      } else {
        el[i].h5_down_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].h5_down_rate_change + '%</span>';
      }
      if (el[i].activity_change < 0) {
        el[i].activity_change = '<span style="color: #00B19D !important;">' + el[i].activity_change + '</span>';
      } else {
        el[i].activity_change = '<span style="color: #E60012 !important;">' + '+' + el[i].activity_change + '</span>';
      }
      if (el[i].activity_chengben_change < 0) {
        el[i].activity_chengben_change = '<span style="color: #00B19D !important;">' + el[i].activity_chengben_change + '</span>';
      } else {
        el[i].activity_chengben_change = '<span style="color: #E60012 !important;">' + '+' + el[i].activity_chengben_change + '</span>';
      }
      if (el[i].activity_rate_change < 0) {
        el[i].activity_rate_change = '<span style="color: #00B19D !important;">' + el[i].activity_rate_change + '%</span>';
      } else {
        el[i].activity_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].activity_rate_change + '%</span>';
      }
      if(el[i].baidu_click_button_change<0){
        el[i].baidu_click_button_change='<span style="color: #00B19D !important;">'+el[i].baidu_click_button_change+'</span>';
      }else{
        el[i].baidu_click_button_change='<span style="color: #E60012 !important;">'+'+'+el[i].baidu_click_button_change+'</span>';
      }
      if(el[i].baidu_view_button_change<0){
        el[i].baidu_view_button_change='<span style="color: #00B19D !important;">'+el[i].baidu_view_button_change+'</span>';
      }else{
        el[i].baidu_view_button_change='<span style="color: #E60012 !important;">'+'+'+el[i].baidu_view_button_change+'</span>';
      }
    }
    $('#tb').html(tmp1({ el: el }));
    $('#table1').tablesorter();
    /*  if (us == '泰佛之家' || us == '貔貅') {

     $(".active").hide()
     $(".active_chengben").hide()
     $(".btn_cost").hide()

     } else {

     $(".active").show();
     $(".active_chengben").show();
     $(".btn_cost").show();
     }*/
    try {
      var options = {
        valueNames: [ 'danyuan','cost','view','pv','down','down_chengben','active','active_chengben','btn_cost','button_view','button_click']
      };
      var userList = new List('users', options);
    } catch (e) {
      console.log(e);
    }
    pieChart.renderPie(tit, arr_legend, arr_cost);
  });


}

function key(key, unit, y, m, d, str) {
  flag=3;
  var date = y + '-' + m + '-' + d;
  utils.ajax(apiUrl.getApiUrl('getKey'), {
    appid: str,
    plan: unit,
    unit: key,
    date: date,
  }).done(function (data) {
    console.log(data);
    var el = data;
    var arr_legend = [];
    var arr_cost = [];
    var tit = '各关键词消费占比';
    $('.what').text('各关键词数据统计');
    $('.tiao').html('<span class="jh">计划</span> ><span class="dy">单元</span>><span class="gj">关键词</span>');
    $("input[type='checkbox']").prop('checked', true);
    for (var i = 0; i < el.length; i++) {
      arr_legend.push(el[i].name);
      arr_cost.push(el[i].cost);
      if (el[i].cost_change < 0) {
        el[i].cost_change = '<span style="color: #00B19D !important;">' + el[i].cost_change + '</span>';
      } else {
        el[i].cost_change = '<span style="color: #E60012 !important;">' + '+' + el[i].cost_change + '</span>';
      }
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
      if (el[i].chengben_change < 0) {
        el[i].chengben_change = '<span style="color: #00B19D !important;">' + el[i].chengben_change + '</span>';
      } else {
        el[i].chengben_change = '<span style="color: #E60012 !important;">' + '+' + el[i].chengben_change + '</span>';
      }
      if (el[i].button_cost_change < 0) {
        el[i].button_cost_change = '<span style="color: #00B19D !important;">' + el[i].button_cost_change + '</span>';
      } else {
        el[i].button_cost_change = '<span style="color: #E60012 !important;">' + '+' + el[i].button_cost_change + '</span>';
      }
      if (el[i].pv_rate_change < 0) {
        el[i].pv_rate_change = '<span style="color: #00B19D !important;">' + el[i].pv_rate_change + '%</span>';
      } else {
        el[i].pv_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].pv_rate_change + '%</span>';
      }
      if (el[i].h5_down_change < 0) {
        el[i].h5_down_change = '<span style="color: #00B19D !important;">' + el[i].h5_down_change + '</span>';
      } else {
        el[i].h5_down_change = '<span style="color: #E60012 !important;">' + '+' + el[i].h5_down_change + '</span>';
      }
      if (el[i].h5_down_rate_change < 0) {
        el[i].h5_down_rate_change = '<span style="color: #00B19D !important;">' + el[i].h5_down_rate_change + '%</span>';
      } else {
        el[i].h5_down_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].h5_down_rate_change + '%</span>';
      }
      if (el[i].activity_change < 0) {
        el[i].activity_change = '<span style="color: #00B19D !important;">' + el[i].activity_change + '</span>';
      } else {
        el[i].activity_change = '<span style="color: #E60012 !important;">' + '+' + el[i].activity_change + '</span>';
      }
      if (el[i].activity_chengben_change < 0) {
        el[i].activity_chengben_change = '<span style="color: #00B19D !important;">' + el[i].activity_chengben_change + '</span>';
      } else {
        el[i].activity_chengben_change = '<span style="color: #E60012 !important;">' + '+' + el[i].activity_chengben_change + '</span>';
      }
      if (el[i].activity_rate_change < 0) {
        el[i].activity_rate_change = '<span style="color: #00B19D !important;">' + el[i].activity_rate_change + '%</span>';
      } else {
        el[i].activity_rate_change = '<span style="color: #E60012 !important;">' + '+' + el[i].activity_rate_change + '%</span>';
      }
      if(el[i].baidu_click_button_change<0){
        el[i].baidu_click_button_change='<span style="color: #00B19D !important;">'+el[i].baidu_click_button_change+'</span>';
      }else{
        el[i].baidu_click_button_change='<span style="color: #E60012 !important;">'+'+'+el[i].baidu_click_button_change+'</span>';
      }
      if(el[i].baidu_view_button_change<0){
        el[i].baidu_view_button_change='<span style="color: #00B19D !important;">'+el[i].baidu_view_button_change+'</span>';
      }else{
        el[i].baidu_view_button_change='<span style="color: #E60012 !important;">'+'+'+el[i].baidu_view_button_change+'</span>';
      }
    }
    $('#tb').html(tmp2({ el: el }));
    $('#table1').tablesorter();
    /*  if (us == '泰佛之家' || us == '貔貅') {

     $(".active").hide()
     $(".active_chengben").hide()
     $(".btn_cost").hide()

     } else {

     $(".active").show();
     $(".active_chengben").show();
     $(".btn_cost").show();
     }*/
    try {
      var options = {
        valueNames: [ 'keyk','cost','view','pv','down','down_chengben','active','active_chengben','btn_cost','button_view','button_click']
      };
      var userList = new List('users', options);
    } catch (e) {
      console.log(e);
    }
    pieChart.renderPie(tit, arr_legend, arr_cost);
  });


}

function upload(userid) {
  str = userid;
  var arr = $('#date').val().split('/');
  ajx(arr[2], arr[0], arr[1], str);
}

$(() => {
  $('input:checkbox').click(check);
  $('#date').attr('value', utils.getDateStr(-1));
  $("input[id='date']").datepicker();

  upload(currentAccount.appid);

  $('.look-jihua').click(function(){
    var arr = $('#date').val().split('/');
    ajx(arr[2], arr[0], arr[1], str);
  });
  $('.rili').hover(
    function () {
      $(this).attr('src', ck);
    }, function () {
      $(this).attr('src', ri);
    }
  );
  $('.rili').click(function () {
    $('#date').datepicker('show');
  });

  $(document).on('click', '.jihua', function () {
    var arr = $('#date').val().split('/');
    flow = $(this).text();
    console.log($(this).text());
    unit($(this).text(), arr[2], arr[0], arr[1], str);
  });
  $(document).on('click', '.danyuan', function () {
    var arr = $('#date').val().split('/');
    flow1 = $(this).text();
    key($(this).text(), flow, arr[2], arr[0], arr[1], str);
  });
  $(document).on('click', '.jh', function () {
    var arr = $('#date').val().split('/');
    ajx(arr[2], arr[0], arr[1], str);
  });
  $(document).on('click', '.dy', function () {
    var arr = $('#date').val().split('/');
    unit(flow, arr[2], arr[0], arr[1], str);
  });
  $(document).on('click', '.gj', function () {
    var arr = $('#date').val().split('/');
    key(flow1, flow, arr[2], arr[0], arr[1], str);
  });
  /*function pin(){
   window.location="./page5.html?plan="+$(this).text()+"&userid="+str+"&user="+name+"&us="+us;
   }*/
});

