# 0901
## 1.学习Express
见《expressLearn.md》

## 2.新增模板
请建立AIA专题页面，参考之前“G20”、“智慧城市”、“存储世界”的方式。

TAG名称——根植财富
英文代号——2016aia
广告位ID——2050

Pagemaker里页面名称——【友邦保险】根植财富计划
具体修改哪些文件，之前应该有说明，这次一样。如果next源码对应地方有修改，记得提交Git。
建立好后，参考之前的专题，尝试用Pagemaker简单做好页面框架。


## 每日词汇积累
- routing n.路由选择
- refer to 指的是
- be relative to 相对于
- retrieve vt.获取，得到

# 0902
## 1.继续学习express
 自己练习的project为"mytest/expressLearn/myapp0"，只实现了显示假图片数据。

## 2.梳理NEXT结构
详见《Next项目学习.md》。

下次来了继续写3.5 partials/banner.html

## 每日词汇积累
- deprecated 弃用
- compilation n.编译，编辑，汇编
- banner n.横幅，旗帜

# 0905

## 1.继续梳理NEXT结构

## 2.卫国的一组压力测试：node的不同框架 + 不同模板引擎 + mongdb

- koa.js + marko
	
- kao.js + 
- 

- express.js + marko

- express.js + handlebars
	
- express.js + nunjucks

<http://koa.bootcss.com/>

<http://expressjs.com/zh-cn/>

使用测试工具<https://github.com/tsenart/vegeta>

