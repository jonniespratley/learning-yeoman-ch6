'use strict';
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		clean: {
			test: ['test/temp']
		},
		watch: {
			compile: {
				files: ['app/*.js', 'test/*.js'],
				tasks: ['mochaTest']
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/**/test-*.js']
			}
		}
	});
	grunt.registerTask('default', ['clean', 'mochaTest']);
	grunt.registerTask('test', ['default']);
};
