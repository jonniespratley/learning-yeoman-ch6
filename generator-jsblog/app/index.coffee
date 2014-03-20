"use strict"
util = require("util")
path = require("path")
yeoman = require("yeoman-generator")
chalk = require("chalk")


JsblogGenerator = yeoman.generators.Base.extend(
  init: ->
    @pkg = require("../package.json")
    @on "end", ->
      @installDependencies()  unless @options["skip-install"]
      return

    return

  askFor: ->
    done = @async()
    
    # have Yeoman greet the user
    @log @yeoman
    
    # replace it with a short and sweet description of your generator
    @log chalk.magenta("You're using the fantastic Jsblog generator.")
    
    #Prompts for the user
    prompts = [
      type: "confirm"
      name: "someOption"
      message: "Would you like to enable this option?"
      default: true
     ,
     	type: 'input'
     	name: 'blogName'
     	message: 'What is the name of your blog?'
     	default: 'Sample Blog'
    ]
    
    #Each prompts get the value
    @prompt prompts, ((props) ->
      @someOption = props.someOption
      done()
      return
    ).bind(this)
    return

  app: ->
    @mkdir "app"
    @mkdir "app/templates"
    @copy "_package.json", "package.json"
    @copy "_bower.json", "bower.json"
    return

  projectfiles: ->
    @copy "editorconfig", ".editorconfig"
    @copy "jshintrc", ".jshintrc"
    return
)
module.exports = JsblogGenerator
