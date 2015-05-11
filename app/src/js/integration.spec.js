var $ = require('jQuery');
var assert = chai.assert;
var api = require('./api');
var flux = require('./flux');
var _ = require('underscore');

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

  beforeEach(function () {
    flux.userActions.logout();
  });

  it('root endpoint', function (done) {
    $.get(url('/api/'))
      .success(function () {
        done();
      })
      .fail(done);
  });

  it('user registration', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    api.register(username, password, function (err, data) {
      if (!err) {
        assert.equal(data.username, username);
        assert.ok(flux.userStore.user, 'User should now exist');
        assert.ok(flux.userStore.user.auth_token, 'User should have auth token');
      }
      done(err);
    });
  });

  it('login', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    api.register(username, password, function (err) {
      if (!err) {
        api.login(username, password, function (err) {
          done(err);
        });
      }
      else {
        done(err);
      }
    });
  });

  it('user details', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    api.register(username, password, function (err) {
      if (!err) {
        api.me(function (err, user) {
          done(err);
        });
      }
      else done(err);
    });
  });

  it('get timezones', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    api.register(username, password, function (err) {
      if (!err) {
        api.getTimezones(function (err) {
          done(err);
        })
      }
      else {
        done(err);
      }
    });
  });

  it('create timezone', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    api.register(username, password, function (err) {
      if (!err) {
        var d = {
          timezone: 'Europe/London',
          name: 'test'
        };
        api.createTimezone(d, function (err) {
          done(err);
        });
      }
      else {
        done(err);
      }
    });
  });

  it('update timezone', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    api.register(username, password, function (err) {
      if (!err) {
        var d = {
          timezone: 'Europe/London',
          name: 'test'
        };

        api.createTimezone(d, function (err, resp) {
          _.extend(d, resp);
          if (!err) {
            console.log('d', d);
            api.updateTimezone(d, function (err) {
              done(err);
            })
          } else done(err);
        });
      }
      else {
        done(err);
      }
    });
  });

  it('delete timezone', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    api.register(username, password, function (err) {
      if (!err) {
        var d = {
          timezone: 'Europe/London',
          name: 'test'
        };

        api.createTimezone(d, function (err, resp) {
          _.extend(d, resp);
          if (!err) {
            api.deleteTimezone(d, function (err) {
              done(err);
            })
          } else done(err);
        });
      }
      else {
        done(err);
      }
    });
  });

  it('filter timezones', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    api.register(username, password, function (err) {
      if (!err) {
        api.searchTimezones('Test', function (err) {
          done(err);
        })
      }
      else done(err);
    });
  });


});
