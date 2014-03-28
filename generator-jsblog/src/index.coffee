'use strict'
util = require('util')
path = require('path')
yeoman = require('yeoman-generator')
chalk = require('chalk')
# js-blog-generator - This is an example generator.
module.exports = JsblogGenerator = yeoman.generators.Base.extend();
#
#	 init - This method initializes the generator by loading the package.json file
#	 and adding an event listener to the 'end' event of the generator.
#	 
JsblogGenerator::init = ->
	@pkg = require('../package.json')
	@on 'end', ->
		@installDependencies()	unless @options['skip-install']

JsblogGenerator::askFor = ->
	done = undefined
	prompts = undefined
	done = @async()
	@log @yeoman
	@log chalk.magenta('You are using the JS Blog Yeoman generator.')
	prompts = [
		{
			type: 'input'
			name: 'blogName'
			message: 'What is the name of your blog'
			default: 'YeomanBlog'
		}
	]
	@prompt prompts, ((props) ->
		@blogName = props.blogName
		done()
	).bind(this)


JsblogGenerator::app = ->
	@mkdir 'app'
	@mkdir 'app/templates'
	@mkdir 'app/scripts'
	@mkdir 'app/styles'
	#Index files - css, js 
	@copy '_index.html', 'app/index.html'
	@copy '_main.js', 'app/scripts/main.js'
	@copy '_main.css', 'app/styles/main.css'



#
#	 projectFiles - This method creates any project files needed for the application,
#	 such as .travis, .gitignore files, etc.
#	 
JsblogGenerator::projectfiles = ->
	@copy 'editorconfig', '.editorconfig'
	@copy 'jshintrc', '.jshintrc'
	#Custom package
	@copy '_package.json', 'package.json'
	#Custom libs
	@copy '_bower.json', 'bower.json'
	@copy '.bowerrc', '.bowerrc'
	#Custom tasks
	@copy '_Gruntfile.js', 'Gruntfile.js'


#Lets add jquery and some others to the bower installer
JsblogGenerator::bowerInstaller = ->
	@bowerInstall([ 'jquery', 'bootstrap' ], save: true)


