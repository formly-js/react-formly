var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var gulpWebpack = require('gulp-webpack');
var react = require('gulp-react');
var jshint = require('gulp-jshint');

// hijack task fn and add help
require('gulp-help')(gulp);


var connect = require('connect');
var serveStatic = require('serve-static');
var livereload = require('livereload');
var rimraf = require('rimraf');
var webpack = require('webpack');
var karma = require('karma').server;
var argv = require('yargs').argv;
var stylish = require('jshint-stylish');

gulp.task('deploy', 'Deploy demo to gh-pages', function () {
  gulp.src([
    './demo/demo-built.js',
    './demo/index.html',
    './demo/styles.css',
    './demo/bootstrap.min.css'
  ])
    .pipe(deploy());
});

gulp.task('lint', 'lint project code (post jsx transformation', function() {
  gulp.src('src/**/*')
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('watch:lint', false, function() {
  gulp.watch('./src/**/*', ['lint']);
});

gulp.task('build:clean', false, function(done) {
  rimraf('./dist', done);
});

function buildTest(once) {
  return gulp.src('test/index.js')
    .pipe(gulpWebpack({
      output: {
        filename: './index-built.js'
      },
      watch: !once,
      module: {
        loaders: [
          { test: /\.js$/, loader: 'jsx-loader' }
        ]
      }
    }))
    .pipe(gulp.dest('test/'));
}

gulp.task('test:buildTest', false, function() {
  buildTest(true);
});

gulp.task('watch:buildTest', false, function() {
  buildTest(false);
});

function test(once, done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    browsers: argv.travis ? ['Firefox'] : ['Chrome'],
    singleRun: !!once
  }, done);
}

gulp.task('test', 'Run tests once', ['test:buildTest'], function(done) {
  test(true, done);
});

gulp.task('watch:test', false, ['watch:buildTest'], function(done) {
  test(false, done);
});

function buildLib(once, uglify) {
  var buildLibConfig = getBuildWebpack(once);
  if (uglify) {
    buildLibConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
    buildLibConfig.output.filename = 'react-formly.min.js';
    buildLibConfig.devtool = 'source-map';
  }
  return gulp.src('index.js')
    .pipe(gulpWebpack(buildLibConfig))
    .pipe(gulp.dest('dist/'));
}

gulp.task('build:lib', false, function() {
  buildLib(true, false);
});

gulp.task('watch:build:lib', false, function() {
  buildLib(false, false);
});

gulp.task('build:uglify', false, function() {
  buildLib(true, true);
});

gulp.task('watch:build:uglify', false, function() {
  buildLib(false, true);
});

gulp.task('watch:demo', false, function() {
  return gulp.src('demo/demo.js')
    .pipe(gulpWebpack({
      output: {
        path: __dirname + 'demo',
        filename: 'demo-built.js'
      },
      watch: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.js$/, loader: 'jsx-loader'}
        ]
      }
    }))
    .pipe(gulp.dest('demo/'));
});

gulp.task('watch:serve:server', false, function(next) {
  var server = connect();
  server.use(serveStatic('demo'));
  server.listen(process.env.PORT || 3000, next);
});

gulp.task('watch:serve', false, ['watch:serve:server'], function() {
  var server = livereload.createServer({
    interval: 300
  });
  server.watch(__dirname + '/demo');
});

gulp.task('watch', 'Use this for development. Will build, test, and serve the demo automgagically', [
  'watch:build:lib',
  'watch:build:uglify',
  'watch:lint',
  'watch:buildTest',
  'watch:test',
  'watch:demo',
  'watch:serve'
]);

gulp.task('build', 'Build the library', ['build:clean', 'build:lib', 'build:uglify']);

gulp.task('default', false, ['help']);

gulp.task('ci', 'Run the tests and build. Use --travis for the travis version of the build.', [
  'test',
  'build'
]);



// UTILS


function getBuildWebpack(once) {
  return {
    entry: './index.js',
    output: {
      filename: 'react-formly.js',
      library: 'ReactFormly',
      libraryTarget: 'umd'
    },

    externals: {
      react: 'React'
    },

    debug: false,
    devtool: 'inline-source-map',
    watch: !once,

    stats: {
      colors: true,
      reasons: false
    },

    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ],

    resolve: {
      extensions: ['', '.js']
    },

    module: {
      loaders: [
        { test: /src\/.*\.js$/, loader: 'jsx-loader' }
      ]
    }
  }
}