项目在 Github\neefrankie\exp-demo和Github\neefrankie\koa-demo 中，其是在卫国哥的Github(<https://github.com/neefrankie>)上。


该 exp-demo中，可运行的脚本文件是test\test.sh,其为Linux的Shell文件，故在我的电脑上没有办法运行，运行方法为：将该文件中的每一行直接粘贴在命令行中运行,且运行时将变量${xx}自己手动替换成 "report.njk"

test.sh:

	#!/bin/bash
	report="report.njk"
	vegeta attack -targets=targets.txt -duration=60s > results.bin
	vegeta report -inputs=results.bin -reporter=plot > ${report}.html
	vegeta report -inputs=results.bin -reporter=text > ${report}.txt
	vegeta report -inputs=results.bin -reporter=json > ${report}.json



## 每日词汇积累
- robust adj.强健的
- spoiler n.剧透
- runtime n.执行时间，运行环境
- boilerplate n.样板文件，引用
- strut vt.炫耀
- snug adj.舒适的，温暖的 adv→snugly
- a couple of 几个，一对
- delve vi.vt.钻研
- vendor n.供应商
- multithreaded adj.多线程的
- bevy n.一群
- paradigm n.范例
- caught on 变得流行
- low level features 底层特性
- verbose adj.冗长的
- philosophically adv.哲学层面地
- vanilla adj.平凡的，缺乏特色的，香草味的
- extensible adj.可扩展的
- hands-off adj.不干涉的，不插手的
- architectures n.建筑，构架
- proficient adj.熟练的，精通的 be proficient in 精通于
- concurrency n.并发性
- analogy n.类比
- muffin n.松饼，杯状小蛋糕
- batter n.面糊
- effectively adv.有效地
- asterisk n.星号
- performance n.性能
- mean stack n.全栈
- lingo n.术语
- functionality n.功能
- demystify vt.阐明
- time zone 时区
- stroke vt.行程，冲程
- opinionated adj.固执己见的，刚愎自用的
- rigid adj.严格的，僵硬的，死板的
- cruft n.不整齐的部分
- minimalism n.极简主义
- rein n.驾驭，缰绳
- steer vt.控制，引导，驾驶

# 0906
## 1.继续看express

## 2.例会记录

### 1.关于前后端
kao.js是后端框架，比express.js性能好。

react是前端框架。

还有g-ui是Financial-Times上的一个新库，整合了所有的东西。

### 2.关于谷歌分析
看得最多的还是Product KPI,关注其下的Users、Pageviews、Interactive Pageview

地址<https://www.ftchinese/?showofClick> 可以看到可视化的页面点击量。这里每个版块包含的参数有：

- 版块被点击概率
- V:版块被看到的概率
- E:(点击数、被看到数、版块高度）综合考虑后的一个强度参数

Oli张帆:
This is the guildline for Google Analytics API: <https://developers.google.com/analytics/devguides/reporting/core/v4/>

Oli张帆:
<An example can be found here: http://www.ftchinese.com/?showHotClick=yes>

## 3.看了两篇博客
### 一年前
<http://geekforbrains.com/post/why-im-switching-from-python-to-node-js>

Python版本很乱。

Python的循环引用，很糟糕，循环引用标志你的模块设计的失败。

Python用pipe，node用npm。npm上最新的包更多。

在硬件方面Node比Python要瘦。归根结底是因为Node的异步属性。

团队更容易熟悉node，因为前端工程师都熟悉JS。

Node使用MongoDB和JSON。

结论：node在团队学习方面很可取，而且比较现代，是为新的web涉及。

### 一年后
<http://geekforbrains.com/post/after-a-year-of-nodejs-in-production>

node易学但难于控制。其包的更新变化处于非常危险的速度，而且也不稳定。

node难于处理错误。node是在回调中传递错误。回调层数多了就不好了。更别提你忘记在回调中返回错误了。而且即使你对你自己的错误有一个管理标准，你也没法对所有的npm包邮标准。而且Node的单线程决定了一旦有东西锁住进程，所有都毁了。

为了处理回调、处理错误和解决难于阅读的逻辑的问题，越来越多人开始用Promises，其可以现成同步逻辑。但又没有一个统一的标准来使用Promises。还有Generator,对其研究不深。

Node甚至JS缺乏标准，JS唯一比较好的标准是Mozilla。

团队使用Node的这一年，我们花了更多时间在追逐文档，提出标注，为库争论，调试初始代码上。

我现在还用Python，其有更好的标准，库，易于调试。






## 每日词汇积累
- sugarcoat vt.裹以糖衣
- nitty-gritty adj.根本的，详细的 n.事实
- monolithic adj.整体的，庞大的
- decree n.法令，判决
- partition vt.分割，划分
- compartmentalize vt.划分
- side-by-side adj.并肩的，并行的
- nicety n.精密，细节 pl→niceties
- functionality n.功能，函数性
- myriad adj.无数的，种种的
- a bunch of 一群，一束，一堆
- animosity n.敌意，仇恨
- arsenal n.兵工厂，机械库
- literally adv.照字面地，逐字地
- rest API n.应用编程接口
- whip up 激起，鞭打，速成
- up to sb 由某人决定
- In broad strokes 在广义范围内
- compatible adj.兼容的
- radical adj.根本的，彻底的
- boxed adj.囚禁的
- belt n.带，腰带
- tighten the belt of sth 勒紧...的裤腰带
- alongside adv.在旁边，并肩作战
- cumbersome adj.笨重的，累赘的
- whirlwind adj.旋风般的
- gem n.宝石，珍宝 adj.最佳品质的
- bane n.毒药，祸害
- shoehorn vt.硬塞进
- come down to 归根结底，归结为
- hook up to 连接到
- ease n.轻松
- catchall n.杂物箱 adj.包罗万象的
- single threaded 单线程的
- crash down 倒下，瞬间瓦解
- abstraction layer 抽象层
- preferable adj.更好的
- decompose vi.vt.分解
- disparate adj.不同的
- diagram n.图表
- radically adv.根本上，彻底地
- all the while 一直，始终
- behemoth n.巨兽
- authentication n.认证，授权
- weird adj.怪异的
- even adj.偶数的
- scheme n.规划，方案
- divisible　adj.可分的
- sanity n.明智

# 0907
## 1. 继续看express那本书
看到了82页

## 每日词汇积累
- fruitful adj.富有成效的，多产的
- it is likely that...很可能
- augment vt.vi.增加增大
- nicety n.细节，美好
- blacklist n.黑名单，将...列入黑名单
- vogue n.时尚 adj.时尚的，流行的
- spit out 吐出
- interpolate vt.vi.插入，篡改
- awkward adj.尴尬的，棘手的
- crufty adj.制作粗糙的，过于复杂的
- resurrect vt.使复兴，使复活
- bygone adj.过去的，原先的
- bygone vt.浏览
- come in handy 派得上用场
- populate vt.填充，居住于
- in some respect 在一些方面
- unwieldy adv.笨重的
- mitigate vt.是缓和，减轻
- authenticate 认证，鉴定
- At the end of the day 最终，到头来，总而言之
- signal vi.发信号
- internally adv.内部地
- finish up v.完成，结束，用光
- complexity n.复杂性
- blanket n.覆盖物 adj.总括的
- convention n.惯例
- nuanced adj.微妙的
- spin n.vt.vi 旋转
- loading spinner 加载时候一直在旋转的那个东西吧
- inbound adj.入境的，流入的
- unintentional adj.非故意的，无意识的
- sick of doing sth 对...感到厌恶

# 0908
## 

## 每日词汇积累
- reinvent vt.重复发明
- dicstat vt.vi.命令，指定
- effectively adv.有效地，实际上地
- battle-tested adj.久经沙场的
- remainder adj.剩余的 n.剩余物
- exploit vt.利用，开发
- errant adj.不定的，错误的
- reiterate vt.重申，反复地做
- skip over vt.略过，遗漏
- exception n.异常，例外
- compress vt.压缩，精简
- pattern matching 模式匹配
- centric adj.中央的，中心的
- basically adv.主要地，基本地
- greedy adj.贪婪的
- combo n.联合体，联合物
- vat n.大桶，增值税
- scoop n.勺子
- sprinkles n.糖屑，巧克力屑
- sauce n.酱油，调味汁
- profile n.侧面，轮廓，简况
- colon n.冒号
- validation n.确认，校验
- daydream vi.做白日梦 daydream about sth
- hex n.十六进制

# 0909
## 1. 卫国哥推荐的视觉效果库

<http://scrollmagic.io/>

<http://prinzhorn.github.io/skrollr/>

<https://scrollrevealjs.org/>

<http://alvarotrigo.com/fullPage/#3rdPage>

<http://photoswipe.com/>


##  每日词汇积累
- the like n.类似的东西
- capable of 有....能力的
- overkill n.过度的杀伤能力 vt.过度地杀伤
- break down vt.分解，发生故障
- gigabyte n.十亿字节
- donut n.甜甜圈
- Don’t roll your eyes,yet.不要不相信 roll eyes转动眼珠（表示不相信）
- preach vt.vi.说教，鼓吹
- mount vt.vi.增加
- interchangeably adv.可交换地
- cryptography n.密码学，密码使用法
- encrypt vt.将...译成密码
- eavesdropper n.偷听者
- beforehand adv.事先，预先
- certificate authority n.认证机构
- bodyguard n.保镖
- snapshot n.快照
- temperature n.邮政编码
- ballpark n.棒球场，可变通范围
- obscure adj.模糊的




# 0912
## 1.修改英语电台bug
移动端测试环境<http://m.corp.ftchinese.com/androidapp.html>
移动端正式环境<http://app003.ftmailbox.com/androidapp.html>

改了 第159行 和 第385行

121行

## 每日词汇积累
- latitude n.纬度
- longitude n.经度
- atop adv.在顶上，在...的顶上
- demystify vt.使非神秘化，阐明，启发
- OSes abbr.操作系统
- nebulous adj.朦胧的
- deviate vt.脱离
- spit out vt.吐出
- fundamental n.基本原理
- straightforward adj.简单的，明确的，坦率的
- contrived adj.认为的，做作的，人造的
- consistent adj.一致的
- nasty adj.下流的，肮脏的，严重的n.令人不快的事物
- envision vt.想象，预想
- idempotence n.幂等性
- envision vt.想象，预想
- murky adj.黑暗的，朦胧的，阴郁的
- formally adv.正式地，形式上地
- in any case 总之，无论如何
- versioning n.版本控制，版本化
- scenario n.方案，情节
- stagnate vi.vt.停滞，淤塞
- stay up to date 保持最新的

# 0918
## 1.继续调试英语电台bug

修改文件：www\frontend\tpl\phone\radio.html


我改了 第159行、第385行、121行

现在测试和线上都为帆总的版本，即 myftwork\www\frontend\tpl\phone\radio.html和myftwork\dev_www\frontend\tpl\phone\radio.html

我的写法位于 myftwork\added\radio.html

说明帆总和我的写法区别的 myftwork\added\radio_note.html

### 帆总增加的代码段

      #audio-container{
        font-size:16px;
        height: 100%;
        background: #FFF1E0;
        position: relative;
        padding-top: 340px;
        box-sizing: border-box;
      }

      .show-status-bar #audio-container {
        padding-top: 360px;
      }

	   .player-box {
        width: 100%;
        background: #9b164f;
        color: #fff;
        padding-bottom: 10px;
        top: 44px;
        left: 0;
        position: absolute;
      }

      .show-status-bar .player-box {
        top: 64px;
      }

	   .player-list {
        overflow:hidden;
        overflow-y: scroll;
        height: 100%;
        -webkit-overflow-scrolling: touch;
      }


      .player-list.scrollable {
        
      }

