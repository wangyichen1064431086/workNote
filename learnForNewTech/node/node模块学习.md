












### 8.gulp-changed
只处理改变了的文件。这样就不会在处理没有变化的文件上浪费时间。这个插件默认只能检测文件流中的文件是否改变。

#### （1）changed(destination,options)

##### 参数destination
type string or function,规定目标文件目录，和gulp.dest()一样。

它是会将现有文件和目标文件进行比较的。

##### 参数options
- cwd
- extension:目标文件的扩展名
- hasChanged: type function,默认为changed.
- 
- 
- mpareLastModifiedTime，是一个用于决定源文件和目标文件是否相同的函数。

### 9.gulp-plumber
防止管道因为来自gulp插件的错误而导致的中断。

这个补丁插件修复了Node的piping流的问题。简言之，就是说它替代了 pipe方法，并移除了error事件上的标准的onerror事件处理器，而这种标准事件处理器默认会在出错时阻断管道。

API:
#### （1）plumber([options])
返回一个流，其修复了管道线中的下一个pipe方法。

### 10. gulp-sourcemaps
把一些方法打包，然后这些浏览器端不支持的方法就可以在浏览器端使用了

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
- loadMaps:设置为true为源文件下载已有映射。

### 11.gulp-sass
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

API：

#### sass([options])
##### options
当你使用node-sass时，options中的值会被传递。

- includePaths:Array类型，default为[]。为由路径组成的数组，Sass编译器（LibSass)可以据此决定@import的路径。***为什么是bower_components?***

- outputStyle:String类型，default为nested。 Values: nested, expanded, compact, compressed。决定最终的CSS的输出格式 
- precision:Integer类型，default为5。用于决定小数位数。例如，如果你有一个十进制number1.23456780,且precision为5,那么在最终的CSS文件中会是1.23457。

### 12. gulp-postcss
将CSS输送到好几个处理器，但只解析一次CSS。

基本用法：

	var postcss = require('gulp-postcss');
	var gulp = require('gulp');
	var autoprefixer = require('autoprefixer');
	var cssnano = require('cssnano');
	 
	gulp.task('css', function () {
	    var processors = [
	        autoprefixer({browsers: ['last 1 version']}),
	        cssnano(),
	    ];
	    return gulp.src('./src/*.css')
	        .pipe(postcss(processors))
	        .pipe(gulp.dest('./dest'));
	});

### 13. postcss-cssnext
是PostCSS插件，帮助你使用最新的CSS语法。它会将CSS转换成兼容性更好的CSS，这样你就不需要等待浏览器的支持了。
#### features
该对象 包含一些特征的关键字，来设置其的可用/禁用。特征默认都是可用的，没有关键字表示该特征是可用的。

### 14. gulp-html-replace
替换html构建块

#### （1）.htmlreplace(tasks,options)
#####  参数 tasks
type为 Object {task-name: replacement}

- task-name:HTML中的block名称
- replacement: String|Array|stream.Readable|Object The replacement.

eg:

	// Options is a single string 
	htmlreplace({js: 'js/main.js'})
	 
	// Options is an array of strings 
	htmlreplace({js: ['js/monster.js', 'js/hero.js']})

detail eg:

    //index.html:

	<!DOCTYPE html>
	<html>
	    <head>
	 
	    <!-- build:css -->
	    <link rel="stylesheet" href="css/normalize.css">
	    <link rel="stylesheet" href="css/main.css">
	    <!-- endbuild -->
	 
	    </head>
	    <body>
	 
	    <!-- build:js -->
	    <script src="js/player.js"></script> 
	    <script src="js/monster.js"></script> 
	    <script src="js/world.js"></script> 
	    <!-- endbuild -->
	
	//gulpfile.js:
	
	var gulp = require('gulp');
	var htmlreplace = require('gulp-html-replace');
	 
	gulp.task('default', function() {
	  gulp.src('index.html')
	    .pipe(htmlreplace({
	        'css': 'styles.min.css',
	        'js': 'js/bundle.min.js'
	    }))
	    .pipe(gulp.dest('build/'));
	});

	//Result:
	
	<!DOCTYPE html>
	<html>
	    <head>
	 
	    <link rel="stylesheet" href="styles.min.css">
	 
	    </head>
	    <body>
	 
	    <script src="js/bundle.min.js"></script>

Advanced eg:

	// Options is an object 
	htmlreplace({
	  js: {
	    src: 'img/avatar.png',
	    tpl: '<img src="%s" align="left" />'
	  }
	})
	 
	// Multiple tag replacement 
	htmlreplace({
	  js: {
	    src: [['data-main.js', 'require-src.js']],
	    tpl: '<script data-main="%s" src="%s"></script>'
	  }
	})

src - String|Array|stream.Readable Same thing as in simple example.

tpl - String Template string. Uses util.format() internally.

In the first example %s will be replaced with img/avatar.png producing < img src="img/avatar.png" align="left" > as the result.

In the second example data-main="%s" and src="%s" will be replaced with data-main.js and require-src.js accordingly, producing < script data-main="data-main.js" src="require-src.js" >< /script > as the result

### 15.gulp-smoosher
<https://www.npmjs.com/package/gulp-smoosher>
生成一个**目的html**,将源html中的外部链接的css和js改为文本内嵌方式。
#### eg:
###### index.html:

	<html>
	<head>
		<!-- smoosh -->
		<link rel='stylesheet' href='styles.css'>
		<!-- endsmoosh -->
	</head>

###### styles.css:
	body {
		background: red;
	}

###### Gulpfile.js
	var gulp = require('gulp');
	var smoosher = require('gulp-smoosher');
	 
	gulp.task('default', function () {
		gulp.src('index.html')
			.pipe(smoosher())
			.pipe(gulp.dest('dist'));
	});

###### dist/index.html
	<html>
		<head>
			<style>body {
				background: red;
			}</style> 
		</head>
	...

#### options
- Ignore files not found:Boolean.为true时，如果找不到文件时将继续执行。

### 16.gulp-imagemin
压缩png,gpeg,gif和svg图片。

用法示例：

	const gulp = require('gulp');
	const imagemin = require('gulp-imagemin');
	 
	gulp.task('default', () =>
		gulp.src('src/images/*')
			.pipe(imagemin())
			.pipe(gulp.dest('dist/images'))
	);

API
#### imagemin([plugins],[options])
##### 参数plugins
Type: array
Default: [imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]

	gifsicle — Compress GIF images
	jpegtran — Compress JPEG images
	optipng — Compress PNG images
	svgo — Compress SVG images

##### 参数options
- interlaced:属于imgageminGifsicle([option])(buffer)，type:boolean,default:false，规定是否允许gif交错逐步呈现。
- progressive:属于imageminJpegtran([options])(buffer)，type:boolean,default:false，规定是否无损转换图片。
- svgoPlugins:

### 14. gulp-prefix模块
使得html-prefix可以应用于gulp。

将会为link、script和img标签的相关url加上前缀路径。

你也可以传递第二个参数，来覆盖默认选择语句。默认配置是这样的：

	[
	  { match: "script[src]", attr: "src" },
	  { match: "link[href]", attr: "href"},
	  { match: "img[src]", attr: "src"},
	  { match: "input[src]", attr: "src"}
	]

如果你有不想加前缀的标签，你可以为其传递第三个参数——一个正则表达式字符串，将会忽略和其不配的标签。

