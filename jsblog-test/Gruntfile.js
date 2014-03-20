// Generated on 2014-03-20 using generator-jsblog 0.0.1
'use strict';
var moment = require('moment');

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
				files : ['index.html', 'posts/*.md'],
				tasks : ['build']
			}
		},
		connect : {
			options : {
				port : 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname : 'localhost'
			},
			livereload : {
				options : {
					middleware : function(connect) {
						return [lrSnippet, mountFolder(connect, '.')];
					}
				}
			}
		},
		open : {
			server : {
				path : 'http://localhost:<%= connect.options.port %>'
			}
		}
	});

	grunt.registerTask('server', ['build', 'connect:livereload', 'open', 'watch']);

	grunt.registerTask('build', 'Build your blog.', function() {
		console.log('running build');
	});
};
