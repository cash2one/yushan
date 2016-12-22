/**
 * Created by wang on 2016/12/21.
 */
const store = require('static/js/store');
const topUser = require('./tpl/topUser.ejs');
const noJquery = require('withoutJqueryModule');

$(() => {
  $('#top-menu').append(topUser({ user: store.getUser(), constructInsideUrl: noJquery.constructInsideUrl }));
  $(document).on('change', '#us', function () {
    store.setCurrentAccount(store.getAccountByAppid($(this).val()));
  });
});
