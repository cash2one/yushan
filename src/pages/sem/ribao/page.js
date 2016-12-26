/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tb = require('./tb/table.ejs');
const tb1 = require('./tb/table1.ejs');
require('static/vendor/jquery-ui.min');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/list.min');
require('static/vendor/bootstrap-editable.min');

require('static/css/reset.css');
require('static/css/jquery-ui.min.css');
require('static/css/bootstrap-editable.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  var arr1 = $('#date1').val().split('/');
  var arr2 = $('#date2').val().split('/');
  var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
  var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
  sum($('#zhe').val(), currentAccount.appid, e, s)
});

function sum(zhe, appid, edate, sdate) {
  utils.ajax(apiUrl.getApiUrl('getRiBao'), {
    zhe: zhe,
    appid: appid,
    edate: edate,
    sdate: sdate,
  }).done(function (data) {

    /*datas = data;*/
    var an = [];
    var ios = [];
    for (var i = 0; i < data[1].length; i++) {
      var a = 0;
      var b = 0;
      for (var j = 0; j < data[1][i].length; j++) {
        if (data[1][i][j].name.toLowerCase().indexOf('ios') > -1) {
          b += parseFloat(data[1][i][j].cost);
        } else {
          a += parseFloat(data[1][i][j].cost);
        }
      }
      an.push(a);
      ios.push(b);
    }

    for (var i = 0; i < data[0].length; i++) {
      data[0][i].zheCost = (data[0][i].cost / parseFloat(zhe)).toFixed(3);
      data[0][i].clkDan = (data[0][i].cost / data[0][i].total_pv).toFixed(3);
      data[0][i].clkRate = ((data[0][i].total_pv / parseFloat(data[0][i].view)).toFixed(3)) * 100;
      data[0][i].zheDown = (data[0][i].zheCost / data[0][i].total_count).toFixed(3);
      data[0][i].acRate = (data[0][i].total_active / data[0][i].total_pv).toFixed(3) * 100;
      data[0][i].zheAnC = (an[i] / parseFloat(zhe)).toFixed(3);
      data[0][i].zheIoC = (ios[i] / parseFloat(zhe)).toFixed(3);
      // data[0][i].zheAnB=(data[0][i].zheAnC/parseFloat($('.an_total_active').eq(i).text())).toFixed(3);
      // data[0][i].zheIoB=(data[0][i].zheIoC/parseFloat($('.ios_total_active').eq(i).text())).toFixed(3);
    }


    console.log(data);
    $('.tmp').html(tb({data: data[0]}));
    $('#table1').tablesorter();


    var options = {
      valueNames: ['time', 'view', 'clk', 'cost', 'zhecost', 'clkdan', 'clkrate', 'yushandown', 'zhedown', 'totalactive', 'activerate', 'zheancost', 'antotalactive', 'zheioscost', 'iostotalactive', 'zheancheng', 'zheioscheng', 'shuoming']
    };
    var userList = new List('users', options);

    /****************表1结束*/
    var biao2 = [];
    for (var i = 0; i < data[1].length; i++) {

      for (var j = 0; j < data[1][i].length; j++) {
        // console.log(j);
        data[1][i][j].date = data[0][i].date;

        biao2.push(data[1][i][j])
      }
    }
    // console.log(biao2);
    for (let k = 0; k < biao2.length; k++) {
      biao2[k].pingClk = (parseFloat(biao2[k].cost) / parseFloat(biao2[k].pv)).toFixed(3);
      biao2[k].btnViewBi = (parseFloat(biao2[k].baidu_view_button) / parseFloat(biao2[k].view)).toFixed(3);
      biao2[k].btnCostBi = (parseFloat(biao2[k].button_cost) / parseFloat(biao2[k].cost)).toFixed(3);
      biao2[k].h5Cost = (parseFloat(biao2[k].cost) - parseFloat(biao2[k].button_cost)).toFixed(3);
    }
    $('.tmp1').html(tb1({data: biao2}));
    $('#table2').tablesorter();
    var options2 = {
      listClass: 'list1',
      searchClass: 'search1',
      valueNames: ['date', 'name', 'tview', 'tpv', 'tcost', 'tclkrate', 'tclkcost', 'tbtnview', 'tbtnclk', 'tbtncost', 'tviewbi', 'tcostbi', 'h5cost', 'h5active', 'h5activeben', 'btnactive', 'btnactiveben', 'remark']
    };
    var userList2 = new List('users2', options2);
    $('.h5_active').editable();
    $('.btn_active').editable();
    $('.remark1').editable();
    $('.tot_active').editable();
    $('.beizhu').editable();
    $('.an_total_active').editable();
    $('.ios_total_active').editable();
  });
}

