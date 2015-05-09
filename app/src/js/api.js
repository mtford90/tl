var $ = require('jQuery'),
  data = require('./data');

var base = 'http://127.0.0.1:8000';

function url(path) {
  return base + path;
}

module.exports = {
  register: function (username, password, cb) {
    $.ajax({
      type: "POST",
      url: url('/api/auth/register/'),
      data: {
        username: username,
        password: password
      },
      dataType: 'json'
    }).success(function (user) {
      data.userActions.login(user);
      cb(null, user);
    }).fail(function (jqXHR) {
      var data = jqXHR.responseJSON;
      if (data.username) {
        cb('Username already exists.');
      }
      else {
        cb('Unknown Error: ' + jqXHR.responseText);
      }
    });
  },
  login: function (username, password, cb) {
    $.ajax({
      type: "POST",
      url: url('/api/auth/login/'),
      data: {
        username: username,
        password: password
      },
      dataType: 'json'
    }).success(function (user) {
      user.username = username;
      data.userActions.login(user);
      cb(user);
    }).fail(function (jqXHR) {
      var data = jqXHR.responseJSON;
      if (data) {
        if (data.non_field_errors) {
          cb(data.non_field_errors[0]);
        }
        else {
          cb('Unknown Error: ' + jqXHR.responseText);
        }
      }
      else {
        cb('Unknown Error: ' + jqXHR.responseText);
      }
    });
  }

};
