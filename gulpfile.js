// Include gulp
const gulp = require('gulp');

// Include gulp plugins
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const bower = require('gulp-bower');
// const syncbrowser = require(browser-sync);

// const mocha = require('gulp-mocha')

gulp.task('nodemon_file', () => {
    nodemon({
        script: 'server.js',
        ext: 'js html',
        env: { NODE_ENV: 'development' }
    });

    gulp.task('lint', () => gulp.src(['public/js/**/*.js', 'test/**/*.js', 'app/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError()));
    /* gulp.task('default', ['lint']);*/

    gulp.task('sass', () => gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.public/css')));
    gulp.task('sass:watch', () => {
        gulp.watch('./sass/**/*.scss', ['sass']);
    });
    // Run install command for bower; used a custom update command "update"
    gulp.task('runbower', () => bower({ cmd: 'update' }));
});