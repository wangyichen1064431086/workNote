## gulp-sass
<https://www.npmjs.com/package/gulp-sass>

<https://github.com/sass/node-sass#options>
gulp的sass处理插件。

用法示例：

	'use strict';
 
	var gulp = require('gulp');
	var sass = require('gulp-sass');
	 
	gulp.task('sass', function () {
	  return gulp.src('./sass/**/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./css'));
	});

### API：

#### sass([options])
##### options
当你使用node-sass时，options中的值会被传递。

- includePaths:Array类型，default为[]。为由路径组成的数组，Sass编译器（LibSass)可以据此决定@import的路径。***为什么是bower_components?***

- outputStyle:String类型，default为nested。 Values: nested, expanded, compact, compressed。决定最终的CSS的输出格式,**一般选择expanded**
- precision:Integer类型，default为5。用于决定小数位数。例如，如果你有一个十进制number1.23456780,且precision为5,那么在最终的CSS文件中会是1.23457。**一般设置为10**

##### 用法eg
```
  var sourcemaps = require('gulp-sourcemaps');
  
  gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths:[],
      outputStyle:'expanded',
      precision:10}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
  });
```