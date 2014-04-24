// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
// Project settings
	var config = {
		name: '<%= pkg.name %>',
		app: 'app',
		dist: 'dist'
};
module.exports = function(grunt) {
	  // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
	
	grunt.initConfig({
		//watch - This task will watch files and run tasks when files change.
		watch : {
			options : {
				nospawn : true,
				livereload : true
			},
			//Watch for index file changes and build
			livereload : {
				files : ['index.html'],
				tasks : ['build']
			},
			
			//Watch any bower changes and inject scripts.
			bower: {
				files: ['bower.json'],
				tasks: ['bowerInstall']
			},
		},
		
		//Server
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        config.app
                    ]
                }
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

	//Server 
	grunt.registerTask('serve', function (target) {
			grunt.task.run(['bowerInstall', 'build', 'connect:livereload', 'watch']);
	});
	
	//Build task
	grunt.registerTask('build', 'Building the project.', function() {
		console.log('running build');
	});
	
	//Default task
	grunt.registerTask('default', ['build', 'serve']);
	
};
