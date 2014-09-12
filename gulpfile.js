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
    singleRun: true
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

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.js', '!./src/**/*.spec.js'], ['build']);
  gulp.watch('./src/**/*.spec.js', ['buildTest']);
  gulp.watch('./test/index-built.js', ['test'])
});