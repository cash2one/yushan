/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
const tb1 = require('./semer/enroll.ejs');
require('cp');
require('static/css/reset.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');
const constant = require('static/js/constant');
const toastr = require('static/vendor/toastr.min');
const getType = require('static/js/constant');
require('static/vendor/toastr.min.css');

require('static/js/validator');
require('static/vendor/md5');


let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload();
});

function typ(){
  let data=getType.gettype(getType.userType);
  $('#type2').html(tb1({data: data}));
  /*utils.ajax(apiUrl.getApiUrl('getType'), {
    type: constant.userType,
  }).done(function (data) {
    console.log(data);

  });*/
}

$(() => {
  typ();
  $("#myForm").validate({
    submitHandler: function () {

      let dataArr = $("#myForm").serializeArray();
      let fix='yushan@MOSHI';
      let data={};
      // console.log(dataArr);
      $.each(dataArr, function(i, field){
        if(field.name == 'password'){
          let code = $.md5(field.value + fix);
          data[field.name] = code;
        }else{
          data[field.name] = field.value;
        }
      });
      console.log(data);
     /* var dataArr = $("#myForm").serializeArray();
      dataArr.push({name:"appid",value:currentAccount.appid});*/

      utils.ajaxPost(apiUrl.getApiUrl('getCreateSem'),data).done(function (data) {
        toastr.success('数据请求完成', '完成')
      });

      return false;
    },
  });
});
