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
		connect : {
			options : {
				port : 9000,
				base: './',
				debug: true,
				useAvailablePort: true,
				// change this to '0.0.0.0' to access the server from outside
				hostname : '127.0.0.1'
			},
			livereload : {
				options : {
					middleware : function(connect) {
						return [
							lrSnippet, 
							mountFolder(connect, './bower_components'),
							mountFolder(connect, './')
						];
					}
				}
			}
		},
		open : {
			server : {
				path : 'http://localhost:<%%= connect.options.port %>'
			}
		},

		bowerInstall : {
			target : {
				// Point to the files that should be updated when
				src : [
				'app/**/*.html',
				// .html support...
				//'app/views/**/*.jade',
				// .jade support...
				'app/styles/main.css',
				// .scss & .sass support...
				//'app/config.yml' 
				// and .yml & .yaml support out of the box!
				],

				// Optional:
				// ---------
				cwd : '',
				dependencies : true,
				devDependencies : false,
				exclude : [],
				fileTypes : {},
				ignorePath : ''
			}
		}

	});

	grunt.registerTask('server', ['bowerInstall', 'build', 'connect:livereload', 'open', 'watch']);

	grunt.registerTask('build', 'Building the project.', function() {
		console.log('running build');
	});
};
