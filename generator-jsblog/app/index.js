(function() {
  'use strict';
  var JsblogGenerator, chalk, path, util, yeoman;

  util = require('util');

  path = require('path');

  yeoman = require('yeoman-generator');

  chalk = require('chalk');

  module.exports = JsblogGenerator = yeoman.generators.Base.extend();

  JsblogGenerator.prototype.init = function() {
    this.on('end', function() {
      if (!this.options['skip-install']) {
        return this.installDependencies();
      }
    });
    return this.pkg = require('../package.json');
  };

  JsblogGenerator.prototype.askFor = function() {
    var done, prompts;
    done = this.async();
    this.log(this.yeoman);
    this.log(chalk.magenta('You are using the JS Blog Yeoman generator.'));
    prompts = [
      {
        type: 'input',
        name: 'blogName',
        message: 'What is the name of your blog?',
        "default": 'My Blog'
      }, {
        type: 'input',
        name: 'blogDesc',
        message: 'What is your blog about?',
        "default": 'A blog about all things.'
      }, {
        type: 'input',
        name: 'blogImg',
        message: 'What is your blog image?',
        "default": 'http://goo.gl/kZZ6dX'
      }
    ];
    return this.prompt(prompts, (function(props) {
      this.blogName = props.blogName;
      this.blogDesc = props.blogDesc;
      this.blogImg = props.blogImg;
      return done();
    }).bind(this));
  };

  JsblogGenerator.prototype.appFolders = function() {
    this.mkdir('app');
    this.mkdir('app/templates');
    this.mkdir('app/scripts');
    return this.mkdir('app/styles');
  };

  JsblogGenerator.prototype.appFiles = function() {
    this.template('_index.html', 'app/index.html');
    this.template('_main.js', 'app/scripts/main.js');
    return this.template('_main.css', 'app/styles/main.css');
  };

  JsblogGenerator.prototype.projectfiles = function() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
    return this.template('_Gruntfile.js', 'Gruntfile.js');
  };

  JsblogGenerator.prototype.bowerFiles = function() {
    this.template('_bower.json', 'bower.json');
    return this.copy('bowerrc', '.bowerrc');
  };

  JsblogGenerator.prototype.bowerInstaller = function() {
    return this.bowerInstall(['jquery', 'bootstrap'], {
      save: true
    });
  };

}).call(this);
