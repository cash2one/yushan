/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const utils = require('utils');
const tb = require('./charts/table.ejs');
// 引入 ECharts 主模块
require('static/css/reset.css');
require('./page.css');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/jquery-ui.min');
require('static/css/jquery-ui.min.css');
const apiUrl = require('static/js/api');
var datas = {};
var all=[];
var usid,book,name,us;
function upload(str,name1,us1) {
  usid = str;
  book = "all";
  window.name = name1;
  window.us = us1;
  if(window.us == '泰佛之家' || window.us == '貔貅'){
    $(".opa").hide();
    $("#myTable thead th").eq(4).text('iOS关注');
    $("#myTable thead th").eq(5).text('iOS关注率');
    $("#myTable thead th").eq(7).text('Android关注');
    $("#myTable thead th").eq(8).text('Android关注率');
    $("#myTable thead th").eq(9).hide();
    $("#myTable thead th").eq(10).hide();
    $(".total-active").hide();
    $(".total-activerate").hide();
  }else{
    $(".opa").show();
    $("#myTable thead th").eq(4).text('iOS下载');
    $("#myTable thead th").eq(5).text('iOS下载率');
    $("#myTable thead th").eq(7).text('Android下载');
    $("#myTable thead th").eq(8).text('Android下载率');
    $("#myTable thead th").eq(9).show();
    $("#myTable thead th").eq(10).show();
    $(".total-active").show();
    $(".total-activerate").show();
  }
  ajx(book,name1,us1);
}
function  obj(a,b,c,d,e,f,g,h,i) {
  this.c2 = a;
  this.total_click = b;
  this.total_download = c;
  this.ios_click = d;
  this.ios_download = e;
  this.ios_rate = f;
  this.android_pv_total = g;
  this.android_dl_total = h;
  this.android_rate = i;
};
function ajx(type,name,us) {
  var arr = $("#alert").val().split("/");
  var date = arr[2] + "-" + arr[0] + "-" + arr[1];
  var url;
  switch (type) {
    case "all": {
      alert("all");
      utils.ajax(apiUrl.getApiUrl('getAccountAll'), { appid: 'appid',data: 'data', user: 'user', us: 'us', page: 'page' }).done(function (el) {
        qudao_ajax(el);
      });
    }
      break;
    case "other": {
      alert("other");
      utils.ajax(apiUrl.getApiUrl('getAccountother'), { appid: 'appid',data: 'data', user: 'user', us: 'us', page: 'page' }).done(function (el) {
        qudao_ajax(el);
      });
    }
          break;
    case "otherbaidu": {
      alert("otherbaidu");
      utils.ajax(apiUrl.getApiUrl('getAccountotherbaidu'), { appid: 'appid',data: 'data', user: 'user', us: 'us', page: 'page' }).done(function (el) {
        qudao_ajax(el);
      });
    }
          break;
  };
}

function qudao_ajax(el){
  $('#myTable').tablesorter();
  datas = el;
  $('.biao-2').html(tb({ data: datas }));
  console.log(datas);
  var total_click1= 0,total_down= 0,ios_totaldl=0,android_totaldl= 0,total_active=0;
  $(".l1").addClass("active").siblings().removeClass("active");
  for(var i = 0;i <el.length;i++) {
    all.push(new obj(el[i]._id,el[i].pv_total,el[i].dl_total,el[i].ios_pv_total,el[i].ios_dl_total,el[i].ios_rate+"%",el[i].android_pv_total,el[i].android_dl_total,el[i].android_rate+"%"));
    total_click1 += el[i].pv_total;
    total_down += el[i].dl_total;
    ios_totaldl += el[i].ios_dl_total;
    android_totaldl += el[i].android_dl_total;
    total_active = 0;
    if(isNaN(el[i].ios_rate)) {
      el[i].ios_rate=0;
    };
    if(isNaN(el[i].android_rate)) {
      el[i].android_rate=0;
    };
    $("table th").show();
  }
  $(".all-today").text(total_click1);
  $(".all-todaydl").text(total_down);
  $(".all-iosdl").text(ios_totaldl);
  $(".all-androiddl").text(android_totaldl);
  $(".all-active").text(total_active);
  $(".tablesorter").trigger("update");
  $(".tablesorter").tablesorter();
  if(us=='泰佛之家' || us=='貔貅') {
    $("#myTable thead th").eq(9).hide();
    $("#myTable thead th").eq(10).hide();
    $(".total-active").hide();
    $(".total-activerate").hide();
  }else {
    $("#myTable thead th").eq(9).show();
    $("#myTable thead th").eq(10).show();
    $(".total-active").show();
    $(".total-activerate").show();
  }
  if(el.length!=0) {
    var options = {
      valueNames: [ 'c2','total-click','total-download','ios-click','ios-download','ios-downrate','android-click','android-download','android-downrate','total-active','total-activerate' ]
    };
    var userList = new List('users', options);
  };
}
$(() => {
  $(document).ready(function() {
    book = "all";
    ajx(book,window.name,window.us);
  });
  //日历
  $("#alert").change(function() {
    ajx(book,window.name,window.us);
  });
  //导出
  $(".daochu").click(function() {
    send1=JSON.stringify(all);
    console.log(send1);
    utils.ajax(apiUrl.getApiUrl('getAccountAll'), { appid: 'appid',data: 'data', user: 'user', us: 'us', page: 'page' }).done(function (el) {
      window.location="/"+us+"渠道日报.xlsx";
    });
  });
  $(".tablesorter").tablesorter();
  //点击切换数据
  $(".choose2").on("click","span",function() {
    switch ($(this).text()) {
      case "全部": {
        book = "all";
        ajx(book,window.name,window.us);
      }
            break;
      case "百度来源": {
        book = "otherbaidu";
        ajx(book,window.name,window.us);
      }
            break;
      case "搜索": {
        book = "all";
        ajx(book,window.name,window.us);
      }
            break;
      case "百度其他": {
        book = "other";
        ajx(book,window.name,window.us);
      }
            break;
      case "其他": {
        book = "other";
        ajx(book,window.name,window.us);
      }
            break;
    }
  });
  $(".choose2").on("click", "span", function() {
    switch ($(this).text()) {
      case "iOS": {
        $(".android_").hide();
        $(".ios_").show();
      }
            break;
      case "Android": {
        $(".ios_").hide();
        $(".android_").show();
      }
            break;
      default: {
        $(".ios_").show();
        $(".android_").show();
      }
    }
  })
  $(".rili").hover(
      function() {
        $(this).attr("src",'./images/ri-ck.png')
      },function() {
        $(this).attr("src",'./images/ri.png')
      }
  );
  $( ".time input" ).datepicker({
    altField: "#alert"
  });
  $( ".rili").click(function() {
    $( ".time input" ).datepicker( 'show' );
  });

  $(".choose2 span").click(function() {
    $(this).addClass("active").siblings().removeClass("active")
  });

  $(".c2").css("color","#4390b9");
  //点击切换颜色
  $(".choose2").on("click","span",function(){
    $(this).addClass("qudao_active").siblings().removeClass("qudao_active");
  });
  $()
})