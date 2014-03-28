(function() {
  "use strict";
  var JsblogGenerator, chalk, path, util, yeoman;

  JsblogGenerator = void 0;

  chalk = void 0;

  path = void 0;

  util = void 0;

  yeoman = void 0;

  util = require("util");

  path = require("path");

  yeoman = require("yeoman-generator");

  chalk = require("chalk");

  JsblogGenerator = yeoman.generators.Base.extend({
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
      this.log(chalk.magenta("You're using the fantastic Jsblog generator."));
      prompts = [
        {
          type: "confirm",
          name: "someOption",
          message: "Would you like to enable this option?",
          "default": true
        }, {
          type: "input",
          name: "blogName",
          message: "What is the name of your blog?",
          "default": "Sample Blog"
        }, {
          type: "confirm",
          name: "includeDefaultStyles",
          message: "Would you like to include some default styles (Including Bootstrap)?",
          "default": false
        }, {
          type: "confirm",
          name: "includeRequireJS",
          message: "Would you like to include RequireJS (for AMD support)?",
          "default": false
        }
      ];
      return this.prompt(prompts, (function(props) {
        this.someOption = props.someOption;
        this.includeRequireJS = props.includeRequireJS;
        this.blogName = props.blogName;
        done();
      }).bind(this));
    },
    app: function() {
      this.mkdir("app");
      this.mkdir("app/templates");
      this.mkdir("app/scripts");
      this.mkdir("app/styles");
      this.copy("_config.json", "_config.json");
      this.copy("_package.json", "package.json");
      this.copy("_bower.json", "bower.json");
      this.copy("_Gruntfile.js", "Gruntfile.js");
      return this.copy("_index.html", "index.html");
    },
    projectfiles: function() {
      this.copy("editorconfig", ".editorconfig");
      return this.copy("jshintrc", ".jshintrc");
    },
    bootstrapRequireJs: function() {
      if (this.includeRequireJS) {
        return this.copy("_bootstrap.js", "app/scripts/_bootstrap.js");
      }
    },
    mainStyleSheet: function() {
      if (this.includeDefaultStyles) {
        return this.copy("_main.css", "app/styles/_main.css");
      }
    }
  });

  module.exports = JsblogGenerator;

}).call(this);
