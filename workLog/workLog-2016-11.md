# 1101
## 1. 配置Mac
系统配置文件在 /Users/wanbo/.bash_profile

## 2. 最终修改
安卓无滑动功能

# 1102
## 1.Swift学习
官方教程中文版 <http://wiki.jikexueyuan.com/project/swift/chapter1/02_a_swift_tour.html>

英文文档 <https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/GuidedTour.html#//apple_ref/doc/uid/TP40014097-CH2-ID1>

中文翻译项目<https://github.com/numbbbbb/the-swift-programming-language-in-chinese>

# 1103
## 1. Swift学习会
零碎笔记

//Bundle identifier: com.ft.ftchinese.mobile
//Deployment Target:8.0 为可发布的最低版本的iOS
//Device Orientation:支持的方向

## 2. 看Swift视频二
视频二学到26：27


# 1110
## 1. 解决滑动效果在安卓手机上的bug

网页可见区域宽：document.body.clientWidth 
网页可见区域高：document.body.clientHeight 
网页可见区域宽：document.body.offsetWidth (包括边线的宽) 
网页可见区域高：document.body.offsetHeight (包括边线的宽) 
网页正文全文宽：document.body.scrollWidth 
网页正文全文高：document.body.scrollHeight 
网页被卷去的高：document.body.scrollTop 
网页被卷去的左：document.body.scrollLeft 
网页正文部分上：window.screenTop 
网页正文部分左：window.screenLeft 
屏幕分辨率的高：window.screen.height 
屏幕分辨率的宽：window.screen.width 
屏幕可用工作区高度：window.screen.availHeight 
屏幕可用工作区宽度：window.screen.availWidth


其中document.body.clientWidth 可以获取安卓手机屏幕正确的宽度；而screen.width和screen.availWidth不能获取安卓手机正确宽度，可以获取苹果手机正确宽度

## 2. 关于translate3d

translate3d是CSS3的一个新的css属性。目前只有webkit和mozilla以及较新的IE10支持CSS3，webkit支持得最好，moz次之，IE最差。所以目前CSS3的应用主要还是在iOS和android上会比较有前途，PC上支持较差。通过向量（vecotr) [tx,ty,tz],来实现一个3D的移动。

在苹果上用translate3d要比translate2d和translateX/translateY要好很多。而在安卓上会很悲剧，会卡段，3d/2d都卡。

# 1111
## 1. 关于Android的translate问题
无法解决

### 以后的两个方向
1. 使用SWIFT开发原生的
2. 重新开发webapp,使用三个view为一个整体的方式

# 1114
## 1.继续看Swift文档
看到了methods的最后一点，下次接着写完Methods.playground

## 2.继续解决Android的translate问题
ft的app网页网址 <app.ft.com>
slack平台地址 <https://financialtimes.slack.com/?no_sso=1>

## 3.前端论坛、社区知乎推荐
论坛 <https://segmentfault.com/>
社区 <http://stackoverflow.com/>

# 1115
## 1. 关于表单新设计
### 服务端项目 next-restful-api
进入 node app.js

### client端项目 next-demo
进入 

gulp dev

node app.js


# 1116
## 1.继续学Swift Lecture3
看doc,看了 Initialization看了一半。

刚开始看 Inheritance,明天接着看Inheritance。


# 1117
## 1. 继续看Swift docs
看完了Inheritence

Intialization看得差不多了


### 待做事项
继续看swift视频及文档。

看js的类的构造相关知识的文档。


# 1124
## 1.看完了,操作完了SWIFT的Lecture3

## 2.基于Lecture3所讲的AnyObject，开始看SWIFT文档的protocol部分。

### 看到了Delegationnayizhang 

## 3.学习google Analysis
教程：
<https://analyticsacademy.withgoogle.com/course/1/unit/1/lesson/1>

官方文档：
<https://support.google.com/analytics/answer/1008015?hl=zh-Hans&ref_topic=3544906>


# 1128
## 1. 创建redmine账号
账号Bonnie,密码wangyichen

<http://redmine.ftimg.net/login?back_url=http%3A%2F%2Fredmine.ftimg.net%2F>

待问超哥管理权限。
## 2. 学习卫国哥的next-signup

### (1)结合该项目下的app.js来学习koa
中文文档：<http://koa.rednode.cn/>

英文文档：<http://koajs.com/>


### (2）origami的o-forms:
<https://origami-build.ft.com/v2/demos/o-forms@3.2.3/prefix-suffix>

### (3)修改form.scss改修改信息的页面


# 1129
## 1. next-signup发布路径
dev_www/frontend/tpl/phone/register-new.html

## 2. 学习整理了koa相关内容
详见《koaLearn.md》

## 2. 待做事项
问卫国哥的笔记记录工具。


# 1130
## 1.稍微帮忙修改next-signup的scss

## 2.学习ga
详见《gaLearn.md》

