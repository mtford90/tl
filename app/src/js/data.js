var reflux = require('reflux');

var userActions = reflux.createActions([
  "login",
  "logout"
]);

var userStore = Reflux.createStore({
  init: function () {
    this.load();
    this.listenToMany(userActions);
  },
  onLogin: function (user) {
    this.user = user;
    this.save();
    this.trigger(this.user);
  },
  onLogout: function () {
    this.user = null;
    this.save();
    this.trigger(this.user);
  },
  save: function () {
    if (this.user)
      localStorage.setItem('user', JSON.stringify(this.user));
    else
      localStorage.setItem('user', null);
  },
  load: function () {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
});

var timezoneActions = reflux.createActions([
  'createTimezone',
  'deleteTimezone',
  'updateTimezone',
  'getTimezones',
  'searchTimezones'
]);

var timezoneStore = Reflux.createStore({
  init: function () {
    this.listenToMany(timezoneActions);
    this.timezones = [
      {
        name: 'Blah',
        timezone: 'Europe/Madrid'
      }
    ];
  },
  onCreateTimezone: function (timezone) {
    this.timezones.push(timezone);

    this._trigger();
  },
  onUpdateTimezone: function (timezone) {

  },
  onSearchTimezonez: function (searchString) {
    this.searchString = searchString;
  },
  onGetTimezones: function () {

  },
  _trigger: function () {
    this.trigger(this.timezones);
  }
});

module.exports = {
  userActions: userActions,
  userStore: userStore,
  timezoneActions: timezoneActions,
  timezoneStore: timezoneStore
};
