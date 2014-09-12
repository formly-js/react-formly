var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var shell = require('gulp-shell');
var webpack = require('gulp-webpack');
var karma = require('karma').server;


gulp.task('deploy', function () {
  gulp.src([
    './demo/demo-built.js',
    './demo/index.html',
    './demo/styles.css'
  ])
    .pipe(deploy());
});

gulp.task('buildTest', function() {
  return gulp.src('test/index.js')
    .pipe(webpack({
      output: {
        filename: './index-built.js'
      },
      watch: true,
      module: {
        loaders: [
          { test: /\.js$/, loader: 'jsx-loader' }
        ]
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    browsers: ['Chrome'],
    singleRun: false
  }, done);
});

gulp.task('travisTest', ['buildTest'], function(done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    browsers: ['Firefox'],
    singleRun: true
  }, done);
});

gulp.task('build', shell.task([
  'script/build'
]));

gulp.task('dev', shell.task([
  'script/dev'
]));

gulp.task('watch:test', ['buildTest', 'test']);