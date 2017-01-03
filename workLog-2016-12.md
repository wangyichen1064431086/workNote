# 1201
## 1.iTunes Connect
在app store 里下载一个app: testflight
 
## 2.新版登陆测试地址
<http://app003.ftmailbox.com/androidapp.html?useNewRegForm>

# 1205
## 1.必问问题
1. 来了先问Oliver那个<http://redmine.ftimg.net/login?back_url=http%3A%2F%2Fredmine.ftimg.net%2F>是谁是管理员，让他帮忙通过认证一下。   账号Bonnie
——— ***已解决***
2. 问卫国哥上次说的那个用于简单实现input右侧固定宽度元素的新属性叫什么。
——— ***下次方便时再问***
## 2.编辑ga
修改为3步走，我编辑的goal为 14.

## 3.webapp: 安卓硬件回退问题
### bug描述
app苹果, app Chrome模拟的苹果和安卓 都没有问题。情况为，即正确退回路径为文章页→频道页→首页。

app安卓：如果点击顺序为首页→频道页→
文章页，则点击左上角退回按钮，直接退回到首页。

### 修复记录
#### 1205pm-1206am 查看相关代码： 
##### （1）hist数组生成代码,即“记录浏览历史”代码：webapp/app/scripts/main.js---1924 readstory函数内部

代码段笔记： webapp-wyc/app/scripts/main_funcs.js 第967行
	

##### （2） 点击回退按钮事件： webapp/app/scripts/main.js--401行
	
	$('.closestory,.back,.backbutton').unbind().bind('click',function() {histback();});

##### （3）histback函数定义： webapp/app/scripts/main.js--3400行

代码段笔记： webapp-wyc/app/scripts/main_funcs.js 第1400行

#### 1205am 比较了软硬件退回方式的不同
- 只有苹果的滑动返回是 文章页→
频道页→首页，非按照真正的记录来。
- 其他软件（左上角箭头）返回，和硬件（浏览器返回按钮）返回，都是

#### 1206pm 与强哥协商方法，我这边的代码变动如下：
1. 在main.js的3121行showchannel函数中添加了 ftjavascriptapp.setandroidurl相关代码段。

#### 0103am 强哥使用histback()函数解决的了回退问题













## 4.next-signup执行不应该挂起后的任务挂起问题
render.js中的 nunjucks.Environment是用在服务器后端的，其中的watch:true用于检查html模板文件变化。而这里是用在前端，不需要检测变化，应改为 watch:false。


nunjucks是node模板引擎也是js模板引擎。

mustache仅仅是js模板引擎，这么用：

		
	<script src="nunjucks"></script>
	
	
	全局变量就有了nunjucks函数，ajax请求一个模板文件，得到以后nunjucks.render(ajax-response, data, function(result) { document.body.innerHTML = result})
	
	在浏览器中渲染模板


# 1206
## 1.继续解决1204任务3.

## 2. 查看兼容性网站
卫国推荐：

<http://jscc.info/>

<http://caniuse.com/#search=onpopstate>


# 1207
## 1.学习卫国哥的next-signup及其其中ES6的写法。

参见《工作收获的前端技巧与经验.md》11.12.


## 2.试运行了升级版的NEXT
### 试运行办法：

NEXT项目的gulp和依赖包都升级到了node 7以上版本，大家可以去试试能不能运行。git pull以后切换分支到git checkout upgradeto7，npm install升级依赖包到最新版，node也换到7.0以上，有可能gulp-sass需要手动安装一下，gulp install gul-sass。安装完以后gulp serve试试能不能运行。README里面有各项gulp任务说明。

成功。

### 新收获：

- 全局gulp#4.0下可以运行gulp3.9的函数。
- 开服务器本地测试时可能会受浏览器缓存文件的影响。

# 1208
## 1. 回顾一下SWIFT
开SWIFT学习会。笔记在xcode的1208NOTE.playground中

## 2. 继续看卫国哥写的next-signup

看到input-validator.js的fetch了。

关于fetch详解，参见《工作收获的前端技巧与经验.md》15.

# 1209
## 1. 接着看卫国哥的next-signup

## 2. 看Financial-Times的next-signup
### 1.重点看的文件
- views/enhanced -experience.html
- client/main.js
- client/routes/signup-form/controller.js


### 2.写法总结
#### 1. 使用的模板引擎是handle-bars
其为mustache的超集，比mustache增添了一些逻辑判断的东西。

然后select元素也就是通过handle-bars循环出来的，不涉及级联什么的。

#### 2. 尽可能地在数据层面而非UI层面操作
只有在非常必要的时候，才操作UI。而且还一般都是用增添css类的方式来增添UI，尽量不直接操作DOM。


## 3.可以看看目前一个特别火的框架Vue.js
<https://cn.vuejs.org/v2/guide/comparison.html#Riot>

# 1213
## 1.学习Swift lecture4
视频已看完。

实战代码目录：Developer/Face

Lecturer 4 Slides.pdf待摘抄到Face中

## 3.帮助卫国哥完成回滚
svn 回滚方法：

1. 进入项目目录
2. 右键→ “Tortoise SVN” → “Show log” →
选择你要回滚的目录→
右键→
“revert to this version” →
“ok"
3. 回到项目目录→
“SVN Commit" →
“ok"


