var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var lazypipe = require('lazypipe');
var runSequence = require('run-sequence');

var qunit = require('gulp-qunit');

gulp.task('build', function () {
    runSequence(['clean:build', 'test'],
        'minimize',
        'resources:build');
});

gulp.task('debug', function () {
    runSequence(['clean:debug', 'test'],
        'minimize-for-debug',
        'resources:debug');
});

/*gulp.task('test', function () {
    return gulp.src('test/index.html')
        .pipe($.qunit());
});*/

gulp.task('test', function() {
    return gulp.src('./tests/index.html')
        .pipe(qunit());
});

gulp.task('minimize', function () {
    return gulp.src('client/*.html')
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.htmlmin({collapseWhitespace: true, removeComments: true})))
        .pipe(gulp.dest('server/public'));
});

gulp.task('lint', function () {
    return gulp.src('client/js/app/**/*.js')
        .pipe($.eslint())
        .pipe($.eslint.format());
});

gulp.task('resources:build', function () {
    return gulp.src('client/img/**/*')
        .pipe(gulp.dest('server/public/img'));
});

gulp.task('clean:build', function () {
    return gulp.src('server/public')
        .pipe($.clean());
});

gulp.task('minimize-for-debug', function () {
    return gulp.src('client/*.html')
        .pipe($.useref({}, lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.htmlmin({collapseWhitespace: true, removeComments: true})))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('server/debug'));
});

gulp.task('resources:debug', function () {
    return gulp.src('client/img/**/*')
        .pipe(gulp.dest('server/debug/img'));
});

gulp.task('clean:debug', function () {
    return gulp.src('server/debug')
        .pipe($.clean());
});