Github:<https://github.com/FTChinese/webapp>
 
本地项目：myftwork\webapp

该项目最后生成一个html（为Android.html)，该html手动拷贝到iPhoneApp项目的supporting下的index.html。

# 一. README.md

## FTC Web App

这是用于编译为FTC的iOS和Android app项目的HTML部分。

## Install
git clone https://github.com/FTChinese/webapp.git

cd webapp

npm install & bower install

## develop and preview

gulp serve

## publish
gulp copy

gulp publish

# Use the code in iOS and Android apps
copy the generated HTML file manually and paste into Xcode and Android Studio projects. 

# 二、gulpfile.js

## 1. 从其他模块导入函数

	import gulp from 'gulp';
	import gulpLoadPlugins from 'gulp-load-plugins';
	import browserSync from 'browser-sync';
	import del from 'del';
	import {stream as wiredep} from 'wiredep';

### 说明
这里使用了ES6的import。

对比之前的写法（例如来自ig-template的开头几行)：

	const fs = require('fs');
	const path = require('path');
	const gulp = require('gulp');
	const browserSync = require('browser-sync').create();


### 疑问
这两种写法啥区别？

## 2.函数 getUrltoFile (urlSource, fileName)

以GET方式向目标url(urlSource)发出请求得到数据，并将数据写入指定文件（fileName)

(详见《Next项目学习.md》)

	function getUrltoFile (urlSource, fileName) {
	  var http = require('http');
	  var url = require('url');
	  var options = {
	      host: url.parse(urlSource).hostname,
	      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
	  }
	  console.log (options.path);
	  var request = http.request(options, function (res) {
	      var data = '';
	      res.on('data', function (chunk) {
	          data += chunk;
	      });
	      //console.log (data);
	      res.on('end', function () {
	        var fs = require('fs');
	        fs.writeFile(fileName, data, function(err) {
	            if(err) {
	                return console.log(err);
	            }
	            console.log(urlSource);
	            console.log('writen to');
	            console.log(fileName);
	        });
	      });
	  });
	  request.on('error', function (e) {
	      console.log(e.message);
	  });
	  request.end();
	}

## 3. 函数 postDatatoFile(urlSource, postData, fileName)

以Post的请求方式发送json数据postData到urlSource，并将从urlSource返回的数据写入文件fileName。

(详见《Next项目学习.md》)

## 4. 任务origami
向ft的origami网站发送请求请求其o-ft-header、o-table、of-ft-footer等模块得到相关文件数据，然后数据写入'./bower_components/origami/build.js'和'./bower_components/origami/build.scss'。

注意该项目中的bower_components下并无origami这个目录，故该任务应该是没用的。

	gulp.task('origami', function () {
	  getUrltoFile('http://build.origami.ft.com/bundles/js?modules=o-ft-header@^2.5.15,o-table@^1.6.0', './bower_components/origami/build.js');
	  getUrltoFile ('http://build.origami.ft.com/bundles/css?modules=o-ft-header@^2.5.15,o-ft-footer@^2.0.4,o-table@^1.6.0', './bower_components/origami/build.scss');
	});


