/*
*
* 1:less 编译  压缩  合并
* 2:js 合并  压缩  混淆
* 3:img 复制
* 4:html压缩
*/
'use strict';
var gulp = require("gulp");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
//1:CSS
gulp.task("style",function(){
	gulp.src(["src/css/*.less","!src/css/_*.less"])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest("dist/css"))
	.pipe(browserSync.reload({
		stream:true
	}));
});
//2:JS

var scriptcon = require("gulp-concat");
var uglify = require("gulp-uglify");
gulp.task("script",function(){
	gulp.src("src/js/*.js")
	.pipe(scriptcon("all.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"))
	.pipe(browserSync.reload({
		stream:true
	}));
});

//3:html
var htmlmin = require('gulp-htmlmin');
gulp.task("htmlmin",function(){
	gulp.src("src/*.html")
	.pipe(htmlmin({collapseWhitespacew:true}))
	.pipe(gulp.dest("dist"))
	.pipe(browserSync.reload({
		stream:true
	}));
});
//监测
var browserSync = require("browser-sync");
gulp.task("browser",function(){
    browserSync({server: {baseDir:['dist']}}, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
    gulp.watch("src/css/*.less",["style"]);
    gulp.watch("src/js/*.js",["script"]);
    gulp.watch("src/*.html",["htmlmin"]);
});
})

