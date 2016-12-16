/**
 * Created by jy on 2016/12/8.
 */
/*eslint-disable */
function showNotice (title, msg) {
  var Notification = window.Notification || window.mozNotification || window.webkitNotification;
  if (Notification) {
    Notification.requestPermission(function (status) {
      if ("granted" != status) {
        return;
      } else {
        var tag = "sds" + Math.random();
        var notify = new Notification(
          title,
          {
            dir: 'auto',
            lang: 'zh-CN',
            tag: tag,
            icon: 'http://7xrc8m.com1.z0.glb.clouddn.com/yhdj/%E6%99%BA%E9%81%93%E5%8A%A9%E6%89%8Blogo.png',
            body: msg
          }
        );
        notify.onclick = function () {
          window.focus();
        },
          notify.onerror = function () {
            console.log("error");
          };
        notify.onshow = function () {
          setTimeout(function () {
            notify.close();
          }, 5000)
        };
        notify.onclose = function () {
          console.log("close");
        };
      }
    });
  } else {
    console.log("fail");
  }
};

module.exports = showNotice;