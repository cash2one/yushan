/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tmp = require('./tb/table.ejs');
const tmp1 = require('./tb/iframe.ejs');
const tmp2 = require('./tb/link.ejs');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/list.min');

require('./page.css');

const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) if (new RegExp("(" + k + ")").test(format)) {
    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }
  return format;
}

function ajx(usid) {
  utils.ajax(apiUrl.getApiUrl('getWeek'), {
    appid: usid,
  }).done(function (el) {
    console.log('el' + el);
    var arr = [];
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var obj = {};
    for (var i = 7; i > 0; i--) {
      arr[7 - i] = new Date(new Date() - ((i - 1) * 24 * 1000 * 60 * 60)).format('yyyy-MM-dd')
    }
//            console.log(arr)
    for (let c = 0; c < el.length; c++) {
      arr2.push(el[c][0]._id)
    }
//            console.log(arr2)
    for (let n = 1; n < arr2.length; n++) {
      obj[arr2[n]] = false;
    }
//            console.log(obj);
    for (let j = 0; j < el.length; j++) {
      arr1[j] = new Array();
      for (var z = 0; z < el[j].length; z++) {
        arr1[j][z] = parseInt(el[j][z].rate);
      }
    }
    for (let o = 0; o < arr1.length; o++) {
      arr3[o] = {
        name: arr2[o],
        type: 'line',
        line: '总量',
        data: arr1[o],
        symbol: 'none',
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {            // 系列级个性化折线样式，横向渐变描边
              width: 2
            }
          },
          emphasis: {
            label: {show: true}
          }
        }
      }
    }

    var myChart = echarts.init(document.getElementById('main'));

    var option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        selected: obj,
        data: arr2
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: arr,
          axisLine: {    // 轴线
            show: true,
            lineStyle: {
              color: '#999999',
              type: 'solid',
              width: 2
            }
          },
          axisTick: {    // 轴标记
            show: true,
            length: 10,
            lineStyle: {
              color: 'red',
              type: 'solid',
              width: 2
            }
          },
          axisLabel: {
            show: true,
            interval: '0',    // {number}
//                                        rotate: 30,
//                                        margin:8,
            textStyle: {
              color: '#99999',
              fontFamily: 'sans-serif',
              fontSize: 12,
              fontStyle: 'italic',
              fontWeight: 'bold'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#483d8b',
              type: 'dashed',
              width: 0
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          position: 'left',
          splitNumber: 10,
          axisLine: {    // 轴线
            show: true,
            lineStyle: {
              color: 'red',
              type: 'dashed',
              width: 0
            }
          },
          axisTick: {    // 轴标记
            show: true,
            length: 10,
            lineStyle: {
              color: 'green',
              type: 'solid',
              width: 2
            }
          },
          axisLabel: {
            show: true,
            interval: 'auto',    // {number}
//                                        rotate: -45,
            margin: 18,
            textStyle: {
              color: '#999999',
              fontFamily: 'verdana',
              fontSize: 12,
              fontStyle: 'normal',
              fontWeight: 'bold'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#483d8b',
              type: 'dotted',
              width: 0
            }
          },
        }
      ],
      series: arr3
    };
    myChart.setOption(option);
  });
}

$(() => {
  var appid=currentAccount.appid;
  $('.hu').text(currentAccount.username);

  utils.ajax(apiUrl.getApiUrl('getLink'), {
    appid: appid,
  }).done(function (data) {
    var datas = data;
    console.log("datas" + datas);
    $('ul').html(tmp2({el: datas}));
    $('.simulation').html(tmp1({el: datas}));
  });

  utils.ajax(apiUrl.getApiUrl('getRate'), {
    appid: appid,
  }).done(function (data) {
    var datas = data;
    console.log(datas);
    ajx(appid);
    $('#tb').html(tmp({el: datas}));
    $('#myTable').tablesorter();
    var options = {
      valueNames: ['id', 'click', 'down', 'rate']
    };
    var userList = new List('users', options);
  });


  /*------------------------------------------*/


});
