/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const mo = require('./mo.ejs');
require('static/vendor/jquery-ui.min');
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('static/css/reset.css');
require('static/css/jquery-ui.min.css');
require('./page.css');
// require('static/css/nprogress.css');
// const NProgress=require('static/vendor/nprogress');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');
let pin = [];
let currentAccount = store.getCurrentAccount();
eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload();
  /*flo=0;
   $('.trends-all').empty();
   $('.tol').empty();*/
});


function lin(date1, date2) {

  utils.ajaxAsync(apiUrl.getApiUrl('getTime'), {
    appid: currentAccount.appid,
    date1: date1,
    date2: date2,
  }).done(function (data) {
    // console.log(data);
    pin.push(data);
  });
}

function legend(logo, who) {
  console.log(who);
  let max = who[0].length;
  let days = [];
  let datas = [];
  let cpc = [];
  let show = [];
  let click = [];
  let spend = [];
  let series = [];
  let n = [];
  for (let i = 1; i < who.length; i++) {
    if (max < who[i].length) {
      max = who[i].length;
    }
  }
  for (let i = 0; i < who.length; i++) {
    n.push((i+1).toString());
  }
  for (let i = 1; i < max; i++) {
    days.push(i);
  }
  for (let i = 0; i < who.length; i++) {
    switch (logo) {
      case 'cpc': {
        cpc = [];
        for (let j = 0; j < who[i].length; j++) {
          cpc.push({
            value: who[i][j].cpc.toFixed(2),
            name: utils.dateFormat(who[i][j].dateTime, 'MM-dd hh:mm'),
          });
        }

        series.push({
          name: n[i],
          type: 'line',
          line: '总量',
          data: cpc,
          symbol: 'emptyCircle',
          symbolSize: 3,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: { // 系列级个性化折线样式，横向渐变描边
                width: 2,
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        });
      }
        break;
      case '展现': {
        show = [];
        for (let j = 0; j < who[i].length; j++) {
          show.push({
            value: who[i][j].showCount,
            name: utils.dateFormat(who[i][j].dateTime, 'MM-dd hh:mm'),
          });
        }

        series.push({
          name: n[i],
          type: 'line',
          line: '总量',
          data: show,
          symbol: 'emptyCircle',
          symbolSize: 3,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: { // 系列级个性化折线样式，横向渐变描边
                width: 2,
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        });
      }
        break;
      case '点击': {
        click = [];
        for (let j = 0; j < who[i].length; j++) {
          click.push({
            value: who[i][j].clickCount,
            name: utils.dateFormat(who[i][j].dateTime, 'MM-dd hh:mm'),
          });
        }

        series.push({
          name: n[i],
          type: 'line',
          line: '总量',
          data: click,
          symbol: 'emptyCircle',
          symbolSize: 3,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: { // 系列级个性化折线样式，横向渐变描边
                width: 2,
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        });
      }
        break;
      case '消费': {
        spend = [];
        for (let j = 0; j < who[i].length; j++) {
          spend.push({
            value: who[i][j].spend,
            name: utils.dateFormat(who[i][j].dateTime, 'MM-dd hh:mm'),
          });
        }

        series.push({
          name: n[i],
          type: 'line',
          line: '总量',
          data: spend,
          symbol: 'emptyCircle',
          symbolSize: 3,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: { // 系列级个性化折线样式，横向渐变描边
                width: 2,
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        });
      }
        break;
    }
  }

  console.log(n);
  // console.log(cpc);
  console.log(series);
  const myChart = echarts.init(document.getElementById('d1'));
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        console.log(params);
        let rev='';
        for(let i=0;i<params.length;i++){
          rev+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].data.name + '：' + params[i].data.value+'<br/>'
        }
        return rev;
      }
    },
    grid: {
      show: true,
      borderWidth: '1',
      borderColor: 'black'
    },
    legend: {
      orient: 'horizontal',
      data: n,
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true,
        },
        dataView: {
          show: true,
          readOnly: false,
        },
        magicType: {
          show: true,
          type: ['line', 'bar', 'stack', 'tiled'],
        },
        restore: {
          show: true,
        },
        saveAsImage: {
          show: true,
        },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        interval: 0,
        data: days,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#483d8b',
            type: 'dashed',
            width: 1,
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        position: 'left',
        splitNumber: 10,
        axisLabel: {
          show: true,
          interval: 'auto', // {number}
          margin: 18,
          textStyle: {
            color: '#999999',
            fontFamily: 'verdana',
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 'bold',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#483d8b',
            type: 'dotted',
            width: 0,
          },
        },
      }
    ],
    series: series,
  };
  myChart.setOption(option);
  window.onresize = myChart.resize;
  for (let i = 1; i < max; i++) {
  }
}

$(() => {

  // let $cln=$('.trends');
  $('.date1').attr('value', utils.getDateStr(-1));
  $('.dp').datepicker();
  $(document).on('click', '.del', function () {
    $(this).parent().remove();
  });
  $('.tj').click(function () {
    $('.trends-all').append(mo());
    $('.dp').datepicker();
    $('.date1').attr('value', utils.getDateStr(-1));
  });

  $('.ck').click(function () {
    // $('.tol').empty();
    pin = [];
    let line=$('#page-wrapper').find('.trends').length;
    console.log(line);
    for(let i=0;i<line;i++){
      $('.trends').eq(i).find('.inx').text(i+1);
    }
    $('.trends').each(function () {
      let day = $(this).find('.dp').val().split('/');
      let min1 = $(this).find('.time1').val() + ':00';
      let min2 = $(this).find('.time2').val() + ':00';
      let time1 = day[2] + '-' + day[0] + '-' + day[1] + ' ' + min1;
      let time2 = day[2] + '-' + day[0] + '-' + day[1] + ' ' + min2;
      // let str1 = time1.replace(/-/g,'/');
      // let str2 = time2.replace(/-/g,'/');
      // let date1 = new Date(str1);
      // let date2 = new Date(str2);
      // console.log(date1);
      // console.log(date2);
      lin(time1, time2);
      /*utils.ajax(apiUrl.getApiUrl('getTime'), {
       appid: currentAccount.appid,
       date1: time1,
       date2: time2,
       }).done(function (data) {
       // console.log(data);
       pin.push(data);
       // pu(data);
       });*/
    });
    // console.log(pin);
    // console.log(pin.length);
    legend($('.time3').val(), pin);
    // $.when(utils.ajax().done(),utils.ajax().done()).done()

    // logen('CPC');

  })
  $('.time3').change(function () {
    console.log($(this).val());
    legend($(this).val(), pin);
  })

});
