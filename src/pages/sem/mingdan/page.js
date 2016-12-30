/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');


require('static/css/reset.css');
require('static/vendor/Tabullet');
require('./page.css');

const eventBus = require('static/js/eventBus');
const store = require('static/js/store');
const utils = require('utils');
const apiUrl = require('static/js/api');

let currentAccount = store.getCurrentAccount();

eventBus.on('account_change', function () {
  currentAccount = store.getCurrentAccount();

});

let source = [];
function resetTabullet() {
  $("#table").tabullet({
    data: source,
    action: function(mode, data) {
      console.dir(mode);
      if (mode === 'save') {
        source.push(data);
        // alert('save')
        console.log(data)
      }
      if (mode === 'edit') {
        for (var i = 0; i < source.length; i++) {
          if (source[i].id == data.id) {
            source[i] = data;
          }
        }
        // alert("edit")
        console.log(data)
      }
      if (mode == 'delete') {
        for (var i = 0; i < source.length; i++) {
          if (source[i].id == data) {
            source.splice(i, 1);
            // alert("delete")
            console.log(data)
            break;
          }
        }

      }
      resetTabullet();
    }
  });
}

$(() => {
  /*utils.ajax(apiUrl.getApiUrl('getSKWord'), {
    appid: $('.appid').val(),
    date: $('.time').val(),
  }).done(function (data) {
    datas = data;
    $('#tb').html(tb({ data: datas }));
    $('#myTable').tablesorter();
  });*/
  $(function() {
    source = [{
      id: 1,
      name: "Aditya Purwa",
      level: "Admin"
    }, {
      id: 2,
      name: "Aditya Avaga",
      level: "Manager"
    }, {
      id: 101,
      name: "Aditya Myria",
      level: "User"
    }, {
      id: 102,
      name: "Lucent Serentia",
      level: "LOD"
    }, {
      id: 103,
      name: "Hayden Bapalthiel",
      level: "King"
    }, ];

    resetTabullet();
  });
});
