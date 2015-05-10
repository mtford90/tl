var $ = require('jQuery'),
  data = require('./data'),
  _ = require('underscore');

var base = 'http://127.0.0.1:8000';

function url(path) {
  return base + path;
}

function getAuthHeader() {
  var authToken = data.userStore.user.auth_token;
  var authHeader = 'Token ' + authToken;
  return authHeader;
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
      cb(null, user);
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
  },
  createTimezone: function (timezone, cb) {
    data.timezoneActions.createTimezone(timezone);
    $.ajax({
      type: "POST",
      data: timezone,
      headers: {
        'Authorization': getAuthHeader()
      },
      url: url('/api/timezones/'),
      dataType: 'json'
    }).success(function (data) {
      _.extend(timezone, data);
      cb();
    }).fail(cb);
  },
  getTimezones: function (cb) {
    $.ajax({
      type: "GET",
      headers: {
        'Authorization': getAuthHeader()
      },
      url: url('/api/timezones/')
    }).success(function (timezones) {
      data.timezoneActions.getTimezones(timezones);
      cb(null, timezones);
    }).fail(cb);
  },
  updateTimezone: function (timezone, cb) {
    if (timezone.url) {
      $.ajax({
        type: "PUT",
        data: timezone,
        headers: {
          'Authorization': getAuthHeader()
        },
        url: timezone.url
      }).success(function (timezones) {
        data.timezoneActions.updateTimezone(timezone, cb);
        cb(null, timezones);
      }).fail(cb);
    }
    else {
      // Not saved yet.
      cb();
    }
  },
  deleteTimezone: function (timezone, cb) {
    if (timezone.url) {
      $.ajax({
        type: "DELETE",
        headers: {
          'Authorization': getAuthHeader()
        },
        url: timezone.url
      }).success(function (timezones) {
        data.timezoneActions.deleteTimezone(timezone, cb);
        cb(null, timezones);
      }).fail(cb);
    }
    else {
      // Not saved yet.
      cb();
    }
  }
};
