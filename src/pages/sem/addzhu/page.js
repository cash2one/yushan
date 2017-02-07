/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
const tb = require('./semer/sem.ejs');
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

$(() => {
    utils.ajax(apiUrl.getApiUrl('NoUserHu'), {}).done(function (data) {
      console.log(data);
      // let all=store.getAccounts();
      for(let i=0;i<data.length;i++){
        data[i].type1=constant.getTypeName(constant.mediaType,data[i].account_type);
      }
    /*  for(let i=0;i<all.length;i++){
        for(let j=0;j<data.length;j++){
          if(all[i].name==data[j].name){
            data.splice(j,1)
          }
        }
      }*/
      $('.a').html(tb({data: data}));
    });
  utils.ajax(apiUrl.getApiUrl('getAllSem'), {}).done(function (data) {
    // let newData=[];
    console.log(data);
    let html='';
    for(let i=0;i<data.length;i++){
      html+='<option value="'+data[i].id+'">'+data[i].name+'</option>';
    }
    $('#sem').html(html);
  });
  $(document).on('click','.add',function(){
    let users=[];
    $('input:checkbox[name=check]:checked').each(function(){
      users.push($(this).parent().siblings('.sem').data('id'));
    });
    utils.ajaxPost(apiUrl.getApiUrl('getUserAddHu'), {
      userid: $('#sem').val(),
      huid: JSON.stringify(users),
    }).done(function (data) {
      window.location.reload();
      console.log(data);
    });
  });
});
