const config = require('configModule');

const DOMAIN = config.API_ROOT;

const moduleExports = {
  getApiUrl(apiName) {
    return DOMAIN + this[apiName];
  },
  getUser: '/user/userId',
  getSKWord: '/keywords/sword',
  getTop: '/keywords/top200',
  getKeyCount: '/keywords/count',
  getParameter: '/keywords/parameter',
  getPlan: '/plan/rate',
  getUnit: '/unit/rate',
  getKey: '/keywords/word',
  getAccountWeekCost: '/account/getweekcost',
  getAccountTwoWeek: '/account/twoweek',
  getNotice: '/account/notice',
  // getAccountAll: '/account/all',
  getAccountother: '/landpage/other',
  getAccountotherbaidu: '/landpage/otherbaidu',
  getAccountAll: '/account/all',
  getAll: '/landpage/all',
  getRate: '/landpage/pagerate',
  getLink: '/link/find',
  getWeek: '/landpage/weekpr',
  getRiBao: '/out/ribaoview',
  getP: '/active/set',
  getPay: '/account/pay',
  getLogin: '/login/login',
  addKeyWords: '/out/tuoci',
  setOut: '/out/ribaoout',
  getAllSearch: '/keywords/ssc',
  getWord: '/keywords/tuijian',
  getNextWord: '/plan/allplan',
  getElement: '/unit/allunit',
  setQuOut: '/landpage/out',
  getZhong: '/keywords/sscasync',
  getTask: '/keywords/taskname',
  getSomeTask: '/keywords/somesscr',
  OutTuoCi: '/out/tuoci',
  getZhXX: '/sem/setzhxx',
  setZhXX: '/sem/getzhxx',
  setBlacWords: '/black/setwords',

};

module.exports = moduleExports;