## 5. 任务ea
从m.ftchinese.com上下载数据到webapp\app\api中，包括各种html结构、json数据等等。

	gulp.task('ea', function () {
	
	  ///定义message对象
	  var message = {};
	  message.head = {};
	  message.head.transactiontype = '10001';
	  message.head.source = 'web';
	  message.body = {};
	  message.body.ielement = {};
	  message.body.ielement.num = 25;
	   
	  postDatatoFile('http://app003.ftmailbox.com/index.php/jsapi/get_new_story?rows=25&', message, './app/api/ea001.json');//以POST方式发送ea001.json的数据到该网址

	  message.head.transactiontype = '10003';
	  postDatatoFile('http://m.ftchinese.com/eaclient/apijson.php', message, './app/api/ea003.json');//以POST方式发送message到'http://m.ftchinese.com/eaclient/apijson.php'，然后将返回数据写入ea003.json

	  message.head.transactiontype = '10007';
	  postDatatoFile('http://m.ftchinese.com/eaclient/apijson.php', message, './app/api/ea007.json');//以POST方式发送message到'http://m.ftchinese.com/eaclient/apijson.php'，然后将返回数据写入ea007.json

	  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/phonetemplate.html?channel=nexthome', './app/api/homecontent.html');//以GET的方式向该url发出请求，然后返回的数据写入homecontent.html。这个url的内容似乎是当天的主页内容的html结构。
	 
	  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/phonetemplate.html?channel=nexthome&screentype=wide', './app/api/homecontentwide.html');//以GET的方式向该url发出请求，然后返回的数据写入homecontentwide.html。这个url的内容似乎是当天的主页内容部分的html结构。和上面比起来，这个html似乎是用于宽屏设备的（url地址多了参数screentype=wide，同时写入文件的文件名也叫做homecontentwide.html)

	  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/phonetemplate.html?', './app/api/home.tpl');//以GET的方式向该url发出请求，然后返回的数据写入home.tpl。这个url的内容似乎是主页的html结构，不包括内容

	  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/phonetemplate.html?channel=homepagevideo&', './app/api/homepagevideo.tpl');//以GET的方式向该url发出请求，然后返回的数据写入homepagevideo.tpl。这个url的内容似乎是FT商学院/金融英语速度/视频三个栏目的html结构

	  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/phonetemplate.html?channel=skyZ&', './app/api/skyZ.tpl');//以GET的方式向该url发出请求，然后返回的数据写入skyZ.tpl。这个url的内容似乎是菜单+专栏菜单的html结构。

	  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/ipadvideo.html?', './app/api/ipadvideo.tpl');//以GET的方式向该url发出请求，然后返回的数据写入ipadvideo.tpl。这个url的内容是空的，故ipadvideo.tpl也是空的。

	  getUrltoFile ('http://m.ftchinese.com/index.php/jsapi/get_last_updatetime?', './app/api/get_last_updatetime.json');//以GET的方式向该url发出请求，然后返回的数据写入get_last_updatetime.json。这个url的内容就是一个数字字符串"1469419205",似乎是最后更新时间。

	  getUrltoFile ('http://m.ftchinese.com/index.php/jsapi/hotstory/1days?', './app/api/hotstory.json');//以GET的方式向该url发出请求，然后返回的数据写入hotstory.json。这个url的内容似乎是“热门文章”的信息数据
	});


### 疑问
- 这里 m.ftchinese.com的相关路径中的内容是怎么编辑进去的？是跟我们的backyard那个对接的吗？具体每个路径对应的服务器上的文件是哪些呢？
- 这里url中的channel参数似乎比较关键，其值有nexthome、homepagevideo、skyZ等，具体是指示什么？
- api下只有ea001.json是自己写好的，其他都是请求得到的？
- 这个任务应该是单独执行了一次？？因为后面的serve、build都没有执行ea的。。。

 ***app\api是存放向m.ftchinese.com POST请求得到的html文件及json文件，除了ea001.json是事先写好的***

### answer From Oliver
这些请求本来是用于从后台获取数据的，其正常的应该是main.js中采用Ajax动态地从php后台获取数据；但是在本地调试的时候，没有办法执行Ajax，所以就从这个网址获取数据以方便测试的时候看。这个任务不需要每次执行gulp serve的时候执行，只需定期执行一下gulp ea就好了，就是测试的时候有数据能看就行了。

**注意：本地文件可以发送正常的http请求，但没有办法发送Ajax请求** ***待实测***

## 6.任务hp
将主页内容的两个模板homecontent.html和homecontentwide.html拷贝到正式环境dev_www/frontend/tpl/phone目录下。

	gulp.task('hp', () => {
	  gulp.src('app/api/homecontent.html')
	    .pipe(gulp.dest('../dev_www/frontend/tpl/phone'));
	  gulp.src('app/api/homecontentwide.html')
	    .pipe(gulp.dest('../dev_www/frontend/tpl/phone'));
	});

### 说明
这里的homecontent.html和homecontentwide.html都是5.中从m.ftchinese.com上获取下来的。

## 7.任务phone
将app/phone下的所有文件拷贝到dist/phone下。dist不存在，会被自动创建。

	gulp.task('phone', () => {
	  return gulp.src('app/phone/**/*')
	    .pipe(gulp.dest('dist/phone'));
	});

