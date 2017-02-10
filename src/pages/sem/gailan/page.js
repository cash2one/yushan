/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const utils = require('utils');
// 引入 ECharts 主模块
require('static/css/reset.css');
require('./page.css');
const tb = require('./type/enroll.ejs');
const zeng = require('./images/增.png');
const jian = require('./images/减.png');
const tian1 = require('./images/颜色填充-6-拷贝@2x.png');
const tian2 = require('./images/颜色填充-6-拷贝-5@2x.png');
const zhuan1 = require('./images/转化icon (2).png');
const zhuan2 = require('./images/转化icon.png');

const lineChart = require('./charts/line');
const pieChart = require('./charts/pie');

const apiUrl = require('static/js/api');
let flag = 1;
let user_id;
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  upload(currentAccount.appid, flag);
  pei();
});

function ajax(str,flag) {
  // $('#main').show();
  // console.log(flag);
  if (flag === 1) {
    utils.ajax(apiUrl.getApiUrl('getAccountTwoWeek'), {
      c1: str,
    }).done(function (el) {
      var activeRate = [];
      var days = [];
      var downloadRate = [];
      var totalCost = [];
      var totalPV = [];
      var totalCount = [];
      var selecteder = {};
      var legendData = [];
      var line = [];

      // console.log('el' + el);

      for (let i = 0; i < el.length; i++) {
        activeRate.push(parseFloat(el[i].active_rate));
        days.push(el[i].date);
        downloadRate.push(parseFloat(el[i].download_rate));
        totalCost.push(el[i].cost);
        totalPV.push(el[i].total_pv);
        totalCount.push(el[i].total_count);
      }
      line[0] = {
        name: '总消费',
        data: totalCost,
        time:days,
      };
      line[1] = {
        name: '按钮点击',
        data: totalCount,
        time:days,
      };
      line[2] = {
        name: 'H5展现',
        data: totalPV,
        time:days,
      };
      line[3] = {
        name: '下载率',
        data: downloadRate,
        time:days,
      };
      line[4] = {
        name: '激活率',
        data: activeRate,
        time:days,
      };
      selecteder = {
        按钮点击: false,
        H5展现: false,
        下载率: false,
        激活率: false,
      };
      legendData = ['总消费', '按钮点击', 'H5展现', '下载率', '激活率'];
      // console.log(days);
      // console.log(el);
      // console.log(line);
      // console.log(selecteder);
      // console.log(legendData);
      lineChart.renderLine('main', days, selecteder, legendData, line);
      // lineChart.renderLine('main', days, selecteder, legendData, { name: '总消费', data: totalCost }, { name: 'H5展现', data: totalPV }, { name: '按钮点击', data: totalCount });
    });
  } else if (flag === 2) {
    utils.ajax(apiUrl.getApiUrl('getAccountWeekCost'), {
      appid: str,
    }).done(function (el) {
      var arr = [];
      var arr2 = [];
      var arr3 = [];
      var selected = {};
      var legendData = [];
      if (el.length !== 0) {
        for (let i = 0; i < el.data.length; i++) {
          arr[i] = el.data[i].date;
        }
        for (let c = 0; c < el.data.length; c++) {
          arr2.push(el.data[c].cost);
        }
      }
      arr3[0] = {
        name: '消费',
        type: 'line',
        symbol: 'emptyCircle',
        symbolSize: 3,
        line: '总量',
        data: arr2,
        //                    symbol:'none',
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
      };
      selected = {
        消费: true,
      };
      legendData = ['消费'];
      // console.log(el);
      lineChart.renderLine('main', arr, selected, legendData, arr3);
    });
  }
}

