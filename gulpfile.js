var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var shell = require('gulp-shell');
var webpack = require('gulp-webpack');
var karma = require('karma').server;
var argv = require('yargs').argv;

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
      watch: !argv.travis,
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
    browsers: argv.travis ? ['Firefox'] : ['Chrome'],
    singleRun: !!argv.travis
  }, done);
});

gulp.task('build', shell.task([
  'script/build'
]));

gulp.task('dev', shell.task([
  'script/dev'
]));

gulp.task('watch:test', ['buildTest', 'test']);

gulp.task('default', ['build']);