用法示例：

	//HTML
	<html>
	  <head>
	    <link href="http://cdnjs.com/some-library.css">
	    <link href="css/stylesheets.css">
	  </head>
	  <body>
	    <img src="/images/myImage.jpg"/>
	    <script src="//cdnjs.com/some-library.js"></script> 
	    <script src="js/scripts.js"></script> 
	    <script src="{{ignore_me_i_am_mustache}}"></script> 
	  </body>
	</html>

	//gulp.js
	var gulp = require('gulp'),
	    prefix = require('gulp-prefix');
	 
	gulp.task('prefix', function(){
	  var prefixUrl = "http://mydomain.com/assets";
	 
	  gulp.src('index.html')
	    .pipe(prefix(prefixUrl, null, '{{'))
	    .pipe(gulp.dest('build'));
	});

	//Output html
	<html>
	  <head>
	    <link href="http://cdnjs.com/some-library.css">
	    <link href="http://mydomain.com/assets/css/stylesheets.css">
	  </head>
	  <body>
	    <img src="http://mydomain.com/assets/images/myImage.jpg"/>
	    <script src="//cdnjs.com/some-library.js"></script> 
	    <script src="http://mydomain.com/assets/js/scripts.js"></script> 
	    <script src="{{ignore_me_i_am_mustache}}"></script> 
	  </body>
	</html>

### 15. gulp-rename模块
<https://www.npmjs.com/package/gulp-rename>
可以轻松地重命名文件。

用法示例：

	var rename = require("gulp-rename");
 
	// rename via string 
	gulp.src("./src/main/text/hello.txt")
	  .pipe(rename("main/text/ciao/goodbye.md"))
	  .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/goodbye.md 
	 
	// rename via function 
	gulp.src("./src/**/hello.txt")
	  .pipe(rename(function (path) {
	    path.dirname += "/ciao";
	    path.basename += "-goodbye";
	    path.extname = ".md"
	  }))
	  .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/hello-goodbye.md 
	 
	// rename via hash 
	gulp.src("./src/main/text/hello.txt", { base: process.cwd() })
	  .pipe(rename({
	    dirname: "main/text/ciao",
	    basename: "aloha",
	    prefix: "bonjour-",
	    suffix: "-hola",
	    extname: ".md"
	  }))
	  .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/bonjour-aloha-hola.md 

### 16.gulp-htmlmin模块
<https://www.npmjs.com/package/gulp-htmlmin>

压缩HTML。

用法示例：

	var gulp = require('gulp');
	var htmlmin = require('gulp-htmlmin');
	 
	gulp.task('minify', function() {
	  return gulp.src('src/*.html')
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest('dist'))
	});

#### htmlmin(option)
- option.collapseWhitespace:折叠空格,default：false
- removeComments:去掉注释,default:false
- removeAttributeQuotes:在可能的情况下，删除属性周围的引号。
- minifyJS：使用UglifyJS工具压缩script元素中和事件属性中的JavaScript。default:false
- minifyCSS：使用cleancss工具压缩style元素中的CSS和style属性中的CSS。default:false

### 17.gulp-useref模块
解析HTML文件中的构建块，以替换未经优化的scripts和stylesheets

##### Useage

	var gulp = require('gulp'),
    useref = require('gulp-useref');
 
	gulp.task('default', function () {
	    return gulp.src('app/*.html')
	        .pipe(useref({ searchPath: '.tmp' }))
	        .pipe(gulp.dest('dist'));
	});

如果你想有条件地处理这些资源，可以使用gulp-if来处理指定的资源：

	var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');
 
		gulp.task('html', function () {
		    return gulp.src('app/*.html')
		        .pipe(useref())
		        .pipe(gulpif('*.js', uglify()))
		        .pipe(gulpif('*.css', minifyCss()))
		        .pipe(gulp.dest('dist'));
		});

处理前的html：

	<html>
	<head>
	    <!-- build:css css/combined.css -->
	    <link href="css/one.css" rel="stylesheet">
	    <link href="css/two.css" rel="stylesheet">
	    <!-- endbuild -->
	</head>
	<body>
	    <!-- build:js scripts/combined.js -->
	    <script type="text/javascript" src="scripts/one.js"></script> 
	    <script type="text/javascript" src="scripts/two.js"></script> 
	    <!-- endbuild -->
	</body>
	</html>

处理后的 HTML would be:

	<html>
	<head>
	    <link rel="stylesheet" href="css/combined.css"/>
	</head>
	<body>
	    <script src="scripts/combined.js"></script> 
	</body>
	</html>

##### API 

	useref(options [, transformStream1 [, transformStream2 [, ... ]]])

返回一个带有链接。资源被替换过的HTML文件的流，该流中也包含HTML中连接的资源。

###### 参数Options

- options.searchPath: Type String or Array,Default:none,指明了寻找资源文件的location,该location是相对于当前工作目录的。

### 18. webpack模块
<https://www.npmjs.com/package/webpack>

详细文档见<https://webpack.github.io/docs/>
#### 作用
为浏览器打包CommonJs/AMD模块。

webpack是模块的打包机。其主要用途是打包JavaScript文件，使得其可以在浏览器端使用，不过它也可以用于对任何资源的转化、捆绑、打包。

#### API
##### Optimize
webpack.optimize.UglifyJSPlugin():来自webpack模块，用于压缩你通过webpack打包后的scripts文件

### 19.process对象（非模块）：单例的全局对象
<https://nodejs.org/docs/latest/api/process.html>
参见《Node.js实战》P291

每个node进程都有一个单例的全局process对象，由所有模块共享访问。在这个对象中可以找到关于该进程及其所在上下文的相关信息。如：

#### process.argv:
返回运行node.js的命令行的参数组成的数组。

type:Array

例如我的命令行为:
	
	node process-2.js one two=three four

得到的process.argv数组各元素为：
	
	0: /usr/local/bin/node
	1: /Users/mjr/work/node/process-2.js
	2: one
	3: two=three
	4: four
	
#### process.env对象：
获取或设定环境变量

### 20:fs模块：Node原生模块
<https://nodejs.org/docs/latest/api/fs.html#fs_fs_readfile_file_options_callback>

#### fs.readFile(file[, options], callback)

- file:（string|Buffer）,带读取的文件路径
- options:（object）
	- encoding:（string|null)default为null
	- flag:(string)default为'r'
- callback:(function)


功能：异步读取文件的完整内容。

eg:

	fs.readFile('/etc/passwd', (err, data) => {
	  if (err) throw err;
	  console.log(data);
	});

callback函数有两个参数：err和data，data是文件的完整内容。

如果未指定encoding,则fs.readFile返回的是原始文件内容。

#### fs.readFileSync(file[,options])
同步读取文件的完整内容，fs.readFile的同步版本。

- file:
- options <Object> | <String>
	- encoding <String> | <Null> default = null
	- flag <String> default = 'r'


#### fs.readdir(path[,options],callback)
<https://nodejs.org/docs/latest/api/fs.html#fs_fs_readdir_path_options_callback>
读取目录下的内容。回调函数获取两个参数err和files，其中files为该目录中的文件名称去除'.'和'..'后组成的数组。

可选的options参数可以为一个指定编码方式的字符串。default为utf8。

