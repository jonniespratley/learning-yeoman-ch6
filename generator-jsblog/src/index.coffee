# Generated by CoffeeScript 1.6.3
"use strict"
JsblogGenerator = undefined
chalk = undefined
path = undefined
util = undefined
yeoman = undefined
util = require("util")
path = require("path")
yeoman = require("yeoman-generator")
chalk = require("chalk")
#
# js-blog-generator - This is an example generator.
#

Generator = yeoman.generators.Base.extend(
	#
	#	 init - This method initializes the generator by loading the package.json file
	#	 and adding an event listener to the 'end' event of the generator.
	#	 
	init: ->
		@pkg = require("../package.json")
		@on "end", ->
			@installDependencies()	unless @options["skip-install"]
			return
	
	#
	#	 askFor - This method asks questions to the user by displaying prompts.
	#	 After the user enters there value, the callback then loops over each property and
	#	 sets the name = value on this generator.
	#	 
	askFor: ->
		done = undefined
		prompts = undefined
		done = @async()
		@log @yeoman
		@log chalk.magenta("You're using the JS Blog Yeoman generator.")
		prompts = [
			{
				type: "input"
				name: "blogName"
				message: "What is the name of your blog"
				default: "YeomanBlog"
			}
		]
		
		@prompt prompts, ((props) ->
			@blogName = props.blogName
			done()
		).bind(this)

	
	#
	#	 app - This method creates the initial app files, the directory structure, package files,
	#	 configuration files, Gruntfiles etc. anything that needs to shell out the application should
	#	 be placed here.
	#	 @copy takes files in templates directory and copys to project root folder.
	#	 if no arguments are passed the generator instance is passed as an agrument,
	#	 and it uses _ underscore templating library to process, so that means
	#	 you can use <%= _.capitalize(blogName) %> template rendering methods to
	#	 display data from the generator.
	#	 
	app: ->
		@mkdir "app"
		@mkdir "app/templates"
		@mkdir "app/scripts"
		@mkdir "app/styles"
		
		
		#Index files - css, js 
		@copy "_index.html", "app/index.html"
		@copy "_main.js", "app/scripts/main.js"
		@copy "_main.css", "app/styles/main.css"

	
	#
	#	 projectFiles - This method creates any project files needed for the application,
	#	 such as .travis, .gitignore files, etc.
	#	 
	projectfiles: ->
		@copy "editorconfig", ".editorconfig"
		@copy "jshintrc", ".jshintrc"
		
		#Custom package
		@copy "_package.json", "package.json"
		
		#Custom libs
		@copy "_bower.json", "bower.json"
		@copy "bowerrc", ".bowerrc"
		
		#Custom tasks
		@copy "_Gruntfile.js", "Gruntfile.js"

	#Lets add jquery and some others to the bower installer
	bowerInstaller: ->
		@bowerInstall([ 'jquery', 'bootstrap' ], save: true)
	
)


module.exports = Generator