/*eslint-disable */
require('!!bootstrap-webpack!bootstrapConfig');
require('lessDir/base.less');
require('./page.less');

const p = require('./images/Profile.png');
const p1 = require('./images/Profile1.png');
const l = require('./images/Lock1.png');
const l1 = require('./images/Lock.png');
// const store = require('static/js/store');

// const utils = require('utils');
// const apiUrl = require('static/js/api');
const passport = require('static/js/passport');
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
   $('.user1').attr('src',p);
   $('.user').css('border-bottom','1px solid rgb(0,175,233)');
  },function() {
   $('.user1').attr('src',p1);
   $('.user').css('border-bottom','1px solid rgb(153,153,153)');
  });
  $('.pwd').hover(function() {
   $('.pwd1').attr('src',l);
   $('.pwd').css('border-bottom','1px solid rgb(0,175,233)');
  },function() {
   $('.pwd1').attr('src',l1);
   $('.pwd').css('border-bottom','1px solid rgb(153,153,153)');
  });
  passport.login({selector:"#login-form"});
  // $('.clk').click(clk);

  /*function clk(e) {
    var userName = $('.user').val();
    var pwd = $('.pwd').val();

    if (userName != '' && pwd != ''){
      utils.ajax(apiUrl.getApiUrl('getLogin'), { username: userName,password: pwd }).done(function (el) {
        console.log(el);
        if (el.result == 'invalid') {
          alert('用户名或密码输入错误！');
        } else if (el.result == 'success') {
          store.setUser(el);
          window.location = '/sem/index/page.html';

        }
      })
    }
    e.preventDefault();
  }*/
   /* function kLogin(){
    if (event.keyCode == 13)
    {
      event.returnValue=false;
      event.cancel = true;
      clk();
    }
  }*/
});