#### fs.writeFile(file,data[,options],callback)
- file:要写入的目标文件路径名称
- data:类型为String或Buffer,要写入的数据
- options:类型为Object或String
	- encodeing:类型为String或Null，默认为'utf8'
	- mode:类型为Integer,默认为'0o666'
	- flag:类型为String,默认为'w'
- callback:类型为Function

异步将数据写入文件，如果文件已经存在则代替它。数据可以是一个字符串或者是buffer。

当data是一个buffer是，option中的encoding就被忽略了。


### 21. del模块
<https://www.npmjs.com/package/del>
其源码在<https://github.com/sindresorhus/del/>

删除文件或文件夹


用法：

	const del = require('del');
 
	del(['tmp/*.js', '!tmp/unicorn.js']).then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
	});

说明:

then是ES6的Promise的用法，故其前面的del（）必然是返回了一个Promise对象。更多关于Promise对象参见<http://es6.ruanyifeng.com/#docs/promise>

#### del(patterns,[options])
##### 参数patterns
type：Array，string

要删除的文件组成的数组。

### 21.gulp-svgmin
<https://www.npmjs.com/package/gulp-svgmin/>

使用gulp压缩svg文件。

基本用法：

	var gulp=require('gulp');
	var  svgmin=require('gulp-svgmin');

	gulp.task('default',function(){
		return gulp.src('logo.svg')
					.pipe(svgmin())
					.pip(gulp.dest('./out'));
	}


	var postcss = require('gulp-postcss');
	var cssnext = require('postcss-cssnext');
	var opacity = function (css, opts) {
	    css.eachDecl(function(decl) {
	        if (decl.prop === 'opacity') {
	            decl.parent.insertAfter(decl, {
	                prop: '-ms-filter',
	                value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
	            });
	        }
	    });
	};
	 
	gulp.task('css', function () {
	    var processors = [
	        cssnext({browsers: ['last 1 version']}),
	        opacity,
	    ];
	    return gulp.src('./src/*.css')
	        .pipe(postcss(processors))
	        .pipe(gulp.dest('./dest'));
	});

### 22.gulp-cheerio
<https://www.npmjs.com/package/gulp-cheerio>

使用Cheerio来操纵HTML和XML文件

同步和异步两种用法：

	var gulp = require('gulp'),
	    cheerio = require('gulp-cheerio');
	 
	//同步方式用法
	gulp.task('sync', function () {
	  return gulp
	    .src(['src/*.html'])
	    .pipe(cheerio(function ($, file) {
	      $('h1').each(function () {
	        var h1 = $(this);
	        h1.text(h1.text().toUpperCase());
	      });
	    }))
	    .pipe(gulp.dest('dist/'));
	});

	//异步方式用法

	gulp.task('async', function () {
	  return gulp
	    .src(['src/*.html'])
	    .pipe(cheerio(function ($, file, done) {
	      // The only difference here is the inclusion of a `done` parameter. 
	      // Call `done` when everything is finished. `done` accepts an error if applicable. 
	      done();
	    }))
	    .pipe(gulp.dest('dist/'));
	});

还可以传递另外一个options参数，其类型为object;同时你的function为主参数run:

	gulp.task('async', function () {
	  return gulp
	    .src(['src/*.html'])
	    .pipe(cheerio({
	      run: function ($, file) {
	        done();
	      },
		  parserOptions: {
		    // Options here
			xmlMode: true;//xmlMode设为true，将使用$.xml()方法进行渲染。
		  }
	    }))
	    .pipe(gulp.dest('dist/'));
	});

	
#### 那cheerio又是什么？cherrio模块
<https://www.npmjs.com/package/cheerio>

<http://cnodejs.org/topic/5203a71844e76d216a727d2e>(一篇中午翻译）

为服务器特别定制的，小型、快速、优雅的jQuery核心实现。

简介：

将HTML告诉你的服务器

	var cheerio = require('cheerio'),
    	$ = cheerio.load('<h2 class="title">Hello world</h2>');
	
	$('h2.title').text('Hello there!');
	$('h2').addClass('welcome');


### 23.gulp-sassvg插件

获取svg文件，然后将它们转换为sass混合器，其后来一般会被用于创建修饰过的background-images。

用法：

	var sassvg = require('gulp-sassvg');
 
	gulp.task('sassvg', function(){
	    return gulp.src('./path/to/images/folder/**/*.svg') 
	        .pipe(sassvg({
	          	outputFolder: './sassvg/', //该文件夹需要已经存在
	            optimizeSvg: true // true是默认值，true意味着要对产生的文件压缩其大小的25%，但需要花上3倍的时间来生成.scss文件
	        }));
	});

结果在sassvg下会生成_sassvg-data.scss和_sassvg.scss两个文件。它们包含了可为实践运用的各种函数和混合器。

在自己的项目的sass文件中可以这样引用：

	@import "_sassvg.scss;
 
	.selector {
	  background-image: sassvg('filename');
	}

将会生成：
	
	.selector {
	  background: url('data:image/svg+xml;utf8,<svg ...> ... </svg>');
	}

还可以这样写：

	@import "_sassvg.scss;
	 
	.selector {
	  @sassvg('filename');
	}

将会生成：
	
	.selector {
	  background: url('data:image/svg+xml;utf8,<svg ...> ... </svg>');
	  background-position: 50%;
	  background-size: 2rem;
	  
	}

### 24.lazypipe模块
<https://www.npmjs.com/package/lazypipe>

用于从一系列流中，创建一个不变的，初始化不费劲的pipeline。其专为复用部分pipeline设计。

该模块可以返回一个函数，这个函数可用于新建一个lazypipe。单个的步骤是通过.pipe()方法添加进去的。在任何时候，一个新的lazypipe可以通过在已有lazypipe上添加步骤而生成。Lazypipes甚至可以用于其他lazypipe的构建过程中。


用法：

	var lazypipe = require('lazypipe');
 
	// initialize a lazypipe 
	var jsHintTasks = lazypipe()
	    // adding a pipeline step, notice the stream function has not been called! 
	    .pipe(jshint)
	    // adding a step with an argument 
	    .pipe(jshint.reporter, 'jshint-stylish');
	 
	// this is OK, because lazypipes are immutable 
	// jsHintTasks will _not_ be affected by the addition. 
	var jsTasks = jsHintTasks
	    .pipe(gulp.dest, 'build/js');
	 
	// Create another pipe 
	var cssTasks = lazypipe()
	    .pipe(recess, recessConfig)
	    .pipe(less)
	    .pipe(autoprefixer);
	 
	 
	// now using the lazypipes 
	gulp.task('jsHint', function() {
	    gulp.src('js/**/*.js').pipe(jsHintTasks());
	});
	 
	gulp.task('build', function() {
	    // for example only! 
	    return gulp.src('js/**/*.js').pipe(jsTasks());
	});
	 
	gulp.task('default', ['build'], function() {
	    // using gulp-watch 
	    watch('js/**/*.js').pipe(jsTasks());
	});

卫国哥的应用：

	const svgStore = lazypipe()
	  .pipe($.svgmin)
	  .pipe($.cheerio, {
	      run: function($, file) {
	        $('rect').remove();
	        $('path').removeAttr('fill')
	      },
	      parserOptions: {
	        xmlMode: true
	      }
	    })
	    .pipe($.svgstore);

### 25. gulp-svgstore模块
<https://www.npmjs.com/package/gulp-svgstore>

通过< symbol > 元素将svg文件整合到一个文件中。

### 26. gulp-svg2png模块
<https://www.npmjs.com/package/gulp-svg2png>

将svg文件转换为png文件

安装：

	npm install --save-dev gulp-svg2png

使用：

	var svg2png = require('gulp-svg2png');
	 
	gulp.task('svg2png', function () {
	    gulp.src('./specs/assets/**/*.svg')
	        .pipe(svg2png())
	        .pipe(gulp.dest('./build'));
	});

参数：

	options:尺寸重置，
### 27.merge-stream模块
<https://www.npmjs.com/package/merge-stream>

创建一个流，其是从其他的多个流合并起来发射事件。

### 28.favicons/gulp-favicons模块

是一个Node.js模块，用于产生网站图标和它们的相关文件。

需要Node 4+，安装方法为：

	npm install favicons

#### 用法：

使用favicons，需要合适的模块并调用它，可选择性地指定配置参数和回调。

Gulp/Grunt等外围modules有一些额外特性。你也可以直接使用终端的点语法来配置和使用Favicons。

Favicons生成它的icons的时候仅依靠纯净的JavaScript,没有其他的外部依赖。

注意：Favicons是用ES6写的，这意味着你需要Node4+

	///配置
	var favicons = require('favicons'),
	    source = 'test/logo.png',           // Source image(s). `string`, `buffer` or array of `{ size: filepath }`
	    configuration = {
	        appName: null,                  // Your application's name. `string`
	        appDescription: null,           // Your application's description. `string`
	        developerName: null,            // Your (or your developer's) name. `string`
	        developerURL: null,             // Your (or your developer's) URL. `string`
	        background: "#fff",             // Background colour for flattened icons. `string`
	        path: "/",                      // Path for overriding default icons path. `string`
	        display: "standalone",          // Android display: "browser" or "standalone". `string`
	        orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
	        start_url: "/?homescreen=1",    // Android start application's URL. `string`
	        version: "1.0",                 // Your application's version number. `number`
	        logging: false,                 // Print logs to console? `boolean`
	        online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
	        icons: {
	            android: true,              // Create Android homescreen icon. `boolean`
	            appleIcon: true,            // Create Apple touch icons. `boolean`
	            appleStartup: true,         // Create Apple startup images. `boolean`
	            coast: true,                // Create Opera Coast icon. `boolean`
	            favicons: true,             // Create regular favicons. `boolean`
	            firefox: true,              // Create Firefox OS icons. `boolean`
	            windows: true,              // Create Windows 8 tile icons. `boolean`
	            yandex: true                // Create Yandex browser icon. `boolean`
	        }
	    },
	    callback = function (error, response) {
	        if (error) {
	            console.log(error.status);  // HTTP error code (e.g. `200`) or `null`
	            console.log(error.name);    // Error name e.g. "API Error"
	            console.log(error.message); // Error description e.g. "An unknown error has occurred"
	        }
	        console.log(response.images);   // Array of { name: string, contents: <buffer> }
	        console.log(response.files);    // Array of { name: string, contents: <string> }
	        console.log(response.html);     // Array of strings (html elements)
	    };
	
	///调用
	favicons(source, configuration, callback);

#### 关于gulp-favicons
用法：

	var favicons = require("gulp-favicons"),
    gutil = require("gulp-util");

	gulp.task("default", function () {
	    return gulp.src("logo.png").pipe(favicons({
	        appName: "My App",
	        appDescription: "This is my application",
	        developerName: "Hayden Bleasel",
	        developerURL: "http://haydenbleasel.com/",
	        background: "#020307",
	        path: "favicons/",
	        url: "http://haydenbleasel.com/",
	        display: "standalone",
	        orientation: "portrait",
	        start_url: "/?homescreen=1",
	        version: 1.0,
	        logging: false,
	        online: false,
	        html: "index.html",
	        pipeHTML: true,
	        replace: true
	    }))
	    .on("error", gutil.log)
	    .pipe(gulp.dest("./"));
	});
	
如果你需要通过使用ES5，那么就要require ES5文件：
	
	var favicons = require('gulp-favicons/es5');

### 29.url模块
node原生模块，参见<https://nodejs.org/docs/latest/api/url.html>

<img src="img/node_url.png">

#### URL Objects
- urlObject.href
- urlObject.protocol
- urlObject.slashes
- urlObject.host
- urlObject.auth
- urlObject.hostname
- urlObject.port
- urlObject.pathname
- urlObject.search
- urlObject.path
- urlObject.query
- urlObject.hash

#### url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
解析URL字符串，返回一个URL对象。

参数：

- urlString:类型为string,需要解析的URL字符串。
- parseQueryString:类型为boolean。为true,则将query解析为object;为false,则为未解析、未解码的字符串。默认为false。
- slashesDenoteHost:类型为boolean。以'//foo/bar'为例，如果为true，则结果为{host: 'foo', pathname: '/bar'}；如果为false,则结果为{pathname: '//foo/bar'}，默认为false。

### 30.http模块
node原生模块，参见<https://nodejs.org/docs/latest/api/http.html>

#### http.request(options[,callback])
使得nodejs向服务器透明地发出请求。

参数：

- options:发送请求的目标url地址。类型可为object或string。如果为string,则其自动通过url.parse()转换:
	- host:请求的目标服务器的域名或IP地址
	- path:请求的路径，默认为'/'，
	- method：请求方法，默认为GET
	- header:包含了请求头的对象


eg:

	var postData = querystring.stringify({
	  'msg' : 'Hello World!'
	});
	
	var options = {
	  hostname: 'www.google.com',
	  port: 80,
	  path: '/upload',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': Buffer.byteLength(postData)
	  }
	};
	
	var req = http.request(options, (res) => {
	  console.log(`STATUS: ${res.statusCode}`);
	  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	    console.log(`BODY: ${chunk}`);
	  });
	  res.on('end', () => {
	    console.log('No more data in response.');
	  });
	});
	
	req.on('error', (e) => {
	  console.log(`problem with request: ${e.message}`);
	});
	
	// write data to request body
	req.write(postData);
	req.end();
