# ftc-icons
<https://github.com/FTChinese/ftc-icons>

 安装步骤（已实操）

1. nvm use 6.2.2
2. npm install
3. npm rm gulp --save-dev
4. npm install "gulpjs/gulp#4.0" --save-dev
5. bower install
6. gulp serve

PS:现在安装不需要进行bower和gulp#4.0的全局安装了，因为已经安装好了。

## 1. README.md
### Install
1. 通过执行bower install按照bower.json中指明的包安装ftc-icons。

2. 在gulp.js中，使用'browser-sync'来指明ftc-icons的路径：

		 browserSync.init({
	        server: {
	          baseDir: ['.tmp'],
	          routes: {
	            '/bower_components': 'bower_components'
	          }
	        }
	      });


3. 因为有了2.所以可以在main.scss中直接通过：

		@import "ftc-icons/main.scss"

4. 预览demos,运行：

		 gulp serve

### Usage
#### Mixins
- @mixin oIconsSassvg($icon-name, $color:null, $container-width: 20, $container-height: null, $apply-base-styles: true): 该混合器的产生使用了gulp-sassvg。该混合器使得SVG文件被转换为uri，且被直接插入到css文件中。
- @mixin oIconsGetSvg($icon-name, $container-width: 20, $container-height: null, $apply-base-styles: true):该混合器规定使用svg文件作为背景，并且有png文件作为后背方案（即在浏览器不支持svg的时候使用png图片）
- @mixin oIconsSvgSprite($icon-name, $color: null, $width: 20, $height:null)：该混合器为引用计算机图形学碎片的svg设置了样式。

#### 直接使用SVG文件
压缩过的SVG图标文件在文件夹ftc-icons/svg下。

#### 直接使用PNG文件
PNG文件也是使用SVGs制作的，然后放置在ftc-icons/png下。

#### 使用SVG sprite
你可以使用sprited svg 文件，它在sprites/ftc-icons-symbol.svg。这个文件聚合了所有的单独的svg图标，并将它们每个都放在一个symbol元素中。每个symbola元素都有一个id，其值是按照单独的svg文件的名字来的（不带.svg后缀，如：id="arrow-left")。在你的HTML中，你可以这样使用id碎片来插入icons：

	<svg>
	    <use xlink:href="sprite/ftc-icons-symbol.svg#brand-ftc" />
	</svg>

#### 如果你不直接使用svg或png文件，那么就提前设置好颜色

	'brand-color': #ffcc99,
	'social-wechat': #609700,
	'social-weibo': #e6162d,
	'social-linkedin': #0977b6,
	'social-facebook': #3c5a99,
	'social-twitter': #6aa9e0,
	'rss': #FB9E3C,

#### gulp指令
- gulp sassvg:在scss/sassvg下产生_sassvg-data.scss和_sassvg.scss文件。
- gulp svgsprite:将单独的SVG放入symbol元素中，并将它们都置于一个单独的SVG文件sprite/ftc-icons-symbol.svg中
- gulp svgpng:生产压缩的svg并相应地生成png文件
- gulp social：生产具有不同形状的不同icons
- gulp white:生产每个图标的白色版本

## 2. gulp.js

### 1）任务sassvg: 压缩、处理svg文件，生成包含有用的混合器和函数的scss文件，这些混合器和函数用于对这些svg文件进行样式处理

	gulp.task('sassvg', function() {
	  return gulp.src('src/**/*.svg')
	    .pipe($.svgmin())//压缩svg文件
	    .pipe($.cheerio({//以xml方式解释文件，并使用jQuery的核心方法处理该文件
	      run: function($, file) {
	        $('rect').remove();
	        $('path').removeAttr('fill')
	      },
	      parserOptions: {
	        xmlMode: true
	      }
	    }))
	    .pipe($.sassvg({
	      outputFolder: 'scss/sassvg',
	      optimizeSvg: true
	    }));
	});

#### 说明：
- $.svgmin方法，来自gulp-svgmin插件，用于压缩svg文件。详见《node模块学习.md》21.
- $.cheerio方法，来自gulp-cheerio插件，cheerio是为服务器特别定制的，小型、快速、优雅的jQuery核心实现。详见《node模块学习.md》22.
- $.sassvg方法，来自gulp-sassvg插件，用于获取svg文件，然后基于它们生成一些sass混合器，后面可在你自己的项目的scss中用于创建修饰background-images。见《node模块学习.md》23.