然后删去了Detect if FTScroller.js is already loaded部分的js

#### 我修改的代码段
	 #audio-container{//父元素
        font-size:16px;
        height: 100%;
        background: #FFF1E0;
        position: relative;
      
      }
 	 .player-box {//子元素二（子元素一没有动）
        width: 100%;
        background: #9b164f;
        color: #fff;
        padding-bottom: 10px;
        padding-top: 40px;
        
        position: absolute;
        top: 44px;
      }

	 .player-list.scrollable {//子元素三（即最后一个子元素，也即高度需要自适应的子元素）
        height:100%;
        /*height: 329px;*/
        overflow: hidden;
        
        padding-top: 377px;
        
      }

### 收获：
#### 1. 滚动效果设置
直接设置：overflow-y：scroll

overflow-y|overflow-x|overflow: 如果内容溢出了元素内容区域，是否对内容的上/下|左/右边缘进行裁剪。

可取值|说明
-----|----
visible|不裁剪内容，可能会显示在内容框之外。
hidden|	裁剪内容 - 不提供滚动机制。
scroll|裁剪内容 - 提供滚动机制。
auto|如果溢出框，则应该提供滚动机制。
no-display|如果内容不适合内容框，则删除整个框。
no-content|如果内容不适合内容框，则隐藏整个内容。

