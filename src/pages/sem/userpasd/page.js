/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
require('static/css/reset.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const toastr = require('static/vendor/toastr.min');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');
const constant = require('static/js/constant');

require('static/js/validator');
require('static/vendor/md5');


let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload();
});

$(() => {
  let fix='yushan@MOSHI';
  $('.clk').click(function(){
    if($('.psd').val()==$('.re_psd').val()){
      let code = $.md5($('.psd').val() + fix);
      let code1 = $.md5($('.old_psd').val() + fix);
      utils.ajaxPost(apiUrl.getApiUrl('getChangePass'), {
        oldpass: code1,
        newpass: code,
      }).done(function (data) {
        console.log(data);

      });
    }else{
      toastr.error('重复新密码不相等')
    }
  })
});
