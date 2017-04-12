###  browser-sync
<https://www.npmjs.com/package/browser-sync>

文档：<http://www.browsersync.cn/>

Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。更重要的是 Browsersync可以同时在PC、平板、手机等设备下进项调试。您可以想象一下：“假设您的桌子上有pc、ipad、iphone、android等设备，同时打开了您需要调试的页面，当您使用browsersync后，您的任何一次代码保存，以上的设备都会同时显示您的改动”。无论您是前端还是后端工程师，使用它将提高您30%的工作效率。

API

#### （1） .create([name])
创建一个Browsersync实例。

- name:String类型，一个标识符，可用于撤回该实例

eg:

	// create an unnamed instance
	var bs = require("browser-sync").create();
	
	// create a named instance
	var bs = require("browser-sync").create('My server');
	
	
	// create multiple
	var bs1 = require("browser-sync").create('Server 1');
	var bs2 = require("browser-sync").create('Server 2');

#### (2) bs.get( name )
通过名称获取一个单个的实例。

####（3）bs.init(config,cb)
开始一个Browsersync服务。这会启动一个服务器，一个代理，或者一个你自己的代码片段。

**init方法就纯粹启动一台静态服务器，自动给你打开浏览器，就是localhost，不会发挥浏览器实时同步的作用。要想发挥其实时同步的作用，就得需要reload()或stream()方法**

**reload()和stream()使用场景对比说明：**

- 文件本身改变就刷新的就reload，比如图片，文件变化了直接刷新就行了，没有中间操作。刚好reload就仅仅是刷新浏览器，不会做额外的操作。eg:

		gulp.watch('client/**/*.{csv,svg,png,jpg}', browserSync.reload);

- 文件改变了得重新启动编译过程，编译完了才能允许浏览器刷新，比如sass和js，就用通知机制stream()。

		......
		.pipe(xx)	
		.pipe(gulp.dest(DEST))
    	.pipe(browserSync.stream({once:true}));

##### 参数config
object类型。可以有如下属性：

- server：使用内置的静态服务器创建基本的HTML/ JS / CSS的网站。

		// Serve files from the app directory
		server: "app"
		
		// Serve files from the current directory
		server: true
		
		// Serve files from the app directory with directory listing
		server: {
		    baseDir: "app",
		    directory: true
		}
		
		// Multiple base directories
		server: ["app", "dist"]
		
		// Serve files from the app directory, with a specific index filename从应用程序目录中提供文件，指定特定文件名为索引
		server: {
		    baseDir: "app",
		    index: "index.htm"
		}
		
		// Since version 1.2.1
		// The key is the url to match
		// The value is which folder to serve (relative to your current working directory)
		server: {
		    baseDir: "app",//服务器的根目录，比如index.html上面的一些资源可以直接以app为根目录写
		    routes: {
		        "/bc": "bower_components"
		    }//其他资源可以到bower_components路径中找，写这些资源的src的适合可以以/bc开头
		}

- proxy:代理一个已存在的虚拟主机。Type: String | Object | Boolean
-  port:端口数值。Type: Number，Default: 3000


#### （4）bs.reload(arg)
该 reload 方法会通知所有的浏览器相关文件被改动，要么导致浏览器刷新，要么注入文件，实时更新改动。

#####  参数arg
Type: String | Array | Object [optional]

一个或多个文件被重新加载。

	// 浏览器重载
	bs.reload();
	
	// 单个文件重载
	bs.reload("styles.css");
	
	// 多个文件重载
	bs.reload(["styles.css", "ie.css"]);
	
	// 在2.6.0里 - 通配符来重新加载所有的CSS文件 
	bs.reload("*.css");

#### (5)bs.stream(opts)
该stream方法返回一个变换流。

用法eg:

	// 编译SASS且自动注入到浏览器
	gulp.task('sass', function () {
	    return gulp.src('scss/styles.scss')
	        .pipe(sass({includePaths: ['scss']}))
	        .pipe(gulp.dest('css'))
	        .pipe(bs.stream());
	});
	
	// 提供 `once: true` 限制每个流重装一次
	gulp.task('templates', function () {
	    return gulp.src('*.jade')
	        .pipe(jade())
	        .pipe(gulp.dest('app'))
	        .pipe(bs.stream({once: true}));
	});
	
	// 提供过滤器以被重新加载阻止不需要的文件
	gulp.task('less', function () {
	    return gulp.src('*.less')
	        .pipe(less())
	        .pipe(gulp.dest('css'))
	        .pipe(bs.stream({match: "**/*.css"}));
	});
