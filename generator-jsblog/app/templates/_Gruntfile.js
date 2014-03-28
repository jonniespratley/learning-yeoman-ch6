// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
	port : LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	grunt.initConfig({
		
		//watch - This task will watch files and run tasks when files change.
		watch : {
			options : {
				nospawn : true,
				livereload : LIVERELOAD_PORT
			},
			livereload : {
				files : ['index.html'],
				tasks : ['build']
			}
		},
		
		//Server
		connect : {
			options : {
				port : 9000,
				debug: true,
				hostname : 'localhost'// change this to '0.0.0.0' to access the server from outside
			},
			livereload : {
				options : {
					middleware : function(connect) {
						return [
							lrSnippet, 
							mountFolder(connect, './')
						];
					}
				}
			}
		},
		
		//Auto open browser
		open : {
			server : {
				path : 'http://localhost:<%%= connect.options.port %>'
			}
		},

		//bowerInstall - This installs bower_component packages into specified files.
		bowerInstall : {
			target : {
				src : [
					'app/**/*.html',
					'app/styles/main.css',
				],
				dependencies : true,
				devDependencies : false
			}
		}
	});

	//This is the serve task 
	grunt.registerTask('serve', ['bowerInstall', 'build', 'connect:livereload', 'open', 'watch']);

	grunt.registerTask('build', 'Building the project.', function() {
		console.log('running build');
	});
};
