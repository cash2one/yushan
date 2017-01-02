require('jquery-validation/dist/localization/messages_zh');
require('jquery-validation/dist/additional-methods');
require('./validate-methods');

$.validator.setDefaults({
  ignore: 'input[type=hidden]:not(.form-item)',
  highlight: function (element) {
  // var tabcontent = $(element).closest('.tab-pane');

  // if (tabcontent.not('.active')) {
  //    $('a[href=#' + tabcontent.attr('id') + ']').tab('show');
  // }

    $(element).closest('.form-group').addClass('has-error');
  },
  // success: function(label) {
  //    // set &nbsp; as text for IE
  //    console.log(label);
  //    label.html("&nbsp;").addClass("checked");
  //    //label.addClass("valid").text("Ok!")
  // },
  unhighlight: function (element) {
    $(element).closest('.form-group').removeClass('has-error');
  },
  errorElement: 'span',
  errorClass: 'help-block',
  errorPlacement: function (error, element) {
    if (element.parent('.input-group').length) {
      error.insertAfter(element.parent());
    } else if (element.is('input[type=radio]') && element.closest('.radio-inline').length) {
      error.insertAfter(element.closest('.radio-inline').parent());
    } else if (element.parent('.monthpicker').length) {
      error.appendTo(element.closest('.monthpicker'));
    } else {
      error.appendTo(element.parent());
    }
  },
});
