/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tmp = require('./tb/table.ejs');
const tmp1 = require('./tb/table1.ejs');
const tmp2 = require('./tb/table2.ejs');
require('static/vendor/jquery-ui.min');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/list.min');

require('static/css/reset.css');
require('static/css/jquery-ui.min.css');
require('./page.css');

const pieChart = require('./charts/pie');

var flag=1;
var flow='';

const utils = require('utils');
const apiUrl = require('static/js/api');

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

function ajx(y, m, d, str, name, us) {
  flag=1;
  var date = y + '-' + m + '-' + d;
  utils.ajax(apiUrl.getApiUrl('getPlan'), {
    appid: str,
    date: date,
    user: name,
    us: us,
    page: 'new_计划页',
  }).done(function (data) {
    console.log(data);
    var el = data;
    var arr_legend = [];
    var arr_cost = [];
    var tit = '各计划消费占比';
    $('.what').text('各计划数据统计');
    $("input[type='checkbox']").prop('checked', true);
    /* if (us == '泰佛之家' || us == '貔貅') {
     $("#table1 thead tr th").eq(6).hide()
     $(".active").hide()
     $("#table1 thead tr th").eq(7).hide()
     $(".active_chengben").hide()
     $("#table1 thead tr th").eq(8).hide()
     $(".btn_cost").hide()
     $("#table1 thead tr th").eq(1).show();
     $(".cost").show();
     $("#table1 thead tr th").eq(2).show();
     $(".view").show();
     $("#table1 thead tr th").eq(3).show();
     $(".pv").show();
     $("#table1 thead tr th").eq(4).show();
     $(".down").show();
     $("#table1 thead tr th").eq(5).show();
     $(".down_chengben").show();
     } else {
     $("#table1 thead tr th").eq(1).show();
     $(".cost").show();
     $("#table1 thead tr th").eq(2).show();
     $(".view").show();
     $("#table1 thead tr th").eq(3).show();
     $(".pv").show();
     $("#table1 thead tr th").eq(4).show();
     $(".down").show();
     $("#table1 thead tr th").eq(6).show();
     $(".active").show();
     $("#table1 thead tr th").eq(5).show();
     $(".down_chengben").show();
     $("#table1 thead tr th").eq(7).show();
     $(".active_chengben").show();
     $("#table1 thead tr th").eq(8).show();
     $(".btn_cost").show();
     }*/
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
        valueNames: ['jihua', 'cost', 'view', 'pv', 'down', 'down_chengben', 'activety', 'active_chengben', 'btn_cost','button_view','button_click']
      };
      var userList = new List('users', options);
    } catch (e) {
      console.log(e);
    }
    pieChart.renderPie(tit, arr_legend, arr_cost);
  });


}

