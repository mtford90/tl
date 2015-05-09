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

module.exports = {userActions: userActions, userStore: userStore};
