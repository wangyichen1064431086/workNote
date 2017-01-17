# 0103

## 1. Swift的Lecture6
看到最后20分钟。

## 2. 关于“因果树”合作项目

现在有一个新项目，我们网站计划开一个新栏目，大致情况是——

丰总谈了一家名为“因果树”的公司同我们合作，它们提供给我们由机器人程序爬来的创业公司获得投融资情况的数据，我们获得数据后有编辑进行核实查证，查证通过的会消息发布到网站专门栏目上。

这里面需要我们开发的有：
1、抓取对方数据或处理对方推送来数据的程序；
2、存储这部分数据的数据表；
3、将数据展示给编辑，编辑查证后操作发布到网站上的Backyard页；
4、网站里专门展示这部分数据的页面

上面涉及页面的部分，会和闫曼具体商定，这个为后话。
从整体上看这个栏目和网站关联不密切，Backyard页和前端展示页可以单独制作，你俩看看我们是利用网站现有技术做呢，还是尝试用一些新技术实现呢？帆总建议我们可以的话使用一些新技术。

# 0104
## 1.看新版的perils-of-perception及新版的ftc-share和ftc-image-share

### 试着添加广告

# 0105
## 1.为perils-of-perception添加广告

#### 工作进度：
 完成。

#### 成果：

- github:<https://github.com/ftc-editorial/perils-of-perception>
- 线上服务器同步文件夹：E:/FT/ft-interact
- 线上地址：<http://interactive.ftchinese.com/perils-of-perception/index.html>

#### 收获
- iframe不能跨域！！！

- linux上'/'开头的路径表示服务器根目录

## 2.照ftc-share写一遍ftc-share-wyc



# 0109
## 1.开会学习支付逻辑
笔记：


	 Ex盘的的categories
increase是
preserveusers


load in-App identifiers
Fetch Product info
Show in-App UI
Make Purchase
Process Transaction
Make Asset available
Finish Transaction


Payment Queue
## 2.讨论接下来要做的小程序


## 3. 整理frontend/tpl的引用逻辑

孙宇要求：

好多if条件，然后有include，就整理这些

比如这样，
条件1——
include文件a
条件2——
include文件b
……
整理完首页，再整理，a文件、b文件，树状的整理
	
## 4.卫国哥帮忙整了一下苹果电脑
注意事项：

- 不要动所有系统文件，即除了用户目录下其他的文件都不要动！
- 安装软件都用:
		
		brew install

## 5.帆总讲解跟踪
相关代码段： NEXT\app\scripts\main.js:

- function trackViewables
- function checkInView

其他还要注意的有：

- 出现时间：1s(根据国际广告什么什么组织的标准）


# 0112
## 1. 帆总讲解视频播放的问题
安装charles,可在电脑上追踪手机版的load情况。

## 2. 继续整理dev_www结构
整理 frontend/tpl/tag.html

## 3. 卫国哥在开发微信小程序中遇到的问题讨论
### 1.关于生成用户唯一标识符：

使用专门的包：<https://github.com/kelektiv/node-uuid>

ga开发者文档中相关篇目：<https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id>

# 0113
## 1. 基本完成整理dev_www相关页面模板工作
### 整理工作相关文件夹

放在FT/dev_wwwLearn下

### 整理成果：

- index.svg
- tag.svg
- 引用结构整理.html

### 整理工作台

- 绘图1.vsd
- 引用结构整理.md

### 待做工作
对着 《工作硬性任务log.md》中的 例行任务 之 添加页面模板

## 2. 帮忙预览卫国哥写的小程序
项目github: <https://github.com/FTChinese/today-focus>

本地目录： FT/today-focus

## 3. 帮书华上传了perils-of-perceptions


# 0116
## 1.重新详细阅读frontend\tpl\next\html\manual.html
php和Smarty相关知识点要学习。

## 2.修改滑动回退bug

# 0117
## 1.完成回退bug修改
bug:

1. 从首页→文章→相关文章，这样子回退会带来问题
2. 从相关话题回退必须回退到首页

## 2.继续进行结构整理
### 注意点：

1. 以前咱们加特别报道需要改很多地方，整理这块时优先知道每个修改的地方影响的是哪部分。

2. 特别报道分两大种情况
	1. 需要编辑在Pagemaker里拖文章，新建页面，指定广告位ID；
	2. 不用编辑拖文章，广告客户承包某个已经存在的栏目，但是指定广告位ID。

	这两种情况需要修改哪些地方，为什么修改，要弄明白哈

### 进度
差不多把mannual.html看完了弄懂了。

### 明日安排
- 将首页mannual.html的图画完。




