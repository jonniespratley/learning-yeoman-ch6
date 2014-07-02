'use strict';
var assert = require('assert');
require('chai').should();

describe('jps-site generator', function() {
	it('can be imported without blowing up', function() {
		var app = require('../app');
		assert(app !== undefined);
	});
});
