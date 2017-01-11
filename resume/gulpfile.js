/**
 * Created by Administrator on 2016/7/28.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');

/***创建任务***/
var config = {
    baseDir:'src',
    watchFiles: ['src/*.html','src/css/*.css','src/js/*.js']
}
/*自动刷新*/
gulp.task('browser-sync',function () {
    browserSync.init({
        files: config.watchFiles,
        server: {
            baseDir: config.baseDir
        }
    })
});

/*检查、压缩js*/
gulp.task('minifyjs',function () {
    return gulp.src('src/js/*.js')
               .pipe(uglify())
               .pipe(gulp.dest('dist/js'))
});
/*压缩css*/
gulp.task('minifycss',function () {
    return gulp.src('src/css/*.css')
                .pipe(minifycss())
                .pipe(gulp.dest('dist/css'))
});
/*默认任务*/
gulp.task('default',function () {
    gulp.run('minifyjs','minifycss','browser-sync');
    /*监视*/
    gulp.watch('src/css/*.css',['minifycss','minifycss']);
});
