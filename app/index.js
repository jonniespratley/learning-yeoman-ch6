(function () {
	'use strict';
	var util = require( 'util' );
	var path = require( 'path' );
	var yeoman = require( 'yeoman-generator' );
	var yosay = require( 'yosay' );
	var MyGenerator;

	module.exports = MyGenerator = yeoman.generators.Base.extend();
	MyGenerator.prototype.init = function() {
		this.pkg = require('../package.json');
		this.on('end', function() {
			if (this.options['skip-install'] !== true) {
				this.installDependencies();
			}
		});
	};
	MyGenerator.prototype.askFor = function() {
		var done = this.async();

		this.log( this.yeoman );
		this.log( yosay( 'You are using JPS Site Yeoman generator.' ) );
		this.prompts = [
			{
				type: 'input',
				name: 'siteTitle',
				message: 'What is the name of your site',
				"default": 'My Site'
			}, {
				type: 'input',
				name: 'siteDesc',
				message: 'What is the site description?',
				"default": 'A modern site built with a Yeoman Generator.'
			}, {
				type: 'input',
				name: 'featureTitle',
				message: 'What is the feature?',
				"default": 'Modern Site'
			}, {
				type: 'input',
				name: 'featureBody',
				message: 'The feature description?',
				"default": 'A modern site using modern tools & technologies.'
			}, {
				type: 'input',
				name: 'featureImage',
				message: 'The feature image?',
				"default": 'images/feature.png'
			}
		];
		this.prompt(this.prompts, (function(props) {
			this.siteTitle = props.siteTitle;
			this.siteDesc = props.siteDesc;
			this.featureTitle = props.featureTitle;
			this.featureBody = props.featureBody;
			this.featureImage = props.featureImage;
			done();
		}).bind(this));
	};

	MyGenerator.prototype.projectfiles = function () {
		this.copy('_package.json', 'package.json');
		this.copy('_Gruntfile.js', 'Gruntfile.js');

		//Copy all of the bower specific files.
		this.copy('bowerrc', '.bowerrc');
		this.copy('_bower.json', 'bower.json');

		//Copy all files that handle code editing.
		this.copy('editorconfig', '.editorconfig');
		this.copy('jshintrc', '.jshintrc');

		//Copy all files that handle git repositorys
		this.copy('gitignore', '.gitignore');
		this.copy('gitattributes', '.gitattributes');

		//Copy files for Travis CI.
		this.copy('travis.yml', '.travis.yml');
	};

	MyGenerator.prototype.app = function () {
		this.mkdir('app');
		this.mkdir('app/images');
		this.mkdir('app/scripts');
		this.mkdir('app/styles');
		this.mkdir('app/pages');
		this.copy('feature.png', 'app/images/feature.png');
		this.copy('_index.html', 'app/index.html');
		this.copy('_main.html', 'app/pages/main.html');
		this.copy('_main.js', 'app/scripts/main.js');
		this.copy('_main.css', 'app/styles/main.css');
	};
	MyGenerator.prototype.bowerInstaller = function () {
		if (this.options['skip-install'] !== true) {
			this.bowerInstall(['jquery', 'handlebars', 'bootstrap'], {
				save: true
			});
		}
	};

}).call(this);
