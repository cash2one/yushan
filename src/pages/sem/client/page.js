/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tb = require('./type/table.ejs');
const tb1 = require('./semer/sem.ejs');
require('static/css/reset.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const getType = require('static/js/constant');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');
require('static/js/validator');
require('static/vendor/md5');
require('static/vendor/list.min');
const pinyinUtil = require('static/js/pinyinUtil');
let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload();
});
$(() => {
  let flag='';
  utils.ajax(apiUrl.getApiUrl('AllKeHu'), {}).done(function (data) {
    let huname={};
    let huname1={};
    for(let i in data){
      data[i].xinxi.indexn='in'+i;
      data[i].xinxi.allname=[];
      huname[i]=data[i].xinxi.name;
      huname1[i]=pinyinUtil.getPinyin(data[i].xinxi.name,'')+pinyinUtil.getFirstLetter(data[i].xinxi.name).toLowerCase();
      for (let j in data[i].zhanghus){
        data[i].zhanghus[j].type1=getType.getTypeName(getType.userType,data[i].zhanghus[j].type);
        data[i].xinxi.allname.push(data[i].zhanghus[j].huname);
      }
    }
    console.log(data);
    $('#accordion').html(tb({data: data}));
    $('.fuzzy-search').on('input',function () {
      var data1={};
      for(let i in huname){
        if(huname[i].indexOf($(this).val()) > -1){
          data1[i]=data[i];
        }else if(huname1[i].indexOf($(this).val()) > -1){
          data1[i]=data[i];
        }
      }
      // console.log(data1);
      $('#accordion').html(tb({data: data1}));
    });
    // pu(data);
  });
  $(document).on('click','.hu-delete',function () {
    utils.ajax(apiUrl.getApiUrl('UserDtHu'), {
      userid: $(this).data('ke'),
      huid: $(this).data('id'),
    }).done(function (data) {
      console.log(data);
      window.location.reload();

    });
  });

  $(document).on('click','.add',function () {
    flag=$(this).data('ke');
    let allname=$(this).data('kename');
    utils.ajax(apiUrl.getApiUrl('getAllHu'), {}).done(function (data) {
      // console.log(data);
        for(let i=0;i<allname.length;i++){
           for(let j=0;j<data.length;j++){
               if(allname[i]==data[j].name){
               data.splice(j,1)
               }
           }
       }
       for(let i=0;i<data.length;i++){
          data[i].pinyin=pinyinUtil.getPinyin(data[i].name,'')+pinyinUtil.getFirstLetter(data[i].name).toLowerCase();
       }
       // console.log(data);
      $('.modal-body .list').html(tb1({data: data}));
      var options = {
        valueNames: [ 'sem', 'semname','pinyin']
      };
      var hackerList = new List('hacker-list', options);
    });

  });
  $(document).on('click','.com_mit',function(){
    let users=[];
    $('input:checkbox[name=checkn]:checked').each(function(){
      users.push($(this).parent().siblings('.sem').data('id'));
    });
    // console.log(users);
    // console.log(flag);
    utils.ajaxPost(apiUrl.getApiUrl('getUserAddHu'), {
       userid: flag,
       huid: JSON.stringify(users),
     }).done(function (data) {
      window.location.reload();
     });
  });
});