### 疑问
- app/phone下的文件都是些什么呢？似乎都是些静态文件图片啊字体啊说明什么的。。这些应该都是事先写好的吧？？

***app/phone存放事先准备好的一些静态文件。***

### Answer From Oli
是的

## 8.任务api
将app/api下的所有文件拷贝到dist/api下。

这里api下的所有文件都是通过5.任务ea，从向m.ftchinese.com上请求返回的数据写过去的。

	gulp.task('api', () => {
	  return gulp.src('app/api/**/*')
	    .pipe(gulp.dest('dist/api'));
	});

### 疑问


.tmp可以理解，存放的是app下scripts和scss处理后的js和css文件。那为什么这些要再拷贝到dist下一遍是什么意义？？是不是dist中包含了所有处理好的资源，而.tmp是专门只存储处理好的js和css的？

***dist下存放内容有app\api***

### Answer
是的


## 9.任务ga
以GET方式请求'http://m.ftchinese.com/index.php/jsapi/analytics'的数据，并将该数据写入webapp\app\log下的ga.js和webapp\dist\log下的ga.js

	gulp.task('ga', function () {
	    getUrltoFile('http://m.ftchinese.com/index.php/jsapi/analytics', './app/log/ga.js');
	    getUrltoFile('http://m.ftchinese.com/index.php/jsapi/analytics', './dist/log/ga.js');
	});

### 疑问
- 所以ga.js也是从m.ftchinese.com上获取下来的，但是http://m.ftchinese.com/index.php/jsapi/analytics这个地址对应的文件路径是什么呢？

### Answer From Oli
这个文件包含了所有ga相关的代码，包括谷歌分析提供的原始的ga接口的代码。也包括自己编写的一些ga.send()的事件代码。有了这个文件后，可以在项目中其他的js文件里编写新的ga.send()事件代码。

## 10.任务log
将app/log下的所有文件拷贝到dist/log下。

	gulp.task('log', () => {
	  return gulp.src('app/log/**/*')
	    .pipe(gulp.dest('dist/log'));
	});

### 疑问
- app\log下的文件都是些什么呢？analytics.js和ga.js似乎是和谷歌分析相关的文件，应该是谷歌自己提供的文件、不是自己写的吧？？

***dist下存放内容有app\log**

***app\log下的文件ga.js是从m.ftchinese.com上获取下来的，那analytics.js呢**

这个以后遇到了再问

## 13.任务styles
处理webapp\app\styles下的main.scss文件,最后生成webapp\.tmp\styles\main.css

	gulp.task('styles', () => {
	  return gulp.src('app/styles/main.scss')
	    .pipe($.plumber())
	    .pipe($.sourcemaps.init())
	    .pipe($.sass.sync({
	      outputStyle: 'expanded',
	      precision: 10,
	      includePaths: ['.']
	    }).on('error', $.sass.logError))
	    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
	    .pipe($.sourcemaps.write())
	    .pipe(gulp.dest('.tmp/styles'))
	    .pipe(reload({stream: true}));
	});
### 说明
app\styles\main.scss是自己手动写的。

## 14.任务scripts
处理app\scripts下的main.js文件，最后生成.tmp\scripts\main.js和.tmp\scripts\main.js.map

	gulp.task('scripts', () => {
	  return gulp.src('app/scripts/**/*.js')
	    .pipe($.plumber())
	    .pipe($.sourcemaps.init())
	    .pipe($.babel())
	    .pipe($.sourcemaps.write('.'))
	    .pipe(gulp.dest('.tmp/scripts'))
	    .pipe(reload({stream: true}));
	});
### 说明
app\scripts\main.js是自己手动写的。

## 15.函数lint、任务lint和lint:test
大概就是检查JavaScript有没有在语法上写错的。就是检查app\scripts\main.js和test\spec\main.js

	function lint(files, options) {
	  return () => {
	    return gulp.src(files)
	      .pipe(reload({stream: true, once: true}))
	      .pipe($.eslint(options))
	      .pipe($.eslint.format())
	      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
	  };
	}

	const testLintOptions = {
	  env: {
	    mocha: true
	  }
	};
	
	gulp.task('lint', lint('app/scripts/**/*.js'));
	gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

