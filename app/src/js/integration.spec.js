var $ = require('jQuery');
var assert = chai.assert;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

var base = 'http://127.0.0.1:8000';

function url(path) {
  return base + path;
}

describe('api integration', function () {
  it('root endpoint', function (done) {
    $.get(url('/api/'))
      .success(function () {
        done();
      })
      .fail(done);
  });

  function register(username, password, cb) {
    $.ajax({
      type: "POST",
      url: url('/api/auth/register/'),
      data: {
        username: username,
        password: password
      },
      dataType: 'json'
    }).success(function (data) {
      cb(null, data);
    }).fail(cb);
  }

  it('user registration', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    register(username, password, function (err, data) {
      if (!err) {
        assert.equal(data.username, username);
      }
      done(err);
    });
  });

  it('login', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    register(username, password, function (err) {
      if (!err) {
        $.ajax({
          type: "POST",
          url: url('/api/auth/login/'),
          data: {
            username: username,
            password: password
          },
          dataType: 'json'
        }).success(function (data) {
          done();
        }).fail(done);
      }
      else {
        done(err);
      }
    });
  });

  it('user details', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    register(username, password, function (err, data) {
      if (!err) {
        var authHeader = 'Token ' + data.auth_token;
        $.ajax({
          type: "GET",
          headers: {
            'Authorization': authHeader
          },
          url: url('/api/auth/me/')
        }).success(function () {
          done();
        }).fail(done);
      }
      else {
        done(err);
      }
    });
  });

  it('get timezones', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    register(username, password, function (err, data) {
      if (!err) {
        var authToken = data.auth_token;
        var authHeader = 'Token ' + authToken;
        $.ajax({
          type: "GET",
          headers: {
            'Authorization': authHeader
          },
          url: url('/api/timezones/')
        }).success(function () {
          done();
        }).fail(done);
      }
      else {
        done(err);
      }
    });
  });

  it('create timezone', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    register(username, password, function (err, data) {
      if (!err) {
        var authToken = data.auth_token;
        var authHeader = 'Token ' + authToken;
        $.ajax({
          type: "POST",
          data: {
            timezone: 'Europe/London'
          },
          headers: {
            'Authorization': authHeader
          },
          url: url('/api/timezones/'),
          dataType: 'json'
        }).success(function () {
          done();
        }).fail(done);
      }
      else {
        done(err);
      }
    });
  });

  it('update timezone', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    register(username, password, function (err, data) {
      if (!err) {
        var authToken = data.auth_token;
        var authHeader = 'Token ' + authToken;
        $.ajax({
          type: "POST",
          data: {
            timezone: 'Europe/London'
          },
          headers: {
            'Authorization': authHeader
          },
          url: url('/api/timezones/'),
          dataType: 'json'
        }).success(function (data) {
          $.ajax({
            type: "PUT",
            data: data,
            headers: {
              'Authorization': authHeader
            },
            url: data.url,
            dataType: 'json'
          }).success(function () {
            done();
          }).fail(done);
        }).fail(done);
      }
      else {
        done(err);
      }
    });
  });

  it('delete timezone', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    register(username, password, function (err, data) {
      if (!err) {
        var authToken = data.auth_token;
        var authHeader = 'Token ' + authToken;
        $.ajax({
          type: "POST",
          data: {
            name: 'Test',
            timezone: 'Europe/London'
          },
          headers: {
            'Authorization': authHeader
          },
          url: url('/api/timezones/'),
          dataType: 'json'
        }).success(function (data) {
          $.ajax({
            type: "DELETE",
            headers: {
              'Authorization': authHeader
            },
            url: data.url
          }).success(function () {
            done();
          }).fail(done);
        }).fail(done);
      }
      else {
        done(err);
      }
    });
  });

  it('filter timezones', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    register(username, password, function (err, data) {
      if (!err) {
        var authToken = data.auth_token;
        var authHeader = 'Token ' + authToken;
        $.ajax({
          type: "GET",
          headers: {
            'Authorization': authHeader
          },
          url: url('/api/timezones/?search=Test'),
          dataType: 'json'
        }).success(function () {
          done();
        }).fail(done);
      }
      else {
        done(err);
      }
    });
  });


});