function upload(str, flag) {
  ajax(str, flag);
 /* if (us === '泰佛之家') {
    $('.dow').text('关注量');
    $('.biao2-2').text('关注率');
  }*/
  // console.log('str' + str);

  utils.ajax(apiUrl.getApiUrl('getAccountAll'), {
    c1: str,
  }).done(function (el) {
    console.log(el);
    if (el.mobileBalance === null) {
      el.mobileBalance = '无';
    }
    $('.apie1 span').text(el.mobileBalance);
    //            $('.ui-b2').text(el.activeRate);
    //            $('.ui-b1').text(el.downloadRate);

    if (el.total_active === 0) {
      $('.yushan-yin2').hide();
      $('.yushan-yin1').show();
    }
    $('.month').text(el.monthCost);
    $('.download').text(el.total_count);
    $('.show').text(el.total_view);
    $('.today').text(el.cost);
    $('.pv').text(el.total_pv);
    $('#active').text(el.total_active);
    $('.yesterday').text(el.yesterdayCost);
    const options1 = {
      title: '成本 ' + (el.cost / el.total_count).toFixed(3),
    };
    const options3 = {
      title: '成本 ' + (el.cost / el.total_pv).toFixed(3),
    };
    const options4 = {
      title: '成本 ' + (el.cost / el.total_active).toFixed(3),
    };
    $('.download').tooltip(options1);
    //            $('.show').tooltip(options2);
    $('.pv').tooltip(options3);
    $('#active').tooltip(options4);

    const tb = (Math.abs(el.total_view - el.yestoday_total_view) / el.yestoday_total_view).toFixed(4);
    const tb1 = (tb * 100).toFixed(2);
    if (el.total_view - el.yestoday_total_view >= 0) {
      $('.tb').css('color', 'red');
      $('.zeng').attr('src', zeng);
    } else {
      $('.tb').css('color', '#5e35b1');
      $('.zeng').attr('src', jian);
    }
    $('.tb').text(tb1 + '%');
    $('.progress-bar').css('width', tb1 + '%');

    pieChart.renderPie(el);
  });

  utils.ajax(apiUrl.getApiUrl('getAllSem'), {}).done(function (data) {
    // let newData=[];
    console.log(data);
    $('#anser').html(tb({data: data}));
  });

  utils.ajax(apiUrl.getApiUrl('getHuSemer'), {
    huid:currentAccount.id,
  }).done(function (data) {
    console.log(data);
    user_id=data.user_id;
    $('.expose').text(data.name);
  });


}
function pei(){
  utils.ajax(apiUrl.getApiUrl('getHu'), {
    appid: currentAccount.appid,
  }).done(function (data) {
    // console.log(data[0].api_count);
    $('.apie span').text(data[0].api_count);
  });
}
$(() => {
  $('.revise').click(function(){
    $('.in-answer').hide();
    $('.out-answer').show();
  });
  $('.up-answer').click(function(){
    // console.log($("#anser").find("option:selected").attr("title"));
    $('.expose').text($("#anser").find("option:selected").attr("title"));
    $('.out-answer').hide();
    $('.in-answer').show();
    utils.ajax(apiUrl.getApiUrl('getHuChangesem'), {
      huid: currentAccount.id,
      userid:$('#anser').val(),
      olduser:user_id,
    }).done(function (data) {
      console.log(data);
      user_id=$('#anser').val();
    });
  });
  $('.abolish').click(function(){
    $('.out-answer').hide();
    $('.in-answer').show();
  });
  pei();

  // console.log(utils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'));
  // console.log(apiUrl.getApiUrl('getUser'));

  // console.log(localStorage.getItem('userName'));
  // console.log(sessionStorage.getItem('userName'));

  $('.start').hover(function () {
    $(this).attr('src', tian1);
  }, function () {
    $(this).attr('src', tian2);
  });

  $('.start1').hover(function () {
    $(this).attr('src', zhuan1);
  }, function () {
    $(this).attr('src', zhuan2);
  }).click(function () {
    $('.yushan-yin2').hide();
    $('.yushan-yin1').show();
  });
  $('.near_twoweek').click(function () {
    /* $('#main').show();
    $('#main1').hide();*/
    flag = 1;
   /* $('#main1').hide();
    $('#main').show();*/
    $('#dropdownMenu1').html('近两周总体数据 <span class="caret"></span>');
    ajax(currentAccount.appid, flag);
  });
  $('.near_week').click(function () {
    /* $('#main1').show();
    $('#main').hide();*/
    flag = 2;
   /* $('#main').hide();
    $('#main1').show();*/
    $('#dropdownMenu1').html('每周总消费趋势 <span class="caret"></span>');
    ajax(currentAccount.appid, flag);
  });
  // let str = utils.getUrlParameter('username');
  // console.log(currentAccount);
  // if (str !== undefined) {
  upload(currentAccount.appid, flag);
  // }
});
