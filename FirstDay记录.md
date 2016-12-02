# 07-01
## 收藏夹重要连接

- svn使用教程 <http://www.cnblogs.com/armyfai/p/3985660.html>
- gulp详细入门教程 <http://www.ydcss.com/archives/18>
- gulp中文API介绍<http://www.ydcss.com/archives/424>
- node.js API中文版<http://nodeapi.ucdok.com/#/api/>
- nodejs文档<https://nodejs.org/docs/latest/api/path.html>
- ES6入门电子书<http://es6.ruanyifeng.com/#docs/promise>


## 待问问题：
1. 有没有gulp及其相关插件（如gulp-load-plugins）的API文档？
2. 关于gulpfile.js中每个任务的具体功能说明？
3. backyard.corp/www.corp/github上的NEXT-master的区别?
	- NEXT-master的NEXT只有前端内容
4. 网站的文件目录结构？

# 07-04
## 安装
安装sass说明文档<http://caibaojian.com/sass-less-stylus.html>

装sass插件之前要安装ruby

## npm全局安装路径

C:/用户/bonnie.wang/AppData/Roaming/npm

## bower.json文件内容

	{
	  "name": "academy",
	  "private": true,
	  "dependencies": {
	    "jquery": "^3.0.0",
	    "modernizr": "^3.3.1",
	    "o-grid": "^4.2.0",
	    "o-colors": "^3.4.1",
	    "ftc-icons": "^2.0.2",
	    "dom-delegate": "^2.0.3",
	    "animate.css": "^3.5.2"
	  }
	}

## nvm安装，管理不同版本node
<https://github.com/coreybutler/nvm-windows>

**一定要装在默认路径下！！！**

node版本查看

<https://nodejs.org/dist/>
## 先要熟悉的git上的代码
<https://github.com/ftc-editorial/ig-template>

<https://github.com/ftc-editorial/numbers>

FTChinese里面 ftc-， next- 开头的都是卫国哥写的，你可以先看看都是怎么用的

## gulp学习资源
<http://gulpjs.com/>

gulp4.0的doc<https://github.com/gulpjs/gulp/tree/4.0/docs>

- recipes目录里面都是例子

## node包学习资源
<https://www.npmjs.com/>

每个node package直接找到看文档用法就好了


## subline Text 3
1. 安装subline Text 3

安装包下载<https://www.sublimetext.com/3>

