'use strict'
util = require('util')
path = require('path')
yeoman = require('yeoman-generator')
chalk = require('chalk')

# js-blog-generator - This is an example generator.
module.exports = JsblogGenerator = yeoman.generators.Base.extend()

#	 init - This method initializes the generator by loading the package.json file
#	 and adding an event listener to the 'end' event of the generator.	 
JsblogGenerator::init = ->
	@on 'end', ->
		@installDependencies()	unless @options['skip-install']
	@pkg = require('../package.json')

#askFor - Prompt the user for questions related to the project generating.
JsblogGenerator::askFor = ->
	done = @async()
	@log @yeoman
	@log chalk.yellow('You are using the JS Blog Yeoman generator.')
	
	prompts = [
			type: 'input'
			name: 'blogName'
			message: 'What is the name of your blog?'
			default: 'My Blog'
		,
			type: 'input'
			name: 'featureTitle'
			message: 'What is the feature?'
			default: 'Modern Blog'
		,
			type: 'input'
			name: 'featureDesc'
			message: 'The feature description?'
			default: 'A modern blog using modern tools & technologies.'
		,
			type: 'input'
			name: 'featureImg'
			message: 'The feature image?'
			default: 'images/feature.png'
	]
	@prompt prompts, ((props) ->
			@blogName = props.blogName
			@featureTitle = props.featureTitle
			@featureDesc = props.featureDesc
			@featureImg = props.featureImg
			done()
		).bind(this)


#appFolders - Create all of the application specific folders.
JsblogGenerator::appFolders = ->
	@mkdir 'app'
	@mkdir 'app/images'
	@mkdir 'app/scripts'
	@mkdir 'app/styles'
	
#appFiles - Copy all of the application specific files.
JsblogGenerator::appFiles = ->
	@copy 'feature.png', 'app/images/feature.png'
	@template '_index.html', 'app/index.html'
	@template '_main.js', 'app/scripts/main.js'
	@template '_main.css', 'app/styles/main.css'

#projectFiles - Copy all of the project specific files.
JsblogGenerator::projectfiles = ->
	@copy 'editorconfig', '.editorconfig'
	@copy 'jshintrc', '.jshintrc'
	
	@template '_config.json', 'config.json'
	@template '_package.json', 'package.json'
	@template '_Gruntfile.js', 'Gruntfile.js'

#bowerFiles - Copy all of the bower specific files.
JsblogGenerator::bowerFiles = ->
	@template '_bower.json', 'bower.json'
	@copy 'bowerrc', '.bowerrc'

#bowerInstaller - Execute the bower install with predefined libaries and save to the bower.json file.
JsblogGenerator::bowerInstaller = ->
	@bowerInstall([ 'jquery', 'bootstrap' ], save: true)


