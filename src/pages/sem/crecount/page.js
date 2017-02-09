/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const tb = require('./type/enroll.ejs');
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
let all;
eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload();
});
function change(current,all){
  let cur=[];
  for(let i=0;i<all.length;i++){
    if(all[i].parent_id==current){
      cur.push({
        id:all[i].id,
        name:all[i].name,
        parent_id:all[i].parent_id,
      })
    }
  }
  $('.type2').html(tb({data: cur}));
}
function media(){
  let data=constant.gettype(constant.mediaType);
  console.log(data);
  all=data;
  let one=[];
  for(let i=0;i<data.length;i++){
    if(data[i].parent_id==null){
      one.push({
        id:data[i].id,
        name:data[i].name,
      })
    }
  }
  $('.type1').html(tb({data: one}));
  change($('.type1').val(),data)
  $('.disan').text($('.type1').find("option:selected").attr("title"))
}
function view () {
  let data=constant.gettype(constant.viewType);
  console.log(data);
  $('#xianshi').html(tb({data: data}));
  /*utils.ajax(apiUrl.getApiUrl('getType'), {
    type: constant.viewType,
  }).done(function (data) {
    console.log(data);
    $('#xianshi').html(tb({data: data}));
  });*/
}
$(() => {

  media();
  view();

 /* utils.ajax(apiUrl.getApiUrl('getType'), {
    type: constant.,
  }).done(function (data) {

  });*/

  $('.type1').change(function () {
    change($(this).val(),all);
    $('.disan').text($(this).find("option:selected").attr("title"))
  });
  $("#myForm").validate({
    submitHandler: function () {

      let dataArr = $("#myForm").serializeArray();
      // let fix='yushan@MOSHI';
      // let data={};
      // console.log(dataArr);
      /*$.each(dataArr, function(i, field){
        if(field.name == 'password'){
          // let code = $.md5(field.value + fix);
          data[field.name] = code;
        }else{
          data[field.name] = field.value;
        }
      });*/
       dataArr.push({name:"userid",value:store.getUser().data.id});
      console.log(dataArr);
      utils.ajaxPost(apiUrl.getApiUrl('CreateHu'),dataArr).done(function (data) {
        console.log(data);
        $('.zhao').show();
        setTimeout(function(){
          $('.zhao').fadeOut();
        },2000);
      });

      return false;
    },
  });
});
