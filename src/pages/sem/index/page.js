/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
require('static/css/reset.css');
require('./page.css');

const tmp = require('./tb/table.ejs');

const utils = require('utils');
const apiUrl = require('static/js/api');

$(() => {
  var app1=document.getElementsByClassName("user")[0];
  var now = new Date()
  var hour = now.getHours()
  if(hour < 6){$(".time").text(",凌晨好！")}
  else if (hour < 9){$(".time").text(",早上好！")}
  else if (hour < 12){$(".time").text(",上午好！")}
  else if (hour < 14){$(".time").text(",中午好！")}
  else if (hour < 17){$(".time").text(",下午好！")}
  else if (hour < 19){$(".time").text(",傍晚好！")}
  else if (hour < 22){$(".time").text(",晚上好！")}
  else {$(".time").text(",夜里好！")}

  $(".userb-1").text('xxx');
  var time;
  $('.xuan1').click(function(){
    $(this).hide();
    $('.xuan2').css('display','inline-block');
    time=setTimeout(function(){
      $('.xuan2').hide();
      $('.xuan1').show();
    },5000)
  });
  $('.xuan2').click(function(){
    clearTimeout(time);
    /*layer.confirm('是否退出账户', {
      btn: ['是','否'] //按钮
    }, function(){
      layer.msg('( ^_^ )/~~拜拜', {icon: 1});
      setTimeout(function(){
        window.location="./index.html"
      },2000)
    }, function(){
      layer.msg('又见面啦(*^__^*) 嘻嘻……', {icon:6});
      $(".xuan2").hide();
      $(".xuan1").show();
    });*/
  })

  utils.ajax(apiUrl.getApiUrl('getSKWord'), {
    appid: $('.appid').val(),
    date: $('.time').val(),
  }).done(function (data) {
    console.log('dd'+data)
    // $("dd").text(data[0].message)
  });
  utils.ajax(apiUrl.getApiUrl('getPay'), {
    userId: '111',
  }).done(function (data) {
    var appid=[];
    var nam=[];
    var total_balance=[];
    console.log(data);
    for(var i=0;i<data.length;i++){
      if(data[i].mobileBalance=='null'){
        data[i].mobileBalance="无";
      }
      appid.push(data[i].appid);
      nam.push(data[i].username);
      total_balance.push(data[i].mobileBalance)
    }
    app1.oninput=function(){
      var ann=[];
      for(var i=0;i<nam.length;i++){
        if(nam[i].indexOf($(this).val()) > -1){
          ann.push(data[i]);
        }
      }
      $('.see').html(tmp({data: ann}));
      $(".z1").each(function(){
        $(this).hover(function(){
          $(this).find(".z1-1").css("border-bottom","1px solid #428fb8").find(".p").css("color","#4390b9");
          $(this).find(".three").css("color","#4390b9");
          $(this).css("border","1px solid #428fb8")
        },function(){
          $(this).find(".z1-1").css("border-bottom","1px solid #e5e5e5").find(".p").css("color","#333333");
          $(this).find(".three").css("color","#eeeeee");
          $(this).css("border","1px solid #e5e5e5")
        })
      })

    }
    $('.see').html(tmp({data: data}));

    $(".z1").each(function(){
      $(this).hover(function(){
        $(this).find(".z1-1").css("border-bottom","1px solid #428fb8").find(".p").css("color","#4390b9");
        $(this).find(".three").css("color","#4390b9");
        $(this).css("border","1px solid #428fb8")
      },function(){
        $(this).find(".z1-1").css("border-bottom","1px solid #e5e5e5").find(".p").css("color","#333333");
        $(this).find(".three").css("color","#eeeeee");
        $(this).css("border","1px solid #e5e5e5")
      })
    })

  });
});