### 31. request模块
<https://www.npmjs.com/package/request>
简化版的HTTP请求的客户端


#### 超简单的用法

	var request = require('request');
	request('http://www.google.com', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Show the HTML for the Google homepage. 
	  }
	})
#### streaming写法
eg:

	request
	  .get('http://google.com/img.png')
	  .on('response', function(response) {
	    console.log(response.statusCode) // 200 
	    console.log(response.headers['content-type']) // 'image/png' 
	  })
	  .pipe(request.put('http://mysite.com/img.png'))//http的PUT方法： 从客户端向服务器传送的数据取代指定的文档的内容。

#### 关于Forms
请求支持上传application/x-www-form-urlencoded 和multipart/form-data格式的文件。
##### application/x-www-form-urlencoded格式
	request.post('http://service.com/upload', {form:{key:'value'}})
	// or 
	request.post('http://service.com/upload').form({key:'value'})
	// or 
	request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
##### multipart/form-data格式
暂略


#### request(options,callback)
参数options:

- uri/url:完全标准的uri或通过url.parse()解析过的url
- baseUrl:完全标准的uri,用作基准url。在request.defaults中最为有用，例如当你想要向同一个域名发出多次请求。如果baseUrl是https://example.com/api/，再请求/end/point?test=true，则最后会形成https://example.com/api/end/point?test=true
- method: http方法，默认为"GET"
- headers: http headers,默认为{}
- form:当传递一个对象或查询字符串的时候，这个选项设置body为，并添加Content-type:application/x-www-form-url的header。当不传递值时，会返回FormData实例。详见Forms

