/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const mo = require('./mo.ejs');
const tb = require('./tb/table.ejs');
const tb1 = require('./tb/table1.ejs');
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
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/bootstrap-editable.min');
require('static/css/bootstrap-editable.css');
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


function lin(type,plan) {
  pin = [];
  let line=$('#page-wrapper').find('.trends').length;
  // console.log(line);
  for(let i=0;i<line;i++){
    $('.trends').eq(i).find('.inx').text(i+1);
  }
  $('.trends').each(function () {
    let day = $(this).find('.dp').val().split('/');
    let min1 = $('.time1').val() + ':00';
    let min2 = $('.time2').val() + ':00';
    let time1 = day[2] + '-' + day[0] + '-' + day[1] + ' ' + min1;
    let time2 = day[2] + '-' + day[0] + '-' + day[1] + ' ' + min2;
    utils.ajaxAsync(apiUrl.getApiUrl('getTime'), {
      appid: currentAccount.appid,
      date1: time1,
      date2: time2,
      type: type,
      planid: plan,
    }).done(function (data) {
      // console.log(data);
      pin.push(data);
    });
  });

}
function draw(d,n,days,series){
  const myChart = echarts.init(document.getElementById(d));
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        // console.log(params);
        let rev='';
          for(let i=0;i<params.length;i++){
            if(params[i].data){
              rev+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].data.name + '：' + params[i].data.value+'<br/>';
            }
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
        axisLabel:{
          interval: 0
        },
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
}
function pu(series,name,data){
  series.push({
    name: name,
    type: 'line',
    line: '总量',
    data: data,
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
          show: false,
        },
      },
    },
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
  let acve = [];
  let acvecb = [];
  let series = [];
  let cpd = [];
  let api = [];
  let downtotal = [];
  let n = [];
  $('.tb').html('');
  /*for (let i = 1; i < who.length; i++) {
    if (max < who[i].length) {
      max = who[i].length;
    }
  }*/
  for (let i = 0; i < who.length; i++) {
    n.push((i+1).toString());
  }
  try{
    for (let i = 0; i < who.length; i++) {
      for (let j = 0; j < who[i].length; j++) {
        who[i][j].dateTime1= utils.dateFormat(who[i][j].dateTime, 'yyyy-MM-dd hh:mm:ss');
        who[i][j].dateTime= utils.dateFormat(who[i][j].dateTime, 'MM-dd hh:mm');
        who[i][j].dian= utils.dateFormat(who[i][j].dateTime, 'hh');
        who[i][j].cpc= who[i][j].cpc ? who[i][j].cpc.toFixed(2) : 0;
        who[i][j].clickCount= who[i][j].clickCount ? who[i][j].clickCount: 0 ;
        who[i][j].showCount= who[i][j].showCount ? who[i][j].showCount: 0 ;
        who[i][j].spend= who[i][j].spend ? who[i][j].spend: 0 ;
        who[i][j].cpd= who[i][j].cpd ? who[i][j].cpd.toFixed(2): 0 ;
        who[i][j].download_total= who[i][j].download_total ? who[i][j].download_total: 0 ;
        who[i][j].api_count= who[i][j].api_count ? who[i][j].api_count: 0 ;
        // who[i][j].active_chengben= who[i][j].spend/who[i][j].active?(who[i][j].spend/who[i][j].active).toFixed(2): 0 ;
      }
    }
  }catch (e){
    console.log(e.name + ": " + e.message);
  }
  for (let j = 0; j < who[1].length; j++) {
    days.push(utils.dateFormat(who[1][j].dateTime, 'hh'));
  }
  // for (let i = 0; i < who.length; i++) {
    $('.tb').append(tb({data: who}));
  // }
  $('#jiahua_table').tablesorter();
  $('.all_active').editable();

  /*for (let i = 1; i < max; i++) {
    days.push(i);
  }*/
  for (let i = 0; i < who.length; i++) {
    switch (logo) {
      case 'cpc': {
        cpc = [];
        for (let j = 0; j < who[i].length; j++) {
          cpc.push({
            value: who[i][j].cpc,
            name: who[i][j].dateTime,
          });
        }
        pu(series,n[i],cpc);
      }
        break;
      case '展现': {
        show = [];
        for (let j = 0; j < who[i].length; j++) {
          show.push({
            value: who[i][j].showCount,
            name: who[i][j].dateTime,
          });
        }
        pu(series,n[i],show);
      }
        break;
      case '点击': {
        click = [];
        for (let j = 0; j < who[i].length; j++) {
          click.push({
            value: who[i][j].clickCount,
            name:who[i][j].dateTime,
          });
        }
        pu(series,n[i],click);
      }
        break;
      case '消费': {
        spend = [];
        for (let j = 0; j < who[i].length; j++) {
          spend.push({
            value: who[i][j].spend,
            name:who[i][j].dateTime,
          });
        }
        pu(series,n[i],spend);

      }
        break;
      case '激活': {
        acve = [];
        for (let j = 0; j < who[i].length; j++) {
          acve.push({
            value: who[i][j].active,
            name:who[i][j].dateTime,
          });
        }
        pu(series,n[i],acve);

      }
        break;
      case '激活成本': {
        acvecb = [];
        for (let j = 0; j < who[i].length; j++) {
          acvecb.push({
            value: who[i][j].active_chengben,
            name:who[i][j].dateTime,
          });
        }
        pu(series,n[i],acvecb);

      }
        break;
      case 'cpd': {
        cpd = [];
        for (let j = 0; j < who[i].length; j++) {
          cpd.push({
            value: who[i][j].cpd,
            name:who[i][j].dateTime,
          });
        }
        pu(series,n[i],cpd);

      }
        break;
      case '总下载': {
        downtotal = [];
        for (let j = 0; j < who[i].length; j++) {
          downtotal.push({
            value: who[i][j].download_total,
            name:who[i][j].dateTime,
          });
        }
        pu(series,n[i],downtotal);

      }
        break;
      case 'API余额': {
        api = [];
        for (let j = 0; j < who[i].length; j++) {
          api.push({
            value: who[i][j].api_count,
            name:who[i][j].dateTime,
          });
        }
        pu(series,n[i],api);

      }
        break;
    }
  }

  draw('d1',n,days,series);
}
function legend1(logo, data) {
  console.log(data);
  let max = data[0].length;
  let days = [];
  let datas = [];
  let cpc = [];
  let show = [];
  let click = [];
  let spend = [];
  let acve = [];
  let acvecb = [];
  let btnclick = [];
  let btnshow = [];
  let btnspend = [];
  let series = [];
  let cpd = [];
  let total = [];
  let api = [];
  let n = [];
  $('.tb1').html('');
  /*for (let i = 1; i < data.length; i++) {
    if (max < data[i].length) {
      max = data[i].length;
    }
  }*/
  /*for (let i = 1; i < max; i++) {
    days.push(i);
  }*/
  for (let i = 0; i < data.length; i++) {
    n.push((i+1).toString());
  }
  try{
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        data[i][j].dateTime1= utils.dateFormat(data[i][j].dateTime, 'yyyy-MM-dd hh:mm:ss');
        data[i][j].dateTime= utils.dateFormat(data[i][j].dateTime, 'MM-dd hh:mm');
        data[i][j].dian= utils.dateFormat(data[i][j].dateTime, 'hh');
        data[i][j].cpc= data[i][j].cpc ? data[i][j].cpc.toFixed(2) : 0;
        data[i][j].clickCount= data[i][j].clickCount ? data[i][j].clickCount: 0 ;
        data[i][j].showCount= data[i][j].showCount ? data[i][j].showCount: 0 ;
        data[i][j].spend= data[i][j].spend ? data[i][j].spend: 0 ;
        data[i][j].total_btnClickCount= data[i][j].total_btnClickCount ? data[i][j].total_btnClickCount: 0 ;
        data[i][j].total_btnShowCount= data[i][j].total_btnShowCount ? data[i][j].total_btnShowCount: 0 ;
        data[i][j].total_btnSpend= data[i][j].total_btnSpend ? data[i][j].total_btnSpend: 0 ;
        data[i][j].cpd= data[i][j].cpd ? data[i][j].cpd.toFixed(2): 0 ;
        data[i][j].download_total= data[i][j].download_total ? data[i][j].download_total: 0 ;
        data[i][j].api_count= data[i][j].api_count ? data[i][j].api_count: 0 ;
        // data[i][j].activecb= data[i][j].spend/data[i][j].active ? (data[i][j].spend/data[i][j].active).toFixed(2): 0 ;
        // data[i][j].total_btnSpend= data[i][j].total_btnSpend.toFixed(2);
      }
    }
  }catch (e){
    console.log(e.name + ": " + e.message);
  }
  for (let j = 0; j < data[1].length; j++) {
    days.push(utils.dateFormat(data[1][j].dateTime, 'hh'));
  }
  // for (let i = 0; i < data.length; i++) {
    $('.tb1').append(tb1({data: data}));
  // }
  $('#zonglan_table').tablesorter();
  $('.all_active1').editable();


  for (let i = 0; i < data.length; i++) {
    switch (logo) {
      case 'cpc': {
        cpc = [];
        for (let j = 0; j < data[i].length; j++) {
          cpc.push({
            value: data[i][j].cpc,
            name: data[i][j].dateTime,
          });
        }
        pu(series,n[i],cpc);
      }
        break;
      case '展现': {
        show = [];
        for (let j = 0; j < data[i].length; j++) {
          show.push({
            value: data[i][j].showCount,
            name: data[i][j].dateTime,
          });
        }
        pu(series,n[i],show);
      }
        break;
      case '点击': {
        click = [];
        for (let j = 0; j < data[i].length; j++) {
          click.push({
            value: data[i][j].clickCount,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],click);
      }
        break;
      case '消费': {
        spend = [];
        for (let j = 0; j < data[i].length; j++) {
          spend.push({
            value: data[i][j].spend,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],spend);
      }
        break;
      case '激活': {
        acve = [];
        for (let j = 0; j < data[i].length; j++) {
          acve.push({
            value: data[i][j].active,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],acve);
      }
        break;
      case '激活成本': {
        acvecb = [];
        for (let j = 0; j < data[i].length; j++) {
          acvecb.push({
            value: data[i][j].active_chengben,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],acvecb);
      }
        break;
      case '按钮点击': {
        btnclick = [];
        for (let j = 0; j < data[i].length; j++) {
          btnclick.push({
            value: data[i][j].total_btnClickCount,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],btnclick);
      }
        break;
      case '按钮展现': {
        btnshow = [];
        for (let j = 0; j < data[i].length; j++) {
          btnshow.push({
            value: data[i][j].total_btnShowCount,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],btnshow);
      }
        break;
      case '按钮消费': {
        btnspend = [];
        for (let j = 0; j < data[i].length; j++) {
          btnspend.push({
            value: data[i][j].total_btnSpend,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],btnspend);
      }
        break;
      case 'cpd': {
        cpd = [];
        for (let j = 0; j < data[i].length; j++) {
          cpd.push({
            value: data[i][j].cpd,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],cpd);
      }
        break;
      case '总下载': {
        total = [];
        for (let j = 0; j < data[i].length; j++) {
          total.push({
            value: data[i][j].download_total,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],total);
      }
        break;
      case 'API余额': {
        api = [];
        for (let j = 0; j < data[i].length; j++) {
          api.push({
            value: data[i][j].api_count,
            name:data[i][j].dateTime,
          });
        }
        pu(series,n[i],api);
      }
        break;
    }
  }
  draw('d2',n,days,series);
}

$(() => {
  let dDate=utils.dateFormat(utils.getDateStr(-1), 'yyyy-MM-dd');
  // console.log(dDate);
  utils.ajaxAsync(apiUrl.getApiUrl('getGPlan'), {
    appid: currentAccount.appid,
    date: dDate,
  }).done(function (data) {
    // console.log(data);
    let html='';
    for(let i=0;i<data.length;i++){
      html+='<option value="'+data[i].campaignId+'">'+data[i].campaignName+'</option>';
    }
    $('.time4').html(html);
  });
  $('.nav-li span').click(function () {
    $(this).addClass('clink');
    $(this).siblings().removeClass('clink');
  });
  $('.li1').click(function () {
    $('.tol').show();
    $('.tol1').hide();
    lin('all','');
    // console.log(pin);
    legend($('.time3').val(), pin);
  });
  $('.li2').click(function () {
    $('.tol').hide();
    $('.tol1').show();
    lin('plan',$('.time4').val());
    // console.log(pin);
    legend1($('.time5').val(), pin);
  });
  // let $cln=$('.trends');
  $('.date1').attr('value', utils.getDateStr(-1));
  $('.n1').attr('value', utils.getDateStr(0));
  $('.n2').attr('value', utils.getDateStr(-1));
  $('.dp').datepicker();
  lin('all','');
  // console.log(pin);
  legend($('.time3').val(), pin);
  $(document).on('click', '.del', function () {
    $(this).parent().remove();
  });
  $('.tj').click(function () {
    $('.trends-all').append(mo());
    $('.dp').datepicker();
    $('.date1').attr('value', utils.getDateStr(-1));
    $('.n1').attr('value', utils.getDateStr(0));
  });
  $('.ck').click(function () {
    switch ($('.nav-li>.clink').text()) {
      case '本户': {
        lin('all','');
        // console.log(pin);
        legend($('.time3').val(), pin);
      }
        break;
      case '计划': {
        lin('plan',$('.time4').val());
        // console.log(pin);
        legend1($('.time5').val(), pin);
      }
        break;
    }

  });
  $('.time3').change(function () {
    legend($(this).val(), pin);
  });
  $(document).on('change','.time4',function(){
    // console.log($(this).val());
    lin('plan',$(this).val());
    // console.log(pin);
    legend1($('.time5').val(), pin);
  });
  $('.time5').change(function () {
    legend1($(this).val(), pin);
  });
  $(document).on('click','.rise',function(){
      $(this).siblings('table').find('tbody').slideUp();
  });
  $(document).on('click','.down',function(){
    $(this).siblings('table').find('tbody').slideDown();
  });
  $(document).on('click', '.tijiao', function () {
    if ($(this).parents('td').attr('class').toString() == 'td_active') {

      const $td = $(this).parents('td');
      const time = $td.data('time');
      const spend = $td.data('spend');
      const record = parseFloat($td.find('.editable-input').find('input').val());
      $(this).parents('td').siblings('.activecb').text((spend/record).toFixed(2));
      utils.ajax(apiUrl.getApiUrl('setHour'), {
        appid: currentAccount.appid,
        type:'all',
        date:time,
        active:record,
        planid:'',
      }).done(function (data) {
        console.log(data);
      });
    }else if ($(this).parents('td').attr('class').toString() == 'td_active1') {

      const $td = $(this).parents('td');
      const time = $td.data('time');
      const role = $td.data('role');
      const spend = $td.data('spend');
      const record = parseFloat($td.find('.editable-input').find('input').val());
      $(this).parents('td').siblings('.activecb').text((spend/record).toFixed(2));
      utils.ajax(apiUrl.getApiUrl('setHour'), {
        appid: currentAccount.appid,
        type:'all',
        date:time,
        active:record,
        planid:role,
      }).done(function (data) {
        console.log(data);
      });

    }
  });
});
