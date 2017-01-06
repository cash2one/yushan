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
let flo=1;
let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload()
  /*flo=0;
  $('.trends-all').empty();
  $('.tol').empty();*/
});

function lin(who,date1,date2){

  utils.ajax(apiUrl.getApiUrl('getTime'), {
    appid: currentAccount.appid,
    date1: date1,
    date2: date2,
  }).done(function (data) {
    console.log(data);
    let days=[];
    let series=[];
    let datas=[];
    let cpc=[];
    let show=[];
    let click=[];
    let spend=[];
    for(let i=0;i<data.length;i++){
      days.push(utils.dateFormat(data[i].dateTime, 'MM-dd hh:mm'));
      cpc.push(data[i].cpc.toFixed(2));
      show.push(data[i].showCount);
      click.push(data[i].clickCount);
      spend.push(data[i].spend);
    }
    // console.log(cpc);
    // console.log(show);
    // console.log(click);
    // console.log(spend);
    datas[0]={
      name: 'CPC',
      data: cpc,
    };
    datas[1]={
      name: '点击',
      data: click,
    };
    datas[2]={
      name: '展现',
      data: show,
    };
    datas[3]={
      name: '消费',
      data: spend,
    };
    console.log(datas);
    for(let i=0;i<datas.length;i++){
      series.push({
        name: datas[i].name,
        type: 'line',
        line: '总量',
        data: datas[i].data,
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

    // console.log(days);
    const myChart = echarts.init(document.getElementById(who));
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        show:true,
        borderWidth:'1',
        borderColor:'black'
      },
      legend: {
        orient: 'horizontal',
        data:['CPC', '展现', '点击', '消费'],
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
  });

}
$(() => {
  // let $cln=$('.trends');
  $('.date1').attr('value', utils.getDateStr(-1));
  $('.dp').datepicker();
  $(document).on('click','.del',function(){
    $(this).parent().remove();
  });
  $('.tj').click(function(){
    $('.trends-all').append( mo());
    $('.dp').datepicker();
    $('.date1').attr('value', utils.getDateStr(-1));
  });

  $('.ck').click(function(){
    $('.tol').empty();
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