#### 2.关于height:100%

如果要height:100%生效，他的所有parents都要设置为height:100%而不能为min-height：100%。

#### 3.关于 -webkit-overflow-scrolling
-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果.

###### 取值：

- auto:使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。
- touch:使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。

###### 浏览器兼容性

移动版 Safari  iOS 5.0+

#### 4.一种上面几个元素高度固定最后一个元素高度自适应的页面布局

思路为：

- 上面几个子元素高度采用绝对高度

- 最后一个子元素高度为100%,然后给上padding-top的值为上面几个子元素高度之和

#### 5.*关于ios原生应用上面要多出20px(即电池啊等等图标那一行）
在webapp\app\scripts\main.js中，通过判断gShowStatusBar的值来判断是不是ios原生应用，如果是，则为html标签添加.show-status-bar的class类名。


### 想到的建议
代码的文档编撰工作





- progressive adj.渐进的
- building block n.构造块
- adopt vt.采取，接受
- at once 立刻，马上，同时
- go into 探究，加入
- compelling adj.引入注目的，迷人的
- umbrella term n.涵盖性术语
- simplicity n.朴素，简易
- sake n.目的，理由
- viewport n.视口，观察口
- solely adv.单独地，唯一地
- lest conj.以免
- unresponsive adj.非响应式的
- bookmark vt.标记 n.书签
- distribution channel n.分销渠道
- supplement vt.增补，补充
- acclimate vi.vt.使适应 be acclimated to 适应某物
- not least/not least of adv.尤其，相当重要地
- exposure n.暴露，曝光
- revenue n.税收，收益
- grossing rank n.票房排名 
- exponentially adv.以指数方式
- at sb's destination 达到某人的目的
- engagement n.参与度
- re-engage vt.重新接入
- programmable adj.可编程的，可设计的
- proxy n.代理
- intercept vt.拦截，窃听
- fabricate vt.制造，伪造
- granular adj.颗粒的，粒状的
- caching n.缓存
- groundwork n. 基础，地基，基础性工作
- take place to 居于...地位
- manifest n.清单
- implement vt.实现，实施
- notification n.通知，通告
- prompt n.提示
- distinct adj.明显的，清楚的，显著的，不同的


