/**
 * Created by wang on 2016/12/21.
 */
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');

let currentAccount = store.getCurrentAccount();

function xin() {
  $('.yushan-1').text(currentAccount.username);
  $('.yushan-2 span').text(currentAccount.mobileBalance);
}

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
  xin();
});

$(() => {
  xin();
});