#### 插曲1：自己动手创建项目验证sasssvg模块的作用
1. 新建文件夹，命名为ftcionsLearn
2. 新建文件gulpfile.js,写入代码：

		const gulp=require('gulp');
		const $=require('gulp-load-plugins')();
		
		gulp.task('sassvg',function(){
			return gulp.src('src/**/*.svg')
					.pipe($.svgmin())
					.pipe($.cheerio({
						run:function($,file){
							$('rect').remove();
							$('path').removeAttr('fill');
						},
						parserOptions:{
							xmlMode:true
						}
					}))
					.pipe($.sassvg({
						outputFolder:'scss/sassvg',
						optimizeSvg:true
					}))
			})

3. 在命令行中cd到ftcionsLearn文件，执行

		npm init

	完成package.json文件的生成
4. 安装gulp4.0,执行

		npm install "gulpjs/gulp#4.0" --save-dev

5. 再安装其他有用到的包，执行

		npm install gulp-load-plugins gulp-svgmin gulp-cheerio gulp-sassvg --save-dev

6. 准备好要用到的素材svg文件，即在ftcionsLearn文件夹下新建src\social-icons\...一系列svg文件。
7. 准备好sassvg任务生成文件放置的文件夹，即在ftcionsLearn文件夹下新建scss\sassvg

#### 插曲2：svg文件是怎么生成的？
安装inkscape软件。

官网<https://inkscape.org/en/>

绘好图后保存即得到svg代码

### 2）常量svgStore: 创建一个整合了多个pipe步骤的方法svgStore


	const svgStore=lazypipe()//创建一个不变的，初始化不费劲的pipeline
		.pipe($.svgmin)
		.pipe($.cheerio,{
			run:function($,file){
				$('rect').remove();
				$('path').removeAttr('fill');
			},
			parserOptions:{
				xmlMode:true
			}
		})
		.pipe($.svgstore);//通过< symbol > 元素将svg文件整合到一个文件中

#### 说明：
- lazypipe()方法，来自lazypipe模块,用于从一系列流中，创建一个不变的，初始化不费劲的pipeline。其专为复用一部分pipeline设计。详见《node模块学习.md》24. 
- svgstore方法，来自gulp-svgstore模块，通过< symbol > 元素将svg文件整合到一个文件中。详见《node模块学习.md》25. 

### 3) 任务svgsprite:使用symbol元素创建一个svg sprite

	gulp.task('svgsprite', function() {
	  const DEST = '.tmp/sprite';
	
	  return gulp.src(['src/*.svg', 'src/social-icons/*.svg'])
	    .pipe(svgStore())
	    .pipe($.rename({basename: 'all-icons'}))
	    .pipe(gulp.dest(DEST));
	});
- $.rename()方法，来自gulp-rename模块，用于重命名文件。详见《node模块学习.md》15. 

#### 小插曲：gulp相关插件安装
要安装gulp-load-plugins：这仅仅是为了方便引用其他gulp插件。

还要分别安装各种gulp插件，如gulp-svg/gulp-svgstore。

**只安装gulp-load-plugins，不安装其他gulp插件是不行的。**

### 4）任务socialsprite：同3）,只不过只针对social-icons

	gulp.task('socialsprite', function() {
	  const DEST = '.tmp/sprite';
	
	  return gulp.src(['src/social-icons/*.svg'])
	    .pipe(svgStore())
	    .pipe($.rename({basename: 'social-icons'}))
	    .pipe(gulp.dest(DEST));
	});

### 5)任务oftenused:同3）4）,只不过只针对三个常用的icons

	gulp.task('oftenused', function() {
	  const DEST = '.tmp/sprite';
	
	  return gulp.src(['src/arrow*.svg', 'src/cross.svg', 'src/hamburger.svg'])
	    .pipe(svgStore())
	    .pipe($.rename({basename: 'arrow-hamburger-cross'}))
	    .pipe(gulp.dest(DEST));
	});

### 6）任务svgpng:生成单独的svg和png文件

	gulp.task('svgpng', function() {
	  const svg = '.tmp/svg';
	  const png = '.tmp/png';
	  return gulp.src('src/*.svg')
	    .pipe($.svgmin())
	    .pipe(gulp.dest(svg))
	    .pipe($.svg2png()) //将svg转换成png文件
	    .pipe(gulp.dest(png));
	});

