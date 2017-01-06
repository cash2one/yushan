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
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
});

function lin(who,date1,date2){

  utils.ajax(apiUrl.getApiUrl('getTime'), {
    appid: currentAccount.appid,
    date1: date1,
    date2: date2,
  }).done(function (data) {
    console.log(data);
    /*const myChart = echarts.init(document.getElementById(who));
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        orient: 'horizontal',
        selected: selected1,
        data: legendData1,
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
          data: dates,
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
        },
        {
          type: 'value',
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
            formatter: function (value) {
              return value + '%';
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
        },
      ],
      series: series,
    };
    myChart.setOption(option);
    window.onresize = myChart.resize;*/
  });

}
$(() => {
  // let $cln=$('.trends');
  let flo=1;
  $('.date1').attr('value', utils.getDateStr(-2));
  $('.dp').datepicker();
  $(document).on('click','.del',function(){
    $(this).parent().remove();
  });
  $('#date1').change(function () {
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
  });
  $('.tj').click(function(){
    $('.trends-all').append( mo());
    $(".dp").datepicker();
    $('.date1').attr('value', utils.getDateStr(-2));
  })

  $('.ck').click(function(){
    $('.trends').each(function(){
      flo++;
      let index='d'+flo;
      $('.tol').append('<div id="'+index+'" style="height:400px;width:100%;"></div>');
      let day=$(this).find('.dp').val().split('/');
      let min1=$(this).find('.time1').val()+':00';
      let min2=$(this).find('.time2').val()+':00';
      let time1=day[2] + '-' + day[0] + '-' + day[1]+' '+min1;
      let time2=day[2] + '-' + day[0] + '-' + day[1]+' '+min2;
      // let str1 = time1.replace(/-/g,'/');
      // let str2 = time2.replace(/-/g,'/');
      // let date1 = new Date(str1);
      // let date2 = new Date(str2);
      // console.log(date1);
      // console.log(date2);
      lin(index,time1,time2);
    })
  })

});
