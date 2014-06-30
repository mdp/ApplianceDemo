var gulp = require('gulp');
var browserify = require('gulp-browserify');
var express = require('express');
var app = express();

var outDir = './gh-pages';

gulp.task('scripts', function() {
  gulp.src('*.js')
  .pipe(browserify({}))
  .pipe(gulp.dest(outDir))
});

gulp.task('html', function(){
  gulp.src('*.html')
  .pipe(gulp.dest(outDir))
});

gulp.task('server', ['default'], function(){
  app.use(express.static('./gh-pages'));
  app.listen(process.env['PORT'] || 3000);
});

gulp.task('default', ['scripts', 'html'], function () {});
