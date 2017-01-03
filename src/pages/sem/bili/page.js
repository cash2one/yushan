/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
require('static/vendor/jquery-ui.min');

require('static/css/reset.css');
require('static/css/jquery-ui.min.css');
require('./page.css');
const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();
});
$(() => {
  $('#date1').attr('value', utils.getDateStr(-2));
  $('#date2').attr('value', utils.getDateStr(-1));
  $("input[id='date1']").datepicker();
  $("input[id='date2']").datepicker();

  $('#date1').change(function () {
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
  });
  $('#date2').change(function () {
    var arr1 = $('#date1').val().split('/');
    var arr2 = $('#date2').val().split('/');
    var s = arr1[2] + '-' + arr1[0] + '-' + arr1[1];
    var e = arr2[2] + '-' + arr2[0] + '-' + arr2[1];
  });
});
