(function() {
  "use strict";
  var Generator, JsblogGenerator, chalk, path, util, yeoman;

  JsblogGenerator = void 0;

  chalk = void 0;

  path = void 0;

  util = void 0;

  yeoman = void 0;

  util = require("util");

  path = require("path");

  yeoman = require("yeoman-generator");

  chalk = require("chalk");

  Generator = yeoman.generators.Base.extend({
    init: function() {
      this.pkg = require("../package.json");
      return this.on("end", function() {
        if (!this.options["skip-install"]) {
          this.installDependencies();
        }
      });
    },
    askFor: function() {
      var done, prompts;
      done = void 0;
      prompts = void 0;
      done = this.async();
      this.log(this.yeoman);
      this.log(chalk.magenta("You're using the JS Blog Yeoman generator."));
      prompts = [
        {
          type: "input",
          name: "blogName",
          message: "What is the name of your blog",
          "default": "YeomanBlog"
        }
      ];
      return this.prompt(prompts, (function(props) {
        this.blogName = props.blogName;
        return done();
      }).bind(this));
    },
    app: function() {
      this.mkdir("app");
      this.mkdir("app/templates");
      this.mkdir("app/scripts");
      this.mkdir("app/styles");
      this.copy("_index.html", "app/index.html");
      this.copy("_main.js", "app/scripts/main.js");
      return this.copy("_main.css", "app/styles/main.css");
    },
    projectfiles: function() {
      this.copy("editorconfig", ".editorconfig");
      this.copy("jshintrc", ".jshintrc");
      this.copy("_package.json", "package.json");
      this.copy("_bower.json", "bower.json");
      this.copy(".bowerrc", ".bowerrc");
      return this.copy("_Gruntfile.js", "Gruntfile.js");
    },
    bowerInstaller: function() {
      return this.bowerInstall(['jquery', 'bootstrap'], {
        save: true
      });
    }
  });

  module.exports = Generator;

}).call(this);
