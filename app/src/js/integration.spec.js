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

  it('user registration', function (done) {
    var username = guid().slice(0, 30);
    var password = guid();

    $.ajax({
      type: "POST",
      url: url('/api/auth/register/'),
      data: {
        username: username,
        password: password
      },
      dataType: 'json'
    }).success(function (data) {
      assert.equal(data.username, username);
      done();
    })
      .fail(done);

  });
});
