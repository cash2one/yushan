/**
 * Created by xiaobin on 2015/12/23.
 */
/* eslint-disable */
require('jquery-validation');

// 邮政编码验证
$.validator.addMethod('isZipCode', function (value, element, param) {
  var tel = /^[0-9]{6}$/;
  return this.optional(element) || (tel.test(value));
}, '请正确填写您的邮政编码');

$.validator.addMethod('textareaMax', function (value, element, param) {
  var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
  return this.optional(element) || length <= param;
}, '您输入的太多了');
$.validator.addMethod('textareaMin', function (value, element, param) {
  var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
  return this.optional(element) || length >= param;
}, '您输入的太少了');

// 手机/邮箱验证
$.validator.addMethod('isPhoneOrEmail', function (value, element, param) {
  var length = value.length;
  var mobile = /^(((1[3|4|5|7|8][0-9]{1}))+\d{8})$/;
  var email = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  return this.optional(element) || (email.test(value) || mobile.test(value));
}, '请正确填写您的手机或邮箱');

// 手机/邮箱验证
$.validator.addMethod('phoneCN', function (value, element, param) {
  var mobile = /^(((1[3|4|5|7|8][0-9]{1}))+\d{8})$/;

  return this.optional(element) || mobile.test(value);
}, '请正确填写您的手机');