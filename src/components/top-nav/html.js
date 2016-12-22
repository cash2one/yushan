/**
 * Created by wang on 2016/12/21.
 */
const store = require('static/js/store');
const topUser = require('./tpl/topUser.ejs');
const noJquery = require('withoutJqueryModule');
const topAccounts = require('./tpl/topAccounts.ejs');

$(() => {
  $('#top-menu').append(topUser({ user: store.getUser(), constructInsideUrl: noJquery.constructInsideUrl }));
  $('#us').html(topAccounts({ accounts: store.getAccounts(), currentAccount: store.getCurrentAccount() }));
  $(document).on('change', '#us', function () {
    if ($(this).val() === 'all') {
      store.setCurrentAccount('');
    } else {
      store.setCurrentAccount(store.getAccountByAppid($(this).val()));
    }
  });
});
