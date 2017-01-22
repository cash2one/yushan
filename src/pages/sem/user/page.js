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
const constant = require('static/js/constant');

require('static/js/validator');
require('static/vendor/md5');


let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload();
});

function tol(){
  utils.ajax(apiUrl.getApiUrl('getSemXX'), {
    userid: store.getUser().data.id,
  }).done(function (data) {
    console.log(data);
    $('.username1').val(data.real_name);
    $('.users1').val(data.name);
    $('.email1').val(data.email);
    $('.phone1').val(data.phone);
  });

}


$(() => {
  $("#myForm1").validate({
    submitHandler: function () {

      let dataArr = $("#myForm1").serializeArray();
       dataArr.push({name:"userid",value:store.getUser().data.id});
      console.log(dataArr);
      utils.ajaxPost(apiUrl.getApiUrl('getChangeSem'),dataArr).done(function (data) {
       console.log(data);
       });

      return false;
    },
  });

  tol();
});