# 0918补
## The Building Blocks Of Progressive Web Apps
<https://www.smashingmagazine.com/2016/09/the-building-blocks-of-progressive-web-apps/>

对于大多数公司而言，构建一个app的常用智慧是构建一个原生Android或iOS的app，同时也支持一个网站。虽然这样做有许多好处，但是并没有多少人知道web app的主要优点。**Web apps可以同时取代原生app和websites的所有功能**。其正在变得越来越前沿，但是仍然没有多少人熟悉、接受他们。

### 更深入的阅读资源
<https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/>

<https://www.smashingmagazine.com/2016/02/building-first-class-app-leverages-website-case-study/>

<https://www.smashingmagazine.com/2015/04/creating-web-app-in-foundation-for-apps/>

这是一些关于如果构建渐进式webapp的资源，及一些关于此的更深入的研究。我也会探究一些不同的组件，和一些围绕web app的问题。虽然不是每一个浏览器都支持，但是学习这项技术还是有一些引入注目的原因的。

### What Make A Web App Progressive?

progressive web app是一个涵盖性术语，用于生产一个类似于app的体验的web。为了简单，我将它们称为web apps。

一个理想的web app 是这样一个网页——其对于网站和原生app都具有良好的支持性。在和设备的视口交互、适应时，它需要速度快、离线可用、能够在主屏幕放置一个图标。

同时，它不能牺牲网站的优点，例如链接到应用程序更深的页面、使用URL来分享内容等等能力。就像一个网站一样，web app需要有很好的跨平台能力，并不仅仅关注于移动设备。它应该在台式机上和其他设备上都表现良好，免得我们的网站是非响应式的。

Progressive web apps并不是新生事物。2011年以来，移动设备浏览器已经有能力将一个网站作为标签放到手机的主屏幕上，其是通过在head标签里放置一个meta标签来决定已装入网页的图标。自2012年以来，Financial Times 使用了web app来传输数字内容。

迁移到web app上使得Financial Times可以跨平台使用相同的应用程序。我在FT工作的时候，只构建一次我们就可以支持以下全部：

- iOS
- Android (4.4+) Chrome,
- older Android (via a wrapper),
- Windows 8,
- BlackBerry,
- Firefox OS.


### “But It is Not In An App Store"

至于为什么个网站增补一个原生app仍然是大多数主流公司的标准做法，有很多看起来不错的理由。无非是对浏览器支持度的担忧，以及大多数用户适应于使用原生app的事实。尤其是对app如果不在app store中该怎样曝光的担忧。

图线说明，当声望下降时，在store中的曝光也呈指数下降。

我想要说明的是，在app store中并无明显优势，因为只有你是app store中的top 0.1%的app，你才可能从这里获得巨大收益。

用户往往是先找到你的网站再找到你的app的。如果你的网站就是一个web app,它们就已经达到他们的目的了。

web app的一个优点是，它可以让你提升参与度——通过减少 着陆于你的网站和安装你的app之间的 用于重新接入用户的点击数目。

通过将web app添加到你的网站首页来让你的用户安装你的web app,你的用户可以持续与你的网站打交道。当他们关闭了web浏览器，手机就会告诉他们那里可以安装web app,这样就让你的东西重新回到他们的意识中。

### Background and current climate
现代web app都基于一个叫做service worker的新技术。Service workers是一些可编程的代理，其位于user's tab 和 the wider Internet之间。它们拦截并重写或制造网络请求以允许每个细粒度的缓存和离线支持。

自从web app——其使得网站可以以书签的形式放在屏幕首页——诞生于2011年，很多开发工作都是用于为创建progressive web app打基础的。

Chrome38 引进了web app manifest，其是一个JSON文件，描述了你web app的配置。这就允许我们不用在head标签中写这些配置。


在Chrome40中，service workders开始铺开跨越Firefox和Chrome。Apple目前还没有将该feature应用到Safari中，但也在考虑。service worker的功能就是简化让app离线的过程；它还可以为将来app会有的功能打基础，如推送通知，背景同步等。

基于service workers和 web app manifest而构建的app被叫做progressive web apps。