#### 方便的方法
除了request()方法外，还有以下方法：

##### request.defaults(options)

##### request.put(url)

##### request.patch(url)

##### request.post(url)

和request()方法的用法一样，但默认是POST方式。

### 31.gulp-jshint模块
<https://www.npmjs.com/package/gulp-jshint>
<https://www.npmjs.com/package/jshint>

是针对gulp的jshint模块。

jshint是针对JavaScript的静态分析工具。

JSHint是一个社区驱动的工具，其用来检测JavaScript代码中的错误和潜在问题，来执行你的团队的编码惯例。它非常的灵活所以你可以轻易使其调整为适合你自己的编码。

用法：

	var jshint = require('gulp-jshint');
	var gulp   = require('gulp');
	 
	gulp.task('lint', function() {
	  return gulp.src('./lib/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
	});

#### jshint.reporter('fail')

你想要在JSHint报错时终止任务吗？gulp-jshint也具有这个功能。

以下这个例子将打印出stylish的报告，然后如果JSHint没有成功就终止任务。
 
	stuff
	  .pipe(jshint())
	  .pipe(jshint.reporter('jshint-stylish'))//这里要安装'jshint-stylish'这个模块
	  .pipe(jshint.reporter('fail'))；

### 32.gulp-util模块
提供了一些针对gulp插件的有用的函数。

#### log(msg...)

### 33.gulp-cssnano模块
使用cssnano来压缩css

用法：

	var gulp = require('gulp');
	var cssnano = require('gulp-cssnano');
	 
	gulp.task('default', function() {
	    return gulp.src('./main.css')
	        .pipe(cssnano())
	        .pipe(gulp.dest('./out'));
	});

### 34.gulp-cache模块
<https://www.npmjs.com/package/gulp-cache>
针对gulp的缓存代理插件

### 35.main-bower-files模块
从你安装的bower包中获取主文件。

gulp的用法：

	var gulp = require('gulp');
	var mainBowerFiles = require('main-bower-files');
	 
	gulp.task('TASKNAME', function() {
	    return gulp.src(mainBowerFiles())
	        .pipe(/* what you want to do with the files */)
	});

### 36.gulp-filter模块
该模块可以使用通配符过滤原始文件。过滤后如果想要所有的原始文件，只需使用恢复流。

用法-仅过滤：

	const gulp = require('gulp');
	const uglify = require('gulp-uglify');
	const filter = require('gulp-filter');
	 
	gulp.task('default', () => {
	    const f = filter(['*', '!src/vendor']);
	 
	    return gulp.src('src/*.js')
	        .pipe(f)
	        .pipe(uglify())
	        .pipe(gulp.dest('dist'));
	});

### 37.gulp-flatten模块
移除或替换文件的相关路径

用法：

原bower components的文件结构如下：

		├── angular
		│   ├── README.md
		│   ├── angular-csp.css
		│   ├── angular.js
		│   ├── angular.min.js
		│   └── bower.json
		├── angular-route
		│   ├── README.md
		│   ├── angular-route.js
		│   ├── angular-route.min.js
		│   ├── angular-route.min.js.map
		│   └── bower.json
		├── angular-sanitize
		│   ├── README.md
		│   ├── angular-sanitize.js
		│   ├── angular-sanitize.min.js
		│   ├── angular-sanitize.min.js.map
		│   └── bower.json
		└── bootstrap
		    ├── DOCS-LICENSE
		    ├── LICENSE
		    ├── LICENSE-MIT
		    ├── README.md
		    ├── bower.json
		    └── dist
		        ├── css
		        │   ├── bootstrap-theme.css
		        │   ├── bootstrap-theme.min.css
		        │   ├── bootstrap.css
		        │   └── bootstrap.min.css
		        ├── fonts
		        │   ├── glyphicons-halflings-regular.eot
		        │   ├── glyphicons-halflings-regular.svg
		        │   ├── glyphicons-halflings-regular.ttf
		        │   └── glyphicons-halflings-regular.woff
		        └── js
		            ├── bootstrap.js
		            └── bootstrap.min.js


使用gulp-flatten:

	var flatten = require('gulp-flatten');
 
	gulp.src('bower_components/**/*.min.js')
	  .pipe(flatten())
	  .pipe(gulp.dest('build/js'));

最后得到的文件结构如下：

	build
	└── js
	    ├── angular-route.min.js
	    ├── angular-sanitize.min.js
	    ├── angular.min.js
	    └── bootstrap.min.js

### 38.serve-static模块
为静态文件提供服务

用法：

	var serveStatic = require('serve-static');
	serveStatic(root, options);

创建一个新的中间件函数来为指定根目录下的文件服务。req.url和提供的根目录一同决定了要服务的文件。当一个文件没有找到的时候，这个模块会调用next()方法来进入下一个中间件，而不是发送一个404响应。

参数options:

- acceptRanges:开启或禁用 Accept-Ranges请求
- cacheCont
- rol:开启或禁用设置Cache-Control的响应头
- ......

***没太懂这个模块的作用***

### 39.serve-index模块
为目录列表提供服务。具体来说，就是为那些包含了给定路径的目录列表的页面服务。

用法：

	serveIndex(path, options)；

参数path:

和req.url一起组成指定的路径，即如果req.url为’/some/dir'，path为'public',则组成的路径为'public/some/dir'。

参数Options:

- filter:
- hidden:
- icons:

***没太懂这个模块的作用***
### 40.connect模块
高性能中间件框架。

看书《Nodejs实战》第6章

### 41.connect-livereload模块
是一个connect中间件，用于为响应添加动态加载的script。

使用connect中间件为响应添加动态加载的script，不需要使用浏览器插件。如果你高兴使用浏览器插件，则你不需要这个中间件。

用法：
      var connect=require('connect');
	  var app=connect
	  app.use(require('connect-livereload')({
	    port: 35729//script从什么端口下载
	  }));

参数options:

- port:规定script从哪个端口下载

### 42. gulp-wiredep模块
意义先参见wiredep模块

标准用法：
	
	var gulp = require('gulp')
	  , wiredep = require('gulp-wiredep')
	 
	gulp.task('bower', function () {
	  gulp.src('./src/footer.html')
	    .pipe(wiredep({
	      optional: 'configuration',
	      goes: 'here'
	    }))
	    .pipe(gulp.dest('./dest'));
	});

和loader插件一起用：

	var gulp = require('gulp'),
	    plug = require('gulp-plugin-loader')
	 
	gulp.task('bower', function () {
	  gulp.src('./src/footer.html')
	    .pipe(plug.wiredep({
	      optional: 'configuration',
	      goes: 'here'
	    }))
	    .pipe(gulp.dest('./dest'));
	});

### 43. wiredep模块
将bower依赖文件引入html。

用法：

	var wiredep = require('wiredep').stream;
	 
	gulp.task('bower', function () {
	  gulp.src('./src/footer.html')
	    .pipe(wiredep({
	      optional: 'configuration',
	      goes: 'here'
	    }))
	    .pipe(gulp.dest('./dest'));
	});

在html源文件需要引入bower里的dependencies字段文件的地方加上占位符：

	<html>
	<head>
	  <!-- bower:css -->
	  <!-- endbower -->
	</head>
	<body>
	  <!-- bower:js -->
	  <!-- endbower -->
	</body>
	</html>

结果：

	<html>
	<head>
	  <!-- bower:css -->
	  <!-- endbower -->
	</head>
	<body>
	  <!-- bower:js -->
	  <script src="bower_components/jquery/dist/jquery.js"></script>
	  <!-- endbower -->
	</body>
	</html>

wiredep是怎样工作的？

使用--save安装bower包,这个包将加在你项目的bower.json文件的dependency字段中。wiredep插件读取那个html源文件，并读取bower.json文件的每个dependencies字段的文件。基于这些联系，wiredep会决定你需要的脚本文件的顺序，然后将它们插入源代码的占位符之间。
	

### 44.gulp-livereload模块
<https://www.npmjs.com/package/gulp-livereload>

实现livereload模块功能的gulp插件。livereload模块功能参见45.

用法：

	var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');
 
	gulp.task('less', function() {
	  gulp.src('less/*.less')
	    .pipe(less())
	    .pipe(gulp.dest('css'))
	    .pipe(livereload());
	});
	 
	gulp.task('watch', function() {
	  livereload.listen();
	  gulp.watch('less/*.less', ['less']);
	});
	
API:

##### livereload.listen([options])
开启一个livereload服务器。如果服务器已经在运行，则该函数会立刻结束。

##### livereload.changed(path)
调用这个函数来将文件的变化发送至livereload服务器。

注意：如果不给这个函数传入path参数，则它将不会做任何事。

### 45.livereload模块
<https://www.npmjs.com/package/livereload>

Node.js中LiveReload服务器的实现。LiveReload监控文件的改变并重新加载你的web浏览器页面。

### 46.opn模块
打开某个网站、文件。

用法：

	
	const opn = require('opn');
	 
	// opens the image in the default image viewer 
	opn('unicorn.png').then(() => {
	    // image viewer closed 
	});
	 
	// opens the url in the default browser 
	opn('http://sindresorhus.com');
	 
	// specify the app to open in 
	opn('http://sindresorhus.com', {app: 'firefox'});
	 
	// specify app arguments 
	opn('http://sindresorhus.com', {app: ['google chrome', '--incognito']})

### 47. gulp-replace
<https://www.npmjs.com/package/gulp-replace>
字符串替换插件。

用法：正则替换.

	var replace = require('gulp-replace');
 
	gulp.task('templates', function(){
	  gulp.src(['file.txt'])
	    .pipe(replace(/foo(.{3})/g, '$1foo'))
	    .pipe(gulp.dest('build/file.txt'));
	});

#### API
##### replace(regex,replacement[,options])
参数：
- regex：Type为RegExp,要找的正则匹配模式
- replacement:Type为String or Function,用于替换的字符串或函数。

### 48.eslint
<https://www.npmjs.com/package/eslint>

一个基于AST的针对JavaScript的模式检查器。

### 49.gulp-eslint
<https://www.npmjs.com/package/gulp-eslint>

gulp的eslint

#### API
##### eslint.failAfterError()
如果ESLint为任何一个文件报错了，就等到它们处理完了再终止任务流。
##### eslint.format(formatter, output)
一次性格式化所有流中的文件。这应该是通过eslint流在管道中使用;否则,将找不到eslint结果格式。

### 50.wiredep
<https://www.npmjs.com/package/wiredep>

为你的源代码捆绑bower依赖包

### 51.main-bower-files 
从你安装的bower包中获取主文件]