## 2.待做祥云的新增专题页任务
参考： workLog-2016-g.md的“智慧城市”

# 1214
## 1. 急救培训 之 心肺复苏

## 2. 添加“财富管理”页面

## 3. 继续看lecture4 PPT并做笔记 Lecture4_view.playground
笔记做到的第9页


# 1215
## 1. 急救培训 之 包扎止血固定

# 1216
## 1.新增专题页面“2016年度报告”

广告位id:2002

pageId:2016annualreport

截止日期:2016年12月31日

## 2.修改ft调查页面
卫国哥的ftc-share:package.json里面少了promisify-node

readme中的引用应该修改为import 'ftc-share' 而非'o-share'

# 1219
## 1. 继续汉化perils-of-perception
### 1. 学习到了
1. nunjucks {%- 是去掉空格的意思，详见<https://mozilla.github.io/nunjucks/templating.html#if>。
2. 在有nunjucks标签的html中，使用<!-- -->注释是会报错的，得用{# #}来注释。详见<https://mozilla.github.io/nunjucks/templating.html#comments>
3. nunjucks之Filters：过滤器，详见<https://mozilla.github.io/nunjucks/templating.html#template-inheritance>

		{{ foo | title }}
		{{ foo | join(",") }}
		{{ foo | replace("foo", "bar") | capitalize }}//display"Bar" finally

### 2.工作进度
html-head.html逐行检查，汉化，做到了第68行的\<title>

# 1220
## 1.继续汉化perils-of-perception
### 工作进度
1. 16：00 看到了header.html
2. 22:28 看到了问卷正文部分，要开始看js了，从client/index.js入手开始看


# 1221
## 1.继续汉化perils-of-perception
### 工作进度
搞明白了question数据的获取方式。

在client/index.js中，其数据是通过fetch('https://ft-ig-content-prod.s3.amazonaws.com/v1/ft-interactive/answer-api/2/2__perils-of-perception-survey-2016__${key}.json')得到

那么我就直接把这个数据下载下来，然后import 该数据即可。

问题：是每个国家的问题都要下载，还是只需要下载中国的？

# 1222
## 1.继续perils-of-perception
### 引入ftc-footer


### 学到的
1. 关于模块
  可在模块中的package.json使用：

	  "main": "./src/js/data.js",

  指定引用该模块名称时定位到的文件。


## 2.暂定明年工作大项
1. next项目结构

# 1223
## 1.学习Swiftt
看lecture5，看到了17:32

## 2.新任务
制作可视化东西。

<http://datanews.caixin.com/mobile/fang2016/pc/>

## 3.关于perils-of-perception
### 学到了
1. babel node
	
	node 本身只支持一部分的ES6，不支持ES7。

	在本项目中gulpfile文件的命名方式是gulpfile.babel.js, 即 使该node环境可以完全兼容ES6/7。故遇到类似...obj的spread对象的语句时，自动使用babel进行了转换后才得以顺利运行。

	而在之前的项目中gulpfile文件命名方式就是gulpfile.js，则其不自动使用babel。其是在webpack中使用了babel。
	
	***待学习：webpack/babel***
2. import和require区别
	- import是ES6的，是动态引用文件，import语句只能写在代码最外层。只有当后文使用到该import进来的模块时，该模块才会被导入，因而会出现本项目 config\index.js中使用await的情况：
			
			import article from './article';
			const d = await article();
	- require是node的，它是静态引用文件，即在一开始require的时候就已经将模块存入内存中了。故使后文使用该模块时直接用就行。
	

# 1227
## 1. 继续复习o-grid
看到了 o-grid/src/scss/_main.scss的@mixin oGridTargetIE8
## 2. pull卫国哥的perils-of-perception
这中间试图安装了一下git-aware-prompt

参见<https://github.com/jimeh/git-aware-prompt>

然而在windows上的安装没有详细说明。

## 3.制作2016好文推荐系列页面
在<http://backyard.ftchinese.com/>的create inteaactive栏目做。

# 1228
## 1.继续学习Swift.
看到第5课 23：30

## 2. html中有些meta是必须设置的
如：
<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0">

只有这样设置了，高清屏才不会把1个像素弄成2个像素，用户也不会自己放大缩小这个页面。

# 1229
## 1.看完了Swift的第5课

## 2.帮销售部解决思科文章的广告id问题
科技频道<http://www.ftchinese.com/channel/technology.html>

文章<http://www.ftchinese.com/interactive/8429>

### 问题描述：
点击文章原先的跳转链接是 http://www.ftchinese.com/interactive/8429#adchannelID=1502。

这里是科技频道对应的广告id。该频道下所有的文章中的广告id都是如此。

网址变为www7，就可以看到广告每个广告位的id。

频道的广告id会覆盖所有该频道下的文章的广告id，所以只有去掉链接的adchannelID才行。


### 解决办法
1. 在www7打开科技频道页<http://www7.ftchinese.com/channel/technology.html>
2. 滚到最下方，打开"编辑本页"，即跳转至pagemaker页面
3. 找到该片文章，里面有一个custom link的input。默认是空白，即自动获取所属频道的广告id。 想要覆盖掉频道id就手动设置一下custom link为不带参数的http://www.ftchinese.com/interactive/8429

ok啦

## 3. 后台制作年度好文推荐分页h5:中国经济