一个progressive web app也不是和说明书上写的完全一样。事实上，它最初是对service worker时代web app应该是什么样的的一个定义，并被增添了一个新技术——构建于浏览器内。特别要说的是，Chrome使用这个定义做了一件事：当一定条件满足时，浏览器内会触发一个安装提示。这些条件是当这个web app:

- 拥有一个service worker(需要HTTPs)
- 拥有一个web app manifest文件（至少为其最配置，具有 display:"standalone")
- 曾经拥有两个不同的访问者

在这个情景下，"progressive"意味着浏览器支持越多功能，（网站的）体验就会越像app。

安装web app的提示会在许多条件下出现：Opera,Chrome,Samsung浏览器。

Apple已经表示出对于iOS的progressive web app的兴趣，但截至写作时间Apple仍然依赖meta标签来进行web app配置，和依赖AppCache用于离线使用。

### At What point does a website become a web app?(在什么条件下网站可以变成web app?)

我们知道一个网站长什么样，也知道一个app长什么样，但是在怎样的添加下一个网站可以变成一个web app呢？关于什么可以使得一个东西更像web app而不是网站，没有决定性的标准。

#### 一个progressive web app应该继承app有的特定特质：

##### Responsive
这些网站一开始就是针对手机和平板的，且都是能够响应过多的屏幕尺寸的。它们应该和台式机的网站一样工作。响应式涉及已经成为网站建设的主要工作。

##### Offline-firest
app必须可以离线启动，且仍然可以呈现有用的信息。


##### Touch-capable
交互需要专为触摸涉设计，使用手势交互。用户的交互体验必须要感到是响应式的而且是爽快的，在触摸和响应之间不能有延迟。

##### App meta data
app应该提供元数据来告知浏览器它在被安装后应该长什么样，这样你会在home屏获得一个高分辨率的icon，以及在一些平台上获得一个启动画面。

##### Push notification
当app没有运行的时候，app能够接收通知


#### ...但是也一个保持几个web-like特质

##### Progressive
app的被安装的能力是一个渐进增强。app仍然像普通网站一样工作是很重要的，尤其在那些目前不支持安装和service worker的平台

##### HTTPS on the open web

app不应该和任何浏览器或app store绑定。它一个能够被深度链接到，也一个提供分享当前URL的方式。




## 词汇积累
- progressive adj.渐进的
- building block n.构造块
- adopt vt.采取，接受
- at once 立刻，马上，同时
- go into 探究，加入
- compelling adj.引入注目的，迷人的
- umbrella term n.涵盖性术语
- simplicity n.朴素，简易
- sake n.目的，理由
- viewport n.视口，观察口
- solely adv.单独地，唯一地
- lest conj.以免
- unresponsive adj.非响应式的
- bookmark vt.标记 n.书签
- distribution channel n.分销渠道
- supplement vt.增补，补充
- acclimate vi.vt.使适应 be acclimated to 适应某物
- not least/not least of adv.尤其，相当重要地
- exposure n.暴露，曝光
- revenue n.税收，收益
- grossing rank n.票房排名 
- exponentially adv.以指数方式
- at sb's destination 达到某人的目的
- engagement n.参与度
- re-engage vt.重新接入
- programmable adj.可编程的，可设计的
- proxy n.代理
- intercept vt.拦截，窃听
- fabricate vt.制造，伪造
- granular adj.颗粒的，粒状的
- caching n.缓存
- groundwork n. 基础，地基，基础性工作
- take place to 居于...地位
- manifest n.清单
- implement vt.实现，实施
- notification n.通知，通告
- prompt n.提示
- distinct adj.明显的，清楚的，显著的，不同的
- definitive  adj.决定性的
- metric n.度量标准
- plethora n.过多，过剩
- gesture n.姿态，手势
- snappy adj.爽快的
- high-resolution n.高分辨率
- splash screen 启动画面
- applicable adj.可适用的

## 0919

### 1. 学习webapp项目

参见新md《webapp项目学习.md》

Git的webapp新项目在 E:\myftwork中

### 词汇积累
- abort vt.使流产，使堕胎
- sdk 软件开发工具包，Software Development Kit
- expires n.到期，有效期

## 0920

### 1. 帆总讲解xCode使用方法

修改版本号→clean→analyse→...→ validate→ upload


### 2.继续学习webapp下的main.js
### 词汇积累
- validate vt.认证，验证，确认，生效

