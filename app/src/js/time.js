var moment = require('moment');

module.exports = {
  getTimezoneNames: function () {
    return moment.tz.names();
  },
  getUTCOffset: function (name) {
    return moment().tz(name).format('Z');
  },
  getTime: function (name) {
    return moment().tz(name).format('HH:mm:ss');
  }
};
