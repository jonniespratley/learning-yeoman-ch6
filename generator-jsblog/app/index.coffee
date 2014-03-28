"use strict"
util = require("util")
path = require("path")
yeoman = require("yeoman-generator")
chalk = require("chalk")

###
js-blog-generator - This is an example generator.
###
JsblogGenerator = yeoman.generators.Base.extend(

	###
	init - This method initializes the generator by loading the package.json file
	and adding an event listener to the 'end' event of the generator.
	###
	init: ->
		@pkg = require("../package.json")
		@on "end", ->
			@installDependencies()	unless @options["skip-install"]
			return
		
	

	###
	askFor - This method asks questions to the user by displaying prompts.
	After the user enters there value, the callback then loops over each property and
	sets the name = value on this generator.
	###
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
		,
			type: 'confirm',
			name: 'includeDefaultStyles',
			message: 'Would you like to include some default styles (Including Bootstrap)?',
			default: false
		,
			type: 'confirm',
			name: 'includeRequireJS',
			message: 'Would you like to include RequireJS (for AMD support)?',
			default: false
		]
		
		#Each prompts get the value
		@prompt prompts, ((props) ->
			@someOption = props.someOption
			@includeRequireJS = props.includeRequireJS
			@blogName = props.blogName
			done()
			return
		).bind(this)
		
		
	
	###
	app - This method creates the initial app files, the directory structure, package files,
	configuration files, Gruntfiles etc. anything that needs to shell out the application should
	be placed here.
	@copy takes files in templates directory and copys to project root folder.
	if no arguments are passed the generator instance is passed as an agrument,
		and it uses _ underscore templating library to process, so that means 
		you can use <%= _.capitalize(blogName) %> template rendering methods to 
		display data from the generator.
		this.bowerInstall([ 'jquery', 'underscore' ], { save: true });
	###
	app: ->
		@mkdir "app"
		@mkdir "app/templates"
		@mkdir "app/scripts"
		@mkdir "app/styles"
		@copy "_config.json", "config.json"
		@copy "_package.json", "package.json"
		@copy "_bower.json", "bower.json"
		@copy '_Gruntfile.js', 'Gruntfile.js'
		@copy '_index.html', 'index.html'
	
	###
	projectFiles - This method creates any project files needed for the application, 
	such as .travis, .gitignore files, etc.
	###
	projectfiles: ->
		@copy "editorconfig", ".editorconfig"
		@copy "jshintrc", ".jshintrc"
	
	bootstrapRequireJs: -> 
		if @includeRequireJS
			@copy '_main.js', 'app/scripts/main.js'
	
	mainStyleSheet: ->
		if @includeDefaultStyles
			@copy '_main.css', 'app/styles/main.css'
	
)
module.exports = JsblogGenerator