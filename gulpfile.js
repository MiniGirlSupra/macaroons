const gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

gulp.task('watch', function () {
    gulp.watch('./src/*.less', gulp.series('less'));
});

gulp.task('less', function () {

    return gulp.src('./src/styles.less' )
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(cssmin().on('error', function(err) {
            console.log(err);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('default', gulp.series('less', 'watch'));
