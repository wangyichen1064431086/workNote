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

##### （3）histback函数定义： webapp/app/scripts/main.js--401行

代码段笔记： webapp-wyc/app/scripts/main_funcs.js 第1400行

#### 1205am 比较了软硬件退回方式的不同
- 只有苹果的滑动返回是 文章页→
频道页→首页，非按照真正的记录来。
- 其他软件（左上角箭头）返回，和硬件（浏览器返回按钮）返回，都是

#### 1206pm 与强哥协商方法，我这边的代码变动如下：
1. 在main.js的3121行showchannel函数中添加了 ftjavascriptapp.setandroidurl相关代码段。














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