function pos(active, appid, beizhu, date, device, type, plan, is) {
  utils.ajaxPost(apiUrl.getApiUrl('getP'), {
    active: active,
    appid: appid,
    beizhu: beizhu,
    date: date,
    device: device,
    type: type,
    plan: plan,
    isbutton: is,
  }).done(function (data) {
    console.log(data);
  });
}
$(() => {
  $('#date1').attr('value', utils.getDateStr(-2));
  $('#date2').attr('value', utils.getDateStr(-1));
  $('#zhe').val('1');
  $("input[id='date1']").datepicker();
  $("input[id='date2']").datepicker();

  $('.nav-li span').click(function () {
    $(this).addClass('ck');
    $(this).siblings().removeClass('ck');
  });
  $('.li1').click(function () {
    $('.ribao1').show();
    $('.jihua1').hide();
  });
  $('.li2').click(function () {
    $('.ribao1').hide();
    $('.jihua1').show();
  });
  $(document).on('click', '.tijiao', function () {
    if ($(this).parents('td').attr('class').toString() == 'totalactive') {
      pos(parseFloat($(this).parent().siblings('.editable-input').find('textarea').val()), currentAccount.appid, '', $(this).parents('td').siblings('.time').text(), '', 'all', '', false);
      $(this).parents('td').siblings('.activerate').text((parseFloat($(this).parent().siblings('.editable-input').find('textarea').val()) / parseFloat($(this).parents('td').siblings('.clk').text())).toFixed(3) * 100 + '%');
    } else if ($(this).parents('td').attr('class').toString() == 'antotalactive') {
      pos(parseFloat($(this).parent().siblings('.editable-input').find('textarea').val()), currentAccount.appid, '', $(this).parents('td').siblings('.time').text(), 'android', 'all', '', false);

      $(this).parents('td').siblings('.zheancheng').text((parseFloat($(this).parents('td').siblings('.zheancost').text()) / parseFloat($(this).parent().siblings('.editable-input').find('textarea').val())).toFixed(3))

      if (parseFloat($(this).parents('td').siblings('.totalactive').find('.tot_active').text()) >= parseFloat($(this).parent().siblings('.editable-input').find('textarea').val())) {
        $(this).parents('td').siblings('.iostotalactive').find('.ios_total_active').text(parseFloat($(this).parents('td').siblings('.totalactive').find('.tot_active').text()) - parseFloat($(this).parent().siblings('.editable-input').find('textarea').val()));
      }
    } else if ($(this).parents('td').attr('class').toString() == 'iostotalactive') {
      pos(parseFloat($(this).parent().siblings('.editable-input').find('textarea').val()),currentAccount.appid, '', $(this).parents('td').siblings('.time').text(), 'ios', 'all', '', false);

      $(this).parents('td').siblings('.zheioscheng').text((parseFloat($(this).parents('td').siblings('.zheioscost').text()) / parseFloat($(this).parent().siblings('.editable-input').find('textarea').val())).toFixed(3))

      if (parseFloat($(this).parents('td').siblings('.totalactive').find('.tot_active').text()) >= parseFloat($(this).parent().siblings('.editable-input').find('textarea').val())) {
        $(this).parents('td').siblings('.antotalactive').find('.an_total_active').text(parseFloat($(this).parents('td').siblings('.totalactive').find('.tot_active').text()) - parseFloat($(this).parent().siblings('.editable-input').find('textarea').val()));
      }
    } else if ($(this).parents('td').attr('class').toString() == 'shuoming') {
      pos('', currentAccount.appid, $(this).parent().siblings('.editable-input').find('textarea').val(), $(this).parents('td').siblings('.time').text(), '', 'all', '', false);

    } else if ($(this).parents('td').attr('class').toString() == 'h5active') {
      pos(parseFloat($(this).parent().siblings('.editable-input').find('textarea').val()),currentAccount.appid, '', $(this).parents('td').siblings('.date').text(), '', 'h5', $(this).parents('td').siblings('.name').text(), false);

      $(this).parents('td').siblings('.h5activeben').text((parseFloat($(this).parents('td').siblings('.h5cost').text()) / parseFloat($(this).parent().siblings('.editable-input').find('textarea').val())).toFixed(2))
    } else if ($(this).parents('td').attr('class').toString() == 'btnactive') {
      pos(parseFloat($(this).parent().siblings('.editable-input').find('textarea').val()), currentAccount.appid, '', $(this).parents('td').siblings('.date').text(), '', 'btn', $(this).parents('td').siblings('.name').text(), true);

      $(this).parents('td').siblings('.btnactiveben').text((parseFloat($(this).parents('td').siblings('.tbtncost').text()) / parseFloat($(this).parent().siblings('.editable-input').find('textarea').val())).toFixed(2))
    } else if ($(this).parents('td').attr('class').toString() == 'remark') {
      pos('',currentAccount.appid, $(this).parent().siblings('.editable-input').find('textarea').val(), $(this).parents('td').siblings('.date').text(), '', 'plan', $(this).parents('td').siblings('.name').text(), false);

    }
  });

  $('#table1').tablesorter();
  var arr1 = $('#date1').val().split('/');
  var arr2 = $('#date2').val().split('/');
  var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
  var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
  sum(1,currentAccount.appid, e, s)
  $('#date1').change(function () {
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
    sum($('#zhe').val(),currentAccount.appid, e, s)
  });
  $('#date2').change(function () {
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
    sum($('#zhe').val(),currentAccount.appid, e, s)
  });
  $('#zhe').change(function () {
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
    sum($(this).val(), currentAccount.appid, e, s)
  });
  $('.out').click(function(){
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
    utils.formSubmit(apiUrl.getApiUrl('setOut'), {
      zhe: $('#zhe').val(),
      appid: currentAccount.appid,
      name: currentAccount.username,
      edate: e,
      sdate: s,
    })
  })
});
