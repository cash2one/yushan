/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
require('static/css/reset.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  $('.appid').val(currentAccount.appid)
});



$(() => {
  $('.appid').val(currentAccount.appid)
  $('button').click(function(){
    utils.ajaxPost(apiUrl.getApiUrl('getZhXX'), {
      name: $('.name').val(),
      appid: $('.appid').val(),
      type: $('.leixing').val(),
      account_name: $('.three').val(),
      account_password: $('.threepass').val(),
      account_appid: $('.token').val(),
      account_status: $('.zt').val(),
      fd_rate: $('.fd').val(),
    }).done(function (data) {
      console.log(data);
    });
  });
});
