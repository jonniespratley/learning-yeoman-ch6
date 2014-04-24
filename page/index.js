'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var PageGenerator = yeoman.generators.NamedBase.extend({
	init : function() {
		
		
		console.log(this.usage());
		if (!this.name) {
			this.generatorName = this.name;
			this.dirname = this._.dasherize(this.name);
			console.log('You called the page subgenerator with the argument ' + this.name + '.');
		}
	},

	files : function() {
		this.copy('somefile.js', 'somefile.js');
	}
});

module.exports = PageGenerator;
