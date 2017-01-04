/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const utils = require('utils');
const tb = require('./charts/table.ejs');

const ck = require('./images/ri-ck.png');
const ri = require('./images/ri.png');

// 引入 ECharts 主模块
require('static/css/reset.css');
require('./page.css');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/jquery-ui.min');
require('static/css/jquery-ui.min.css');
require('static/vendor/list.min');

const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const apiUrl = require('static/js/api');
var datas = {};
var all=[];
var usid;
var book;

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  ajx(book,currentAccount.appid);
});

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
function ajx(type, appid) {
  var arr = $("#alert").val().split("/");
  var arr1 = $("#alert1").val().split("/");
  var date = arr[2] + "-" + arr[0] + "-" + arr[1];
  var date1 = arr1[2] + "-" + arr1[0] + "-" + arr1[1];
  var url;
  switch (type) {
    case "all": {
      utils.ajax(apiUrl.getApiUrl('getAll'), { appid: appid,edate: date,sdate: date1,type: type}).done(function (el) {
        qudao_ajax(el);
      });
    }
      break;
    case "baidu": {
      utils.ajax(apiUrl.getApiUrl('getAll'), { appid: appid,edate: date,sdate: date1,type: type}).done(function (el) {
        qudao_ajax(el);
      });
    }
      break;
    case "search": {
      utils.ajax(apiUrl.getApiUrl('getAll'), { appid: appid,edate: date,sdate: date1,type: type}).done(function (el) {
        qudao_ajax(el);
      });
    }
      break;
    case "other": {
      // alert("other");
      utils.ajax(apiUrl.getApiUrl('getAccountother'), { appid: appid,edate: date,sdate: date1,}).done(function (el) {
        qudao_ajax(el);
      });
    }
          break;
    case "otherbaidu": {
      // alert("otherbaidu");
      utils.ajax(apiUrl.getApiUrl('getAccountotherbaidu'), { appid: appid,edate: date,sdate: date1,}).done(function (el) {
        qudao_ajax(el);
      });
    }
          break;
  };
}

function qudao_ajax(el){
  $('.l1').addClass("qudao_active").siblings().removeClass("qudao_active");
  $('#myTable').tablesorter();
  datas = el;
  console.log(datas);
  var total_click1= 0,total_down= 0,ios_totaldl=0,android_totaldl= 0,total_active=0;
  // $(".l1").addClass("active").siblings().removeClass("active");
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
  $('.biao-2').html(tb({ data: datas }));
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
  $('#alert').attr('value', utils.getDateStr(0));
  $('#alert1').attr('value', utils.getDateStr(-1));
  $(document).ready(function() {
    book = "all";
    ajx(book,currentAccount.appid);
  });
  //日历
  $("#alert,#alert1").change(function() {
    ajx(book,currentAccount.appid);
    $('.l1').addClass("qudao_active").siblings().removeClass("qudao_active");
  });
  //导出
  $(".daochu").click(function() {
    var arr = $("#alert").val().split("/");
    var arr1 = $("#alert1").val().split("/");
    var date = arr[2] + "-" + arr[0] + "-" + arr[1];
    var date1 = arr1[2] + "-" + arr1[0] + "-" + arr1[1];
    var send1=JSON.stringify(all);
    utils.formSubmit(apiUrl.getApiUrl('setQuOut'), {
      name: currentAccount.username,
      appid: currentAccount.appid,
      data: send1,
      edate: date,
      sdate: date1,
    })
  });
  $(".tablesorter").tablesorter();
  //点击切换数据
  $(".choose2").on("click","span",function() {
    switch ($(this).text()) {
      case "全部": {
        book = "all";
        ajx(book,currentAccount.appid);
      }
            break;
      case "百度来源": {
        book = "baidu";
        ajx(book,currentAccount.appid);
      }
            break;
      case "搜索": {
        book = "search";
        ajx(book,currentAccount.appid);
      }
            break;
      case "百度其他": {
        book = "otherbaidu";
        ajx(book,currentAccount.appid);
      }
            break;
      case "其他": {
        book = "other";
        ajx(book,currentAccount.appid);
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

  $("input[id='alert']").datepicker();
  $("input[id='alert1']").datepicker();
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
})