2. 安装package control
  	1. View > Show Console 菜单打开控制台
  	2. 粘贴以下代码回车后安装：
  			
			import  urllib.request,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();urllib.request.install_opener(urllib.request.build_opener(urllib.request.ProxyHandler()));open(os.path.join(ipp,pf),'wb').write(urllib.request.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
	3. 然后tools里面就有"Package Control" 和"Package Setting"选项了。


3. 安装Sublime Text 3 常用插件安装：

- AutoFileName:Autocomplete Filenames
- BracketHighlighter: Bracket and tag highlighter
- Bracket Guard: immediately highlights incorrect brackets.
- FT Origami: auto-completion and co
lour highlighting
- Git Gutter: see git diff in gutter

打开Subline Text 3命令行:Tools→Command Palette/或快捷键Ctrl+Shift+P

打开左侧文件栏：Tools→Command Palette→View→View:Toggle Open Files in Side Bar
 
如何优雅地利用 subline Text 3 <http://www.jianshu.com/p/3cb5c6f2421c>


# 0705

## 关于ig-template的结构说明
- client：按照mvc结构,存放静态文件
- demos:一个示例
- model:存放数据
- views:存放模板，mustache模板（很简单，看看就知道了）

## node模块学习
<https://www.npmjs.com/>

参见文件 node模块学习.md


## ES6学习

### 1. promise对象
<http://es6.ruanyifeng.com/#docs/promise>

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。

下面代码创造了一个Promise实例。

	var promise = new Promise(function(resolve, reject) {
	  // ... some code
	
	  if (/* 异步操作成功 */){
	    resolve(value);
	  } else {
	    reject(error);
	  }
	});
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。

	promise.then(function(value) {
	  // success
	}, function(error) {
	  // failure
	});


#### promise.All
Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。

	var p = Promise.all([p1, p2, p3]);

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

下面是一个具体的例子。

## gulp4.0安装
卫国哥写的ig-template等需要gulp4.0才能看。

如果安装过全局的 gulp 的话先卸载之

	$ npm uninstall gulp -g

安装全局的 gulp 4.0

	$ npm install "gulpjs/gulp#4.0" -g

到项目目录里删掉本地的 gulp

	$ npm rm gulp --save-dev

安装本地的 gulp 4.0

	$ npm install "gulpjs/gulp#4.0" --save-dev
 	

## windows上怎么把Subline命令弄到系统路径里面

<https://scotch.io/tutorials/open-sublime-text-from-the-command-line-using-subl-exe-windows>

这样子就可以直接在命令行里操控Subline了。

## windows的包管理器安装

<https://chocolatey.org/packages>

windows上的包管理器，类似于Linux的apt，mac的brew，多用这个安装软件。

npm是node的包管理工具，该包管理器是操作系统的包管理工具。

该包管理器可以安装火狐chrome什么的操作系统用的工具，还有各种开发用的命令行工具，node都可以用他安装，如果不用nvm的话。

# 0706

## subl.exe的使用
详见 <https://scotch.io/tutorials/open-sublime-text-from-the-command-line-using-subl-exe-windows>
### 作用：
通过命令行打开sublime

### 常用指令
#### (1)用sublime Text 3打开文件或文件夹
先cd到所在文件夹，再输入：

	subl.exe file_name/ folder_name


#### (2)在当前sublime text窗口打开文件或文件夹
先cd到所在文件夹，再输入：

	suble.exe file_name/ folder_name --add

## 安装chocolatey

set-executionpolicy remotesigned

## ft的origami前端组件网站

<http://origami.ft.com/>

<https://github.com/Financial-Times>

<https://github.com/ftlabs>

<http://ft-interactive.github.io/>

## 为audio添加手动拖动按钮
修改文件：myftwork/www/frontend/tpl/phpne/radio.html

行数记录：

- js:654
- html:453
- css:331

## 收获：

### 1.禁用苹果的长按显示弹窗功能

给相关区域的CSS加上：

	-webkit-user-select: none;
    -webkit-touch-callout: none;  

### 2.移动端长按元素后，元素出现阴影，解决办法

	*{
        -webkit-tap-highlight-color:rgba(255,255,255,0);
       }

### 3.移动端滑动事件

使用touchstart,touchmove,touchend事件结合使用，作用和电脑端mousedown,mousemove,mouseup事件类似。

ps：这几个事件要用addEventListener,不能用jQuery的$().on('touchsart',func)，更不能用$().touchstart()。

eg:

	 //拖放调整进度条：触摸控制
      try{
        document.getElementById('manual-btn').addEventListener('touchstart',function(){
          var $that=$(this);
          progressLocation=event.pageX-postionFather.offsetLeft-50;
          if($that.hasClass('draggable')&&(progressLocation>=0)&&(progressLocation<=totalLength)){
            $dragging=$that;
          }
          else{
            $dragging=null;
          }
        },false);
        document.getElementById('progress-wrap').addEventListener('touchmove',function(event){
          if($dragging!==null){
            progressLocation=event.pageX-postionFather.offsetLeft-50;
            if((progressLocation>=0)&&(progressLocation<=totalLength)){
              $audioProgress.css('width',progressLocation+'px');//控制已播放进度条的长度
              $dragging.css('left',(progressLocation-20)+"px");
              totalTime=$('#audio-source')[0].duration;
              //console.log('totalLength:'+totalLength+' totalTime:'+totalTime);
              nowCurrentTime=(progressLocation/totalLength)*totalTime;
              $('#audio-source')[0].currentTime=nowCurrentTime;//设置播放点
            }
          }
        },false);
        document.addEventListener('touchend',function(event){
          $dragging=null;
        },false);
      }catch(error){
        console.log(error.message);
      };
### 4. clientX/clientY是MouseEvent,而pageX/pageY是UIEvent

即touch事件不会获得clientX/clientY。

移动端获touch事件获得触摸点的位置使用event.changedTouches[0].clientX/clientY,不要使用event.pageX/pageY，因为安卓手机的event.pageX/pageY获取的数值不对。

## 超哥建的账号密码
账号：bonnie.wang
密码：123456

# 0707
## 接0706"为audio添加手动拖动按钮"任务
## 学习网站首页的滑动事件写法
	网站首页文件为：myftwork/otherImportantPage/main.js
# 0708

## 继续完善、修改0706"为audio添加手动拖动按钮"任务


# 0709

## Windows PowerShell官方文档
<https://msdn.microsoft.com/en-us/powershell/scripting/powershell-scripting>

## ig-template打开步骤
1. (C:\Users\Administrator>）nvm install 6.3.0
2. (C:\Users\Administrator>）nvm use 6.3.0
3. 进入目标文件夹(E:\myftLearnPages\ig-template)
4. (E:\myftLearnPages\ig-template>)npm install
5. (E:\myftLearnPages\ig-template>)npm install bower -g
6. (E:\myftLearnPages\ig-template>)npm install bower
7. (E:\myftLearnPages\ig-template>)npm uninstall gulp -g
8. (E:\myftLearnPages\ig-template>)npm rm gulp
9. (E:\myftLearnPages\ig-template>)npm install "gulpjs/gulp#4.0" -g
10. (E:\myftLearnPages\ig-template>)npm install "gulpjs/gulp#4.0" --save-dev
11. (E:\myftLearnPages\ig-template>gulp serve  

# 0710

## 关于ig-template的结构说明
- client：按照mvc结构,存放静态文件
- demos:一个示例
- model:存放数据
- views:存放模板，mustache模板（很简单，看看就知道了）

###  1. client：
按照mvc结构,存放静态文件。包含:
- images文件夹:存放图片
- js文件夹：存放一堆.js文件
- scss文件夹：存放一堆.scss文件

#### mvc框架
MVC全名Model View Controller，是模型(model)-视图(view)-控制器(controller)的缩写。一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。

M是指业务模型，V是指用户界面，C则是控制器，使用MVC的目的是将M和V的实现代码分离，从而使同一个程序可以使用不同的表现形式。比如一批统计数据可以分别用柱状图、饼图来表示。C存在的目的则是确保M和V的同步，一旦M改变，V应该同步更新。

#### scss中存放scss文件
sass学习：

sass中文网<http://www.sass.hk/input-sass.html>（已看）

sass英文文档<http://sass-lang.com/documentation/file.SASS_REFERENCE.html>


### 2.model
两个json文件：

- example.json:文章内容相关数据
- footer.json:下部链接标题数据

### 3.view 
存放mustache模板

mustache.5手册：<http://mustache.github.io/mustache.5.html>

## 每日词汇积累
- lambda n.匿名函数
- callable adj.可调用的
- invoke vt.调用
- literal adj.文字的，照字面上的
- invert vt 使转化，使颠倒
- caret n.脱字符号(^)
- bang n.感叹号
- newline n.换行符
- compile vt.编译
- delimiter n.定界符，分隔符
- contrive vt.设计，发明

# 0711
## 1. 继续看ig-template的gulp.js

笔记继续整理到《node模块学习》中。
### .bowerrc文件
内容为：

	{
	  "directory": "bower_components",
	  "registry": {
	    "search": [
	        "http://registry.origami.ft.com",
	        "https://bower.herokuapp.com"
	    ]
	  }
	}

规定了下载bower_components的路径。先是从<http://registry.origami.ft.com>这个伦敦的网站加载，找不到的话再从<https://bower.herokuapp.com>加载。

o-开头的sass库是伦敦写的，ftc-开头的是卫国哥写的。

## 2.新任务：
看origami网站，从首页开始看。

伦敦的源码可以先看看 o-color, o-grid, o-share。

## 每日词汇积累：
- hyphenate vt.用连字符号连接
- equal sign n.等号
- aliase n.别名
- map vt.隐射
- plumber n.管道工
- compile vt.编译
- compiler n.编译器
- compatible adj.兼容的
- whilst conj.虽然，当，同while
- retrieval n.恢复，取回
- identifier n.标识符
- proxy n.代理
- snippet n.小片，片段

# 0712
## 1.继续看继续看ig-template的gulp.js

笔记继续整理到《node模块学习》中。


## 每日词汇积累
- minify vt.使变小，压缩
- compress vt./vi.压缩
- bundle vt.捆
- interlace vt./vi.使交错，使交织
- lossless adj.无损的
- pend v.悬而未决，悬挂
- pending adj.挂起的，未决的，搁置的，暂停的
- deploy vt.vi.n.配置，部署，展开
- prefix n.前缀 vt.加前缀
- override vt.覆盖
- regular expression n. 正则表达式
- match against 匹配（正则表达式）
- collapse vt.折叠，使坍塌
- strip vt.剥去
- unify vt.统一，使一致
- unified adj.统一的，同一标准的
- branding n.品牌化
- origami n.折纸手工，折纸手工品
- aspire vi.渴望，立志，追求 aspire to do sth 渴望去做某事
- bits of 一片片
- formed adj.成形的
- come with 拿出
- look and feel 观感
- interface n.界面

# 0713
## 1.学习Origami网站

## 2.o-colors模块
### 2.1使用方式
### （1）安装o-colors
执行：

	 bower install

结果：

就会自动将o-color、o-assets、ftc-icons、ftc-share等库安装到名为bower_components文件夹下。

### （2）写一个sass主文件

写一个 main.scss，放到client/scss下：

eg:
	
	//首先导入sass库(已安装于bower_components下）
	@import "o-colors/main";
	@import "o-grid/main";
	
	@import "ftc-icons/main";
	@import "ftc-share/main";
	
	//再导入自己写的sass文件（这些文件放在main.scss的当前目录下）
	@import "colors";
	@import "var-mixins";
	@import "base";
	@import "header/main";
	@import "components/main";
	@import "footer/main";

### （3）自己写gulpfile.js
在这个文件里面定义一个能够编译sass的任务：


eg:

	gulp.task('styles', function styles() {
	  const DEST = '.tmp/styles';
	
	  return gulp.src('client/scss/main.scss')//寻找这个main.scss@import的资源是先在该main.scss文件所在目录下找，然后再去includePaths规定的目录（此处为bower_components文件夹)下寻找
	    .pipe($.changed(DEST))
	    .pipe($.plumber())
	    .pipe($.sourcemaps.init({loadMaps:true}))
	    .pipe($.sass({//编译sass
	      outputStyle: 'expanded',
	      precision: 10,
	      includePaths: ['bower_components']
	    }).on('error', $.sass.logError))
	    .pipe($.postcss([
	      cssnext({
	        features: {
	          colorRgba: false
	        }
	      })
	    ]))
	    .pipe($.size({
	      gzip: true,
	      showFiles: true
	    }))
	    .pipe($.sourcemaps.write('./'))
	    .pipe(gulp.dest(DEST))
	    .pipe(browserSync.stream({once:true}));browserSync.stream():
	});

执行该任务：

	gulp style

结果：

.tpm/styles里面就有了真正的css文件

## （4）在html中引入css文件
将编译好的css文件引入到html中。即真正引入的是css而非sass文件。

eg:

	//index.html
	<link rel="stylesheet" type="text/css" href="styles/main.css">
 
然后这个html文件中就可以用这个main.css里面自己写的样式，如o-header之类的
## 每日词汇积累
- interface n.接口，界面
- comply vi.遵守，顺从 comply with 遵守，照做
- degrade vt.使降级，使分解
- degrade gracefully 优雅降级
- interoperable adj.彼此协作的，互通性的，能共同使用的
- registry n.注册表
- a range of  一系列，一些
- third parties 第三方
- tutorial n.指南
- conform to 符合，遵照
- general purpose 通用的
- great looking 最好的，美观的
- bundle n.束，捆 vt.捆
- subresource n.子资源
- disposable adj.可自由使用的，可任意处理的
- customizable adj.可定制的
- inflexible adj.不可弯曲的，缺乏灵活的
- palette n.调色板
- use case 用例
- property n.属性
- gradient adj.渐变的
- A is built into B A内置于B

# 0714
## 1.继续o-colors学习
学习了其源码，笔记参见《Origami学习》

## 2.按照英文文档学习SASS

## 3.修复图片尺寸bug
Github/ftchinese/NEXT/app/scripts/main.js的imgLoad函数

### 1. Window.devicePixelRatio
window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。

公式表示就是：window.devicePixelRatio = 物理像素 / dips。

非视网膜屏幕的iphone上，屏幕物理像素320像素，独立像素也是320像素，因此，window.devicePixelRatio等于1.

而对于视网膜屏幕的iphone，如iphone4s, 纵向显示的时候，屏幕物理像素640像素。同样，当用户设置<meta name="viewport" content="width=device-width">的时候，其视区宽度并不是640像素，而是320像素，这是为了有更好的阅读体验 – 更合适的文字大小。


## 每日词汇积累
- precedence n.优先，优先级
- comprise vt.包含
- dash n.连接号
- prioritise vt.给予...优先权，按优先顺序处理
- nest vt.嵌套 nested adj.嵌套的
- indented adj.缩进式的
- indentation n.缩进
- terseness n.简洁
- conciseness n.简明，简洁
- semicolon n.分号
- chunk n.大块
- advanced features 高级功能
- customizable adj.定制化的
- arithmetic n.算法
- hyphen n.连字号
- underscore n.下划线
- interchangeably adv.可交换地

# 0715

## 1. 协助市场部修改欢迎信内容
先登录<http://backyard.ftchinese.com/>

用户名： editorial

密码：falconft

进入登录界面后，在输入：

用户名：bonnie.wang

密码：bonnie.wangftchinese

进入方式 Marketing and AD→Admin Welcome Letter→

### 1. welcome1.html
- 244行：（已完成）
	- “市场”改为“创新经济”
	- href改为http://www.ftchinese.com/channel/innovation.html
	- width由72改为81
- 319行：（已完成）
	- 图片改为feng.png：需修改变量$letter.headcut
- 284行：
	- 中取出来的文字要改为128年，需要修改$letter_body,从这里修改<http://backyard.ftchinese.com/falcon.php/homepage/edit/welcomeletter>(已完成）
- 289行：（已完成）
	- “新手指南”链接修改：a的href由"http://www.ftchinese.com/channel/guide.html?ccode=1X130529"改为"http://www.ftchinese.com/interactive/7083"
- 373行：（已完成）
	- 删除第一个专题“名家解读”
- 385行：（已完成）
	- FT专栏作家信息修改：需要修改$letter.encolumn_table***这里作家的介绍长短不一，会不会影响美观？***
- 404行：（已完成）
	- FT中文网专栏作家信息修改：需要修改$letter.cncolumn_table，老愚照片由http://i.ftimg.net/picture/0/000052140_piclink.jpg修改为http://i.ftimg.net/picture/9/000052139_piclink.jpg
- 426行：（已完成）
	- 读者有话说修改：需要改$letter.read***这里挺有问题的，$letter.read显示有问题***
- 438行：（需要后台新增变量）
	- 新增“我的FT"专题（已做好html框架，具体文字数据需要后端修改）***这里需要后台数据库新增一个变量***
- 487行：（已完成）
	- 作家殊荣信息修改：需要改$letter.award
- ***自己发现的问题：（已完成）***
	- 左侧关于王丰的介绍也要改为128吧：修改变量$testimony

welcome1除了图片和“我的FT”需要后台新增变量以外，其他都好了。	
### 2. welcome2.html
- 235行：（已完成）
	- “市场”改为“创新经济”
	- href改为http://www.ftchinese.com/channel/innovation.html
	- width由72改为81
- 275行：（已完成）
	- 邮件主体内容修改：修养改$letter.letter_body，即几处专题报道名称及其链接、“展现商务人士..."几句话及其链接。(未做，后端修改）***该处我自己为 数据新闻频道 加了《》，以保持和其他频道的一致。
- 289行：（已完成）
	- “新手指南”链接修改：a的href由"http://www.ftchinese.com/channel/guide.html?ccode=1X130529"改为"http://www.ftchinese.com/interactive/7083"
- 308行：（已完成）
	- 王丰照片更新：$letter.headcut需要修改

- 366行开始：（除照片外已完成）
	- 373行：1-创新经济，原“新中坚力量”去掉，$letter.product_1需要修改，img由http://i.ftimg.net/picture/4/000052144_piclink.jpg改为http://i.ftimg.net/picture/5/000063895_piclink.jpg
	- 377行：2- 数据新闻，原“艺术投资”去掉，$letter.product_2需要修改，img由http://i.ftimg.net/picture/9/000037789_piclink_293_67.jpg改为http://i.ftimg.net/picture/7/000063897_piclink.jpg
	- 390行：3-高端视频，原“尚乐街”调整到第5个栏目，$letter.product_3需要修改，原为“乐尚街”相关信息，高端视频的img为http://i.ftimg.net/picture/4/000031124_piclink_293_67.jpg
	- 394行：4-秒懂，原“高端视频”调整到第3个栏目，需要修改，$letter.product_4原为高端视频，img由http://i.ftimg.net/picture/4/000031124_piclink_293_67.jpg改为http://i.ftimg.net/picture/6/000063896_piclink.jpg
	- 408行：5-乐尚街：原“与FT共进午餐”调整到第6个，需要修改，$letter.product_5原为与FT共进午餐，这里有些代码直接写到了前端。(product_5直接写在html中，需要在后台添加该变量）乐尚街img为http://i.ftimg.net/picture/2/000031122_piclink_293_67.jpg
	- 427行：6-与FT共进午餐：原有色眼镜去掉，需要修改，$letter.product_5原为与有色眼镜，这里有些代码直接写到了前端。(product_6直接写在html中，需要在后台添加该变量）与FT共进午餐的img为http://i.ftimg.net/picture/3/000031123_piclink_293_67.jpg
- 464行：(已完成）
	- 去掉多余“者”字：$letter.contact需要修改
- 254行：
	- 将右侧的主编介绍调到和上面对齐：width由440改为420
在这看效果 <http://www.corp.ftchinese.com/m/email/welcome2.html>

welcome2.html除图片和需要添加到后台的变量就都好了。

### 3.welcome3.html
- 233行：（已完成）
	- “市场”改为“创新经济”
	- href改为http://www.ftchinese.com/channel/innovation.html
	- width由72改为81
- 276行：（已完成）
	- 邮件主体内容修改：需要改$letter.letter_body
- 291行：（已完成）
	- “新手指南”链接修改：a的href由"http://www.ftchinese.com/channel/guide.html?ccode=1X130529"改为"http://www.ftchinese.com/interactive/7083"
- 315行：（已完成）
	- 王丰照片更新：需要修改$letter.headcut
- 354行：（已完成）
	- 微信二维码图片更改：需要修改$letter.ad
- 391行开始(已完成）
	- 专题介绍文章及其链接修改：需要修改$letter_product1（该每日英语图片由http://i.ftimg.net/picture/6/000063856_piclink.jpg改为http://i.ftimg.net/picture/8/000063908_piclink.jpg）,$letter_product3,$letter_product4（该ft商学院图片由http://i.ftimg.net/picture/7/000031347_piclink_293_67.jpg改为http://i.ftimg.net/picture/9/000063909_piclink.jpg）
- 447行：(已完成）
	- 去掉多余“者”字：需要修改$letter.contact	

### 4.welcome4.html
- 245行：（已完成）
	- “市场”改为“创新经济”
	- href改为http://www.ftchinese.com/channel/innovation.html
	- width由72改为81
- 303行：（已完成）
	- “新手指南”链接修改：a的href由"http://www.ftchinese.com/channel/guide.html?ccode=1X130529"改为"http://www.ftchinese.com/interactive/7083"
	
- 388行：（已完成，可能要作为变量添加到后台）
	- FT中文网商学院板块修改为和“与Apple的深度合作”类似的格式。
	 ***觉得这里的链接似乎有点问题，“热点观察”和“互动小测”没有单独的入口页面吗？这俩链接直接是总的页面，起码给“互动小测”加个id，使得跳转过来后直接呈现在页面最上方的应该是“互动小测”***
	- [立即体验]（直接在html中添加了代码，具体在484行）
- 610行：（已完成)
	- 去掉多余“者”字：需要修改$letter.contact	
- 265行：
	- 将右侧的主编介绍调到和上面对齐：width由440改为420
待corp看效果，corp打不开。

### 5.welcome5.html
- 245行：（已完成）
	- “市场”改为“创新经济”
	- href改为http://www.ftchinese.com/channel/innovation.html
	- width由72改为81
- 288行：（已完成）
	- 邮件主体内容修改：需要改$letter.letter_body
- 303行：（已完成）
	- “新手指南”链接修改：a的href由"http://www.ftchinese.com/channel/guide.html?ccode=1X130529"改为"http://www.ftchinese.com/interactive/7083"	
- 341行：（已完成）
	- 张延的话的修改：需要修改$letter.testimony。
- 401行开始：（已完成)
	- 修改活动结束栏目下的4块：需修改$letter.product_1,$letter.product_2,$letter.product_3,$letter.product_4。
		- $letter.product_1的img由http://i.ftimg.net/picture/8/000031908_piclink_293_67.jpg修改为http://i.ftimg.net/picture/3/000063863_piclink.jpg
		- $letter.product_2的img由http://i.ftimg.net/picture/9/000031909_piclink_293_67.jpg修改为http://i.ftimg.net/picture/4/000063864_piclink.jpg
		- $letter.product_3的img由http://i.ftimg.net/picture/4/000051864_piclink.jpg修改为http://i.ftimg.net/picture/1/000063861_piclink.jpg
		- $letter.product_4的img由http://i.ftimg.net/picture/5/000051865_piclink.jpg修改为http://i.ftimg.net/picture/2/000063862_piclink.jpg
	
- xx行：（已完成)
	- 去掉多余“者”字：需要修改$letter.contact	
## 每日词汇积累
- incredible adj.难以置信的，惊人的
- revert vt.vi.重提，回复原状


# 0718
## 1.继续配合市场部修改欢迎邮件

## 2.帆总讲解谷歌分析用于检测网站流量

参考页面：E:/Github/ftchinese/NEXT/app/templates/partials/nav.html

# 0719
## 1.继续配合市场部


# 0720
## 1.完成市场部email修改任务

## 2.广告位h5文件路径配置

### 资料
- E:/myftwork/300*600 
- Home Page<https://www.accenture.com/cn-zh/success-american-express-mobile-banking?c=ad_gichinamtFY16_10000066&n=bac_0716>
- ROS <https://www.accenture.com/cn-zh/success-american-express-mobile-banking?c=ad_gichinamtFY16_10000067&n=bac_0716>

### 放置路径
- 图片：myftwork/dev_www/frontend/static/img/AD


## 3. 继续学习Sass
笔记参见SASS学习.md。


## 每日词汇积累
- in general 通常地，一般来说
- directive n.指示，指令
- parenthese n.圆括号
- plain adj.平的，简单的，朴素的，清晰的
- trailing adj.后面的
- look up 查阅，查找
- parallel n.类似的事情，平行线
- syntactically adv.句法上
- arbitrary adj.任意的
- indistinguishable adj.不能区别的
- interpolate vt. 插入

# 721
## 1.继续学Sass
## 2.修改了welcome页面市场部反馈的几个问题。
## 每日词汇积累
- arithmetic n.算术，算法
- relational operator n.关系运算符
- division n.除法
- subtraction n.减法
- unary adj.一元的
- tricky adj.狡猾的，棘手的，微妙的，难以捉摸的
- precedence n.优先级
- valid adj.有效的
- hyphen n.连字号
- digit n.数字
- literal adj.文字的
- in turn 轮流，依次
- concatenate vt.连接
- likewise adv.同样地，也
- hue n.色彩，色度
- saturation n.饱和度
- lightness n.亮度
- concise adj.简明的，简洁的
- omit vt.省略，遗漏
- dash n.连接号
- underscore n.下划线
- compound adj.复合的，混合的 n.混合物
- nesting n.嵌套
- assign to 指派，分配给
- directive n.指示，指令
- As such,... 像这样的，同样地
- alongside adv.在旁边

#0722

## 1.继续学Sass
笔记见SASS学习.md

## 2.继续学习ig-template所涉及的Origami
笔记见Origami学习.md

开始学习 o-grid


## 每日词汇积累
- bubble up 往上冒泡
- burden n.负担
- duplication n.复制，副本
- beneath prep.adv 在...之下，在下方
- day-to-day adj.日常的，逐日的
- substantial adj.大量的，实质的，内容充实的
- resort to 依靠，求助于
- token n.表征，记号
- live off 依赖
- lay out 展示，安排
- gutter n.沟槽

# 0723
## 1.在家里重新运行ig-template

cd 到该目录下：E:/myftLearnPages/ig-template

npm install

bower install

## 2.学习origami的o-grid
看o-grid的document
<http://registry.origami.ft.com/components/o-grid@4.2.0>

# 0724

## 1.继续学习o-grid

## 每日词汇积累
- snappy adj. 厉声说话的，爽快的
- snap v.突然折断，对齐
- compact adj.紧凑的
- simplicity n. 简易
- For simplicity,......
- fixed adj.固定的，确定的，定点
- prune vi.vt 删除，减少
- fetch vt.vi 拿来，取来

# 0725 
## 1.继续学习o-grid
看完了sass-mq/_mq.scss的源码，详见 Origami学习.md。

## 2.继续看ig-template
看新版，Github/ftGitLearn/ig-template。

从build开始看，着手整理 ig-template学习整理.md。并将涉及到的新gulp插件的学习笔记整理到 SASS学习.md。

## 每日词汇积累

- exclusively adv.唯一地，专有地
- rasterize vt.光栅化，点阵化
- ubiquitous adj.普遍存在的，无所不在的
- stakeholder n.利益相关者，股东
- concatenate  vt.连接，使连锁 adj.连结的，连锁的


# 0726
## 1.继续看新版ig-template


## 2.windows创建软连接
在cmd里面输入:

	mklink /j Link Target

eg:

	mklink /j E:\mytest E:\myftwork\mytest

这样就为E:\myftwork\mytest在E:\下面创建了一个快捷方式mytest。

更多资料:

<https://zh.wikipedia.org/wiki/%E7%AC%A6%E5%8F%B7%E9%93%BE%E6%8E%A5>

<https://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/>

## 3.接收市场部欢迎信修改新需求的任务

## 每日词汇积累
- if any 若有的话，如果有
- respectively adv.分别地，各自地
- mutually adv.互相地
- exclusive adj.排外的，专一的
- caption n.标题，字幕
- asset n.资源，资产 pl→assets
- junction n.连接，接合点

# 0727
## 1.欢迎信新修改
### 1.welcome1.html
- 359行：（已完成）
	- 官方微信号图片修改链接：需要修改变量$letter.ad，其href由http://www.ftchinese.com/修改为http://www.ftchinese.com/m/corp/follow.html
- 384行：（已完成）
	- 调整三个人物顺序，路西·凯韦拉放到第三个：需修改$letter.encolumn_table,
- 403行：
	- 老愚换成张铁志：需修改$letter.cncolumn_table。该板块由代码
			
			<td width="186" valign=top style="font-size:14px;">
			<a href="http://www.ftchinese.com/column/007000020#adchannelID=1600" target="_blank" style="font-size:12px;color:#050505;text-decoration:none;"><img src="http://i.ftimg.net/picture/9/000052139_piclink.jpg" width=186 height=67 border=0></a>
			<div style="height:8px;font-size:3px;"><br></div>
			<a href="http://www.ftchinese.com/column/007000020#adchannelID=1600" target="_blank" style="font-size:12px;color:#050505;text-decoration:none;"><b>老愚</b></a>
			<div style="height:8px;font-size:3px;"><br></div>
			<a href="http://www.ftchinese.com/column/007000020#adchannelID=1600" target="_blank" style="font-size:12px;color:#050505;text-decoration:none;"><div style="font-size:12px;line-height:140%;">陕西扶风人，毕业于复旦大学中文系，媒体人，社会观察家。曾倡导新散文革命，著有《世纪末的流浪》（与张力奋合作）《蜜蜂的午后》《正午的秘密》，最新出版专栏合集《在和风中假寐》。 </a><br></div>
			<div style="height:8px;font-size:3px;"><br></div>
			<a href="http://www.ftchinese.com/story/001067291" target="_blank"  style="color:#000;text-decoration:none;font-size:12px;">我所接受的大学教育</a>
			<div style="height:4px;font-size:1px;"><br></div><a href="http://www.ftchinese.com/story/001066095" target="_blank"  style="color:#000;text-decoration:none;font-size:12px;">一个“地主”家族的结局</a>
			<div style="height:4px;font-size:1px;"><br></div><a href="http://www.ftchinese.com/story/001066217"  target="_blank" style="color:#000;text-decoration:none;font-size:12px;">返乡见闻录</a>
			<div style="height:8px;font-size:3px;"><br></div>
			<div align=right><a href="http://www.ftchinese.com/column/007000020#adchannelID=1600"  target="_blank" style="color:#000;text-decoration:none;font-size:12px;"><b>[更多]</b></a></div>
			</td>

		改为：

			<td width="186" valign=top style="font-size:14px;">
			<a href="http://www.ftchinese.com/column/007000059#adchannelID=1600" target="_blank" style="font-size:12px;color:#050505;text-decoration:none;"><img src="http://i.ftimg.net/picture/8/000064048_piclink.jpg" width=186 height=67 border=0></a>
			<div style="height:8px;font-size:3px;"><br></div>
			<a href="http://www.ftchinese.com/column/007000059#adchannelID=1600" target="_blank" style="font-size:12px;color:#050505;text-decoration:none;"><b>张铁志</b></a>
			<div style="height:8px;font-size:3px;"><br></div>
			<a href="http://www.ftchinese.com/column/007000020#adchannelID=1600" target="_blank" style="font-size:12px;color:#050505;text-decoration:none;"><div style="font-size:12px;line-height:140%;">台湾文化与政治评论人，现为新媒体“报导者”共同创办人兼总主笔。历任香港《号外》杂志总编辑、《彭博商业周刊中文版》总主笔、《周末画报》主笔。著有《声音与愤怒》等。</a><br></div>
			<div style="height:8px;font-size:3px;"><br></div>
			<a href="http://www.ftchinese.com/story/001065825" target="_blank"  style="color:#000;text-decoration:none;font-size:12px;">小清新与台湾大选</a>
			<div style="height:4px;font-size:1px;"><br></div><a href="http://www.ftchinese.com/story/001065590" target="_blank"  style="color:#000;text-decoration:none;font-size:12px;">不会再回来的生猛中国</a>
			<div style="height:4px;font-size:1px;"><br></div><a href="http://www.ftchinese.com/story/001066523"  target="_blank" style="color:#000;text-decoration:none;font-size:12px;">台湾：威权统治的漫长阴影</a>
			<div style="height:8px;font-size:3px;"><br></div>
			<div align=right><a href="http://www.ftchinese.com/column/007000059#adchannelID=1600"  target="_blank" style="color:#000;text-decoration:none;font-size:12px;"><b>[更多]</b></a></div>
			</td>

		***这里我自己添加了总连接<http://www.ftchinese.com/column/007000059#adchannelID=1600>是张铁志“时代的噪音”专栏链接，对不对？？？***
	- 徐瑾和张铁志的顺序换一下。
- 489行：
	- 笑蜀的获奖时间由2016年改为2015年：需修改$letter.awards
	- 作家殊荣链接更新：丁学良href由http://www.ftchinese.com/column/007000058?ccode=1X130129（为张奋力）改为http://www.ftchinese.com/column/007000010#adchannelID=1600
	- 龚刃韧href由http://www.ftchinese.com/column/007000020?ccode=1X130129改为http://www.ftchinese.com/search/?keys=%E9%BE%9A%E5%88%83%E9%9F%A7&ftsearchType=type_news
	- 笑蜀href由http://www.ftchinese.com/column/007000008?ccode=1X130129改为http://www.ftchinese.com/search/?keys=%E7%AC%91%E8%9C%80&type=default&category=
- 516行：
	- 修改更多主题邮件内容：需修改$letter.product_1,product_2,product_4
- 568行：
	- td的width由180px改为190px，table的width由150px改为180px
- 573行：
	- 删去的腾讯微博：

				  <td>
					<a href="http://e.t.qq.com/ftchinese" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/6/000031296_piclink_24_24.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="腾讯微博"></a>
			      </td>
	- QQ空间href由http://user.qzone.qq.com/622006290改为http://ftchinese.qzone.qq.com/，图片由http://i.ftimg.net/picture/2/000031292_piclink_24_24.jpg改为http://i.ftimg.net/picture/7/000064037_piclink.jpg
	- 领英的href由https://www.linkedin.com/company/ft%E4%B8%AD%E6%96%87%E7%BD%91改为"http://www.linkedin.com/company/ft中文网"，图片由http://i.ftimg.net/picture/6/000052146_piclink.jpg改为http://i.ftimg.net/picture/5/000064035_piclink.jpg
	- 新增Facebook，图片为http://i.ftimg.net/picture/4/000064034_piclink.jpg
	- Twitter,图片为http://i.ftimg.net/picture/8/000064038_piclink.jpg

	***感觉这块几个图标风格不够一致***
- 623行：
	- 改为2016年
	
### 2.welcome2.html
- 213行：
	- 修改标题：需修改$letter.letter_title，由“专题报道与高端访谈视频”修改为“特色频道与专题报道”
- 276行：
	- 添加达沃斯等：需修改$letter.letter_body
- 341行：
	- 修改二维码图片：需修改$letter.ad，href由http://www.ftchinese.com/改为http://www.ftchinese.com/m/marketing/intelligence.html，img由http://i.ftimg.net/picture/2/000051862_piclink.jpg改为http://i.ftimg.net/picture/2/000064052_piclink.jpg
- 468行：
	- 修改相关内容：需修改$letter.contact
- 568行：
	- td的width由180px改为190px，table的width由150px改为180px
- 516行：
	- 修改社交网站链接，原为：
		
			<td>
				<a href="http://weibo.com/ftchinese" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/8/000031298_piclink_24_24.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="新浪微博"></a>
				</td>
				<td>
				<a href="http://e.t.qq.com/ftchinese" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/6/000031296_piclink_24_24.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="腾讯微博"></a>
				</td>
				<td>
				<a href="http://user.qzone.qq.com/622006290" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/2/000031292_piclink_24_24.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="QQ空间"></a>
				</td>
				<td>
				<a href="http://www.ftchinese.com/m/corp/follow.html" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://static.ftchinese.com/img/wechat48.png" style="border: 0 none; display: block;" width="24" height="24" alt="微信"></a>
				</td>
				<td>
				<a href="https://www.linkedin.com/company/ft%E4%B8%AD%E6%96%87%E7%BD%91" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/6/000052146_piclink.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="linkedin"></a>
				</td>

		同letter1,修改为：

			 	<td>
                  <a href="http://www.ftchinese.com/m/corp/follow.html" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://static.ftchinese.com/img/wechat48.png" style="border: 0 none; display: block;" width="24" height="24" alt="微信"></a>	
				</td>
                <td>
                   <a href="http://weibo.com/ftchinese" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/8/000031298_piclink_24_24.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="新浪微博"></a>
                </td>
                 <td>
                    <a href="http://ftchinese.qzone.qq.com/" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/7/000064037_piclink.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="QQ空间"></a>
                 </td>
                 <td>
                     <a href="https://twitter.com/FTChinese" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/8/000064038_piclink.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="Twitter"></a>
                  </td>
                  <td>
                     <a href="https://www.facebook.com/financialtimeschinese" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/4/000064034_piclink.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="Facebook"></a>
                  </td>
				  <td>
                      <a href="http://www.linkedin.com/company/ft中文网" style="text-decoration: none; font-size: 12px; display: block;" target="_blank"><img src="http://i.ftimg.net/picture/5/000064035_piclink.jpg" style="border: 0 none; display: block;" width="24" height="24" alt="linkedin"></a>
                  </td>
- 555行：
	- 改为2016年

### 3.welcome3
- xx行：
	- $letter.ad的图由http://i.ftimg.net/picture/5/000063855_piclink.jpg改为http://i.ftimg.net/picture/0/000064060_piclink.jpg，href由http://www.ftchinese.com/改为http://www.ftchinese.com/channel/english.html
- 374行：
	- “专题介绍”改为“每日英语”
- 391行：
	- “每日英语”改为“双语阅读”：需修改$letter.product_1。***我自己把href由http://www.ftchinese.com/channel/english.html改为http://www.ftchinese.com/channel/ce.html***
- 397行：
	- 商学院排名改为“金融英语速度”：需将$letter.product_2的内容换成$letter.product_3的内容，且去掉简介部分，且把标题“金融速读”改为“金融英语速度”。
	
		去掉的商学院排名，即原$letter.product_2的内容为：

			<div style="height:5px;font-size:3px;"><br></div>
			<a href="http://rankings.ft.com/businessschoolrankings/rankings?ccode=1X130329"  target="_blank" style='display:block;border:0 none;text-decoration:none;padding:0;margin:0;'><img src="http://i.ftimg.net/picture/5/000031345_piclink_293_67.jpg" width=293 height=67 border=0 style='display:block;line-height:140%;'></a><div width=293 style="width:293px;margin:0;padding:0;height:4px;font-size:3px;background:#9E2F50;"><br></div>
			<div style="height:5px;font-size:3px;"><br></div>
			<b><a href="http://rankings.ft.com/businessschoolrankings/rankings?ccode=1X130329"  target="_blank" style="color:#070707;text-decoration:none;font-weight:bold;line-height:140%;">英国《金融时报》商学院排名</a></b>
			<div style="height:5px;font-size:3px;line-height:140%;"><br></div>
			<div style="font-size:12px;"><a href="http://www.ftchinese.com/story/001062063?ccode=1X130329" target="_blank"  style="color:#070707;text-decoration:none;line-height:140%;">FT公布2015年高管教育课程排名</a><br>
			<a href="http://www.ftchinese.com/story/001060309?ccode=1X130329" target="_blank"  style="color:#070707;text-decoration:none;line-height:140%;">2015年FT全球MBA排行榜出炉</a><br>
			<a href="http://www.ftchinese.com/story/001059387?ccode=1X130329"  target="_blank" style="color:#070707;text-decoration:none;line-height:140%;">FT 2014年欧洲商学院排行榜出炉</a></div><br>
			<div align=right><a href="http://rankings.ft.com/businessschoolrankings/rankings?ccode=1X130329"  target="_blank" style="color:black;text-decoration:none;font-size:12px;"><b>[更多]</b></a></div>

- 412行：
	- 改为“原声视频”：需修改letter.product_3,这里***我自己为总链接修改为"http://www.ftchinese.com/channel/ev.html"对不对呢？？***
	- 其img由http://i.ftimg.net/picture/6/000031346_piclink_293_67.jpg改为http://i.ftimg.net/picture/1/000064061_piclink.jpg
- 418行：
	- 改为“FT英语电台”：需修改letter.product_4
	- 原letter.product_4为"FT商学院",代码为：

			<div style="height:5px;font-size:3px;"><br></div>
			<a href="http://www.ftchinese.com/channel/mba.html" target="_blank"  style='display:block;border:0 none;text-decoration:none;padding:0;margin:0;'><img src="http://i.ftimg.net/picture/9/000063909_piclink.jpg" width=293 height=67 border=0 style='display:block;line-height:140%;'></a><div width=293 style="width:293px;margin:0;padding:0;height:4px;font-size:3px;background:#9E2F50;"><br></div>
			<div style="height:5px;font-size:3px;"><br></div>
			<b><a href="http://www.ftchinese.com/channel/mba.html" target="_blank"  style="color:#070707;text-decoration:none;font-weight:bold;line-height:140%;color:#111;">FT商学院</a></b>
			<div style="height:5px;font-size:3px;"><br></div>
			<div style="font-size:12px;"><a style="color:#666666;text-decoration:none;line-height:140%;">这里是一个系统学习和了解金融和管理知识的平台，每一堂用10分钟的时间为您阐明一个关键的商业知识。</a><br><br>
			<a href="http://www.ftchinese.com/interactive/1851" target="_blank" style="color:#070707;text-decoration:none;line-height:140%;">一战爆发100年</a><br>
			<a href="http://www.ftchinese.com/interactive/1825"  target="_blank" style="color:#070707;text-decoration:none;line-height:140%;">经济学家杨小凯</a><br>
			<a href="http://www.ftchinese.com/interactive/1814" target="_blank"  style="color:#070707;text-decoration:none;line-height:140%;">“解禁集体自卫权”</a></div><br>
			<div align=right><a href="http://www.ftchinese.com/channel/mba.html"  target="_blank" style="color:black;text-decoration:none;font-size:12px;"><b>[更多]</b></a></div>
		
		***我自己把总链接修改为"http://www.ftchinese.com/channel/radio.html"，不知道对不对？？？***
    - 其img由http://i.ftimg.net/picture/9/000063909_piclink.jpg改为http://i.ftimg.net/picture/2/000064062_piclink.jpg
- 447行：
	- 修改“更多主题邮件”板块：需修改$letter.contact
- 500行：
	- 修改社交网站链接，同之前的几封信。
- 551行：
	- 改为2016

### 4.letter4
- 366行：
	- 二维码修改为eBook or Pic：需修改$letter.ad,href由http://www.ftchinese.com/改为http://www.ftchinese.com/m/marketing/ebook.html  图片由“http://i.ftimg.net/picture/2/000051862_piclink.jpg"改为http://i.ftimg.net/picture/3/000064053_piclink.jpg
	- 第二个二维码删去，第二个二维码原为
			<a href="http://app.ftchinese.com/androidmobile.html" target="_blank"><img src=http://i.ftimg.net/picture/2/000040282_piclink.jpg width=228 height=87 style="border:1px solid #beb39e;"></a>
- 386行：
	- 由“FT中文网商学院”改为“iOS系统”
	- href由"http://www.amazon.cn/s/ref=nb_sb_noss_2?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Ddigital-text&field-keywords=FT%E4%B8%AD%E6%96%87%E7%BD%91"改为"http://app.ftchinese.com/#utm_campaign=9J160615&utm_source=marketing&utm_medium=campaign"
- 416-426行：
	- “热点观察”改为“iPhone",href由"http://www.ftchinese.com/channel/mba.html"改为"https://itunes.apple.com/cn/app/ftchinese-for-mobile/id443870811?mt=8&ls=1"
	- 图片由“http://i.ftimg.net/picture/7/000063857_piclink.jpg”改为"http://i.ftimg.net/picture/4/000064054_piclink.jpg"
- 448-452行：
	- “MBA训练营”改为“iPad App”，href由"http://www.ftchinese.com/channel/mbagym.html"改为"https://itunes.apple.com/cn/app/ftchinese-com-financial-times/id396124008?mt=8"
	- 图片由"http://i.ftimg.net/picture/8/000063858_piclink.jpg"改为“http://i.ftimg.net/picture/5/000064055_piclink.jpg”
- 465行：
	- "互动小测"改为“FT中文网商学院 iPad App”,href由"http://www.ftchinese.com/channel/mba.html"改为"https://itunes.apple.com/cn/app/ft-shang-xue-yuan/id493892004?mt=8
	- 图片由http://i.ftimg.net/picture/9/000063859_piclink.jpg改为http://i.ftimg.net/picture/6/000064056_piclink.jpg
- 499行：
	- 立即体验的href改为"http://app.ftchinese.com/#utm_campaign=9J160615&utm_source=marketing&utm_medium=campaign"
- 523行：
	- “与Apple的深度合作”改为"安卓系统"
	- href由"http://app.ftchinese.com/?ccode=1X130429"改为"http://app.ftchinese.com/#utm_campaign=9J160615&utm_source=marketing&utm_medium=campaign"
- 534行：
	- 删去“与Apple的深度合作”介绍语句，删去部分代码如下：

		<table border="0" cellspacing="0" align="center" cellpadding="0" >
			<tr><td>
			<a class="lineH f_1_4" href="http://app.ftchinese.com/" target="_blank" style="font-size:12px;color:#070707;text-decoration:none;line-height:140%">与Apple的深度合作：自2010年起，Apple与FT中文网在中国市场深度合作，在推广Apple旗下产品时（如iPad、iPhone、iOS系统），通过使用FT中文网页面展示说明产品功能。</a>
			</td></tr>
			<tr><td class="lineH1" style="height: 12px; font-size: 12px; line-height: 12px; padding: 0;">&nbsp;</td></tr>
		</table>
- 539-549行：
	- “在Apple iPad2产品推广中展示”改为“华为市场”***这个链接还没定是吧？还有小米和豌豆荚的都是点击链接了会直接下载对吧？？？***
	- href由http://app.ftchinese.com/?ccode=1X130429改为http://appstore.huawei.com/app/C10210717
	- 图片由http://i.ftimg.net/picture/2/000031882_piclink_180_67.jpg改为http://i.ftimg.net/picture/7/000064057_piclink.jpg
- 560-563行：
	- "在Apple iPhone产品推广中展示"改为“小米市场”
	- href由"http://app.ftchinese.com/?ccode=1X130429"改为"http://app.xiaomi.com/download/51407"
	- 图片的href同上
	- 图片由http://app.xiaomi.com/download/51407改为http://i.ftimg.net/picture/8/000064058_piclink.jpg
- 572-575行：
	- "在Apple iPhone产品推广中展示"改为"豌豆荚"
	- href由"http://app.ftchinese.com/?ccode=1X130429"改为"http://app.ftchinese.com/android/an_wandoujia/an_wandoujia.apk"
	- 图片的href同上
	- 图片由http://i.ftimg.net/picture/4/000031884_piclink_180_67.jpg改为http://i.ftimg.net/picture/9/000064059_piclink.jpg
- 607行：
	- 修改社交网站链接，同之前的几封信。
- 649行：
	- 同上修改社交网站链接
- 690行：
	- 改为2016

### 5. letter5
- 288行：
	- 修改信件最后一段内容。原代码为：

			近期，FT中文网将编辑推荐的文章集结成册，推出<a href="http://www.ftchinese.com/m/marketing/ebook.html" target="_blank" style="color:#4487AA;text-decoration:none;font-weight:bold;">FT电子书</a>。并推出专注热点财经问题及重要行业发展趋势的智库类产品<a href="http://www.ftchinese.com/m/marketing/intelligence.html" target="_blank" style="color:#4487AA;text-decoration:none;font-weight:bold;">FT研究院</a>
- 367行：
	- 更换二维码图片及链接：需修改$letter.ad。href由"http://www.ftchinese.com/"改为"http://www.ftchinese.com/channel/mba.html" 
	- 图片由http://i.ftimg.net/picture/2/000051862_piclink.jpg改为http://i.ftimg.net/picture/3/000064063_piclink.jpg
- 386行：
	- “活动介绍”改为“服务与活动介绍”

- 401行：
	- "E-book"改为“FT电子书”：需修改$letter.product_1
- 405行：
	- "FTI"改为“FT研究院”，需修改$letter.product_2
	- 图片由http://i.ftimg.net/picture/4/000063864_piclink.jpg改为http://i.ftimg.net/picture/4/000064064_piclink.jpg
- 444行：
	- 需修改$letter.contact：修改方法同前几封信。
- 483行起：
	- 同上修改社交网站链接
- 528行：
	- 改为2016
## 2.Oli讲解barrier.js，即读过超过多少篇文章没有登录就弹出登录界面。

## 3.广告位表单修改

### 放置路径参考几天前300*600那个东西

- html:myftwork/dev_www/frontend/tpl/maketing/accenture_0720a.html
- CSS:myftwork/dev_www/frontend/static/styles/AD/accenture_0720.css
- JS:myftwork/dev_www/frontend/static/js/AD/accenture_0720.js
- 图片：myftwork/dev_www/frontend/static/img/AD/accenture_0720

### js写法参考

以往活动页可供参考，链接为<http://www.ftchinese.com/m/marketing/Benz_suv.html> ，可最大限度选用其中可用JS代码；

### html中添加属性

	data_ =FTCC503359BCC

字体都改成 汉仪中宋体


- html:myftwork/dev_www/frontend/tpl/maketing/benz_0728.html
- CSS:myftwork/dev_www/frontend/static/styles/AD/benz_0728.css
- JS:myftwork/dev_www/frontend/static/js/AD/benz_0728.js

最终页面链接 <http://www.ftchinese.com/m/marketing/benz_0728.html>

#### 文件格式化工具

<http://www.bejson.com/jshtml_format/>
# 0729
## 1.午餐会

GA:

账号: bonnie.wangyichen@gmail.com

密码：Ftc0615!#%^

地址：<https://analytics.google.com/analytics/web/?authuser=1#report/content-pages/a1608715w2826670p10995661/%3F_u.date00%3D20160717%26_u.date01%3D20160723%26_u.date10%3D20160710%26_u.date11%3D20160716%26explorer-segmentExplorer.segmentId%3Danalytics.pageTitle%26explorer-table.plotKeys%3D%5B%5D/>

#  0801
## 1. 制作“智慧城市”页面

## 2. 写barrier.js的AB测试

NEXT文件夹下。
### NEXT文件夹需要:
- gulp要装旧版本的，即不用单独安装gulp4.0
- nodejs需要5.X版本的，即需要用nvm use 5.12.0

### 学习到的知识点
- task:roll up用于编译js
- wget:“命令行的迅雷”
- yuman:有自动生成的gulp.js,参见<http://yeoman.io/>
- 《Mastering Regular Expression》讲正则的书，(？：)为跳过捕获组的意思
- 单位vh，为view height的意思，新单位，即为1%的视窗长度
- 垂直居中可以使用
		
		position:absolute
		display:table

- ft的约定：不跳转、不提交使用button
 
## 3.清缓存的方法
1. 登入<http://backyard.ftchinese.com/>
2. 进入左侧 SYSTEM→Squid Cache Clearer
3. 在文件列表框里输入该清缓存的网址。

## 4.欢迎信修改链接
笑蜀
http://www.ftchinese.com/search/?keys=%E7%AC%91%E8%9C%80&type=default&category=

http://www.ftchinese.com/search/?keys=%E7%AC%91%E8%9C%80&type=default&from=edm


龚刃韧
由http://www.ftchinese.com/search/?keys=%E9%BE%9A%E5%88%83%E9%9F%A7&ftsearchType=type_news
改为
http://www.ftchinese.com/search/?keys=%E9%BE%9A%E5%88%83%E9%9F%A7&ftsearchType=type_news&from=edm

## 0802
## 1.自己试运行NEXT

## 2. 看smarty模板
smarty网站：<http://www.smarty.net/>

smarty3.0文档：<http://www.smarty.net/docs/zh_CN/>

## 3.示例文件

E:/myftwork/mytest/smartyLearn/smarty-2.6.30/demo/

下次从<http://www.smarty.net/docs/zh_CN/installing.smarty.basic.tpl>接着看

并用subl打开该demo


## 每日词汇积累
- aggressively adv. 强有力地
- core n.核心，要点
- lean vi.倾斜，倚靠，倾向
- benchmark vt.用基准测试
- facilitate vt.促进，帮助
- application logic 应用逻辑
- exclaim vt./vi.呼喊，大声叫嚷
- messy adj.杂乱的，凌乱的
- typically adv.通常
- degenerate vt.使退化，恶化；vi.退化，堕落
- specifically adv.特别地，明确地
- deployment n.调度，部署
- intuitive adj.直觉的，凭直觉获知的，直观的
- alike adj.相似的，相同的 adv.以同样的方式，类似于
- programmer n.程序设计员
- otherwise adv./adj.否则，另外，在其他方面
- mask vt.vi.掩盖
- template maintenance 模板维护
- inject vt.注入，注射
- insulate vt.隔离，使孤立
- controlled adj.受控制的
- granular adj.颗粒的，细粒状的，粒度的
- portability n.可移植性
- agnostic adj.不可知的
- language-agnostic adj.与语言无关的
- be ported to 被移植到

# 0803
## 1.看卫国哥写的ab-test


### 1.新学会知识点？
#### box-sizing属性：
值|解释
--|---
content-box|规定width和height分别应用于元素的内容框，在width和height之外绘制内边距和边框。
border-box|规定width和height分别应用于元素的border,即内边距和边框在width和height之内

#### CSS trick网站
未知尺寸的元素居中：

<https://css-tricks.com/centering-in-the-unknown/>
### 2.带求证问题

设置一个外

## 2.欢迎信新bug
会员中心连接，href由http://www.ftchinese.com/marketing/home?ccode=1X130529改为http://www.ftchinese.com/m/marketing/home.html


# 0804
## 1.市场部欢迎信加cccode需求
正则1:^href="?http://www\.ftchinese\.com.*("\s|\s)$

修改要求：

欢迎信1	?ccode=1X130129
欢迎信2	?ccode=1X130229
欢迎信3	?ccode=1X130329
欢迎信4	?ccode=1X130429
欢迎信5	?ccode=1X130529

链接结尾种类：

- http://www.ftchinese.com
- http://www.ftchinese.com/m/marketing/home.html
- http://www.ftchinese.com/users/cp
- http://www.ftchinese.com/users/mystories
- http://www.ftchinese.com/interactive/7083

正则：http://www\.ftchinese\.com(/[A-z0-9]*)*(/[A-z0-9]*\.html)?

## 2.ab-Test修改发布
在google-analytics上监测显示的位置

右侧：Real-Time→Events

# 0805
## 1.继续看o-grid模块
看到0-grid/src/scss/_main.scss的184行。

## 2. Sublime Text 3怎样支持Scss高亮？
安装插件sass，然后在右下角可以切换到sass格式，然后.scss就高亮了。

## 每日词汇积累
- ...and so forth 等等
- fraction n.分数
- unitless adj.无单位的

# 0808
## 1.继续看o-grid模块

## 2. 智能城市板块修改回顾
见0802来自Yu Sun的邮件

### 涉及的模板
——www

- \frontend\tpl\tag.html
- \frontend\tpl\include\story\story.html
- \frontend\tpl\next\html\story.html
- \frontend\tpl\phone\homecontent-source.html
- \frontend\tpl\phone\nexthome.html

——next

- \app\templates\html\story.html

### 专题页面
<http://www.ftchinese.com/tag/智能城市>
或
<http://www.ftchinese.com/tag/%E6%99%BA%E8%83%BD%E5%9F%8E%E5%B8%82>

### www7预览页为
<http://www7.ftchinese.com/tag/智能城市>
或
<http://www7.ftchinese.com/tag/%E6%99%BA%E8%83%BD%E5%9F%8E%E5%B8%82>

### 此页的Page-Maker（如果已经登录Backyard，可以直接访问）
<http://backyard.ftchinese.com/pagemaker/page-maker.html?page=smartcity>

### 简要整理工作如下：
1. 参考“全球商业的未来”，修改tag相关模板（frontend下tag.html及其它），增加“智能城市”部分；
2. 修改模板时设计的参数值命名随意，截至时间暂时设到年底（实际结束时间为9月底）；
3. 	“智能城市”广告位ID为2056，参考“全球商业的未来”广告位ID为2051相应修改；
4. 广告位去留——PC端只保留专题页面leaderboard广告位，手机端只保留top banner广告位，其余广告位需去掉并不出现其他客户广告——一般修改了广告位ID广告即可排他，但是去留设置需要在模板中加条件；
5. Backyard设置页面文章，可以先拟定一个名称，然后以 【http://backyard.ftchinese.com/pagemaker/page-maker.html?page=名称】 的形式访问；
6. 页面样式参考附件中checklist最下面的附图。
注意——文章内容还没有定时5、6两步暂不考虑，这需要编辑配合，可以先熟悉“全球商业的未来”设置页。
### 具体修改工作
#### 1. \frontend\tpl\tag.html
##### 新增第8行：

	<%elseif $tag_name=="智慧城市"%>
		    <%assign var="topnav" value="innovation"%>
		    <%assign var="subnav" value="smartcity"%>

##### 新增第89行：

	<%elseif $tag_name=="智慧城市" && date("Ymd",$smarty.now) >= 20160801 && date("Ymd",$smarty.now) <= 20161231%>
	    <%assign var="pageId" value="smartcity"%>
	    <%include file="next/html/manual.html"%>

###### 知识补充
{include}用于载入其他模板到当前模板中。 在包含模板中可用的变量，载入后在当前模板仍然可用。其必须设置file属性。

#### 2.\frontend\tpl\next\html\story.html
##### 新增第347行
	<%elseif preg_match("/智慧城市/is",implode(",", $story.tag)) && date("Ymd",$smarty.now) >= 20151231 && date("Ymd",$smarty.now) <= 20161231%>
	<%assign var=breadcrum value="<a href=\"/tag/智慧城市\">智慧城市</a>"%>
	<%assign var="adchannelID" value="2056"%>
	<%assign var="hideMPU2" value="yes"%>
	<%assign var="hideMPU3" value="yes"%>
	<%assign var="hide590" value="no"%>

#### 3.\frontend\tpl\include\story\story.html
##### 新增第394行

	<%elseif preg_match("/智慧城市/is",implode(",", $story.tag)) && date("Ymd",$smarty.now) >= 20151231 && date("Ymd",$smarty.now) <= 20161231%>
	<%assign var=breadcrum value="<a href=\"/tag/智慧城市\">智慧城市</a>"%>
	<%assign var="adchannelID" value="2056"%>
	<%assign var="hideMPU1" value="yes"%>
	<%assign var="hideMPU2" value="yes"%>
	<%assign var="hideMPU3" value="yes"%>
	<%assign var="hide590" value="yes"%>

#### 4.\frontend\tpl\phone\homecontent-source.html
##### 新增第264行处

	<%if date("Ymd",$smarty.now) <= 20161231 %>
		<%assign var="channelTitle" value="智慧城市"%>
		<%assign var="channelURL" value="智慧城市"%>
		<%assign var="channelType" value="tag"%>
		<%assign var="insertId" value="specialanchor2"%>
		<%assign var="adId" value="2056"%>
		<%assign var="leadtype" value="long"%>
		<%assign var="filterInclude" value="智慧城市"%>
		<%assign var="filterExclude" value="letter"%>
		<%assign var="i" value=0%>
		<%include file="phone/partials/onestory.html" scope="parent"%>
		<%foreach from=$allstories item=sc%>
		<%assign var="keywords" value="`$sc.genre`,`$sc.topic`,`$sc.area`,`$sc.industry`,`$sc.tag`,`$sc.cheadline`"%>
		<%if (preg_match("/`$filterInclude`/is",$keywords) || $filterInclude == "") && (!preg_match("/`$filterExclude`/is",$keywords) || $filterExclude == "") && !in_array($sc.id , explode(',',$echostoryid)) && ($smarty.now-$sc.last_publish_time<=79200 || $i<6 || $smarty.get.date != "")%>
		    <%assign var="echostoryid" value=`$sc.id`,$echostoryid%>
		<%/if%>
		<%/foreach%>
		<%/if%>

#### 5.\frontend\tpl\phone\nexthome.html

新增第500行

	<%if date("Ymd",$smarty.now) <= 20161231 %>
	<%assign var="channelTitle" value="智慧城市"%>
	<%assign var="channelURL" value="智慧城市"%>
	<%assign var="channelType" value="tag"%>
	<%assign var="insertId" value="specialanchor2"%>
	<%assign var="adId" value="2056"%>
	<%assign var="leadtype" value="long"%>
	<%assign var="filterInclude" value="智慧城市"%>
	<%assign var="filterExclude" value="letter"%>
	<%assign var="i" value=0%>
	<%include file="phone/partials/onestory.html" scope="parent"%>
	<%foreach from=$allstories item=sc%>
	<%assign var="keywords" value="`$sc.genre`,`$sc.topic`,`$sc.area`,`$sc.industry`,`$sc.tag`,`$sc.cheadline`"%>
	<%if (preg_match("/`$filterInclude`/is",$keywords) || $filterInclude == "") && (!preg_match("/`$filterExclude`/is",$keywords) || $filterExclude == "") && !in_array($sc.id , explode(',',$echostoryid)) && ($smarty.now-$sc.last_publish_time<=79200 || $i<6 || $smarty.get.date != "")%>
	    <%assign var="echostoryid" value=`$sc.id`,$echostoryid%>
	<%/if%>
	<%/foreach%>
	<%/if%>

### 关于ft网站Smarty模板使用结构
#### 1.Smarty库文件目录
dev_www/libs/smarty/

目录下的文件：
	
		Smarty.class.php
		debug.tpl
		plugins/*
		...

#### 2.Smarty实例创建文件
dev_www/libs/application/libraries/tpl.php

文件内容：

	<?php

		/*
		 * To change this template, choose Tools | Templates
		 * and open the template in the editor.
		 */
		
		/**
		 * Description of tpl
		 *
		 * @author jiling
		 */
		require_once (FT_ROOT . "/libs/smarty/Smarty.class.php");//引用Smarty库文件;***FT_ROOT变量为"dev_www",其在哪里define的呢***
		
		class tpl extends Smarty {
		
		    public function __construct() {
		        parent::Smarty();
		        $this->template_dir = FT_ROOT . "/frontend/tpl";//$template_dir为Smarty成员变量，为默认模板目录的设置。
		        $this->config_dir = FT_ROOT . "/frontend/tpl_config";//$config_dir设置存储配置文件的目录。
		        $this->compile_dir  =  FT_ROOT . '/cache/templates_c/';//$compile_dir保存模板编译文件的目录名称。
		        $this->cache_dir  =  FT_ROOT . '/cache/smartycache/';//$cache_dir保存模板缓存文件的目录名称
		        $this->left_delimiter = '<%';//指定左限位符
		        $this->right_delimiter = '%>';//指定右限位符
		        $this->error_reporting = 0; // 0: close 1: error 2: warning
		    }
		
		    public function display($resource_name) {
		        if (isset($_SERVER['HTTP_FT_BIG_PROXY'])) { // 如果是请求繁体内容
		            include_once(FT_ROOT . "/big5_webroot/ZhConversion.php");
		            $string = $this->fetch($resource_name);
		            //$new_needle = array_merge($zh2TW, $zh2Hant);
		            $string = zh2big5($string);
		            $string = str_replace(array("http://s.ftimg.net",'content="zh-CN"'), array("http://big.s.ftimg.net",'content="zh-TW"'), $string);
		            echo $string;
		        } else {
		            parent::display($resource_name);//展示模板
		        }
		    }
		
		}
		
		?>


##### 知识补充
###### 1.$template_dir
默认模板目录的设置。供Smarty显示的文件要放到该目录去。 如果在包含文件时没有设置资源类型，那么Smarty会查询本目录。 默认值是./templates，意味着Smaty会查询templates/寻找模板文件和执行PHP脚本。 $template_dir同样可以是一个多目录值的数组，Smarty将逐个查询这些目录直到匹配的模板被找到为止。 这里其目录为

		 FT_ROOT . "/frontend/tpl"

###### 2.$config_dir
设置存储配置文件的目录。 默认是./configs，意味着Smarty将查询configs/并读取配置。这里该目录为：

		FT_ROOT . "/frontend/tpl_config";

###### 3.$compile_dir
保存模板编译文件的目录名称。默认是./templates_c， 这意味着Smarty将进入templates_c/目录来执行已编译的PHP文件。这里该目录为：

	 	FT_ROOT . '/cache/templates_c/

###### 4.$cache_dir
保存模板缓存文件的目录名称，默认是./cache。 这意味着Smarty将进入cache/目录查找缓存文件并把缓存文件当作PHP来执行。 该目录必须可写入。这里该目录为：
		
		FT_ROOT . '/cache/smartycache/'
	
###### 5.display() — 显示

	void display(string template,
	             string cache_id,
	             string compile_id);

显示模板。如果希望返回而并非显示当前模板的内容，请使用fetch()。 

## 每日词汇积累
- shuffle v.拖拽，洗牌
- unquote vt./vi. 结束（引文），去掉引号
- removal n.移动，排除，搬迁

# 0809
## 1.继续复习智能城市板块并学习相关Smarty知识
***整个Smarty使用的文件组织方式，待问孙宇***

## 2.继续看o-grid包

## 每日词汇积累
- loop through 依次通过
- bleed vt.使出血，榨取 vi.流血，渗出
- descriptor n.描述符号

# 0810
## 1. 运行新版的ig-template
### 遇到npm install的问题
解决办法：删掉整个node_modules

### 关于npm install的包管理规则
npm install和npm install xxx是两个不同的命令

npm install不带任何参数的话，npm会去寻找当前目录下的package.json，找到devDependencies或者dependency字段，根据这连个字段里面列出来的名字从npm网站搜索这些名字，自动安装。

npm install xxx是直接去npm网站搜索xxx安装到当前目录的node_modules

npm install xxx --save会在安装xxx的同时把这个包的名字写入package.json的dependency字段

npm install xxx --save-dev把包的名字写入到DevDependencies字段

详见<https://docs.npmjs.com/getting-started/using-a-package.json>

dependencies是生产模式依赖包，devDependencies是开发测试依赖包

## 2.对比o-grid的scss和卫国哥的scss

关于flex布局参见<http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html>

关于它写css的逻辑，待揣摩。

比如这个样式 .section-col__secondary他到底是自己定义的还是直接用的？


# 0811
## 1. 对ig-template的样式文件有一个整体认识
最终的index.html的样式都是来自于.tmp\styles\main.css这个最终的css文件，由client文件夹下的超级多的scss文件拼成。

疑问：对于最终的网页，Chrome检查元素列出的css资源，还列出了scss来源。不应该直接列出的都是来自最终的main.css么？

解答：这是sourcemap的作用，现代浏览器可以检测到map文件，建立和原始文件的映射关系。即这是.tmp\styles\main.css.map文件的作用。

## 2.开始学习ftc-share(o-share的升级版)

## 3.首页点击数可视化
<http://www.ftchinese.com/?showHotClick=yes&1>

本地调试：

cd Github\ftGitLearn\NEXT

git pull

nvm use 5.12.0

gulp watch

在浏览器输入 http://localhost:9000/?showHotClick=yes

即可看到结果

## 每日词汇积累
- icon n.图标
- social network 社交网络
- instantiate vt.例示，举例说明
- initialise vt.初始化，赋初值
- popout n.弹出
- flyout n.飞出，浮出
- custom n.习惯，惯例；adj.定制的，自定义的
- specific to 针对，特定于
- tooltip n.工具提示，提示框
- hover over 悬停
- turn off 关掉，关闭
- precedence n.优先，优先级
- take precedence over 优先于
- pound n.井号
- slash n.斜杠
- synopsis n.概要，大纲

看到Class，其为
为ES6内容，明天看<http://es6.ruanyifeng.com/#docs/class>或

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes>

及红宝书P159

# 0815 
## 1. 完成表格的html代码写作

编辑们有一个很简单的表格要制作

1、	表格样式参考【http://www.ftchinese.com/story/001062575】这篇文章里的表格；
2、	从Backyard里能看到代码【https://backyard.ftchinese.com/falcon.php/story/edit/001062575】（先登录，后访问）；
3、	可以尝试将Excel存为html页面，去掉冗余样式和代码再修改；
4、	只给我<table>部分的代码即可。

相关资料见 E:\myftwork\workMaterial\0815maketable

## 2.继续看ftc-share模块

## 3.参考“智慧城市”专题页面添加制作“存储世界”专题页
### 我修改的页面
位于dev_www:

- \frontend\tpl\tag.html
- \frontend\tpl\next\html\story.html：第354行
- \frontend\tpl\include\story\story.html：第
- \frontend\tpl\phone\homecontent-source.html：第284行

位于ftGitLearn\NEXT\app\templates\html\story.html:

286行：

	<%elseif preg_match("/存储世界/is",implode(",", $story.tag)) && date("Ymd",$smarty.now) >= 20151231 && date("Ymd",$smarty.now) <= 20161231%>
	<%assign var=breadcrum value="<a href=\"/tag/存储世界\">存储世界</a>"%>
	<%assign var="adchannelID" value="2057"%>
	<%assign var="hideMPU2" value="yes"%>
	<%assign var="hideMPU3" value="yes"%>
	<%assign var="hide590" value="no"%>


## 4（附注）. 智能城市板块修改回顾
见0802来自Yu Sun的邮件

### 涉及的模板
——www

- \frontend\tpl\tag.html
- \frontend\tpl\include\story\story.html
- \frontend\tpl\next\html\story.html
- \frontend\tpl\phone\homecontent-source.html
- \frontend\tpl\phone\nexthome.html

——next

- \app\templates\html\story.html

### 专题页面
<http://www.ftchinese.com/tag/智能城市>
或
<http://www.ftchinese.com/tag/%E6%99%BA%E8%83%BD%E5%9F%8E%E5%B8%82>

### www7预览页为
<http://www7.ftchinese.com/tag/智能城市>
或
<http://www7.ftchinese.com/tag/%E6%99%BA%E8%83%BD%E5%9F%8E%E5%B8%82>

### 此页的Page-Maker（如果已经登录Backyard，可以直接访问）
<http://backyard.ftchinese.com/pagemaker/page-maker.html?page=smartcity>

### 简要整理工作如下：
1. 参考“全球商业的未来”，修改tag相关模板（frontend下tag.html及其它），增加“智能城市”部分；
2. 修改模板时设计的参数值命名随意，截至时间暂时设到年底（实际结束时间为9月底）；
3. 	“智能城市”广告位ID为2056，参考“全球商业的未来”广告位ID为2051相应修改；
4. 广告位去留——PC端只保留专题页面leaderboard广告位，手机端只保留top banner广告位，其余广告位需去掉并不出现其他客户广告——一般修改了广告位ID广告即可排他，但是去留设置需要在模板中加条件；
5. Backyard设置页面文章，可以先拟定一个名称，然后以 【http://backyard.ftchinese.com/pagemaker/page-maker.html?page=名称】 的形式访问；
6. 页面样式参考附件中checklist最下面的附图。
注意——文章内容还没有定时5、6两步暂不考虑，这需要编辑配合，可以先熟悉“全球商业的未来”设置页。
### 具体修改工作
#### 1. \frontend\tpl\tag.html
##### 新增第8行：

	<%elseif $tag_name=="智慧城市"%>
		    <%assign var="topnav" value="innovation"%>
		    <%assign var="subnav" value="smartcity"%>

##### 新增第89行：

	<%elseif $tag_name=="智慧城市" && date("Ymd",$smarty.now) >= 20160801 && date("Ymd",$smarty.now) <= 20161231%>
	    <%assign var="pageId" value="smartcity"%>
	    <%include file="next/html/manual.html"%>

###### 知识补充
{include}用于载入其他模板到当前模板中。 在包含模板中可用的变量，载入后在当前模板仍然可用。其必须设置file属性。

#### 2.\frontend\tpl\next\html\story.html
##### 新增第347行
	<%elseif preg_match("/智慧城市/is",implode(",", $story.tag)) && date("Ymd",$smarty.now) >= 20151231 && date("Ymd",$smarty.now) <= 20161231%>
	<%assign var=breadcrum value="<a href=\"/tag/智慧城市\">智慧城市</a>"%>
	<%assign var="adchannelID" value="2056"%>
	<%assign var="hideMPU2" value="yes"%>
	<%assign var="hideMPU3" value="yes"%>
	<%assign var="hide590" value="no"%>
##### 578行

#### 3.\frontend\tpl\include\story\story.html
##### 新增第354行

	<%elseif preg_match("/智慧城市/is",implode(",", $story.tag)) && date("Ymd",$smarty.now) >= 20151231 && date("Ymd",$smarty.now) <= 20161231%>
	<%assign var=breadcrum value="<a href=\"/tag/智慧城市\">智慧城市</a>"%>
	<%assign var="adchannelID" value="2056"%>
	<%assign var="hideMPU1" value="yes"%>
	<%assign var="hideMPU2" value="yes"%>
	<%assign var="hideMPU3" value="yes"%>
	<%assign var="hide590" value="yes"%>

#### 4.\frontend\tpl\phone\homecontent-source.html
##### 新增第264行处

	<%if date("Ymd",$smarty.now) <= 20161231 %>
		<%assign var="channelTitle" value="智慧城市"%>
		<%assign var="channelURL" value="智慧城市"%>
		<%assign var="channelType" value="tag"%>
		<%assign var="insertId" value="specialanchor2"%>
		<%assign var="adId" value="2056"%>
		<%assign var="leadtype" value="long"%>
		<%assign var="filterInclude" value="智慧城市"%>
		<%assign var="filterExclude" value="letter"%>
		<%assign var="i" value=0%>
		<%include file="phone/partials/onestory.html" scope="parent"%>
		<%foreach from=$allstories item=sc%>
		<%assign var="keywords" value="`$sc.genre`,`$sc.topic`,`$sc.area`,`$sc.industry`,`$sc.tag`,`$sc.cheadline`"%>
		<%if (preg_match("/`$filterInclude`/is",$keywords) || $filterInclude == "") && (!preg_match("/`$filterExclude`/is",$keywords) || $filterExclude == "") && !in_array($sc.id , explode(',',$echostoryid)) && ($smarty.now-$sc.last_publish_time<=79200 || $i<6 || $smarty.get.date != "")%>
		    <%assign var="echostoryid" value=`$sc.id`,$echostoryid%>
		<%/if%>
		<%/foreach%>
		<%/if%>

#### 5.\frontend\tpl\phone\nexthome.html

新增第500行

	<%if date("Ymd",$smarty.now) <= 20161231 %>
	<%assign var="channelTitle" value="智慧城市"%>
	<%assign var="channelURL" value="智慧城市"%>
	<%assign var="channelType" value="tag"%>
	<%assign var="insertId" value="specialanchor2"%>
	<%assign var="adId" value="2056"%>
	<%assign var="leadtype" value="long"%>
	<%assign var="filterInclude" value="智慧城市"%>
	<%assign var="filterExclude" value="letter"%>
	<%assign var="i" value=0%>
	<%include file="phone/partials/onestory.html" scope="parent"%>
	<%foreach from=$allstories item=sc%>
	<%assign var="keywords" value="`$sc.genre`,`$sc.topic`,`$sc.area`,`$sc.industry`,`$sc.tag`,`$sc.cheadline`"%>
	<%if (preg_match("/`$filterInclude`/is",$keywords) || $filterInclude == "") && (!preg_match("/`$filterExclude`/is",$keywords) || $filterExclude == "") && !in_array($sc.id , explode(',',$echostoryid)) && ($smarty.now-$sc.last_publish_time<=79200 || $i<6 || $smarty.get.date != "")%>
	    <%assign var="echostoryid" value=`$sc.id`,$echostoryid%>
	<%/if%>
	<%/foreach%>
	<%/if%>

## 每日词汇积累
- otherwise conj./adv.否则，另外，在其他方面
- indistinguishable adj.不能分别的，不能分辨的
- foreground n.前景
- hex n.十六进制


# 0816 

## 1. 在公共仓库修改后进行的git指令

1. git diff|
2. git add yourModifiedFile
3. git commit -m "yourdescription"
4. git pull
5. git push origin master

如果已经提交到远程服务器，则先git log ,再git reset --hard 671475b1ce


## 2. 继续学习ftc-share

学到的新css属性：text-indent属性

text-indent 属性规定文本块中首行文本的缩进。

eg:

	p{
	  text-indent:50px;
	}


# 0817

## 1. 关于Linux虚拟机
### （1）安装方法
安装方法<http://jingyan.baidu.com/article/25648fc1a235c99191fd0008.html>

或求助summer

### （2）使用

打开后：虚拟机→电源→继续运行客户端

使用命令行：右击桌面→在终端中运行

关闭：虚拟机→电源→挂起客户机→点右上角叉叉关闭

## 2.继续看ftc-share
基本不涉及svg方面的知识都看完了。

## 3.开始看ftc-icons

### 额外收获知识点:css sprite

sprite是一种技术，大网站为了减少http请求，把小图标拼成一个文件，这叫sprite，用css的background-position来显示sprite文件上的不同位置，这样只需要加载一个sprite出来的图片就行了，不需要一次一次加载零碎的图标。

而对于svg,将所有小的svg图标写入同一个svg文件里，并用symbol元素分别将它们包裹起来，这是svg官方的一种做法，有出于sprite的考虑。

## 每日词汇积累
- svg abbr. 可伸缩向量图
- fallback n.撤退，后背物品
- invidual adj.单独的
- referencing v.引用，把...引作参考 n.定位
- sprite n. 精灵，计算机图形学
- concatenate vt.连结，并置

# 0818
## 1. 继续学习ftc-icons模块
包括gulp.js涉及到的svg相关细腻插件

## 每日词汇积累
- cheerio n.加油，再见，再会,干杯
- tiny adj.微小的，很少的
- reduction n.下降，减少，缩小
- redundant adj.多余的，失业的
- immutable adj.不变的，不可变的
- lazily adv.懒洋洋地，怠惰地，懒散地
- initialize vt.初始化
- pipeline n.管道，输油管，传递途径
- at any point 在任何时候

# 0819

## 1. 继续学习ftc-icons模块

## 每日词汇积累

- interleave n.vt.交错 
- bunch n.群，簇
- hollow n.洞，空心 adj.空的，空心的
- polygon n.多边形
- favicon n.网站图标
- opt to do sth 选择做某事
- flattened adj.平面的
- standalone n.单机 adj.单独的
- orientation n.方向，定位
- home screen n.主屏幕
- yandex n.俄罗斯搜索引擎



# 0820

## 1.继续学习ftc-icons模块

## 2. 学习ES6
按照卫国哥说的两本书的线上版：

<http://exploringjs.com/es6/ch_about-book.html>

<https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond>

卫国哥的评价：you dont know js写的比较详细，详细得很啰嗦，但是不全面；exploring es很全，但是很多地方介绍太简单，不知所云，而且章节章节组织比较混乱

## 3.学习windows命令行
看了第一章

## 每日词汇积累

- occasionally adv.偶尔，间或
- elegance n.典雅，优雅
- vacuum n.真空，空间
- proxy n.代理人，代用品 pl→proxies
- legacy n.遗赠，遗产
- glossary n.词汇表，术语表
- sloppy adj.草率的，粗心的
- exception n.异常
- switch on n.开启，接通
- directive n.指令
- implicitly adv.暗中地，含蓄地
- de facto adj.实际上的
- interface n.界面，接口
- signature n.签名，署名，信号
- radix n.基数
- internal adj.内部的，内置的
- accessible adj.已接近的，可理解的
- quare brackets n.方括号
- binding n.捆绑，粘合物
- convention n.惯例，约定
- document vt.描述
- capitalization n.用大写，资本化，资本总额
- rational adj.合理的，理性的
- complement vt.补足 n.补语，补足物，余角
- prefix n.前缀，字首
- synopsis n.概要，大纲
- foreword n.序，前言
- edge case n.边界情况
- in a novel way/in novel ways 以新颖的方式
- stand alone 孤立
	- eg: No language feature stands alone.
- realm n.范围，领域
- pin down 阻止，使受约束
- wallow vi.打滚
- assimilate vt.vi.吸收，同化
- preface n.序言，引语，卷首语
- eventful adj.多事的，变故多的
- incremental adj.增加的，增值的
- minor adj.次要的，较小的

# 0823
## 1.继续学习ES6
## 2.开始学习NEXT项目
## 每日词汇积累
- notoriously adv.总所周知地
- interoperation n.交互性，交互操作
- constructor function 构造函数
- versioning n.版本控制
- linear adj.直线的，线性的
- lexical adj.词汇的，词典的
- lexical block scoping 作用域
- iterator n.迭代器
- destructure vt.拆构，拆解
- built-in adj.嵌入的 n.内置
- supplemental adj.补充的
- regular expression 正则表达式
- functionality n.功能
- surge n.设计，波涛
- in vain 徒然，无效
- internally adv.在内部
- bloat vt.vi.膨胀，得意
- accusation n.控告，谴责
- syntactic sugar 糖衣语法
- catch up with 赶上，追上
- overwhelmingly adv.压倒性地
- superficially adv.表面地，浅薄地
- innermost adj.最内的，最深的
- enclosing 包括在内的
- block-scoped adj.块级作用域的
- roughly adv.粗略地，大体上
- blindly adv.盲目地，一味，轻率
- refactor n./vt.重构，代码重构
- invoke vt.调用
- concatenate vt.连接
- interpolation n.插值
- backslash n.反斜杠
- span n.跨度 vt.跨越
- shadow vt.遮蔽
- handy adj.便利的，方便的
- concise adj.简明的，简洁的
- parenthese n.括号，圆括号
- omit vt.省略
- intermediate adj.中间的
- slot n.位置

# 0824
## 1. 继续学习NEXT
## 2. 新工具get
json格式化工具:<http://www.jsoneditoronline.org/>

html在线美化工具:<http://tool.lu/html/>
	
## 每日词汇积累
- descriptor n.描述符号
- synchronous  adj.同步的，同时的
- upload vt.上传

# 0825
## 1.继续学习NEXT
学习到gulpfile.js的任务fonts

## 2.继续学习ES6

## 每日词汇积累
- static analysis 静态分析
- enforce vt.实施，执行，强迫
- guideline n.指导方针，指南
- utility n.公用，效用 adj.实用的，通用的
- cache n.缓存
- descriptor n.描述符号
- iterate vt.迭代，重复

# 0826
## 1. 继续学习NEXT

## 2. 新增"G20"模板。
修改参数：名字就叫G20对吧，广告id值是2005,pageId值是2016g20。参照“存储世界”页面。

结果，最后是白板页面然后有“编辑页面”链接就对了。


## 2. Lunch & Learn
参考帆总0826的邮件《Tech and Product Weekly Report》

### 1. Barrier Page A/B Test Result
结论是：004版本（去掉了点击背景就关闭弹窗的功能）是最好的。

查看方法是

#### （1) 手动导出barrier page 003和barrier page 004进行对比：

REPORTING→Behavior→Events→Top Events→搜索"barrier",出来“barrier page 001”~“barrier page 004”→点击进入“barrier page 003”导出Event action报告的csv版本，再点击进入“barrier page 004”导出Event action报告

#### (2)定制报告

选择CUSTOMIZATION。定制方法参见我已经做的Barrier AB Test。

### 2.有关各地区
找到了造假嫌疑数据。

### 3.页面各处的点击情况

参见Google Analytics API V4: <https://developers.google.com/analytics/devguides/reporting/core/v4/basics>

An example of using Google Analytics API to visualize hot positions on our home page: <http://www.ftchinese.com/?showHotClick=yes&19>

The main code here: <https://github.com/FTChinese/NEXT/blob/master/app/scripts/home-click.js>



## 每日词汇积累
- subset n.子集
- globbing n.通配符
- flatten vt.击败，摧毁
- middleware n.中间件

# 0829
## 1. 继续学习NEXT
向帆总请教了一些相关的问题。

## 2. yeoman框架
<https://github.com/yeoman/generator-webapp>


## 3. 继续学习ES6

## 4. 开始细看NEXT下的一些文件
开始看dev_www/frontend/tpl/next/html/manual.html

## 每日词汇积累
- inject vt.注入，注射
- placeholder n.占位符
- integrate vi.成为一体
- executable adj.可执行的 n.可执行文件
- object literal n.对象字面量
- self-descriptive adj.自我描述的
- rest parameter 剩余参数
- arbitrary adj.任意的


# 0830
## 1.比较ft和ftc的文章页标识
<<<<<<< HEAD

ft是通过MongoDB数据库生成的一串随机字符串。eg:

	http://www.ft.com/cms/s/0/1ea03bf4-6e2e-11e6-9ac1-1055824ca907.html?siteedition=intl#axzz4ImAoHBLf

ftc是MySQL的primary key：

	http://www.ftchinese.com/story/001069137

ft的账号密码：

- 账号：oliver.zhang@ftchinese.com
- 密码：financial

## 2. 虚拟机配置Ubuntu操作系统
参考<http://jingyan.baidu.com/article/14bd256e0ca52ebb6d26129c.html>

用户名：wangyichen
密码：123456
=======
>>>>>>> 71439b8d1cdcaee12a40404a66a8b3ec46aa25b0

ft是通过MongoDB数据库生成的一串随机字符串。eg:

	http://www.ft.com/cms/s/0/1ea03bf4-6e2e-11e6-9ac1-1055824ca907.html?siteedition=intl#axzz4ImAoHBLf

ftc是MySQL的primary key：

	http://www.ftchinese.com/story/001069137

ft的账号密码：

- 账号：oliver.zhang@ftchinese.com
- 密码：financial

## 2. 虚拟机配置Ubuntu操作系统
参考<http://jingyan.baidu.com/article/14bd256e0ca52ebb6d26129c.html>

用户名：wangyichen
密码：123456

# 0831
## 1.Ubuntu安装Sublime Text 3

<http://jingyan.baidu.com/article/fa4125acb8569b28ac7092ea.html>

在Sublime Text3 中安装packgae control

<http://jingyan.baidu.com/article/f71d60379b20071ab641d181.html>

## 2.npm install和bower install背后的逻辑

  npm install git url

即找到名字到git上下载


## 3.看Financial-Times的n-handlebars


<https://github.com/Financial-Times/n-handlebars#n-handlebars>

安装： npm install git (n-handlebars的url)

## 每日词汇积累
- strip vt.剥去
- concatenate vt.连结
- boolean logic expression n.布尔逻辑表达式
- iteration n. 迭代

## 明日开始：
继续实践n-handlebars

方法在 next-front-page里面使用搜索所有带 'n-handlebars'



	