function unit(unit, y, m, d, str, name, us) {
  flag=2;
  var date = y + '-' + m + '-' + d;
  utils.ajax(apiUrl.getApiUrl('getUnit'), {
    appid: str,
    plan: unit,
    date: date,
    user: name,
    us: us,
    page: 'new_计划页',
  }).done(function (data) {
    console.log(data);
    var el = data;
    var arr_legend = [];
    var arr_cost = [];
    var tit = '各单元消费占比';
    $('.what').text('各单元数据统计');
    $("input[type='checkbox']").prop('checked', true);
    /* if (us == '泰佛之家' || us == '貔貅') {
     $("#table1 thead tr th").eq(6).hide()
     $(".active").hide()
     $("#table1 thead tr th").eq(7).hide()
     $(".active_chengben").hide()
     $("#table1 thead tr th").eq(8).hide()
     $(".btn_cost").hide()
     $("#table1 thead tr th").eq(1).show();
     $(".cost").show();
     $("#table1 thead tr th").eq(2).show();
     $(".view").show();
     $("#table1 thead tr th").eq(3).show();
     $(".pv").show();
     $("#table1 thead tr th").eq(4).show();
     $(".down").show();
     $("#table1 thead tr th").eq(5).show();
     $(".down_chengben").show();
     } else {
     $("#table1 thead tr th").eq(1).show();
     $(".cost").show();
     $("#table1 thead tr th").eq(2).show();
     $(".view").show();
     $("#table1 thead tr th").eq(3).show();
     $(".pv").show();
     $("#table1 thead tr th").eq(4).show();
     $(".down").show();
     $("#table1 thead tr th").eq(6).show();
     $(".active").show();
     $("#table1 thead tr th").eq(5).show();
     $(".down_chengben").show();
     $("#table1 thead tr th").eq(7).show();
     $(".active_chengben").show();
     $("#table1 thead tr th").eq(8).show();
     $(".btn_cost").show();
     }*/
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

function key(key, unit, y, m, d, str, name, us) {
  flag=3;
  var date = y + '-' + m + '-' + d;
  utils.ajax(apiUrl.getApiUrl('getKey'), {
    appid: str,
    plan: unit,
    unit: key,
    date: date,
    user: name,
    us: us,
    page: 'new_计划关键词',
  }).done(function (data) {
    console.log(data);
    var el = data;
    var arr_legend = [];
    var arr_cost = [];
    var tit = '各关键词消费占比';
    $('.what').text('各关键词数据统计');
    $("input[type='checkbox']").prop('checked', true);
    /* if (us == '泰佛之家' || us == '貔貅') {
     $("#table1 thead tr th").eq(6).hide()
     $(".active").hide()
     $("#table1 thead tr th").eq(7).hide()
     $(".active_chengben").hide()
     $("#table1 thead tr th").eq(8).hide()
     $(".btn_cost").hide()
     $("#table1 thead tr th").eq(1).show();
     $(".cost").show();
     $("#table1 thead tr th").eq(2).show();
     $(".view").show();
     $("#table1 thead tr th").eq(3).show();
     $(".pv").show();
     $("#table1 thead tr th").eq(4).show();
     $(".down").show();
     $("#table1 thead tr th").eq(5).show();
     $(".down_chengben").show();
     } else {
     $("#table1 thead tr th").eq(1).show();
     $(".cost").show();
     $("#table1 thead tr th").eq(2).show();
     $(".view").show();
     $("#table1 thead tr th").eq(3).show();
     $(".pv").show();
     $("#table1 thead tr th").eq(4).show();
     $(".down").show();
     $("#table1 thead tr th").eq(6).show();
     $(".active").show();
     $("#table1 thead tr th").eq(5).show();
     $(".down_chengben").show();
     $("#table1 thead tr th").eq(7).show();
     $(".active_chengben").show();
     $("#table1 thead tr th").eq(8).show();
     $(".btn_cost").show();
     }*/
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

$(() => {
  $('input:checkbox').click(check);
  $('#date').attr('value', utils.getDateStr(-1));
  $("input[id='date']").datepicker();
  var str;
  var name;
  var us;

  function upload(userid, name1, us1) {
    str = userid;
    name = name1;
    us = us1;

    /* if (us == '泰佛之家' || us == '貔貅') {
     $("input:checkbox").eq(4).hide()
     $("input:checkbox").eq(6).hide()
     $("input:checkbox").eq(7).hide()
     $(".dou_active").hide();
     $(".dou_acchengben").hide();
     $(".dou_btncost").hide();
     $(".dou_down").text("关注变动")
     $(".dou_chengben").text("关注成本变动")

     $("#table1 thead tr th").eq(4).text("关注变动")
     $("#table1 thead tr th").eq(5).text("关注成本变动")
     $("#table1 thead tr th").eq(6).hide()
     $(".active").hide()
     $("#table1 thead tr th").eq(7).hide()
     $(".active_chengben").hide()
     $("#table1 thead tr th").eq(8).hide()
     $(".btn_cost").hide()
     } else {

     $("input:checkbox").eq(4).show()
     $("input:checkbox").eq(6).show()
     $("input:checkbox").eq(7).show()
     $(".dou_active").show();
     $(".dou_acchengben").show();
     $(".dou_btncost").show();
     $(".dou_down").text("下载变动")
     $(".dou_chengben").text("下载成本变动")
     $("#table1 thead tr th").eq(4).text("下载变动")
     $("#table1 thead tr th").eq(5).text("下载成本变动")

     $("#table1 thead tr th").eq(6).show()
     $(".active").show()
     $("#table1 thead tr th").eq(7).show()
     $(".active_chengben").show()
     $("#table1 thead tr th").eq(8).show()
     $(".btn_cost").show()
     }*/
    var arr = $('#date').val().split('/');
    ajx(arr[2], arr[0], arr[1], str, name, us);
  }
  upload('1', '2', '3');

  $('#date').change(function () {
    var arr = $('#date').val().split('/');
    ajx(arr[2], arr[0], arr[1], str, name, us);
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

  $(document).on('click', '.jihua', function () {
    var arr = $('#date').val().split('/');
    flow = $(this).text();
    unit($(this).text(), arr[2], arr[0], arr[1], str, name, us);
  });
  $(document).on('click', '.danyuan', function () {
    var arr = $('#date').val().split('/');
    key($(this).text(), flow, arr[2], arr[0], arr[1], str, name, us);
  });
  /*function pin(){
   window.location="./page5.html?plan="+$(this).text()+"&userid="+str+"&user="+name+"&us="+us;
   }*/
});

