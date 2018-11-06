'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './entry.js',
    debug: true,
  })
  .transform("babelify", {
    presets: [
      ["@babel/preset-env",{
        "targets": {
          "ie": "10"
        },
        useBuiltIns:"entry"
      }]],
      "plugins": [
        ["@babel/plugin-transform-runtime"]
      ]
    });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});