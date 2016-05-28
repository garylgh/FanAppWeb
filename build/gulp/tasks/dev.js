var gulp = require('gulp');
var browserSync = require('browser-sync');
// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            //指定服务器启动根目录
            baseDir: "./bin"
        }
    });
    //监听任何文件变化，实时刷新页面
    gulp.watch("./bin/**/*.*").on('change', browserSync.reload);
});
