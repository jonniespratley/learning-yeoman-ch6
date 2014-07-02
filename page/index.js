'use strict';
var PageGenerator, util, yeoman;

util = require('util');

yeoman = require('yeoman-generator');

module.exports = PageGenerator = yeoman.generators.NamedBase.extend();

PageGenerator.prototype.init = function() {
  return console.log("You called the page sub-generator with the argument " + this.name + ".");
};

PageGenerator.prototype.files = function() {
  return this.copy('_page.html', "app/pages/" + this.name + ".html");
};

PageGenerator.prototype.appendLink = function() {
  var htmlLink;
  htmlLink = "<li>\n	<a href=\"#/" + this.name + "\">\n		" + this.name + "\n	</a>\n</li>";
  return this.appendToFile('app/index.html', 'ul.nav', htmlLink);
};
