var time = require('./time');
var assert = require('chai').assert;

describe('time', function () {
  it('names', function () {
    var names = time.getTimezoneNames();
    assert.include(names, 'Europe/London');
  });
  it('offset', function () {
    var offset = time.getUTCOffset('Europe/London');
    assert.equal(1, parseInt(offset));
  });
});
