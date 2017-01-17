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
require('static/js/validator');
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
    for(let i=0;i<data.length;i++){
      // data[i].date=utils.dateFormat(data[i].date, 'yyyy-MM-dd');
      data[i].date=utils.dateFormat(new Date(data[i].taskname), 'yyyy-MM-dd hh:mm:ss');
      if(data[i].isfinish){
        data[i].flag='已完成';
      }else{
        data[i].flag='未完成';
      }
    }
    $('.new').html(tb({data: data}));

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
    if(parseFloat($(this).val())>3000 || parseFloat($(this).val())<50){
      $(this).css('border','2px solid red');
      $('.record button').attr('disabled','disabled')
    }else{
      $('.record button').removeAttr('disabled');
      $(this).css('border','1px solid #ccc');
    }
  });
  rw();
  let flag1=1;
  let flag2=1;
  $('.gj').click(function(){
    if(flag1==1){
      $('.luo').slideUp();
      flag1=0;
    }else{
      $('.luo').slideDown();
      flag1=1;
    }
  });
  $('.cy').click(function(){
    if(flag2==1){
      $('.sheng').slideUp();
      flag2=0;
    }else{
      $('.sheng').slideDown();
      flag2=1;
    }
  });

  $("#myForm").validate({
    submitHandler: function () {
      console.log($("#myForm").serializeArray());

      var dataArr = $("#myForm").serializeArray();
      dataArr.push({name:"appid",value:currentAccount.appid});
      var data = {};

      $.each(dataArr, function(i, field){
        if(field.name == 'words'){
          let l=field.value.replace(/，/ig ,',');
          let strAry= l.split(',');
          data[field.name] = JSON.stringify(strAry);
        }else if(field.name == 'include'){
          let l1=field.value.replace(/，/ig ,',');
          let strAry1= l1.split(',');
          data[field.name] = JSON.stringify(strAry1);
        }else if(field.name == 'noinclude'){
          let l2=field.value.replace(/，/ig ,',');
          let strAry2= l2.split(',');
          data[field.name] = JSON.stringify(strAry2);
        }else{
          data[field.name] = field.value;
        }
      });

      /*let dat = $("#myForm").serialize();
       dat.appid = currentAccount.appid;

       console.log(dat);*/
      // console.log($('.sele').val())
      utils.ajaxPost(apiUrl.getApiUrl('getZhong'),data).done(function (data) {
        console.log(data);
        var date=utils.dateFormat(data.date, 'yyyy-MM-dd hh:mm:ss');
        var flag='';
        let u='';
        if(data.isfinish){
          flag='已完成';
          u='<td class="rate"><span>'+flag+'</span><button data-name='+data.taskname+'>下载</button>'
        }else{
          flag='未完成';
          u='<td class="rate"><span>'+flag+'</span><button data-name='+data.taskname+' disabled>下载</button>'
        }
        var html='';
        html+='<tr class="lin" title="'+data.taskname+'">';
        html+='<td class="click" style="width: 50%;">'+ date;
        html+='</td>';
        html+='<td class="down"> <span>'+flag+'</span>';
        html+='</td>';
        html+=u;
        html+='</td>';
        html+='</tr>';
        $('#myTable .list').prepend(html);
      });

      return false;
    },
  });

  // $('.bt').click(function(e){
  //
  //     console.log($("#myForm").serializeArray());
  //
  //     var dataArr = $("#myForm").serializeArray();
  //     dataArr.push({name:"appid",value:currentAccount.appid});
  //     var data = {};
  //
  //     $.each(dataArr, function(i, field){
  //       if(field.name == 'words'){
  //         var l=field.value.replace(/，/ig ,',');
  //         var strAry= l.split(',');
  //         data[field.name] = JSON.stringify(strAry);
  //       }else{
  //         data[field.name] = field.value;
  //       }
  //     });
  //
  //     /*let dat = $("#myForm").serialize();
  //     dat.appid = currentAccount.appid;
  //
  //     console.log(dat);*/
  //   // console.log($('.sele').val())
  //   utils.ajaxPost(apiUrl.getApiUrl('getZhong'),data).done(function (data) {
  //     console.log(data);
  //     var date=utils.dateFormat(data.date, 'yyyy-MM-dd hh:mm:ss');
  //     var flag='';
  //     let u='';
  //     if(data.isfinish){
  //       flag='已完成';
  //       u='<td class="rate"><span>'+flag+'</span><button data-name='+data.taskname+'>下载</button>'
  //     }else{
  //       flag='未完成';
  //       u='<td class="rate"><span>'+flag+'</span><button data-name='+data.taskname+' disabled>下载</button>'
  //     }
  //     var html='';
  //     html+='<tr class="lin" title="'+data.taskname+'">';
  //     html+='<td class="click" style="width: 50%;">'+ date;
  //     html+='</td>';
  //     html+='<td class="down"> <span>'+flag+'</span><button data-name='+data.taskname+' disabled>完成</button>';
  //     html+='</td>';
  //     html+=u;
  //     html+='</td>';
  //     html+='</tr>';
  //     $('#myTable .list').prepend(html);
  //   });
  //   e.preventDefault();
  // });
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
