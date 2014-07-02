// Generated on <%= (new Date).toISOString() %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	//Project tasks
	grunt.initConfig({

		//watch - This task will watch files and run tasks when files change.
		watch: {
			options: {
				nospawn: true,
				livereload: true
			},
			//Watch for index file changes and build
			livereload: {
				files: ['app/index.html'],
				tasks: ['build']
			},
			//Watch any bower changes and inject scripts.
			bower: {
				files: ['bower.json'],
				tasks: ['bowerInstall']
			},
		},

		//Server - The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: ['.tmp', 'app']
				}
			}
		},

		//bowerInstall - This installs bower_component packages into specified files.
		bowerInstall: {
			target: {
				src: ['app/**/*.html'],
				dependencies: true,
				devDependencies: false
			}
		}
	});

	//Server 
	grunt.registerTask('serve', function(target) {
		console.log('running serve');
		grunt.task.run(['bowerInstall', 'build', 'connect:livereload', 'watch']);
	});

	//Build
	grunt.registerTask('build', 'Building the project.', function() {
		console.log('running build');
	});

	//Default
	grunt.registerTask('default', ['build', 'serve']);

};