### 52.promisify-node
<https://www.npmjs.com/package/promisify-node>

#### 作用
包裹Node回调函数以返回Promises。



#### 用法eg

	var promisify = require("promisify-node");
	var fs = promisify("fs");
	 
	// This function has been identified as an asynchronous function so it has 
	// been automatically wrapped. 
	fs.readFile("/etc/passwd").then(function(contents) {
	  console.log(contents);
	});

### 53.is-there
<https://www.npmjs.com/package/is-there>

#### 作用
Check if a file or directory exists in a given path.

为啥要用它呢？fs.exist already does the job!

- Because fs.exists and fs.existsSync will be are deprecated and in some cases we still need them!


### 54.co
<https://github.com/tj/co>

The ultimate generator based flow-control goodness for nodejs (supports thunks, promises, etc)

### 55.mkdirp
<https://www.npmjs.com/package/mkdirp>

#### 作用
递归地设置路径。

#### eg:

pow.js
gulp-load-plugins
	var mkdirp = require('mkdirp');
	    
	mkdirp('/tmp/foo/bar/baz', function (err) {
	    if (err) console.error(err)
	    else console.log('pow!')
	});

Output

	pow!

And now /tmp/foo/bar/baz exists, huzzah!
#### API
##### mkdirp(dir, opts, cb)
Create a new directory and any necessary subdirectories at dir with octal permission string opts.mode.

- opts: If opts is a non-object, it will be treated as the opts.mode.If opts.mode isn't specified, it defaults to 0777 & (~process.umask()).

- cb(err, made)： fires with the error or the first directory made that had to be created, if any.

You can optionally pass in an alternate fs implementation by passing in opts.fs. Your implementation should have opts.fs.mkdir(path, mode, cb) and opts.fs.stat(path, cb).


### 56.gulp-load-plugins
<https://www.npmjs.com/package/gulp-load-plugins>

Automatically load any gulp plugins in your package.json. Loads gulp plugins from package dependencies and attaches them to an object of your choice.


### 57.rollup
<https://www.npmjs.com/package/rollup>

新一代ES6的模块打包机

rollup的JavaScript API<https://github.com/rollup/rollup/wiki/JavaScript-API>

#### 用法eg:
	
	var rollup = require( 'rollup' );
	var cache;

	rollup.rollup({
	  entry: 'main.js',
	  cache: cache
	}).then( function ( bundle ) {
	 	// Generate bundle + sourcemap
	  var result = bundle.generate({
	    // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
	    format: 'cjs'
	  });
	
	  // Cache our bundle for later use (optional)
	  cache = bundle;
	
	  fs.writeFileSync( 'bundle.js', result.code );
	
	  // Alternatively, let Rollup do it for you
	  // (this returns a promise). This is much
	  // easier if you're generating a sourcemap
	  bundle.write({
	    format: 'cjs',
	    dest: 'bundle.js'
	  });
	});

#### rollup.rollup(options)
- entry:string 必须。这个项目包的入口。（e.g.你的main.js或app.js或index.js)
- cache:Object 。一个之前的包，使用它来加速打包后面的包。
- plugins:Array。一个插件对象的数组

#### bundle.generate( options )
返回一个{code,map}的object。map是一个sourcemap。

#### bundle.write( options )
和bundle.generate相似，除了它是写一个文件。返回一个Promise。

- format:string。产生的项目包的格式。可以为amd/cjs/es/life/umd
- sourceMap:boolean。是否产生一个sourcemap。
- dest:要写入的文件。


### 58.co
<https://www.npmjs.com/package/co>

生成器的异步控制流工具。使用了promise。

### 59.buble
<https://www.npmjs.com/package/buble>

#### 简介
速度极快的、电池类的ES2015编译器。

#### eg:
	var buble = require( 'buble' );
	var result = buble.transform( source );

### 60.rollup-plugin-buble
<https://www.npmjs.com/package/rollup-plugin-buble>

#### 简介
使用buble编译ES2015