## 0921
### 1.看完了webapp项目的gulpfile.babel.js,并向帆总请教了不会的地方

### 2.继续看webapp的main.js

### 词汇积累
- vhost n.虚拟主机
- swipe n.vi.vt.猛击

## 0922
### 1.继续看webapp的main.js

### 词汇积累
- extract vt.提取

## 0923

## 1. Lecture by Weiguo
### Popular Frameworks

- Express.js:Node style callback
- Koa.js:基于ES6的yeild。可以用同步的方式执行异步代码
- Hapi.js：注重配置，不用写代码(Configuration over coding)
- Total.js

#### Koa.js
<https://github.com/tj/co>
1.x为稳定版，基于ES6的yeild
2.x基于ES7的



### Template Engines

#### Mustache
是一个标准，非某种语言
<http://mustache.github.io/>

无逻辑，即无if...else...,只靠数据结构

##### Mustache.js
<https://github.com/janl/mustache.js>
为js的实现，不是Node的实现

只负责渲染字符串，无文件读取的功能


#### Handlebars.js
<http://handlebarsjs.com/>
有了逻辑，但还是无文件读取的功能


##### n-handlebars
FT做的可以读取文件

#### Mu
Node的实现

但没有完全实现。无循环数组的功能

#### Nunjucks
<http://mozilla.github.io/nunjucks>

- 火狐出的，Node的实现。
- 参考python的jinja2：易懂
- Both for node and front-end
- 支持继承
- 支持partial文件的异步加载
- 有中文版文档，还可以看jinja2的文档

#### Marko
<http://markojs.com/docs/>

它是html的引擎，其他都是字符串的引擎

- by eBay
- Support node stream
- Support async
- Support layout
- 速度是最快的，但语法奇怪
- 非常新，用户量少

#### MongoDb
mongodb --



## 其他
Calibre


伦敦使用webpab打包js


yield就是把异步的实现成同步。然后可以用try...catch来抓取错误，而异步的回调函数就不行。

## 2.安装Cholo
<https://chocolatey.org/install>

注意安装前要修改执行策略，参考<https://technet.microsoft.com/zh-cn/library/hh847748.aspx>

## 3.我自己时间卫国的exp-demo的步骤
参见<https://github.com/neefrankie/exp-demo>

他写的其他项目;

- <https://github.com/neefrankie/koa-demo>
- <https://github.com/neefrankie/flask-demo>

- <http://interactive.ftchinese.com/components/index.html>这是模块的索引

1. cd 到 E:\myftwork\Weiguo,然后 git clone https://github.com/neefrankie/exp-demo
2. npm install 
	- 注意：node 要切换到6.2.2,gulp要用4.0
3. bower install
4. 安装mongodb 用choco或二进制安装包
	1. choco install mongodb
	2. cd到我的mongodb安装位置 C:\Program Files\MongoDB\Server\3.2\bin
	3. 配置mongodb的data文件夹： .\mongod --dbpath  "D:\Program Files\mongodbdata" 执行完就直接启动了Mongodb的本地服务器
5. 创建db.config.json文件，放置于exp-demo项目根目录，内容为：

		{
			"host": "172.27.10.241",
			"port": 3306,
			"user": "ftnew",
			"password": "ftftft.",
			"database": "cmstmp01",
			"trace": true
		}
6. 运行node migrate.js，将公司服务器上的文章取到本机的mongo服务器。
7. 安装mongo图形客户端。下载Robomongo <https://robomongo.org/download> 下载后直接运行create一个连接到本地的mongodb服务器。
8. gulp build
9. node app.js

## 4. 卫国的结论是以后模板引擎用nunjucks
中文文档<http://mozilla.github.io/nunjucks/cn/api.html>

## 0925
周一学习webapp/main.js的计划：

- 在《webapp项目学习2-main.js.md》中把所有复杂函数所引用的单一功能函数列出来，即把每个函数的“依赖关系”条目写完
- 把所有单一功能小函数读完，分析完
- 把复杂函数也基本分析完
- 在webapp-wyc中实操，先写一遍index.html，再开始写main.js
	- 先克隆到本地，进行npm install,bower install,gulp serve 看看能不能行得通，如果行得通则这些就是必要文件
	- 然后对着webapp的index.html即网页控制台写一遍webapp-wyc的index.html
	- 然后开始写main.js，重新组织结构，单一功能小函数先写，再写复杂函数，每个函数的功能都注释得清清楚楚。

