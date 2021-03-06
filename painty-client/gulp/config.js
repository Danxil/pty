var dest = './dist';
var src = './app';
var gutil = require('gulp-util');

module.exports = {
  server: {
    settings: {
      root: dest,
      host: 'localhost',
      port: 3005,
      livereload: {
        port: 35929
      }
    }
  },
  del: {
    src: [
      dest + '/*'
    ]
  },
  sass: {
    src: src + '/styles/**/*.{sass,scss,css}',
    dest: dest + '/styles',
    settings: {
      indentedSyntax: false, // Enable .sass syntax?
      imagePath: '/images' // Used by the image-url helper
    }
  },
  browserify: {
    src: src + '/scripts/app.js',
    dest: dest + '/scripts',
    outputName: 'app.js',
    debug: gutil.env.type === 'dev'
  },
  vendors: {
    src: [
      src + '/scripts/libs/sails.io.js',
      'bower_components/*',
      'bower_components/lodash/lodash.js',
      '!bower_components/bootstrap-sass',
    ],
    dest: dest + '/scripts'
  },
  copy: {
    src: [
      src + '/*.html',
      src + '/*.txt',
      src + '/*.ico'
    ],
    dest: dest
  },
  watch: [
    {
      src: [
        src + '/scripts/**/*.js',
        src + '/scripts/**/*.jsx'
      ],
      tasks: ['browserify']
    },
    {
      src: [
        src + '/styles/**/*.sass'
      ],
      tasks: ['styles']
    },
    {
      src: [
        src + '/*.html'
      ],
      tasks: ['copy']
    }
  ]
};
