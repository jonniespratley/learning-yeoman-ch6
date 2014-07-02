'use strict';
var assert;

assert = require('assert');

require('chai').should();

describe('jps-site generator', function() {
  return it('can be imported without blowing up', function() {
    var app;
    app = require('../app');
    return assert(app !== void 0);
  });
});
