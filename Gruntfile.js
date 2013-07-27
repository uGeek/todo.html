module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    appDir: "src",
                    baseUrl: "js",
                    dir: "built/requirejs",
                    uglify: {
                        ascii_only: true
                    },
                    preserveLicenseComments: false,
                    modules: [
                        {
                            name: "main"
                        }
                    ]
                }
            }
        },
    smoosher: {
      files: {
        src: 'built/requirejs/todo.html',
        dest: 'built/smoosher/todo.html'
      },
    },
    oneliner: {
      files: {
        src: 'built/smoosher/todo.html',
        dest: 'todo.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-html-smoosher');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerMultiTask('oneliner', 'into a single line', function() {

      this.files.forEach(function(filePair) {
          // Check that the source file exists
          if(filePair.src.length === 0) { return; }

          var text = grunt.file.read(filePair.src);
          var regex = /([\s\S]*)(^!!WARNING!! Do not edit this line.[\s\S]*$)/m
          var matches = text.match(regex);

          var todos = matches[1];
          var html = matches[2];

          html = html.replace(/\n/g, '');

          grunt.file.write(filePair.dest, todos + html);
      });
  });

  // Default task(s).
  grunt.registerTask('default', ['requirejs', 'smoosher', 'oneliner']);

};
