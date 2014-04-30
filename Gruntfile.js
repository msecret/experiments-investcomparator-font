// Copyright (c) 2014
// All Rights Reserved
// https://github.com/msecret/experiments-investmentcomparator-front
// Licensed Apache

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: "// Copyright (c) <%= grunt.template.today('yyyy') %>" +
                  "<%= pkg.author.name %>\n" +
              "// All Rights Reserved\n" +
              "// <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
              "// <%= pkg.homepage %>\n" +
              "// Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %>\n"
    },
    requirejs: {
      options: {
        mainConfigFile: "build/dev.build.js"
      },
      compile: {
        options: {
          almond: true,
          replaceRequireScript: [{
            files: ['index.html'],
            module: '<%= pkg.name %>.min'
          }],
          out: 'js/compiled/<%= pkg.name %>.min.js',
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          useSourceUrl: true
        }
      },
      concat: {
        options: {
          optimize: 'none',
          out: "js/<%= pkg.name %>.js",
          wrap: {
            start: "<%= meta.banner %>"
          }
        }
      }
    },
    jasmine: {
      options: {
        keepRunner: true,
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {
            baseUrl: './js'
          },
          requireConfigFile: 'build/dev.build.js'
        }
      },
      test: {
        options: {
          specs: 'js/src/test/**/*_test.js'
        }
      }
    },
    clean: ['js/compiled/*', 'doc/**/*'],
    watch: {
      scripts: {
        files: ['js/src/**/*.js', 'js/src/test/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        loopfunc: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        sub: true,
        undef: true,
        boss: true,
        debug: true,
        eqnull: true,
        multistr: true,
        // environments
        browser: true,
        devel: true,
        node: true,

        globals: {
          afterEach: true,
          crowdnode: true,
          beforeEach : true,
          define: true,
          describe : true,
          expect : true,
          require: true,
          jasemine: true,
          sinon: true,
          module: true,
          waitsFor: true,
          it : true,
          _: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-requirejs');

  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('concat', 'requirejs:concat');
  grunt.registerTask('compile', 'requirejs:compile');
  grunt.registerTask('test', 'jasmine:test');
  grunt.registerTask('doc', 'jsdoc');

  grunt.registerTask('default', ['lint', 'clean', 'compile', 'concat',
                                 'test', 'doc']);
};
