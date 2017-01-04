/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tb = require('./table/table.ejs');
const tb1 = require('./table/table1.ejs');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/list.min');

require('static/css/reset.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  rw();
  $('.xiang').html('');
});

function rw(){
  utils.ajax(apiUrl.getApiUrl('getTask'), {
    appid: currentAccount.appid,
  }).done(function (data) {
    console.log(data);
    var date=[];
    for(var i=0;i<data.length;i++){
      date.push({taskname:String(data[i])});
      console.log(new Date(data[i]));
    }

    for(let i=0;i<date.length;i++){
      // data[i].date=utils.dateFormat(data[i].date, 'yyyy-MM-dd');
      date[i].date=utils.dateFormat(new Date(data[i]), 'yyyy-MM-dd hh:mm:ss');
      // if(data[i].isfinish){
        date[i].flag='已完成';
      // }else{
      //   data[i].flag='未完成';
      // }
    }
    console.log(date);
    $('.new').html(tb({date: date}));

  });
}
$(() => {
  $('.zhongzi').change(function(){
    // console.log($(this).val().length)
    if($(this).val().length>5000){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled')
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });
  $('.yidongwen').change(function(){
    if($(this).val().length>1024){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled')
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });
  $('.yidongxian').change(function(){
    if($(this).val().length>36){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled')
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });
  $('.chuangtitle').change(function(){
    if($(this).val().length>50 || $(this).val().length<8){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled')
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });
  $('.chuang1,.chuang2').change(function(){
    if($(this).val().length>80 || $(this).val().length<8){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled')
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });
 /* $('.key').change(function(){
    if($(this).val().length>80){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled')
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });*/
  $('.danyuan,.jihua').change(function(){
    if($(this).val().length>15){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled')
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });
  $('.out').change(function(){
    // console.log($(this).val());
    // console.log(typeof $(this).val());
    if(parseFloat($(this).val())>10 || parseFloat($(this).val())<0.3){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled');
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });
  $('.ys').change(function(){
    if(parseFloat($(this).val())>50){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled')
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });
  rw();
  $('.record button').click(function(){
    var l=$('.zhongzi').val().replace(/，/ig ,',');
    var strAry= l.split(',');
    console.log(strAry);
    // console.log($('.sele').val())
    utils.ajaxPost(apiUrl.getApiUrl('getZhong'), {
      appid: currentAccount.appid,
      words:JSON.stringify(strAry),
      zsx:$('.sx').val(),
      ys:$('.ys').val(),
      tpf:$('.tpf').val(),
      ly:$('.ly').val(),
      price:$('.out').val(),
      plan:$('.jihua').val(),
      unit:$('.danyuan').val(),
      url:$('.ul').val(),
      matchModel:$('.pipei').val(),
      fwurl:$('.yidongwen').val(),
      xsurl:$('.yidongxian').val(),
      gisuse:$('.gsele').val(),
      cisuse:$('.csele').val(),
      cytitle:$('.chuangtitle').val(),
      cyms1:$('.chuang1').val(),
      cyms2:$('.chuang2').val(),
    }).done(function (data) {
      console.log(data);
      var date=utils.dateFormat(data.date, 'yyyy-MM-dd');
      var flag='';
      if(data.isfinish){
        flag='已完成';
      }else{
        flag='未完成';
      }
      var html='';
      html+='<tr class="lin" title="'+data.taskname+'">';
      html+='<td class="click">'+ date;
      html+='</td>';
      html+='<td class="down"> <span>'+flag+'</span><button data-name='+data.taskname+' disabled>完成</button>';
      html+='</td>';
      html+='<td class="rate"> <span>'+flag+'</span><button data-name='+data.taskname+'>下载</button>';
      html+='</td>';
      html+='</tr>';
      $('#myTable .list').prepend(html);
    });
  });
  $(document).on('click','.lin',function(){
    $(this).find('td').addClass('llin');
    $(this).siblings().find('td').removeClass('llin');
    utils.ajax(apiUrl.getApiUrl('getSomeTask'), {
      appid: currentAccount.appid,
      taskname: $(this).attr('title'),
    }).done(function (data) {
      console.log(data);
      $('.xiang').html(tb1({data: data}));
      $('#table').tablesorter();
    });
  });
  $(document).on('click','.rate button',function(){

    utils.formSubmit(apiUrl.getApiUrl('OutTuoCi'), {
      appid: currentAccount.appid,
      taskname: $(this).data("name"),
    });
    /*utils.ajax(apiUrl.getApiUrl(''), {
      appid: currentAccount.appid,
    }).done(function (data) {

    });*/
  })
});