### 说明
- 这里涉及了一个新的node模块gulp-eslint,大概就是一个JavaScript的模式检查器。以后再研究

### 疑问
- 这块检查JS语法错误的作用可以再像帆总确认一下

## 16.任务html
app下html文件→（处理为）dist下html文件
	gulp.task('html', ['styles', 'scripts'], () => {
	  return gulp.src('app/*.html')
	    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))//useref:解析HTML文件中的构建块，以替换未经优化的scripts和stylesheets
	    .pipe($.if('*.js', $.uglify()))//压缩js
	    .pipe($.if('*.css', $.cssnano()))//压缩css
	    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
	    .pipe(gulp.dest('dist'));
	});
### 疑问
这里的app\*.html有:

- index.html
- android.html
- mba.html
- test.html

这些都是独立的吧？结合copy任务来看

### Answer From Oli
是的。简单来说index.html是用于自己测试的时候看的。而真正应用到正式软件中的是android.html这个文件，它即是项目iphoneApp和AndroidApp的supporting下的index.html

## 16.任务images
处理app\images下的图片，最终生成dist\images下的图片。

	gulp.task('images', () => {
	  return gulp.src('app/images/**/*')
	    .pipe($.cache($.imagemin({
	      progressive: true,
	      interlaced: true,
	      // don't remove IDs from SVGs, they are often used
	      // as hooks for embedding and styling
	      svgoPlugins: [{cleanupIDs: false}]
	    })))
	    .pipe(gulp.dest('dist/images'));
	});
***细节知识待再复习***

## 16.任务fonts
处理app\fonts下的文件，最终生成dist\fonts、.tmp\fonts下的文件。

	gulp.task('fonts', () => {
	  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
	    .concat('app/fonts/**/*'))
	    .pipe(gulp.dest('.tmp/fonts'))
	    .pipe(gulp.dest('dist/fonts'));
	});
***细节知识待再复习***
### 疑问
app下没有fonts呀？这个任务是不是没有用

## 17.任务extras
处理app下的所有不是html的文件，最终生成dist下的文件。

	gulp.task('extras', () => {
	  return gulp.src([
	    'app/*.*',
	    '!app/*.html'//排除html文件
	  ], {
	    dot: true//不懂dot的意思
	  }).pipe(gulp.dest('dist'));
	});


## 18.任务clean
清空.tmp,dist下的文件

	gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

### 说明
xx.bind(函数运行的作用域,[参数数组])

### 疑问
这里绑定的函数运行的作用域是null，这是啥意义？

## 22.任务wiredep
向app/styles下的scss文件和app下的html文件注入bower依赖包

	gulp.task('wiredep', () => {
	  gulp.src('app/styles/*.scss')
	    .pipe(wiredep({
	      ignorePath: /^(\.\.\/)+/
	    }))
	    .pipe(gulp.dest('app/styles'));
	
	  gulp.src('app/*.html')
	    .pipe(wiredep({
	      ignorePath: /^(\.\.\/)*\.\./
	    }))
	    .pipe(gulp.dest('app'));
	});

## 19.任务serve

使用webapp\.tmp和webapp\app中的文件建立静态服务器。用于本地预览。

	gulp.task('serve', ['styles', 'scripts', 'fonts'], () => {
	  browserSync({
	    notify: false,
	    port: 9000,
	    server: {
	      baseDir: ['.tmp', 'app'],
	      routes: {
	        '/bower_components': 'bower_components'
	      }
	    }
	  });
	
	 ///静态文件变化了就刷新浏览器
	  gulp.watch([
	    'app/*.html',
	    'app/images/**/*',
	    '.tmp/fonts/**/*'
	  ]).on('change', reload);
	
	  ///动态文件变化了执行相应的任务
	  gulp.watch('app/styles/**/*.scss', ['styles']);
	  gulp.watch('app/scripts/**/*.js', ['scripts']);
	  gulp.watch('app/fonts/**/*', ['fonts']);
	  gulp.watch('bower.json', ['wiredep', 'fonts']);
	});

具体是使用app下的html和images等静态文件，和.tmp下的需要从app下不断编译过来的.css和.js文件。最终是为app\index.html服务

