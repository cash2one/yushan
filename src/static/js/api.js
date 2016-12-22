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
  // getAccountAll: '/account/all',
  getAccountother: '/landpage/other',
  getAccountotherbaidu: '/landpage/otherbaidu',
  getAccountAll: '/landpage/all',
  getRate: '/landpage/pagerate',
  getLink: '/link/find',
  getWeek: '/landpage/weekpr',
  getRiBao: '/out/ribaoview',
  getP: '/active/set',
  getPay: '/account/pay',
};

module.exports = moduleExports;