#### 用法eg:

	import { rollup } from 'rollup';
	import buble from 'rollup-plugin-buble';
	 
	rollup({
	  entry: 'main.js',
	  plugins: [ buble() ]
	}).then(...)

### 61.rollup-plugin-bower-resolve
<https://www.npmjs.com/package/rollup-plugin-bower-resolve>

#### 简介
在你的bower component目录下，通过bower使用的针对第三方模块的解析算法来定位模块。

#### 用法eg

	import { rollup } from 'rollup';
	import bowerResolve from 'rollup-plugin-bower-resolve';
	 
	rollup({
	  entry: 'main.js',
	  plugins: [
	    bowerResolve({
	      // if there's something your bundle requires that you DON'T 
	      // want to include, add it to 'skip' 
	      skip: [ 'some-big-dependency' ],  // Default: [] 
	 
	      // Override path to main file (relative to the module directory). 
	      override: {
	        lodash: 'dist/lodash.js'
	      }
	    })
	  ]
	}).then( bundle => bundle.write({ dest: 'bundle.js', format: 'iife' }) );

### 62.rollup-plugin-uglify
<https://www.npmjs.com/package/rollup-plugin-uglify>

#### 简介
卷曲相关插件以压缩最后生成的包

#### 用法eg

	import { rollup } from 'rollup';
	import uglify from 'rollup-plugin-uglify';
 
	rollup({
	    entry: 'main.js',
	    plugins: [
	        uglify()
	    ]
	});

### 63. gulp-if
<https://www.npmjs.com/package/gulp-if>
#### 简介
有条件地执行任务

#### 用法eg
	var gulpif = require('gulp-if');
	var uglify = require('gulp-uglify');
	 
	var condition = true; // TODO: add business logic 
	 
	gulp.task('task', function() {
	  gulp.src('./src/*.js')
	    .pipe(gulpif(condition, uglify()))
	    .pipe(gulp.dest('./dist/'));
	});

### 64.bower-webpack-plugin
#### 简介
在webpack包的帮助下使用bower

#### 使用方法

	plugins: [
	  new BowerWebpackPlugin({
	    modulesDirectories: ["bower_components"],
	    manifestFiles:      "bower.json",
	    includes:           /.*/
	    excludes:           [],
	    searchResolveModulesDirectories: true
	  })
	]

Options:

- includes {RegExp[] or RegExp}:本插件将匹配manifest file参数指明的文件，并且只会包含匹配此处正则表达式的文件。

### 65. gulp-nunjucks
<https://www.npmjs.com/package/gulp-nunjucks>
#### 简介
Compile/precompile Nunjucks templates

#### 使用方法
	const gulp = require('gulp');
	const nunjucks = require('gulp-nunjucks');
	 
	gulp.task('default', () =>
	    gulp.src('templates/greeting.html')
	        .pipe(nunjucks.compile({name: 'Sindre'}))
	        .pipe(gulp.dest('dist'))##  ##
	);
	

Can alternatively use gulp-data to inject the data:

	const gulp = require('gulp');
	const nunjucks = require('gulp-nunjucks');
	const data = require('gulp-data');
	 
	gulp.task('default', () =>
	    gulp.src('templates/greeting.html')
	        .pipe(data(() => ({name: 'Sindre'})))
	        .pipe(nunjucks.compile())
	        .pipe(gulp.dest('dist'))
	);

#### API
##### 1. nunjucks.compile([data],[options])

Compile a template using the provided data.
######  params
- data:  
	- Type: object;
	- The data object used to populate the text.
- options: 
	- Type: object;
	- Options will be passed directly to the Nunjucks Environment constructor which will be used to compile templates.
- options.env: 
	- Type: nunjucks.Environment;
	- Default: new nunjucks.Environment()
	- The custom Nunjucks Environment object which will be used to compile templates. If supplied, the rest of options will be ignored.

##### 2. nunjucks.recompile([options])
类似

### 66.gulp-data
<https://www.npmjs.com/package/gulp-data>

Generate a data object from a variety of sources: json, front-matter, databases, promises, anything... and set it to the file object for other plugins to consume.


### 67.node-fetch
<https://www.npmjs.com/package/node-fetch>
 
A light-weight module that brings window.fetch to node.js and io.js

#### Usage
1:

	var fetch = require('node-fetch');
 
	// if you are on node v0.10, set a Promise library first, eg. 
	// fetch.Promise = require('bluebird'); 
	 
	// plain text or html 
	 
	fetch('https://github.com/')
	    .then(function(res) {
	        return res.text();
	    }).then(function(body) {
	        console.log(body);
	    });	
	

2:

	var co = require('co');
	co(function *() {
	    var res = yield fetch('https://api.github.com/users/github');
	    var json = yield res.json();
	    console.log(res);
	});


#### API
- fetch(url, options)

Returns a Promise

### 68. mkdirp
<https://www.npmjs.com/package/mkdirp>

递归地mkdir。

#### Usage

	var mkdirp = require('mkdirp');
	    
	mkdirp('/tmp/foo/bar/baz', function (err) {
	    if (err) console.error(err)
	    else console.log('pow!')
	});

And now /tmp/foo/bar/baz exists

#### API
##### mkdirp(dir, opts, cb)
Create a new directory and any necessary subdirectories at dir with octal permission string opts.mode. If opts is a non-object, it will be treated as the opts.mode.

- cb(err, made) fires with the error or the first directory made that had to be created, if any.

### 69.mz
<https://www.npmjs.com/package/mz>

Modernize node.js to current ECMAScript standards

node.js will not update their API to ES6+ for a while. This library is a wrapper for various aspects of node.js' API.

### 70. markdown-it
<https://www.npmjs.com/package/markdown-it>

现代可插拔的markdown解析器。

	// node.js, "classic" way: 
	var MarkdownIt = require('markdown-it'),
	    md = new MarkdownIt();
	var result = md.render('# markdown-it rulezz!');
	 
	// node.js, the same, but with sugar: 
	var md = require('markdown-it')();
	var result = md.render('# markdown-it rulezz!');
	 
	// browser without AMD, added to "window" on script load 
	// Note, there is no dash in "markdownit". 
	var md = window.markdownit();
	var result = md.render('# markdown-it rulezz!');
	
	//Single line rendering, without paragraph wrap
	var md = require('markdown-it')();
	var result = md.renderInline('__markdown-it__ rulezz!');

Init with presets and options:
	//
	var md = require('markdown-it')({
	  html:         false,        // Enable HTML tags in source 
	  xhtmlOut:     false,        // Use '/' to close single tags (<br />). 
	                              // This is only for full CommonMark compatibility. 
	  breaks:       false,        // Convert '\n' in paragraphs into <br> 
	  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be 
	                              // useful for external highlighters. 
	  linkify:      false,        // Autoconvert URL-like text to links 
	 
	  highlight: function (/*str, lang*/) { return ''; }
	});

### 71.nunjucks-markdown
<https://www.npmjs.com/package/markdown-tag>

针对nunjucks的markdown扩展。

#### Usage
	var nunjucks = require('nunjucks'),
	    markdown = require('nunjucks-markdown'),

	function md(str, inline) {
	  return !str ? '' :
	    (inline ? markdownIt.renderInline(str) : markdownIt.render(str));
	    //如果str不存在，则返回''；如果str存在，则返回后面的情况。
	    //对于后面的，如果inline存在，使用grenderInline方法渲染str；如果inline不存在，则使用render方法渲染。
	}
	 
	var env = nunjucks.configure('views');
	 
	// The second argument can be any function that renders markdown
	markdown.register(env, md);