### 疑问
这个serve使用的资源都是app下没有压缩处理过的原始文件，除了.css和.js是.tmp中处理过的？

### Answer
是的

## 23.任务build
执行一系列由app目录→dist目录的小任务，然后对dist目录下的文件进行大小展示。

	gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras', 'api', 'phone', 'log', 'ga'], () => {
	  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
	});

### 说明
- 任务lint:检查app\scripts\main.js

- 任务html:pp下html文件→（处理为）dist下html文件

- 任务images:app\images下的图片→（处理为）
dist\images下的图片。

- 任务fonts:app\fonts→（处理为）
dist\fonts、.tmp\fonts ***没有app\fonts这个目录***

- 任务extras:app下非html的文件→（拷贝到）dist下非html的文件

- 任务api:app/api下的所有文件→（拷贝到）dist/api下

- 任务phone:app/phone下的所有文件→（拷贝到）dist/phone

- 任务log:app/log下的所有文件→（拷贝到）dist/log

- 任务ga:m.ftc.com→
（get请求获取）webapp\app\log\ga.js和webapp\dist\log\ga.js
***这里按理说应该先执行ga再执行log,那么3.9的gulp的[]有执行顺序吗还是异步执行？？***

## 25.任务default
先执行任务clean,然后再执行任务build

	gulp.task('default', ['clean'], () => {
	  gulp.start('build');
	});

## 20. 任务serve:dist

	gulp.task('serve:dist', () => {
	  browserSync({
	    notify: false,
	    port: 9000,
	    server: {
	      baseDir: ['dist']
	    }
	  });
	});

使用webapp\dist 中的文件建立静态服务器。

## 21.任务serve:test

	gulp.task('serve:test', ['scripts'], () => {
	  browserSync({
	    notify: false,
	    port: 9000,
	    ui: false,
	    server: {
	      baseDir: 'test',
	      routes: {
	        '/scripts': '.tmp/scripts',
	        '/bower_components': 'bower_components'
	      }
	    }
	  });
	
	  gulp.watch('app/scripts/**/*.js', ['scripts']);
	  gulp.watch('test/spec/**/*.js').on('change', reload);
	  gulp.watch('test/spec/**/*.js', ['lint:test']);
	});