### 1. 英语电台新bug
把那个英语电台播放时候进度条后面的总时间改为剩余时间，随着播放不断减少。

修改文件：www\frontend\tpl\phone\radio.html

修改的html在： 505行
修改的js：706行

## 0927
### 1.继续学习webapp写webapp-wyc

### 2.广告全屏任务
#### 以往操作步骤是：
销售部同事在Backyard中使用Oli制作的一个广告代码生成工具生成一段“全屏”广告代码，然后将这段代码加入我们的广告投放系统中。

Backyard中广告代码生成工具入口：左侧Marketing and AD→
选择右侧 Phone Full Page→生成代码

全屏广告测试链接为——<http://app003.ftmailbox.com/phone.html?testfullpagead>

#### 目前需要进行的修改
修改那段javascript广告代码，使其具有获取屏幕显示区域宽度高度的功能，并根据宽度高度显示图片。

#### 我的工作文件夹

myftwork\workMaterial\0927fullScreenAd

- 修改后的代码:ad.js
- 修改前的代码:ad0.js

## 0928
### 1. 继续实践webapp-wyc
#### 目前进度
- 把index.html中的html结构大体理了一下，知道了各div在app中的位置等。

#### 待做
- 结合html研究javascript。
- 回家继续！！！！

## 0929
### 1.继续webapp-wyc
#### 目前进度
- index.html中的js都写到了inner.js中

## 0930
### 1.解决每日英语页面的跳转链接bug
在这里修改 <http://backyard.ftchinese.com/pagemaker/page-maker.html?page=english>

pagemaker和主文件结构的关系待研究~

### 2.继续webapp-wyc
开始写main.js

### 3.研究mongodb，顺便完成苏老师任务。
#### mongodb的nodejs版quickstart
<http://mongodb.github.io/node-mongodb-native/2.2/quick-start/?_ga=1.136514804.538348964.1474597971>

#### 1）把json数据导出为csv
##### （1）新建node项目
新建node项目，我的是E:\myftwork\mytest\mongoLearn\mongoNodeStart。构建过程参考上述<http://mongodb.github.io/node-mongodb-native/2.2/quick-start/?_ga=1.136514804.538348964.1474597971>


也可直接从我的Git上同步下来。再执行npm install

##### （2）启动MongoDB Server
新开一个：Windows PowerShell
执行：
	
	C:

	cd "Program Files"\MongoDB\Server\3.2\bin

	.\mongod --dbpath "D:\Program Files\mongodbdata"


##### （3）用node连接MongoDB服务器
先cd 到1.中的node项目，再执行：

	node app.js


##### (4)打开Robomongo
- 选择连接到 Connection localhost:27017
- 新建数据库，如weibo

##### (5)利用mongoimport.exe导入json文件

再新打开一个 Power Shell:

	PS C:\Program Files\MongoDB\Server\3.2\bin> .\mongoimport -d weibo -c data --type json --file E:\school\weibo\resemple.json

可以在Robomongo中看到weibo数据库下有了collection data,collection data即为导入的数据，可切换查看数据不同形式。

关于MongoDB的包组件 mongoimport详见<https://docs.mongodb.com/manual/reference/program/mongoimport/>

##### (6)利用mongoexport.exe导出csv文件

在上述Power Shell中执行：

	 PS C:\Program Files\MongoDB\Server\3.2\bin> .\mongoexport --db weibo --collection data --type=csv --fields "_id,id,ids,next_cursor,previous_cursor,total_number" --out E:\school\weibo\relsemple0.csv

更多关于MongoDB的报组件 mongoexport详见<https://docs.mongodb.com/manual/reference/program/mongoexport/>

***注意：Power Shell不支持空格，故上述fields字段一定要加上""***

***上述步骤1. 3.可以不要，即直接在使用命令行操作MongoDB而不用node语言。***

#### 2)学习《Express in　Action》Chapter8(讲express使用MongoDB的）

项目在 E:\myftwork\mytest\expressLearn\expressinAction\lam

已经Git,待继续



