/**
 * Created by wang on 2016/12/21.
 */
/*eslint-disable */
const moduleExport = {
  on: function (events, fn) {
    this.listeners = this.listeners || {};
    this.listeners[events] = this.listeners[events] || [];
    this.listeners[events].push(fn);
  },
  fire: function (events) {
    if(this.listeners && this.listeners[events]){
      for (let i = 0; i < this.listeners[events].length; i++) {
        this.listeners[events][i] && this.listeners[events][i]();
      }
    }
  },
  off: function (events) {
    for (let i = 0; i < this.listeners[events].length; i++) {
      this.listeners[events][i] = null;
    }
  },
};

module.exports = moduleExport;
