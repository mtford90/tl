var $ = require('jQuery'),
  flux = require('./flux'),
  _ = require('underscore');

var base = 'http://127.0.0.1:8000';

function url(path) {
  return base + path;
}

function getAuthHeader() {
  var authToken = flux.userStore.user.auth_token;
  var authHeader = 'Token ' + authToken;
  return authHeader;
}

var csrftoken = $.cookie('csrftoken');

module.exports = {
  register: function (username, password, cb) {
    $.ajax({
      type: "POST",
      url: url('/api/auth/register/'),
      headers: {
        'X-CSRFToken': csrftoken
      },
      data: {
        username: username,
        password: password
      },
      dataType: 'json'
    }).success(function (user) {
      flux.userActions.login(user);
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
      headers: {
        'X-CSRFToken': csrftoken
      },
      data: {
        username: username,
        password: password
      },
      dataType: 'json'
    }).success(function (user) {
      user.username = username;
      flux.userActions.login(user);
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
    flux.timezoneActions.createTimezone(timezone);
    $.ajax({
      type: "POST",
      data: timezone,
      headers: {
        'Authorization': getAuthHeader(),
        'X-CSRFToken': csrftoken
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
        'Authorization': getAuthHeader(),
        'X-CSRFToken': csrftoken
      },
      url: url('/api/timezones/')
    }).success(function (timezones) {
      flux.timezoneActions.getTimezones(timezones);
      cb(null, timezones);
    }).fail(cb);
  },
  searchTimezones: function (searchString, cb) {
    cb = cb || function () {};
    $.ajax({
      type: "GET",
      headers: {
        'Authorization': getAuthHeader(),
        'X-CSRFToken': csrftoken
      },
      url: url('/api/timezones/?search=' + searchString),
      dataType: 'json'
    }).success(function (timezones) {
      flux.timezoneActions.getTimezones(timezones);
      cb();
    }).fail(cb);
  },
  updateTimezone: function (timezone, cb) {
    var id = timezone.id;
    if (id) {
      $.ajax({
        type: "PUT",
        data: timezone,
        headers: {
          'Authorization': getAuthHeader(),
          'X-CSRFToken': csrftoken
        },
        url: url('/api/timezones/' + id.toString() + '/')
      }).success(function (timezones) {
        flux.timezoneActions.updateTimezone(timezone, cb);
        cb(null, timezones);
      }).fail(cb);
    }
    else {
      // Not saved yet.
      cb();
    }
  },
  deleteTimezone: function (timezone, cb) {
    var id = timezone.id;
    if (id) {
      $.ajax({
        type: "DELETE",
        headers: {
          'Authorization': getAuthHeader(),
          'X-CSRFToken': csrftoken
        },
        url: url('/api/timezones/' + id.toString() + '/')
      }).success(function () {
        flux.timezoneActions.deleteTimezone(timezone);
        cb(null);
      }).fail(function (jqXHR) {
        var err = jqXHR.responseText;
        console.error('Error deleting timezone:', err);
        cb(err);
      });
    }
    else {
      // Not saved yet.
      cb();
    }
  }
};