#### 说明
- svg2png()方法：来自gulp-svg2png模块,用于将svg文件转换为png文件。详见《node模块学习.md》26. 

### 7）任务social：生成social-icons的三种版本的svg和png文件
 
	
	gulp.task('social', function() {

	  ///常量social函数：生成social-icons的原版透明底svg和png文件
	  const social = gulp.src('src/social-icons/*.svg')
	    .pipe($.svgmin())
	    .pipe($.cheerio({
	      run: function($, file) {
	          var rect = $('rect').remove();
	          var bgColor = rect.attr('fill');
	          $('path').attr('fill', bgColor);//使用被移除的rect元素的fill属性值给path元素的fill复制，eg.微信该颜色值是#609700
	        },
	      parserOptions: {
	        xmlMode: true
	      }
	    }))
	    .pipe(gulp.dest('.tmp/svg'))
	    .pipe($.svg2png())
	    .pipe(gulp.dest('.tmp/png'));
		
	  ///常量roundHollow函数：生成social-icons的圆形背景svg和png文件,并让生成的文件名为：原名-round-hollow
	  const roundHollow = gulp.src('src/social-icons/*.svg')
	    .pipe($.svgmin())
	    .pipe($.cheerio({
	      run: function($, file) {
	          $('rect').attr('rx', '50%').attr('ry', '50%');//保留rect,设置其path的rx和ry都为50%
	        },
	      parserOptions: {
	        xmlMode: true
	      }
	    }))
	    .pipe($.rename(function(path) {
	      path.basename += '-round-hollow'
	    }))
	    .pipe(gulp.dest('.tmp/svg'))
	    .pipe($.svg2png())
	    .pipe(gulp.dest('.tmp/png'));
	
	  ///常量hollow函数：生成social-icons的正方形背景的svg和png文件，并让生成的文件名为：原名-hollow
	  const hollow = gulp.src('src/social-icons/*.svg')
	    .pipe($.svgmin())//就没有cheerio那一步，直接保留了rect
	    .pipe($.rename(function(path){
	      path.basename += '-hollow'
	    }))
	    .pipe(gulp.dest('.tmp/svg'))
	    .pipe($.svg2png())
	    .pipe(gulp.dest('.tmp/png'));
	
	  return merge(social, roundHollow, hollow)//将这几个流合并为一个流
	});

#### 说明
- merge-stream模块:创建一个流，其是从其他的多个流合并起来发射事件。详见《node模块学习.md》27.
- gulp-rename模块:可以轻松地重命名文件。详见《node模块学习.md》15.
- rect元素：为SVG预定义的形状元素，指矩形，有以下属性：
	- width/height:矩形的高度和宽度
	- fill:定义矩形的填充颜色
	- stroke-width:定义矩形的边框宽度
	- stroke:定义矩形的边框颜色
	- x：定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
	- y：定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
	- rx/ry:可使矩形产生圆角。


### 8)任务white:生成所有图标的白色path的svg和png文件

	gulp.task('white', function() {
	  return gulp.src(['src/*.svg', 'src/social-icons/*.svg'])
	    .pipe($.svgmin())
	    .pipe($.cheerio({
	      run: function($, file) {
	        $('rect.background').remove();//移除class为background的rect元素 哪些图标是这样子的？？？
	        $('path').attr('fill', '#ffffff');//设置path的颜色为baise 
	      },
	      parserOptions: {
	        xmlMode: true
	      }      
	    }))
	    .pipe($.rename(function(path) {
	      path.basename += '-white';//重命名为 原名-white
	    }))
	    .pipe(gulp.dest('.tmp/svg/white'))
	    .pipe($.svg2png())
	    .pipe(gulp.dest('.tmp/png/white'));
	});

#### 说明：
- path:为SVG预定义的形状元素,<path>标签用来定义路径。详见《SVG学习.md》

