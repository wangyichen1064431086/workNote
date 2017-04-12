### 10. gulp-sourcemaps
<https://www.npmjs.com/package/gulp-sourcemaps>
资源映射，产生*.map文件

用法eg:

	var gulp = require('gulp');
	var plugin1 = require('gulp-plugin1');
	var plugin2 = require('gulp-plugin2');
	var sourcemaps = require('gulp-sourcemaps');
	 
	gulp.task('javascript', function() {
	  gulp.src('src/**/*.js')
	    .pipe(sourcemaps.init())
	      .pipe(plugin1())
	      .pipe(plugin2())
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest('dist'));
	});

所有在sourcemaps.init()和sourcemaps.write（）之间的插件需要支持gulp-sourcemaps插件。
#### sourcemaps.init({loadMaps:true})
- loadMaps:设置为true, 为源文件下载已有映射。