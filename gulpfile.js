// Include gulp
const gulp = require('gulp');
const gutil = require('gulp-util');
// Include gulp plugins
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
// const mocha = require('gulp-mocha');

// eslint task
gulp.task('lint', () => {
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
// nodemon task
gulp.task('nodemon_file', () => {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { NODE_ENV: 'development' } });
});
// sass task
gulp.task('sass', () => gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.public/css')));
gulp.task('sass:watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
gulp.task('watch', () => {
  gulp.watch(['app/**/*.js', 'public/js/**/*.js'], ['lint'])
    .on('change', browserSync.reload);
});

// default task
gulp.task('default', ['lint', 'nodemon_file', 'sass', 'watch'], () => {
  gutil.log('Gulp is running!');
});