### 9）任务fav:


	gulp.task('fav', function() {
	  return gulp.src('src/brand-ftc-square.svg')//就是FT中文网那个粉红底黑字"FT中文网”的正方形图标
	    .pipe($.svg2png(2))//先转换为png格式，因为$.favicons接收的是png图片，且将其放大2倍,这样像素才够
	    .pipe($.favicons({
	      appName: 'icons',
	      background: '#FFCC99',//即FT粉
	      icons: {
	        android: false,              // Create Android homescreen icon. `boolean`
	        appleIcon: true,            // Create Apple touch icons. `boolean`：这里会自动生成一堆苹果图标，生成的图标的尺寸是由
	        appleStartup: false,         // Create Apple startup images. `boolean`
	        coast: false,                // Create Opera Coast icon. `boolean`
	        favicons: true,             // Create regular favicons. `boolean`
	        firefox: false,              // Create Firefox OS icons. `boolean`
	        opengraph: false,            // Create Facebook OpenGraph image. `boolean`
	        twitter: false,              // Create Twitter Summary Card image. `boolean`
	        windows: false,              // Create Windows 8 tile icons. `boolean`
	        yandex: false                // Create Yandex browser icon. `boolean`
	      }
	    }))
	    .pipe(gulp.dest('.tmp/favicons'));
	});


另需安装 

	npm install gulp-favicons --save-dev

/* 以下是 demo tasks */

### 10）任务clean:清理掉.tmp文件中的所有东西

	gulp.task('clean', function() {
	  return del(['.tmp/**']).then(()=>{
	    console.log('Old files deleted');
	  });
	});

- then是ES6的Promise对象的东西，故其前面的del（）必然是返回了一个Promise对象。更多关于Promise对象参见<http://es6.ruanyifeng.com/#docs/promise>
- pipe是node的东西非ES6的东西
- yeild是ES6的东西：待学习，引申需要看corporate-challenge
- 文件路径的*知识点  ***待查资料学习***

### 11）任务mustache：读取指定路径下的文件，然后渲染模板

	gulp.task('mustache', function() {
	  var folders = [
	    'src',
	    'src/social-icons'
	  ];
	
	  var template = 'demo/index.mustache';
	  

	  ///函数getFileNames（folder)：返回指定路径下每个文件名形成的Promise对象
	  function getFileNames(folder) {
	
	    return new Promise(function(resolve, reject) {//创建一个新的Promise
	      fs.readdir(folder, function(err, files) {//读取目录下的文件名，files为目录下的文件名数组
	        if (err) {
	          reject(err);
	        };
	
	        var filenames = files
	        .filter(function(file) {
	          return path.extname(file) === '.svg'
	        })//对文件名数组files进行过滤，只留下扩展名为.svg的文件名
	        .map(function(file) {
	          return file.slice(0, -4);//截取文件名字符串中(0,-4)的，即去掉了后缀名
	        });
	        resolve(filenames);//返回两组 文件名
			//console.log('filenames:  '+ filenames);
	      });
	    });
	  }
	
	  ///对于folders中的两个路径分别执行getFileNames函数
	  var promisedFileNames = folders.map(getFileNames);//返回两个Promise对象
	  //console.log('promisedFileNames: '+ promisedFileNames);

	  ///
	  return Promise.all(promisedFileNames)///将这两个Promise对象拼成一个Promise对象
	  .then(function(fileNames) {
	    gulp.src(template)
	      .pipe($.mustache({
	        ftcicons: fileNames[0],
	        socialicons: fileNames[1]
	      }, {
	        extension: '.html'
	      }))
	      .pipe(gulp.dest('.tmp'))
	      .pipe(browserSync.stream({once: true}));    
	  })
	  .catch(function(reason) {
	    console.log('Failed because: ' + reason);
	  });
	});

若两处console.log有用，则最后打印出的是：

	promisedFileNames:[object Promise],[object Promise]
	filenames:social-facebook,social-linkedin,social-twitter……
	filenames:arrow-down,arrow-downwards,arrow-left……
	
***问题：为什么后面的console.log比前面的先出来？***
#### 说明
- fs.readdir(path[,options],callback):读取目录下的内容。回调函数获取两个参数err和files，其中files为该目录中的文件名称去除'.'和'..'后组成的数组。《node模块学习.md》20.
- path.extname(path)：返回路径文件的扩展名，详见《node模块学习.md》3.
- Array.filter()方法：对数组中的每一项运行给定函数，该函数返回true的项组成的数组。
- Array.map()方法：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
- console.log 


