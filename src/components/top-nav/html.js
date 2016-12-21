/**
 * Created by wang on 2016/12/21.
 */
const eventBus = require('static/js/eventBus');

$(() => {
  $(document).on('click', '#us', function () {
    eventBus.fire('change');
  });
});
