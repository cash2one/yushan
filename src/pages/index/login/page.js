require('!!bootstrap-webpack!bootstrapConfig');
require('lessDir/base.less');
require('./page.less');
const utils = require('utils');
const apiUrl = require('static/js/api');
/*eslint-disable */
window.switchToPage = (page) => {
  switch (page) {
    case 'login':
      $('#user-edit-password').hide();
      $('#login-box').show();
      break;

    case 'forget-password':
      $('#login-box').hide();
      $('#user-edit-password').show();
      break;

    default:
  }
};
$(() => {
  $('.user').hover(function() {
   $('.user1').attr('src','./images/Profile.png');
   $('.user').css('border-bottom','1px solid rgb(0,175,233)');
  },function() {
   $('.user1').attr('src','./images/Profile1.png');
   $('.user').css('border-bottom','1px solid rgb(153,153,153)');
  });
  $('.pwd').hover(function() {
   $('.pwd1').attr('src','./images/Lock1.png');
   $('.pwd').css('border-bottom','1px solid rgb(0,175,233)');
  },function() {
   $('.pwd1').attr('src','./images/Lock.png');
   $('.pwd').css('border-bottom','1px solid rgb(153,153,153)');
  });
  $('.clk').click(clk);

  function clk() {
    utils.ajax(apiUrl.getApiUrl('getLogin'), { appid: 'appid',data: 'data', user: 'user', us: 'us', page: 'page' }).done(function (el) {
      console.log(el);
      if (el.result == 'invalid') {
        alert('用户名或密码输入错误！');
      } else if (el.result == 'success') {
        window.location = './page1.html?userid=' + el.appid + '&name=' + $('.user').val();
      }
    })
  }
  function kLogin(){
    if (event.keyCode == 13)
    {
      event.returnValue=false;
      event.cancel = true;
      clk();
    }
  }
});
