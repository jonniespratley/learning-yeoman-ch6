'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
require('chai').should();


describe('jps-site generator', function() {

	//Mocked questions and answers
	var mockAnswers = {
		siteTitle: 'My Test Site',
		siteDesc: 'A modern site build to test.',
		featureTitle: 'Mocha Tests',
		featureBody: 'A modern site created by a Yeoman generator.',
		featureImage: 'images/feature.png'
	};

	//Mock expected files
	var mockFiles = [
		'.bowerrc',
		'.editorconfig',
		'.gitattributes',
		'.gitignore',
		'.jshintrc',
		'.travis.yml',
		'bower.json',
		'Gruntfile.js',
		'package.json',
		'app/images/feature.png',
		'app/styles/main.css',
		'app/scripts/config.js',
		'app/scripts/main.js',
		'app/index.html'
	];

	//Mock expected file contents
	var mockFilePairs = [
		[ 'app/index.html', RegExp("<title>" + mockAnswers.siteTitle + "</title>") ],
		[ 'app/pages/main.html', RegExp("<h1>" + mockAnswers.featureTitle + "</h1>") ],
		[ 'app/pages/main.html', RegExp("" + mockAnswers.featureBody) ]
	];

	/**
	 Before each test clean the test/temp folder and create a new generator.
	 */
	beforeEach(function(done) {
		helpers.testDirectory(path.join(__dirname, 'temp'), (function(err) {
			if (err) {
				done(err);
			}
			this.app = helpers.createGenerator('jps-site:app', ['../../app']);
			done();
		}).bind(this));
	});

	/**
	 First test if the files that were created match what we expect.
	 */
	it('creates expected files', function(done) {

		/**
		 Add some mock prompts for the user to answer
		 */
		helpers.mockPrompt(this.app, mockAnswers);

		/**
		 Skip installing of the bower and npm dependencies
		 */
		this.app.options['skip-install'] = true;

		/**
		 Run the app and test for files and file contents
		 */
		this.app.run({}, function() {
			helpers.assertFile(mockFiles);
			helpers.assertFileContent(mockFilePairs);
			done();
		});
	});
});
