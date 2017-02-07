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
const getType = require('static/js/constant');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  $('.appid').val(currentAccount.appid);
  $('.name').val(currentAccount.username);
  tol();
});

function tol(){
  utils.ajax(apiUrl.getApiUrl('setZhXX'), {
    appid: currentAccount.appid,
  }).done(function (data) {
    console.log(data);
    data[0].account_type=getType.getTypeName(getType.mediaType,data[0].account_type);
    if(data[0].account_status==1){
      $('.zt').val('启用');
    }else if(data[0].account_status==0){
      $('.zt').val('暂停');
    }
    $('.name').val(data[0].name);
    $('.appid').val(data[0].appid);
    $('.psd').val('');
    $('.leixing').val(data[0].account_type);
    $('.three').val(data[0].account_name);
    $('.threepass').val(data[0].account_password);
    $('.token').val(data[0].account_appid);
    // $('.zt').val(data[0].account_status);
    $('.fd').val(data[0].fd_rate);
  })
};

$(() => {
  $('.appid').val(currentAccount.appid);
  $('.name').val(currentAccount.username);
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
  tol();

});
