module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      main: {
        options: {
          sourceMap: 'inline'
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'public/'
          }
        ]
      }
    },
    bower_concat: {
      main: {
        dest: 'public/lib/build.js',
        cssDest: 'public/lib/build.css'
      }
    },
    clean: ['public'],
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              '**',
              '!**/*.jade',
              '!**/*.scss',
              '!**/*.js'
            ],
            dest: 'public/',
            filter: 'isFile'
          }
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'public/lib/build.css': 'public/lib/build.css'
        }
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.jade', '!**/_*.jade'],
            dest: 'public/',
            ext: '.html'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.jade', '!**/_*.jade'],
            dest: 'public/',
            ext: '.html'
          }
        ]
      }
    },
    sass: {
      prod: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'public/css/main.css': 'src/_styles/main.scss'
        }
      },
      dev: {
        files: {
          'public/css/main.css': 'src/_styles/main.scss'
        }
      },
      options: {
        sourceMap: true,
        sourceMapEmbed: true
      }
    },
    uglify: {
      bower: {
        files: {
          'public/lib/build.js': 'public/lib/build.js'
        }
      },
      main: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: ['**/*.js'],
            dest: 'public/'
          }
        ]
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'babel',
    'bower_concat',
    'jade:prod',
    'sass:prod',
    'uglify',
    'cssmin'
  ]);
  grunt.registerTask('build-dev', [
    'clean',
    'copy',
    'babel',
    'bower_concat',
    'jade:dev',
    'sass:dev',
  ]);

};
