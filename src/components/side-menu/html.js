/**
 * Created by wang on 2016/12/21.
 */
/*eslint-disable */
const sem = require('./sem.ejs');
const jishu = require('./jishu.ejs');
const kehu = require('./kehu.ejs');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const getType = require('static/js/constant');
require('./page.css');
let currentAccount = store.getCurrentAccount();

/*
function xin() {
  if(currentAccount){
    $('.yushan-1').text(currentAccount.name);
    $('.yushan-2 span').text(currentAccount.mobileBalance);
  }
}
*/

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  // xin();
});

$(() => {
  /*let who=store.getUser().data.type;
  let typ=getType.getTypeName(who);
  console.log(typ);
  if(typ=='优化师'){
    $('#baohan').html(sem());
  }else if(typ=='客户'){
    $('#baohan').html(kehu());
  }else if(typ=='技术'){
    $('#baohan').html(jishu());
  }*/

  // xin();
});
