// Generated on 2014-06-07 using generator-ember 0.8.3
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        build: 'build'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            emberTemplates: {
                files: '<%= yeoman.app %>/templates/**/*.hbs',
                tasks: ['emberTemplates:build']
            },
            neuter: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['neuter']
            },
            html: {
                files: ['index.html.tpl'],
                tasks: ['replace:app']
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            build: '<%= yeoman.build %>'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '.tmp/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        replace: {
          app: {
            options: {
              variables: {
                ember: 'bower_components/ember/ember.js',
                ember_data: 'bower_components/ember-data/ember-data.js',
                root: 'build'
              }
            },
            files: [
              {src: 'index.html.tpl', dest: 'index.html'}
            ]
          },
          dist: {
            options: {
              variables: {
                ember: 'bower_components/ember/ember.prod.js',
                ember_data: 'bower_components/ember-data/ember-data.prod.js',
                root: 'dist'
              }
            },
            files: [
                {src: 'index.html.tpl', dest: 'index.html'}
            ]
          }
        },
        // Put files not handled in other tasks here
        copy: {
            fonts: {
                files: [
                    { 
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        cwd: '<%= yeoman.app %>/bower_components/',
                        dest: '<%= yeoman.app %>/styles/fonts/',
                        src: [ 
                            'bootstrap-sass/dist/fonts/**', // Bootstrap
                            'font-awesome/fonts/**' // Font-Awesome
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,txt}',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}',
                            'styles/fonts/*'
                        ]
                    }
                ]
            }
        },
        concurrent: {
            server: [
                'emberTemplates',
            ],
            test: [
                'emberTemplates',
            ],
            dist: [
                'emberTemplates',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        emberTemplates: {
            options: {
                templateName: function (sourceFile) {
                    var templatePath = yeomanConfig.app + '/templates/';
                    return sourceFile.replace(templatePath, '');
                }
            },
            dist: {
                files: {
                    '<%= yeoman.build %>/scripts/compiled-templates.js': '<%= yeoman.app %>/templates/{,*/}*.hbs'
                }
            },
            build: {
                files: {
                    '<%= yeoman.build %>/scripts/compiled-templates.js': '<%= yeoman.app %>/templates/{,*/}*.hbs'
                }
            }
        },
        neuter: {
            app: {
                options: {
                    filepathTransform: function (filepath) {
                        return yeomanConfig.app + '/' + filepath;
                    }
                },
                src: '<%= yeoman.app %>/scripts/app.js',
                dest: '<%= yeoman.build %>/scripts/combined-scripts.js'
            }
        }
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('serve', function (target) {

        grunt.task.run([
            'clean:build',
            'replace:app',
            'neuter:app',
            'emberTemplates:build',
            'copy:fonts',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'replace:app',
        'concurrent:test',
        'connect:test',
        'neuter:app',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'replace:dist',
        'useminPrepare',
        'concurrent:dist',
        'neuter:app',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};

