/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
const tb = require('./tb/table.ejs');
require('cp');
require('static/css/reset.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  window.location.reload();
});

function tol(){
  utils.ajax(apiUrl.getApiUrl('getSemZu'), {
    // userid: store.getUser().id,
  }).done(function (data) {
    console.log(data);
    $('.top').append(tb({data: data}));
  });
};

$(() => {
  $('.add').click(function(){
    if($('.group-name').val().length !=0){
      utils.ajax(apiUrl.getApiUrl('getCreateZu'), {
        userid: store.getUser().id,
        zuname: $('.group-name').val(),
      }).done(function (data) {
        console.log(data);
        // $('.tb1').append(tb1({data: data[i]}));
        let html='';
        html+='<tr>';
        html+='<td class="nam" data-id="'+data+'" data-name="'+$('.group-name').val()+'">' +$('.group-name').val()+'</td>';
        html+='</tr>';
        html+='</tr>';
        $('#myTable .list').prepend(html);
      });

    }

  });
  tol();
  $(document).on('click','#myTable .nam',function(){
    console.log($(this).data('id'));
    console.log($(this).data('name'));
    let zu={
      group_id:$(this).data('id'),
      group_name:$(this).data('name'),
    };
    store.setZu(zu);
    window.location='/sem/grpdetail/page.html';
  });
});
