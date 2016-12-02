# 0. 安装配置准备

## 1.node切换
	
	nvm list

	nvm use 6.2.2


## 2.npm install

## 3. 单独安装gulp4.0(npm install中安装的仅仅是gulp3）

卫国哥写的ig-template等需要gulp4.0才能看。
如果安装过全局的 gulp 的话先卸载之

	$ npm uninstall gulp -g

安装全局的 gulp 4.0

	$ npm install "gulpjs/gulp#4.0" -g

到项目目录里删掉本地的 gulp

	$ npm rm gulp --save-dev
安装本地的 gulp 4.0

	$ npm install "gulpjs/gulp#4.0" --save-dev

## 4. npm install报错的话就删除掉node_modules一整个文件夹


## 5.bower install

# 1. README.md阅读
<https://github.com/ftc-editorial/ig-template>
## 1.Gulp命令行
### 把你的json文件作为一个命令行参数传上来

#### (1)使用你自己的json数据
执行：

	gulp serve -i your-data-file-name.json

or

	gulp serve --input=your-data-file-name.json

(若不上传json文件，则默认使用的是example.json)

or 使用gulp build:

	gulp build -i your-data-file-name.json

这些gulp任务将把json数据和mustache模板结合起来，构建一个静态的html文件。

#### （2）使用默认json数据
可以使用默认数据(在model/example.json文件中**新版在data/example.json文件中）预览这个project，只需简单地执行(不需要传递任何参数）：

	gulp serve 

或

	gulp build

#### （3）发布到www，然后再在www中用svn来发布
执行完gulp build后，你在使用gulp deploy来发布到服务器：

	gulp deploy

NOTE:gulp deploy不需要任何参数。

## 2.Custom CSS/JS
在你的json文件中，将这些字段中的任意一个设置为true以包含这些库：

	"highcharts": false,
	"d3": false,


为了包含你自定义的css/js（如果有的话），将以下这些字段设置为true，设置为false的话将不会包含这些文件：
	
	"customCss": "false",
	"customJs": "false",
	
你自定义的js/css文件应该分别放在custom/js和custom/css文件夹中，而且命名要和json文件一致。例如，如果你的json叫chian-gdp.json,那么custom js/css应该叫china-gdp.js和china-gdp.css。

## 3.Data
Data以json格式保存在model/your-project-name.json（***新版是data/your-project-name.json***)

不要动model/footer.json(***新版是data/footer.json***)。

To use the 'light' theme, add theme:true, as the first entry in you json file.***不是很懂？？？***

## 4.Data Structure

- "lightTheme": <boolean>, // Use the light theme or not.
- "darkTheme": <boolean>, // Use the dark theme or not. lightTheme 和 darkTheme 应该是互斥的.
- "enableScroll": <boolean>, // Enable / disable scrolling特效.

- "articleCover":  Its first level has a single entry whose key could be one of cc, ft or picture depending on the type of media.

		"articleCover": {
		    "picture": {
		        "source": <Array>, // one or more object
		        "src": <String> // image tag's src url.
		    }
		    // or
		    "ft": {
		        "poster": <String>, //video元素的poster属性值
		        "source": <Array> // <video>内的<source>的不同格式
		    }
		    // or
		    "cc": {
		        "src": <string>. // url by cc video.
		    }
		}

	"picture"的"source"字段写法：

		"source": [
		    {
		        "landscape": <true | false>, // if `true`, output `media="(min-aspect-ratio: 1/1)"`
		        "portrait": <true | false>, // if `true`, output `media="(max-aspect-ratio: 1/1)"`
		        "srcset": [
		            "images/sapienza_new-lr_cycwhld.jpg 1100w,", // 后面带的"1100w"的值指明要用那种尺寸的图片，省略的时候为默认
		            "images/sapienza_new-mr_osvv1bn.jpg 1500w,",
		            "images/sapienza_new-hr_f0hbatq.jpg"
		        ]
		    }
		]
	
	相应的HTML:
		<picture>
		    <source media="(min-aspect-ratio: 1/1)" srcset="">
		    <source media="(max-aspect-ratio: 1/1)" srcset="">
		    <img src="">
		</picture>
	
	"source"写法为：
	
		"source": [
		    {
		        "src": "https://ig.ft.com/sites/land-rush-investment/myanmar/media/myanmar_blinkie_7.mp4.mp4",
		        "type": "mp4" // for the `<source>` tag's `type` attribute.
		    },
		    {
		        "src": "https://ig.ft.com/sites/land-rush-investment/myanmar/media/myanmar_blinkie_7.webm",
		        "type": "webm"
		    }
		]
	
	相应的HTML:
	
		 <video poster="{{poster}}">
		    <source src="https://ig.ft.com/sites/land-rush-investment/myanmar/media/myanmar_blinkie_7.mp4.mp4" type="video/mp4">
		    <source src="https://ig.ft.com/sites/land-rush-investment/myanmar/media/myanmar_blinkie_7.webm" type="video/webm">
		</video>     
	
 "sectionCover","fullspanMedia"使用"articleCover"相同的模板。

- "figure":段落中的figure元素。

	"figure": {
	    "mobileOnly": <true | false>, 
	    // whether the image is visible only on mobile devices.
	
	    "ratio": "", 
	    // 图片的宽高比, e.g, `7/5`.如果你没有约束尺寸的话请省略它。
	
	    "hasLink": {
	        "href": "https://www.ft.com/land"
	    }, 
	    // 决定图片是否是可点击的。如果你不想跳转到其他地方，就省略或将它留为空。
	
	    "imgSrc": "./images/new_logo.png",
	
	    "caption": <String> 
	    // 图片标题
	}

## 5.需要的填充材料（Polyfills needed)

- object-fit
- '<picture'>
- vh

## 6.NOTES:
Wechat cover image:***这个wechat是干嘛的？？？***

	<img src="{{{article.wechatImage}}}" style="display:block; width:0px; height:0px; overflow:hidden">

a. Style should be set inline;

b. Do not use display:none;

c. For width:0px; height:0px; to be effective, img should be display:block.

# 2.gulp.js
## 1）准备工作：
导入会用到的node模块（包括gulp插件）

	const fs = require('fs');
	const path = require('path');
	const gulp = require('gulp');
	const browserSync = require('browser-sync').create();
	const del = require('del');
	const cssnext = require('postcss-cssnext');
	const $ = require('gulp-load-plugins')();//一起引用所有的带gulp的模块
	const minimist = require('minimist');
	const merge = require('merge-stream');
	const rollup = require('rollup').rollup;
	const buble = require('rollup-plugin-buble');
	const bowerResolve = require('rollup-plugin-bower-resolve');

设置一个全局变量cache:

	var cache;

设置环境变量为development:

	process.env.NODE_ENV = 'development';

导入上传服务器的路径配置文件 config.json:

	const config = require('./config.json');
## 2) serve阶段涉及任务
### （1）任务'mustache'：

#### 解析命令行参数得到argv变量值：{_:['serve'],i:'example.json',input:'example.json'}


	const knownOptions = {
	  string: 'input',
	  default: {input: 'example'},
	  alias: {i: 'input'}
	};
	
	const argv = minimist(process.argv.slice(2), knownOptions);

##### 详细说明：
当前你执行的命令行是：

	gulp serve -i example.json
	//example.json为默认值，你可以用自己的json文件替代即 gulp serve -i your-data-file-name.json

相关值结果为：
	
	process.argv: (type为Array)
	C:\Program Files\nodejs\node.exe,C:\Program Files\nodejs\node_modules\gulp\bin\gulp.js,serve,-i,example.json

	process.argv.slice(2): (type为Array)
	serve,-i,example.json

	argv:(type为object)
	{_:['serve'],i:'example.json',input:'example.json'}

	argv_:(type为Array)
	serve
	
	argv_[0] or taskName:(type为String)
	serve

	argv.i:(type为String)
	example.json

更多：

- minimist模块参见《node模块学习.md》2.
	
#### 得到taskName值
基于argv变量得到taskName值:"serve"：
	
	const taskName = argv._[0];//"serve"

#### 得到文章json数据文件的路径字符串变量articleDataFile值

拼接得到文章数据文件路径变量articleDataFile值：".../ig-template/data/example.json"：

type:String

	const articleDataFile = path.resolve(__dirname, 'data', argv.i + '.json');
### 得到footer.json文件
	const footerDataFile = path.resolve(__dirname, 'data', 'footer.json');
	const projectName = argv.i;//example.json

#### 定义读取json数据的函数readFilePromisified(filename)

	function readFilePromisified(filename) {
	  return new Promise(
	    function(resolve, reject) {
	      fs.readFile(filename, 'utf8', function(err, data) {
	        if (err) {
	          console.log('Cannot find file: ' + filename);
	          reject(err);
	        } else {
	          resolve(data);
	        }
	      });
	    }
	  );
	}

更多：
- fs模块详见《node模块学习.md》20.

#### 定义任务'mustache':生成.tmp/index.html
将

	gulp.task('mustache', function () {
	  const DEST = '.tmp';
	
		///读取两个文件(example.json和footer.json)的文件内容，存入promisedData数组中，promisedData[0]和[1]分别为两个文件内容
	  const dataFiles = [articleDataFile, footerDataFile];
	  const promisedData = dataFiles.map(readFilePromisified);//promisedData的type为数组
	
	  return gulp.src('./views/index.mustache')

			///将读取到的文件内容整合成数据对象 viewData
	    .pipe($.data(function(file) {
	      return Promise.all(promisedData)
	        .then(function(value) {//value即为promisedData数组
	           const jsonData = value.map(JSON.parse);//将value的两个元素——两个json字符串解析为两个对象，故jsonData为两个对象组成的数组
	           const viewData = jsonData[0];//jsonData[0]即example.json的数据对象作为viewData,viewData的type为object
	           viewData.footer = jsonData[1];//将jsonData[1]即footer.json的数据对象作为viewData的一个属性viewData.footer
	           viewData.projectName = projectName;//将projectName作为viewData的一个属性viewData.projectName
	           if (process.env.NODE_ENV === 'production') {//如果环境变量为生产环境
	              viewData.analytics = true;
	              viewData.iconsPath = config.icons;// "http://static.ftchinese.com/ftc-icons/"
	            }
	           return viewData;
	        });
	    }))   

	    .pipe($.mustache({}, {//gulp-mustache模块：用于将mustache模板渲染进入html
	      extension: '.html'
	    }))
	    .pipe($.size({//gulp-size模块：展示你的本项目文件的大小
	      gzip: true,
	      showFiles: true
	    })) 
	    .pipe(gulp.dest(DEST))
	    .pipe(browserSync.stream({once:true}));
	});



## 3）build阶段涉及任务
### （1）任务useref：优化html文件的script、css资源
将.tpm文件夹中的index.html文件优化其script后输入到dist文件夹中

	gulp.task('useref', () => {
	  return gulp.src('.tmp/index.html')
	    .pipe($.useref({searchPath: ['.tmp', 'data']}))
	    .pipe(gulp.dest('dist')); 
	});

#### gulp-useref模块
参见node模块学习 17.

### （2）任务html:smoosh我们的html文件
将dist/index.html先执行useref，再执行smoosh（即将html中的外部链接的css和js改为文本内嵌方式）

	gulp.task('html', gulp.series('useref', function smoosh () {
	  return gulp.src('dist/index.html')
	    .pipe($.smoosher())
	    .pipe(gulp.dest('dist')); 
	}));

####  gulp-smoosher模块
参见node模块学习 12.

### (3)任务extras:拷贝csv文件
将data/csv/中的csv文件拷贝到dist文件夹。

	gulp.task('extras', function () {
	  return gulp.src('data/csv/*.csv', {
	    dot: true//逗号保留，***待再确认***
	  })
	  .pipe(gulp.dest('dist'));
	});

### （4）任务images：压缩图片
将images/projectName/中的svg,png,jpg,jpeg,gif文件压缩后放到dist/images中。
***这是要在自己使用的时候新建一个images/projectName文件夹么，然后把自己需要的文件放到这里里面来？？***

	gulp.task('images', function () {
	  const SRC = 'images/' + projectName + '/*.{svg,png,jpg,jpeg,gif}';
	
	  return gulp.src(SRC)
	    .pipe($.imagemin({
	      progressive: true,
	      interlaced: true,
	      svgoPlugins: [{cleanupIDs: false}]
	    }))
	    .pipe(gulp.dest('dist/images'));
	});

关于gulp-imagemin插件详见《node模块学习.md》的16.

###  (5)任务clean：删除.tep、dist文件夹
把运行serve,build任务生成的.tep、dist文件夹删除掉。

	gulp.task('clean', function() {
	  return del(['.tmp', 'dist']).then(()=>{
	    console.log('.tmp and dist deleted');
	  });
	});

关于node原生模块del模块参见《node模块学习.md》21.

### （6）任务dev:设置环境变量为开发模式
将process.env.NODE_ENV赋值为"development"：

	gulp.task('dev', function() {
	  return Promise.resolve(process.env.NODE_ENV = 'development')
	    .then(function(value) {
	      console.log('NODE_ENV: ' + process.env.NODE_ENV);
	    });
	});

关于node的process对象：每个Node进程都有一个单例的全局process对象，由所有模块共同访问；process.env可以获取和设置环境变量。更多关于process参见<https://nodejs.org/docs/latest/api/process.html>或《Node.js实战》P291

关于ES6的Promise,详见《ES6学习.md》。

### (7)任务prod:设置环境变量为生产模式
将process.env.NODE_ENV赋值为"production"：

	gulp.task('prod', function() {
	  return Promise.resolve(process.env.NODE_ENV = 'production')
	    .then(function(value) {
	      console.log('NODE_ENV: ' + process.env.NODE_ENV);
	    });
	});


### (8)任务build:项目上传到服务器前要做的总任务。

顺序执行任务 prod,clean,(mustache,styles,rollup,images,extras)(这5个任务并行执行）,html,dev

	gulp.task('build', gulp.series('prod', 'clean', gulp.parallel('mustache', 'styles', 'rollup', 'images', 'extras'), 'html', 'dev'));

## 4）deploy阶段涉及任务
就是把处理好的文件发布到svn所在文件夹。
先在E:/myftwork/www/frontend/tpl/下创建ig-template的软连接，即这时E:/myftwork/www/frontend/tpl/下有一个ig-template的快捷方式。

故目录在E:/myftwork/www/frontend/tpl/special
### (1)任务'deploy:assets':
把dist/**/*.{csv,png,jpg,svg}拷贝到../ft-interact/projectName文件夹中。

	gulp.task('deploy:assets', function() {
	  return gulp.src(['dist/**/*.{csv,png,jpg,svg}'])
	    .pipe(gulp.dest(config.assets + projectName))
	});

附config.json内容：

	{
		"html": "../special/",/这些目录就是你svn的目录
		"assets": "../ft-interact/",
		"test": "../interact/",
		"imgPrefix": "http://interactive.ftchinese.com/images/",
		"icons": "http://static.ftchinese.com/ftc-icons/"
	}



### （2）任务'deploy:html':将主html文件进行一系列处理
将dist/index.html中的图片的资源加上路径前缀、并重命名为projectName.html，再将其进行压缩处理，最后拷贝到../special/projectName.html

	gulp.task('deploy:html', function() {
	  console.log(path.resolve(__dirname, config.html));//将路径片段字符串拼成一个完整路径
	  return gulp.src('dist/index.html')
	    .pipe($.prefix(config.imgPrefix))//将其中的图片资源的路径加前缀为 “http://interactive.ftchinese.com/images/”
	    .pipe($.rename({//gulp-rename模块:重命名文件为projectName.html
	      basename: projectName, 
	      extname: '.html'
	    }))
	    .pipe($.htmlmin({//gulp-htmlmin模块:压缩HTML
	      removeComments: true,//去掉注释
	      collapseWhitespace: true,//折叠空格
	      removeAttributeQuotes: true,//在可能的情况下，删除属性周围的引号
	      minifyJS: true,//压缩JS
	      minifyCSS: true//压缩CSS
	    }))
	    .pipe($.size({
	      gzip: true,
	      showFiles: true
	    }))
	    .pipe(gulp.dest(config.html));目标路径 "../special/"
	});

- node的path模块参见《node模块学习.md》3.
- __dirname:在任何模块文件内部,可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。参见
- gulp-prefix模块参见《node模块学习.md》14.
- gulp-rename模块参见《node模块学习.md》15.

### (3)任务'deploy':
顺序执行任务build,(deploy:assets,deploy:html)(这2个任务并行执行）

	gulp.task('deploy', gulp.series('build', gulp.parallel('deploy:assets', 'deploy:html')));

## 5）demos阶段涉及任务

### （1）任务'mustache:demos':


	gulp.task("mustache:demos", function() {
	  const DEST = '.tmp';
	  const dataFiles = [articleDataFile, footerDataFile];
	
	  const promisedData = dataFiles.map(readFilePromisified);
	
	  const dark = gulp.src('./views/index.mustache')
	    .pipe($.data(function(file) {
	      return Promise.all(promisedData)
	        .then(function(value) {
	           const jsonData = value.map(JSON.parse);
	           const viewData = jsonData[0];
	           viewData.footer = jsonData[1];
	           return viewData;
	        });
	    }))   
	    .pipe($.mustache({}, {
	      extension: '.html'
	    }))
	    .pipe($.rename({
	      basename: 'dark-theme'
	    }))
	    .pipe(gulp.dest(DEST));
	
	  const light = gulp.src('./views/index.mustache')
	    .pipe($.data(function(file) {
	      return Promise.all(promisedData)
	        .then(function(value) {
	           const jsonData = value.map(JSON.parse);
	           const viewData = jsonData[0];
	           viewData.footer = jsonData[1];
	           viewData.darkTheme = false;
	           viewData.lightTheme = true;
	           return viewData;
	        });
	    }))   
	    .pipe($.mustache({}, {
	      extension: '.html'
	    }))
	    .pipe($.rename({
	      basename: 'light-theme'
	    }))
	    .pipe(gulp.dest(DEST));
	
	  return merge(dark, light);
	});

# 3.CSS源码
## 1.现有包解析

### 1. o-color

### 2. o-grid


## 2. 手写scss
### 1. client/scss/_base.scss
#### (1)
##### scss
	body {
	  font-family: "Helvetica Neue", "Lucida Grande", Verdana, "PingFang SC", "PingFang TC", "Hiragino Sans GB", "Heiti SC", "Heiti TC", "WenQuanYi Micro Hei", "Microsoft YaHei", "Microsoft JhengHei", STHeiti, sans-serif;
	  margin: 0;
	  padding: 0;
	  @include oColorsFor(page);//引用混合器oColorsFor使用名为page的use case样式。
	}

###### css解析结果

	body {
	  font-family: "Helvetica Neue", "Lucida Grande", Verdana, "PingFang SC", "PingFang TC", "Hiragino Sans GB", "Heiti SC", "Heiti TC", "WenQuanYi Micro Hei", "Microsoft YaHei", "Microsoft JhengHei", STHeiti, sans-serif;
	  margin: 0;
	  padding: 0;
	  background-color: #fff1e0;
	  color: #333333;
	}

###### 说明
- 来自o-colors\src\scss\_use-cases.scss:
	
	$o-colors-usecases：
	（page:                     (background: 'pink', text: 'grey-tint5'),……）

- 来自o-colors\src\scss\_palette.scss:

	$o-colors-palette:
		('pink':                  #fff1e0,
		'grey-tint5':            #333333,……)

- @mixin oColorsFor($useCaseList, $propertyList: all)：使用某些use cases定义的属性的颜色值定义background-color、color和border-color属性。


#### (2)
##### scss

	[data-o-grid-container] {//属性选择器
	  position: relative;
	  box-sizing: border-box;
	  margin-left: auto;
	  margin-right: auto;
	  min-width: $o-grid-min-width;//默认为240px
	  max-width: $_o-grid-max-width;//默认为1220px
	  padding-left: oGridGutter();//一般为10px,页面类型>=M时为20px
	  padding-right: oGridGutter();
	
	  @include oGridRespondTo(M) {//该样式块仅应用到M型页面及以上,即页面宽度大于740px
	    padding-left: oGridGutter(M);//20px
	    padding-right: oGridGutter(M);//20px
	  }
	
	  @include oGridTargetIE8 {//该样式块仅应用到IE8页面
	    padding-left: oGridGutter($o-grid-fixed-layout);//即L时的栅格间距，即20px
	    padding-right: oGridGutter($o-grid-fixed-layout);
	    width: oGridGetMaxWidthForLayout($o-grid-fixed-layout, $grid-mode: 'fixed');//L型页面在fixed模式下可取到的最大宽度,即980px
	  }
	}

###### css

	[data-o-grid-container] {
	  position: relative;
	  box-sizing: border-box;
	  margin-left: auto;
	  margin-right: auto;
	  min-width: 240px;
	  max-width: 1220px;
	  padding-left: 10px;
	  padding-right: 10px;
	}
	
	@media (min-width: 46.25em) {//16px=1em,故M的760px=46.25em
	  [data-o-grid-container] {
	    padding-left: 20px;
	    padding-right: 20px;
	  }
	}
	
	@media \0screen {//IE hack方法，\0screen是仅IE8识别
	  [data-o-grid-container] {
	    padding-left: 20px;
	    padding-right: 20px;
	    width: 980px;
	  }
	}

##### 说明
- $o-grid-min-width: 240px !default
- $_o-grid-max-width: map-get($o-grid-layouts, nth($_o-grid-layout-names, -1))：其值默认为最大的layout宽度（即o-grid-layouts中XL的值1220px）;
- @funciton oGridGutter($layout-name: default)：获取某种页面类型的间隔，
- 页面间隔Map:

			$o-grid-gutters: (
				default: 10px,
				M:       20px,
			) !default;

- @mixin oGridRespondTo($from: false, $until: false)：将样式运用到给定范围尺寸的页面类型上
- @mixin oGridTargetIE8:针对IE8的样式混合器
- $o-grid-layouts:

		$o-grid-layouts: (
			S:  490px,  // column-width: 30px, inner width: 470px
			M:  740px,  // column-width: 40px, inner width: 700px
			L:  980px,  // column-width: 60px, inner width: 940px
			XL: 1220px, // column-width: 80px, inner width: 1180px
		) !default;

- $o-grid-fixed-layout:当栅格有为fixed模式时，默认的layout值为L

		 $o-grid-fixed-layout:'L' !default;

- @function oGridGetMaxWidthForLayout($layout-name, $grid-mode: $o-grid-mode) :获取某一页面类型在不同栅格模式(fixed,snappy or fluid)下中可取到的最大宽度980px
- 16px=1em,故M的760px=46.25em

#### （3）
##### scss:

	[data-o-grid-row] {
		  display: flex;//弹性盒
		  flex-wrap: wrap;//横向可换行
		
		  margin-left: -1 * oGridGutter();//-10px
		
		  @include oGridRespondTo(M) {//针对>=M型的页面
		    margin-left: -1 * oGridGutter(M);//-20px
		  }
		
		  @include oGridTargetIE8 {//针对IE8
		    margin-left: -1 * oGridGutter($o-grid-fixed-layout);//-20px
		  }
	}
##### css:

	[data-o-grid-row] {
	  display: -webkit-box;//目测是通过postcss-cssnext插件为这些css加了前缀
	  display: -ms-flexbox;
	  display: flex;
	  -ms-flex-wrap: wrap;
	      flex-wrap: wrap;
	  margin-left: -10px;
	}
	
	@media (min-width: 46.25em) {
	  [data-o-grid-row] {
	    margin-left: -20px;
	  }
	}
	
	@media \0screen {
	  [data-o-grid-row] {
	    margin-left: -20px;
	  }
	}
#### (4)

	[data-o-grid-col] {
	  position: relative;
	  box-sizing: border-box;
	  flex: 1 1 0%;
	  padding-left: oGridGutter();
	
	  @include oGridRespondTo(M) {
	    padding-left: oGridGutter(M);
	  }
	
	  @include oGridTargetIE8 {
	    padding-left: oGridGutter($o-grid-fixed-layout);
	  }
	}


##### 说明
- flex属性：其是flex-grow flex-shrink flex-basis的简写，flex-grow定义项目放大比例;flex-shrink定义项目的缩小比例；flex-basis定义了在分配多余空间前，项目占据的主轴空间

#### （5）

	[data-o-grid-col] {
	  position: relative;
	  box-sizing: border-box;
	  flex: 1 1 0%;
	  padding-left: oGridGutter();
	
	  @include oGridRespondTo(M) {
	    padding-left: oGridGutter(M);
	  }
	
	  @include oGridTargetIE8 {
	    padding-left: oGridGutter($o-grid-fixed-layout);
	  }
	}

##### css

	[data-o-grid-col] {
	  position: relative;
	  box-sizing: border-box;
	  -webkit-box-flex: 1;
	      -ms-flex: 1 1 0%;
	          flex: 1 1 0%;
	  padding-left: 10px;
	}
	
	@media (min-width: 46.25em) {
	  [data-o-grid-col] {
	    padding-left: 20px;
	  }
	}
	
	@media \0screen {
	  [data-o-grid-col] {
	    padding-left: 20px;
	  }
	}
