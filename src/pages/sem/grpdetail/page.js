/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
// const tb = require('./tpl/table.ejs');
require('cp');
const tb = require('./hu/hu.ejs');
const tb1 = require('./hu/sem.ejs');
require('static/css/reset.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');
const getType = require('static/js/constant');
const constant = require('static/js/constant');
let currentAccount = store.getCurrentAccount();
let zu = store.getZu();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location='/sem/group/page.html';
});

function tol(){
  utils.ajax(apiUrl.getApiUrl('getZuUser'), {
    group_id: zu.group_id,
  }).done(function (data) {

    // $('.top').append(tb({data: data}));
    for(let i=0;i<data.length;i++){
      data[i].indexn='in'+i;
      if(data[i].role_id==3){
        data[i].roles='组员';
      }else if(data[i].role_id==2){
        data[i].roles='组长';
      }
      for(let j=0;j<data[i].hu.length;j++){
        data[i].hu[j].type1=constant.getTypeName(constant.mediaType,data[i].hu[j].account_type);
      }
    }
    console.log(data);
    $('#accordion').append(tb({data: data}));
  });
};

$(() => {
  $('h1').text(zu.group_name);
  $('.retun').click(function(){
    window.history.go(-1);
  });
  $(document).on('click','.add',function(){
    // let sem=[];
    // let role=[];
    let users=[];
    $('input:checkbox[name=check]:checked').each(function(){
      users.push({
        userid:$(this).parent().siblings('.sem').data('id'),
        roleid:$(this).parent().siblings('span').find('.role').val(),
      });
    });
    // console.log(sem);
    // console.log(role);
    utils.ajaxPost(apiUrl.getApiUrl('getZuAddUser'), {
      users:JSON.stringify(users),
      // userid:sem,
      zuid:zu.group_id,
      // roleid: role,
      cur_userid: store.getUser().id,
    }).done(function (data) {
      console.log(data);
      window.location.reload();
      //
    });
  });
  tol();

  $(document).on('click','.hu',function(){
    let cu={};
      cu.name=$(this).data('name');
      cu.appid=$(this).data('appid');
      cu.mobileBalance=$(this).data('bal');
      cu.id=$(this).data('id');
    store.setCurrentAccount(cu);
    window.location = '/sem/gailan/page.html';
  });
  $('.cy').click(function(){
    let sem_name=[];
    $('.sem_name .sem_name1').each(function(){
      sem_name.push($(this).text().trim());
    });
    console.log(sem_name);
    utils.ajax(apiUrl.getApiUrl('getAllSem'), {}).done(function (data) {
      // let newData=[];
      console.log(data);
      for(let i=0;i<sem_name.length;i++){
        for(let j=0;j<data.length;j++){
          if(sem_name[i]==data[j].name){
            data.splice(j,1)
          }
        }
      }
      for(let i=0;i<data.length;i++){
        data[i].type1=getType.getTypeName(getType.userType,data[i].type);
      }
      $('.a').html(tb1({data: data}));
    });
  });
});
