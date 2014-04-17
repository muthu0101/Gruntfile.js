/**
 * Created by vmuthu on 4/14/14.
 */
module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Before generating any new files, remove any previously-created files.
        clean: {
            test: ['css/layafm.min.css', 'js/all.min.js']
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            },
            options: {
                keepSpecialComments: 0
            },
            combine: {
                files: {
                    'css/layafm.min.css': ['css/*.min.css']
                }
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                }
            },
            my_target: {
                files: {
                    'js/all.min.js': ['js/html5shiv.js','js/jquery-1.10.2.min.js','js/jquery-migrate-1.2.1.min.js','js/bootstrap.min.js','js/jquery.easing.1.3.js','js/script.js','js/validation.js']
                }
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'images/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },
        htmlhint: {
            html1: {
            options: {
                'tag-pair': true,
                'attr-value-not-empty' : true
            },
                src: ['index.html']
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'index.htm': 'index.html'     // 'destination': 'source'
                }
            }
        }
    });
    grunt.registerTask('test', ['clean','cssmin','uglify','htmlmin']);
    grunt.registerTask('default', []);
};