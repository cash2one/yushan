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
  $('.member').click(function(){
    utils.ajax(apiUrl.getApiUrl('getAllHu'), {}).done(function (data) {
      // let newData=[];
      console.log(data);
      /*for(let i=0;i<sem_name.length;i++){
        for(let j=0;j<data.length;j++){
          if(sem_name[i]==data[j].name){
            data.splice(j,1)
          }
        }
      }*/
      // $('.a').html(tb({data: data}));
    });
  });
});
