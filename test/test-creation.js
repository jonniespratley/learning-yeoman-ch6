'use strict';
var helpers, path;

path = require('path');

helpers = require('yeoman-generator').test;

require('chai').should();

describe('jps-site generator', function() {
  var mockAnswers, mockFilePairs, mockFiles;
  mockAnswers = {
    siteTitle: 'My Test Site',
    siteDesc: 'A modern site build to test.',
    featureTitle: 'Mocha Tests',
    featureBody: 'A modern site created by a Yeoman generator.',
    featureImage: 'images/feature.png'
  };
  mockFiles = ['.bowerrc', '.editorconfig', '.gitattributes', '.gitignore', '.jshintrc', '.travis.yml', 'bower.json', 'config.json', 'Gruntfile.js', 'package.json', 'app/images/feature.png', 'app/scripts/main.js', 'app/styles/main.css', 'app/index.html'];
  mockFilePairs = [['app/index.html', RegExp("<title>" + mockAnswers.siteTitle + "</title>")], ['app/pages/main.html', RegExp("<h1>" + mockAnswers.featureTitle + "</h1>")], ['app/pages/main.html', RegExp("" + mockAnswers.featureBody)]];
  beforeEach(function(done) {
    return helpers.testDirectory(path.join(__dirname, 'temp'), (function(err) {
      if (err) {
        done(err);
      }
      this.app = helpers.createGenerator('jps-site', ['../../app']);
      return done();
    }).bind(this));
  });
  return it('creates expected files', function(done) {
    helpers.mockPrompt(this.app, mockAnswers);
    this.app.options['skip-install'] = true;
    return this.app.run({}, function() {
      helpers.assertFile(mockFiles);
      helpers.assertFileContent(mockFilePairs);
      return done();
    });
  });
});
