/**
 * Created by xiaobin on 2015/12/22.
 */
/*eslint-disable */
require('static/vendor/md5');
require('./validator');
const utils = require('static/js/utils');
const apiUrl = require('static/js/api');
const store = require('static/js/store');
const moduleExports = {
  postfix: 'yushan@MOSHI',
  login: function (opt) {
    var that = this;
    var theform = $(opt.selector);

    theform.validate({
      submitHandler: function () {
        // 已经通过了验证
        // btn.button('loading');
        var pwd = theform.find('#showPwd').val();
        var user = theform.find('.user').val();
        var random = new Date().getTime();

        var code = $.md5($.md5(pwd + that.postfix) + random);
        utils.ajax(apiUrl.getApiUrl('getLogin'), { username: user,password: code,key:random}).done(function (el) {
          console.log(el);
            store.setUser(el);
            window.location = '/sem/index/page.html';
        });
        theform.find('#pwd').val(code);
        theform.find('#salt').val(random);
        return false;
      },
    });
  },

  editPassword: function (theform, callback) {
    var oldShowPwd = theform.find('#oldShowPwd').val();
    var newShowPwd = theform.find('#newShowPwd').val();
    var newRePwd = theform.find('#newRePwd').val();
    var that = this;

    if (newRePwd !== newShowPwd) {
      alert('两次输入密码不一致');
      return false;
    }

    const oldPwd = $.md5(oldShowPwd + that.postfix);
    const newPwd = $.md5(newShowPwd + that.postfix);

    theform.find('#oldPwd').val(oldPwd);
    theform.find('#newPwd').val(newPwd);

    utils.ajax('/user/user_active/edit_password.do', theform.serialize()).done(function () {
      alert('修改成功！');
      if (callback) {
        callback();
      }
    });
    return true;
  },
};

module.exports = moduleExports;
