/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tb = require('./type/table.ejs');
require('static/css/reset.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const getType = require('static/js/constant');
const utils = require('utils');
const apiUrl = require('static/js/api');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/list.min');
require('static/js/validator');
require('static/vendor/md5');
const pinyinUtil = require('static/js/pinyinUtil');
let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload();
});
function pu(data){
  utils.ajaxPost(apiUrl.getApiUrl('UpStatus'), {
    data:JSON.stringify(data),
  }).done(function (data) {
    console.log(data);
    // window.location.reload();
  });
}
$(() => {
  $(document).on('click','.some',function(){
    let cu={};
    cu.name=$(this).data('name');
    cu.appid=$(this).data('appid');
    cu.id=$(this).data('id');
    store.setCurrentAccount(cu);
    window.location = '/sem/gailan/page.html';
  });
  $(document).on('change','.head_chek',function(){
    if($(this).prop('checked')){
      $('.body_chek').prop('checked',true);
    }else{
      $('.body_chek').prop('checked',false);
    }
  });
  utils.ajax(apiUrl.getApiUrl('getAllHu'), {}).done(function (data) {
    for(let i=0;i<data.length;i++){
      if(data[i].account_status==1){
        data[i].statu='启用'
      }else{
        data[i].statu='暂停'
      }
      data[i].type1=getType.getTypeName(getType.mediaType,data[i].account_type);
      data[i].pinyin=pinyinUtil.getPinyin(data[i].name,'')+pinyinUtil.getFirstLetter(data[i].name).toLowerCase()
    }
    console.log(data);

    $('.contain').html(tb({data: data}));
    $('#myTable').tablesorter();
    let options = {
      valueNames: ['name1','yincang1','account_name', 'semname', 'appid', 'api_count', 'type1', 'fd',
        'th-statu']
    };
    let userList = new List('users', options);
  });
  $(document).on('click','.hu-start,.hu-stop',function(){
    console.log($(this).data('id'));
    let data=[];
    data.push({
      status:$(this).data('status'),
      huid:$(this).data('id'),
    });
    pu(data);
    if($(this).data('status')==1){
      $(this).parent().siblings('.th-statu').text('启用');
    }else{
      $(this).parent().siblings('.th-statu').text('停用');
    }
  });
  $(document).on('click','.more-stop,.more-use',function(){
    let data=[];
    let that=$(this);
    $("input[class='body_chek']:checked").each(function(){
      console.log(that.data('status'));
      data.push({
        status:that.data('status'),
        huid:$(this).data('id'),
      });
      if(that.data('status')==1){
        $(this).parent().siblings('.th-statu').text('启用');
      }else{
        $(this).parent().siblings('.th-statu').text('停用');
      }
    });
    pu(data);
  });
});
