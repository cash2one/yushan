/**
 * Created by wang on 2016/12/21.
 */
/*eslint-disable */
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
require('./page.css');
let currentAccount = store.getCurrentAccount();

function xin() {
  if(currentAccount){
    $('.yushan-1').text(currentAccount.name);
    $('.yushan-2 span').text(currentAccount.mobileBalance);
  }
}

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  xin();
});

$(() => {
  xin();
});
