/**
 * Created by wang on 2016/12/22.
 */

const eventBus = require('./eventBus');

const moduleExports = {
  setUser: function (user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getUser: function () {
    return JSON.parse(localStorage.getItem('user'));
  },
  setAccounts: function (accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  },
  getAccounts: function () {
    return JSON.parse(localStorage.getItem('accounts'));
  },
  getAccountByAppid: function (appid) {
    const accounts = this.getAccounts();
    if (accounts) {
      for (const obj of accounts) {
        if (obj.appid === appid) {
          return obj;
        }
      }
    }
    return null;
  },
  setCurrentAccount: function (account) {
    if (account) {
      const current = this.getCurrentAccount();
      if (current && (current.appid === account.appid)) {
        console.log('not change');
      } else {
        localStorage.setItem('currentAccount', JSON.stringify(account));
        eventBus.fire('account_change');
      }
    } else {
      localStorage.removeItem('currentAccount');
    }
  },
  getCurrentAccount: function () {
    return JSON.parse(localStorage.getItem('currentAccount'));
  },
  setZu: function (zu) {
  /*  if (accounts) {
      const current = this.getZu();
      if (current && (current=== accounts)) {
        console.log('not change');
      } else {
        localStorage.setItem('zu', JSON.stringify(accounts));
        eventBus.fire('zu_change');
      }
    } else {
      localStorage.removeItem('zu');
    }*/
    localStorage.setItem('zu', JSON.stringify(zu));
  },
  getZu: function () {
    return JSON.parse(localStorage.getItem('zu'));
  },
};

module.exports = moduleExports;
