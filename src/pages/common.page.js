require('!!bootstrap-webpack!bootstrapConfig');
// require('metisMenu/metisMenu.min.css');
require('iconfontDir/iconfont.css');
require('lessDir/base.less');
require('metisMenu/metisMenu.min');
require('components/top-nav/html');

const noJquery = require('withoutJqueryModule');
const store = require('static/js/store');

if (!store.getUser()) {
  window.location.href = '/index/login/page.html';
}

const getType = require('static/js/constant');
const type = getType.getTypeName(getType.userType, store.getUser().data.type);

let sideBar;
if (type === '优化师') {
  sideBar = require('components/side-menu/sem.ejs');
} else if (type === '客户') {
  sideBar = require('components/side-menu/kehu.ejs');
} else if (type === '技术') {
  sideBar = require('components/side-menu/jishu.ejs');
}

$(() => {
  $('#bar').html(sideBar({ constructInsideUrl: noJquery.constructInsideUrl }));
  $('#side-menu').metisMenu();
  $('#side-menu').css('visibility', 'visible');
  (() => {
    const width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
    if (width < 768) {
      $('div.navbar-collapse').addClass('collapse');
      // topOffset = 100; // 2-row-menu
      const topOffset = $('nav.navbar').height() + 1 + 1;

      let height = ((window.innerHeight > 0) ? window.innerHeight : window.screen.height) - 4;
      height = height - topOffset;
      if (height < 1) height = 1;
      if (height > topOffset) {
        $('#page-wrapper').css('min-height', (height) + 'px');
      }
    } else {
      $('div.navbar-collapse').removeClass('collapse');
    }

    const url = window.location.href;
    let element = $('ul.nav a').filter(function filterCb() {
      return this.href === url;
    }).addClass('active')
      .parent('li');
    let ifContinue = true;
    while (ifContinue) {
      if (element.is('li')) {
        element = element.parent('ul').addClass('in')
                         .parent('li')
                         .addClass('active');
      } else {
        ifContinue = false;
      }
    }
  })();

  /* 事件绑定 开始 */

  /* 事件绑定 结束 */

  /* 各种定时器 开始 */
  /* 各种定时器 结束 */
});
