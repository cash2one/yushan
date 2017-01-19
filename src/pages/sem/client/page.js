/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tb = require('./type/table.ejs');
require('static/css/reset.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const getType = require('static/js/constant');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');
require('static/js/validator');
require('static/vendor/md5');
let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload();
});
function pu(data){
  utils.ajax(apiUrl.getApiUrl('getAllHu'), {}).done(function (el) {
    console.log(el);
    for(let i=0;i<el.length;i++){
      if(el[i].account_status==1){
        el[i].statu='启用'
      }else{
        el[i].statu='暂停'
      }
      el[i].type1=getType.getTypeName(el[i].account_type);
    }
    /*for(let i=0;i<all.length;i++){
      for(let j=0;j<data.length;j++){
        if(all[i].name==data[j].name){
          data.splice(j,1)
        }
      }
    }*/
    $('#accordion').html(tb({data: data,el:el,}));
  });
}
$(() => {

  utils.ajax(apiUrl.getApiUrl('AllKeHu'), {}).done(function (data) {
    console.log(data);
    for(let i=0;i<data.length;i++){
      data[i].indexn='in'+i;
    }
    pu(data);
  });
  $(document).on('click','.add',function () {
    utils.ajax(apiUrl.getApiUrl('getUserAddHu'), {
      userid: store.getUser().data.id,
      huid: JSON.stringify(users),
    }).done(function (data) {
      window.location.reload();
      console.log(data);
    });
  });

});