### 72.模块co
<https://www.npmjs.com/package/co>

基于生成器的针对nodejs和browser的控制流，使用promises,使得你可以写非阻塞的代码。

#### 用法Eg:

	co(function* () {
	  var result = yield Promise.resolve(true);
	  return result;
	}).then(function (value) {
	  console.log(value);
	}, function (err) {
	  console.error(err.stack);
	});


### 73. deepmerge
<https://www.npmjs.com/package/deepmerge>

深度合并JavaScript Objects：将二者的属性合并起来。

#### example：

	var x = { foo: { bar: 3 },
	  array: [ { does: 'work', too: [ 1, 2, 3 ] } ] }
	var y = { foo: { baz: 4 },
	  quux: 5,
	  array: [ { does: 'work', too: [ 4, 5, 6 ] }, { really: 'yes' } ] }
	 
	var expected = { foo: { bar: 3, baz: 4 },
	  array: [ { does: 'work', too: [ 1, 2, 3, 4, 5, 6 ] }, { really: 'yes' } ],
	  quux: 5 }
	 
	merge(x, y) // => expected 

### 74.filesize
<https://www.npmjs.com/package/filesize>

JavaScript library to generate a human readable String describing the file size

#### Eg:

	filesize(500);                        // "500 B" 
	filesize(500, {bits: true});          // "4 Kb" 
	filesize(265318, {base: 10});         // "265.32 kB" 
	filesize(265318);                     // "259.1 KB" 
	filesize(265318, {round: 0});         // "259 KB" 
	filesize(265318, {output: "array"});  // [259.1, "KB"] 
	filesize(265318, {output: "object"}); // {value: 259.1, suffix: "KB", symbol: "KB"} 
	filesize(1, {symbols: {B: "Б"}});     // "1 Б" 
	filesize(1024);                       // "1 KB" 
	filesize(1024, {exponent: 0});        // "1024 B" 
	filesize(1024, {output: "exponent"}); // 1 
	filesize(265318, {standard: "iec"});  // "259.1 KiB" 
	filesize(265318, {standard: "iec", fullform: true}); // "259.1 kibibytes" 
	filesize(12, {fullform: true, fullforms: ["байтов"]});  // "12 байтов" 

#### params
1. <Number> ：float|integer
2. Option<object>
	- round:小数位数，default is 2

### 75. speakingurl
<https://www.npmjs.com/package/speakingurl>

翻译工具。

#### Usage:
getSlug(input, [options]);

- input:{string} to convert
- options {object|string} config object or separator string (see below)
	- separator{string}:default '-'
	- lang{string|boolean}： default'en'
		- 'ar' // Arabic
		- 'az' // Azerbaijani*
		- 'cs' // Czech
		- ...

	- ...

#### Eg:

	const getSlug = require('speakingurl');

	var slug;
 
	slug = getSlug("Schöner Titel läßt grüßen!? Bel été !");
	console.log(slug); // Output: schoener-titel-laesst-grue

### 76. fs-jetpack
<https://www.npmjs.com/package/fs-jetpack>

比node自带fs要更好的fs system API
#### Sync & Async

API has the same set of synchronous and asynchronous methods. All **async methods are promise based(异步方法）** (no callbacks).即异步方法返回的是promise,同步方法返回nothing。


#### API
##### write(path,data,[options])
asynchronous: **writeAsync(path,data,[options])**

Writes data to file. If any parent directory in path doesn't exist it will be created (like mkdir -p).


###### arguments:
- path: path to file.
- data: data to be written. This could be String, Buffer, Object or Array (if last two used, the data will be outputted into file as JSON).
- options (optional) Object with possible fields:

	- atomic: (default false) if set to true the file will be written using strategy which is much more resistant to data loss. 
	- jsonIndent: (defaults to 2) if writing JSON data this tells how many spaces should one indentation have.
##### returns:
Nothing.

##### Eg:

	fs.writeAsync(`${graphicsDir}/${filename}`,svgString,'utf8')
        .then(() => {
            return {
                name: filename,
                size: humanReadableSize(svgString)
            };
        });

#### inspect(path, [options])/inspectAsync(path, [options])
##### arguments:
- path: path to inspect.
- options (optional).
##### returns:


同步：返回一个obj，其包含了关于该文件的如下信息：

	{
	  name: "my_dir",
	  type: "file", // possible values: "file", "dir", "symlink" 
	  size: 123, // size in bytes, this is returned only for files 
	  // if checksum option was specified: 
	  md5: '900150983cd24fb0d6963f7d28e17f72',
	  // if mode option was set to true: 
	  mode: 33204,
	  // if times option was set to true: 
	  accessTime: [object Date],
	  modifyTime: [object Date],
	  changeTime: [object Date]
	}
		
异步：返回包含以上obj的resolve的promise

### 77.load-json-file
Read and parse a JSON file

#### Usage
	const loadJsonFile = require('load-json-file');
	 
	loadJsonFile('foo.json').then(json => {
	    console.log(json);
	});

#### API
##### loadJsonFile(filepath)
Returns a promise for the parsed JSON.

##### loadJsonFile.sync(filepath)
Returns the parsed JSON.

### 78. write-json-file
<https://www.npmjs.com/package/write-json-file>

Stringify and write JSON to a file atomically.

#### Usage

	const writeJsonFile = require('write-json-file');
 
	writeJsonFile('foo.json', {foo: true}).then(() => {
	    console.log('done');
	});

#### API
##### writeJsonFile(filepath, data, [options])
Returns a promise.

##### writeJsonFile.sync(filepath, data, [options])

### 79. got
<https://www.npmjs.com/package/got>

Simplified HTTP requests.

A nicer interface to the built-in http module.（node自建http模块的更好的接口）

#### API
##### got(url,[options])
Returns a Promise for a response object with a body property, a url property with the request URL or the final URL after redirects, and a requestUrl property with the original request URL.
###### params
- url{string|object}: The URL to request or a http.request options object.}
- options{object}: Any of the [http.request](https://nodejs.org/api/http.html#http_http_request_options_callback) options.
	- json{boolean}:default-false,Parse response body with JSON.parse and set accept header to application/json.

###### returns
一个Promise，其response object含有如下properties:

- body:
- url:  the request URL or the final URL after redirects
- requestUrl: original request URL

### 80. chalk
<https://www.npmjs.com/package/chalk>

终端渲染样式的模块。

#### Usage Eg:

	var chalk = require('chalk');
 
	// style a string 
	chalk.blue('Hello world!');
	 
	// combine styled and normal strings 
	chalk.blue('Hello') + 'World' + chalk.red('!');
	 
	// compose multiple styles using the chainable API 
	chalk.blue.bgRed.bold('Hello world!');


### 81.lodash
<https://www.npmjs.com/package/lodash>

The Lodash library exported as Node.js modules.

### 何谓Lodash?
<https://lodash.com/>

A modern JavaScript utility library delivering modularity, performance & extras.

就是一个类似jQuery的JavaScript库。

### 82.de
<https://www.npmjs.com/package/d3>

D3 (or D3.js) is a JavaScript library for visualizing data using web standards. D3 helps you bring data to life using SVG, Canvas and HTML. 

d3官网：

<https://d3js.org/>