使用webapp\test 中的文件建立静态服务器。
### 疑问
- test中的文件是你自己写的一个测试文件吗
## 24.任务copy
该任务的执行是要先执行build任务的。外骨架为：

	gulp.task('copy', ['build'], function () {
	···
	}

### 1)将dist下的文件 和 app\cache下的文件拷贝到testing环境

	  var replace = require('gulp-replace');
	  var rename = require("gulp-rename");
	  var thedatestamp = new Date().getTime();

	  gulp.src('dist/**/*')
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));//dist下所有文件→（拷贝到）..\testing\dev_www\mobile_webroot下
	
		///dist\index.html→（使用iphone-2014.manifest为缓存描述文件）..\testing\dev_www\mobile_webroot\iphone.html
	  gulp.src(['dist/index.html'])
	    .pipe(replace(/\<html\>/g, '<html manifest="iphone-2014.manifest">'))//在html标签上指定应用缓存的描述文件iphone-2014.manifest
	    .pipe(replace(/=phone\//g, '=iphone-2014/'))//文件中没有"=phone/",这句话应该没用
	    .pipe(rename('iphone-2014.html'))//将index.html重命名为iphone-2014.html
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));//

		///dist\index.html→（使用ipad-2014.manifest为缓存描述文件）..\testing\dev_www\mobile_webroot\ipad.html
	  gulp.src(['dist/index.html'])
	    .pipe(replace(/\<html\>/g, '<html manifest="ipad-2014.manifest">'))
	    .pipe(replace(/=phone\//g, '=ipad-2014/'))
	    .pipe(rename("ipad-2014.html"))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));
	
		///dist\index.html→（使用bb-2014.manifest为缓存描述文件）..\testing\dev_www\mobile_webroot\bb.html
	  gulp.src(['dist/index.html'])
	    .pipe(replace(/\<html\>/g, '<html manifest="bb-2014.manifest">'))
	    .pipe(replace(/=phone\//g, '=bb-2014/'))
	    .pipe(rename("bb-2014.html"))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));

		///dist\index.html→（使用phone-2014.manifest为缓存描述文件）..\testing\dev_www\mobile_webroot\phone.html
	  gulp.src(['dist/index.html'])
	    .pipe(replace(/\<html\>/g, '<html manifest="phone-2014.manifest">'))
	    .pipe(rename("phone.html"))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));

		///dist\index.html→（使用phone-2014.manifest为缓存描述文件）..\testing\dev_www\mobile_webroot\phoneapp.html
	  gulp.src(['dist/index.html'])
	    .pipe(replace(/\<html\>/g, '<html manifest="phone-2014.manifest">'))
	    .pipe(rename("phoneapp.html"))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));

		///dist\mba.html→（使用mba-2014.manifest为缓存描述文件）..\testing\dev_www\mobile_webroot\mba-2014.html
	  gulp.src(['dist/mba.html'])
	    .pipe(replace(/\<html\>/g, '<html manifest="mba-2014.manifest">'))
	    .pipe(replace(/=phone\//g, '=mba-2014/'))
	    .pipe(rename("mba-2014.html"))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));

		///dist/phone→（拷贝到）'../testing/dev_www/mobile_webroot/iphone-2014|ipad-2014|bb-2014|mba-2014
	  gulp.src(['dist/phone/**/*'])
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/iphone-2014'));
	  gulp.src(['dist/phone/**/*'])
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/ipad-2014'));
	  gulp.src(['dist/phone/**/*'])
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/bb-2014'));
	    gulp.src(['dist/phone/**/*'])
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/mba-2014'));

		///app\cache\phone.manifest→（加时间戳，修改名称等）../testing/dev_www/mobile_webroot/phone-2014.manifest|iphone-2014.manifest|ipad-2014.manifest|bb-2014.manifest|android-2014.manifest
	  gulp.src(['app/cache/phone.manifest'])
	    .pipe(replace(/#changelogdatestamp/g, '#datestamp' + thedatestamp))//将缓存描述文件的comment部分替换为 '#datestamp"+今日实时时间戳
	    .pipe(rename('phone-2014.manifest'))//重命名为phone-2014.manifest
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));//拷贝到../testing/dev_www/mobile_webroot/
	  gulp.src(['app/cache/phone.manifest'])
	    .pipe(replace(/#changelogdatestamp/g, '#datestamp' + thedatestamp))
	    .pipe(replace(/phone\//g, 'iphone-2014/'))
	    .pipe(rename('iphone-2014.manifest'))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));
	  gulp.src(['app/cache/phone.manifest'])
	    .pipe(replace(/#changelogdatestamp/g, '#datestamp' + thedatestamp))
	    .pipe(replace(/phone\//g, 'ipad-2014/'))
	    .pipe(rename('ipad-2014.manifest'))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));
	  gulp.src(['app/cache/phone.manifest'])
	    .pipe(replace(/#changelogdatestamp/g, '#datestamp' + thedatestamp))
	    .pipe(replace(/phone\//g, 'bb-2014/'))
	    .pipe(rename('bb-2014.manifest'))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));
	  gulp.src(['app/cache/android.manifest'])
	    .pipe(replace(/#changelogdatestamp/g, '#datestamp' + thedatestamp))
	    .pipe(rename('android-2014.manifest'))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));
	  gulp.src(['app/cache/mba.manifest'])
	    .pipe(replace(/#changelogdatestamp/g, '#datestamp' + thedatestamp))
	    .pipe(replace(/phone\//g, 'mba-2014/'))
	    .pipe(rename('mba-2014.manifest'))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));

	 ///dist/images下所有文件→（拷贝到）../testing/dev_www/mobile_webroot/images
	  gulp.src(['dist/images/**/*'])
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/images'));

### 2)定义一些变量，存放异步读取的dist下的文件内容

	  var fs = require('fs');

	 ///异步读取这些文件
	  var cssbundle = fs.readFileSync('dist/phone/s.css', 'utf8');//并没有个文件
	  var googleanalytics = fs.readFileSync('dist/log/ga.js', 'utf8');
	  var fa = fs.readFileSync('dist/log/analytics.js', 'utf8');

	  var jqueryM = fs.readFileSync('bower_components/jquery/dist/jquery.min.js', 'utf8');
	  var html5storageM = fs.readFileSync('dist/phone/html5storage-m.js', 'utf8');//不存在html5storage-m.js，只有html5storage.js
	  var trackingM = fs.readFileSync('dist/phone/tracking-m.js', 'utf8');//不存在tracking-m.js,只有tracking.js
	  var fastclickM = fs.readFileSync('dist/phone/fastclick-m.js', 'utf8');//不存在
	  var ftscrollerM = fs.readFileSync('dist/phone/ftscroller-m.js', 'utf8');//不存在
	  var mainM = fs.readFileSync('dist/phone/main-m.js', 'utf8');//不存在

### 疑问
- 这些文件html5storage-m.js、tracking-m.js、tracking-m.js、ftscroller-m.js都不存在，所以这些都是干嘛的？

### 3)处理app/android.html

	 gulp.src(['app/android.html'])
	    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
	    .pipe(replace(/\{\{cssbundle\}\}/g, cssbundle))
	    .pipe(replace(/\{\{googleanalytics\}\}/g, googleanalytics))
	    .pipe(replace(/\{\{fa\}\}/g, fa))
	    .pipe(replace(/\{\{jquery-m\}\}/g, jqueryM))
	    .pipe(replace(/\{\{html5storage-m\}\}/g, html5storageM))
	    .pipe(replace(/\{\{tracking-m\}\}/g, trackingM))
	    .pipe(replace(/\{\{fastclick-m\}\}/g, fastclickM))
	    .pipe(replace(/\{\{ftscroller-m\}\}/g, ftscrollerM))
	    .pipe(replace(/\{\{main-m\}\}/g, mainM))
	    .pipe(replace(/\<html\>/g, '<html manifest="android-2014.manifest">'))
	    .pipe(rename('androidapp.html'))
	    .pipe(gulp.dest('../testing/dev_www/mobile_webroot/'));
	
	  console.log ('files copied');


#### 疑问
- 这里就直接使用replace方法一个一个替换变量，而没有使用mustache等模板吗？
- 这里这个文件的作用是用于为安卓系统准备的吗？这个是不是要结合androidApp那个项目才有用？

## 12.任务publish
将测试环境testing\dev_www下的东西拷贝到正式环境dev_www下。

这里之前还没有任务将webapp的东西拷贝到testing下，所以看看后面是什么任务在做这个事。

	gulp.task('publish', function () {
	  gulp.src('../testing/dev_www/mobile_webroot/phone/**/*')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/phone'));
	  gulp.src('../testing/dev_www/mobile_webroot/ipad-2014/**/*')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/ipad-2014'));
	  gulp.src('../testing/dev_www/mobile_webroot/iphone-2014/**/*')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/iphone-2014'));
	  gulp.src('../testing/dev_www/mobile_webroot/bb-2014/**/*')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/bb-2014'));
	  gulp.src('../testing/dev_www/mobile_webroot/mba-2014/**/*')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/mba-2014'));
	  gulp.src('../testing/dev_www/mobile_webroot/log/**/*')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/log'));
	  gulp.src('../testing/dev_www/mobile_webroot/assets/svg/**/*')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/assets/svg'));
	  gulp.src('../testing/dev_www/mobile_webroot/*.manifest')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/'));
	  gulp.src('../testing/dev_www/mobile_webroot/phone.html')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/'));
	  gulp.src('../testing/dev_www/mobile_webroot/phoneapp.html')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/'));
	  gulp.src('../testing/dev_www/mobile_webroot/iphone-2014.html')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/'));
	  gulp.src('../testing/dev_www/mobile_webroot/bb-2014.html')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/'));
	  gulp.src('../testing/dev_www/mobile_webroot/ipad-2014.html')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/'));
	  gulp.src('../testing/dev_www/mobile_webroot/androidapp.html')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/'));
	  gulp.src('../testing/dev_www/mobile_webroot/mba-2014.html')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/'));
	  gulp.src('../testing/dev_www/mobile_webroot/images/**/*')
	    .pipe(gulp.dest('../dev_www/mobile_webroot/images'));
	});