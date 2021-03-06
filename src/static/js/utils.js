/*eslint-disable */
const $ = require('jquery');
const toastr = require('static/vendor/toastr.min');
require('static/vendor/toastr.min.css');
require('static/css/nprogress.css');
const NProgress=require('static/vendor/nprogress');
const store = require('static/js/store');

const moduleExports = {

  isEmail(str) {
    var email = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    return email.test(str);
  },

  isPhone(str) {
    var mobile = /^(((1[3|4|5|7|8][0-9]{1}))+\d{8})$/;
    return mobile.test(str);
  },

  isEmailOrPhone(str) {
    return this.isEmail(str) || this.isPhone(str);
  },

  getUrlParameter(paramName) {
    var sValue = location.search.match(new RegExp("[\?\&]" + paramName + "=([^\&]*)(\&?)", "i"));
    return sValue ? sValue[1] : sValue;
  },

  addUrlParameter(url,name,value) {
    if (url == null || url == 'undefined') {
        return "";
    }
    var url = url.split('#')[0];
    if (url != null && url != 'undefined' && url != "") {
        value = encodeURIComponent(value);
        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
        var tmp = name + "=" + value;
        if (url.match(reg) != null) {
            url = url.replace(eval(reg), tmp);
        }
        else {
            if (url.match("[\?]")) {
                url = url + "&" + tmp;
            } else {
                url = url + "?" + tmp;
            }
        }
    }
    return url;
  },

  /**
  * format like this 'yyyy-MM-dd hh:mm:ss'
  **/
  dateFormat(date,format) {
    if (typeof date === "string") {
      var mts = date.match(/(\/Date\((\d+)\)\/)/);
      if (mts && mts.length >= 3) {
        date = parseInt(mts[2]);
      }
    }
    date = new Date(date);
    if (!date || date.toUTCString() == "Invalid Date") {
      return "";
    }

    var map = {
      "M": date.getMonth() + 1, //月份
      "d": date.getDate(), //日
      "h": date.getHours(), //小时
      "m": date.getMinutes(), //分
      "s": date.getSeconds(), //秒
      "q": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };

    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
      var v = map[t];
      if(v !== undefined){
        if(all.length > 1){
          v = '0' + v;
          v = v.substr(v.length-2);
        }
        return v;
      }
      else if(t === 'y'){
        return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
    });
    return format;
  },

  /**
 * 直接使用 utils.ajax(url,data).done(function(response){});
 * @param url
 * @param data
 * @param async 是否同步 默认异步
 * @param btn
 * @returns {*}
 */
  ajax(url, data, async) {
    var deferred = $.Deferred();

    if (async === false) {
      async = false;
    } else {
      async = true;
    }

    let token = "";
    if(store.getUser()){
      token = store.getUser().token;
    }

    $.ajax({
      url: url,
      type: 'get',
      async: async,
      dataType: 'json',
      data: data,
      beforeSend:function(){
        NProgress.start();
      },
      headers:{'token':token,},
      complete: function() {
        NProgress.done();
      },
    })
    .done(function done(json) {
      if (json.status) {
        if (json.status !== 'success') {
          // notice('数据错误', json.message || '操作发生错误');
          toastr.error(json.message || '操作发生错误', '数据错误')
          deferred.reject();
        } else {
          if (json.data) {
            deferred.resolve(json.data);
          } else {
            deferred.resolve(json);
          }
        }
      } else {
        deferred.resolve(json);
      }
    })
    .fail(function fail() {

      toastr.error('数据加载失败', '加载失败')
      deferred.reject();
    })
    .always(function always() {
      NProgress.done();
      // toastr.success('数据请求完成', '完成')
    });

    return deferred.promise();
  },
  ajaxAsync(url, data, async) {
    var deferred = $.Deferred();

    $.ajax({
      url: url,
      type: 'get',
      async: false,
      dataType: 'json',
      data: data,
      beforeSend:function(){
        NProgress.start();
      },
      complete: function() {
        NProgress.done();
      },
      headers:{'token':store.getUser().token,},
    })
      .done(function done(json) {
        if (json.status) {
          if (json.status !== 'success') {
            // notice('数据错误', json.message || '操作发生错误');
            toastr.error(json.message || '操作发生错误', '数据错误')
            deferred.reject();
          } else {
            if (json.data) {
              deferred.resolve(json.data);
            } else {
              deferred.resolve(json);
            }
          }
        } else {
          deferred.resolve(json);
        }
      })
      .fail(function fail() {
        NProgress.done();
        toastr.error('数据加载失败', '加载失败')
        deferred.reject();
      })
      .always(function always() {
        NProgress.done();
        // toastr.success('数据请求完成', '完成')
      });

    return deferred.promise();
  },
  ajaxPost(url, data, async) {
    var deferred = $.Deferred();

    if (async === false) {
      async = false;
    } else {
      async = true;
    }

    $.ajax({
      url: url,
      type: 'post',
      async: async,
      dataType: 'json',
      data: data,
      headers:{'token':store.getUser().token,},
      beforeSend:function(){
        NProgress.start();
      },
      complete: function() {
        NProgress.done();
      },
    })
      .done(function done(json) {
        if (json.status) {
          if (json.status !== 'success') {
            // notice('数据错误', json.message || '操作发生错误');
            toastr.error(json.message || '操作发生错误', '数据错误')
            deferred.reject();
          } else {
            if (json.data) {
              deferred.resolve(json.data);
            } else {
              deferred.resolve(json);
            }
          }
        } else {
          deferred.resolve(json);
        }
      })
      .fail(function fail() {
        NProgress.done();
        toastr.error('数据加载失败', '加载失败')
        deferred.reject();
      })
      .always(function always() {
        NProgress.done();
        // toastr.success('数据请求完成', '完成')
      });

    return deferred.promise();
  },
  ajaxFormFile(url, data, async) {
    var deferred = $.Deferred();

    if (async === false) {
      async = false;
    } else {
      async = true;
    }

    $.ajax({
      url: url,
      type: 'post',
      async: async,
      cache: false,
      processData: false,
      contentType: false,
      data: data,
      headers:{'token':store.getUser().token,},
      beforeSend:function(){
        NProgress.start();
      },
      complete: function() {
        NProgress.done();
      },
    })
      .done(function done(json) {
        if (json.status) {
          if (json.status !== 'success') {
            // notice('数据错误', json.message || '操作发生错误');
            toastr.error(json.message || '操作发生错误', '数据错误')
            deferred.reject();
          } else {
            if (json.data) {
              deferred.resolve(json.data);
            } else {
              deferred.resolve(json);
            }
          }
        } else {
          deferred.resolve(json);
        }
      })
      .fail(function fail() {
        NProgress.done();
        toastr.error('数据加载失败', '加载失败')
        deferred.reject();
      })
      .always(function always() {
        NProgress.done();
        // toastr.success('数据请求完成', '完成')
      });

    return deferred.promise();
  },
  formSubmit: function (url, datas, method='post') {
    var form = $('#dynamicForm');
    if (form.length <= 0) {
      form = $("<form>");
      form.attr('id', 'dynamicForm');
      form.attr('style', 'display:none');
      form.attr('target', '');
      form.attr('method', method);

      $('body').append(form);
    }

    form = $('#dynamicForm');
    form.attr('action', url);
    form.empty();

    if (datas && typeof (datas) == 'object') {
      for (const item in datas) {
        var $_input = $('<input>');
        $_input.attr('type', 'hidden');
        $_input.attr('name', item);
        $_input.val(datas[item]);

        $_input.appendTo(form);
      }
    }
    $('<input type="hidden" name="token" value="'+store.getUser().token+'">').appendTo(form);
    form.submit();
  },

  countDown(opt) {
    var btn = $(opt.selector);
    var isRun = false;
    btn.click (function  () {
      if (!isRun) {
        if(opt.func) {
          opt.func();
        }
        var time = opt.time;
        isRun=true;
        btn.addClass("disabled");
        var t=setInterval(function () {
            time--;
            btn.html(time+"秒");
            if (time<=0 || opt.intercept) {
                clearInterval(t);
                btn.html("重新发送");
                isRun=false;
                btn.removeClass("disabled");
            }
        },1000);
      }
    });
  },
  getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;
    var d = dd.getDate();
    if (m < 10) {
      m = "0" + m;
    }
    if (d < 10) {
      d = "0" + d;
    }
    return m+"/"+d+"/"+y;
  },

};

module.exports = moduleExports;
