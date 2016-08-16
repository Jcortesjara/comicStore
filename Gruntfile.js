module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
        files: {
          'dist/js/libs.min.js': ['node_modules/jquery/dist/jquery.js'],
          'dist/js/comic.min.js': ['js/*.js']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};