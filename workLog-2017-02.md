# 0207

## 1.帆总让看的资料


大家好，这是关于应用内购买的所有相关资料。

我会先先把一些kick start代码先加到我们的iOS应用的源码中，这样在我休假期间，大家可以review一下。

FTC iPhone App源代码
https://github.com/FTChinese/iPhoneApp

苹果开发者指南
https://developer.apple.com/library/content/documentation/LanguagesUtilities/Conceptual/iTunesConnectInAppPurchase_Guide_SCh/Chapters/CreatingInAppPurchaseProducts.html#//apple_ref/doc/uid/TP40014488-CH3-SW1

教程
https://www.raywenderlich.com/122144/in-app-purchase-tutorial
http://www.brianjcoleman.com/tutorial-in-app-purchases-iap-in-swift/

苹果内容托管
http://masteringios.com/blog/2015/03/03/in-app-purchase-how-to-download-content-hosted-on-the-apple-server/

创建应用内购买商品
eBook：购买产品

产生沙箱用户
https://itunesconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/users_roles/sandbox_users/new
必须用新的邮件地址，而不是用现有的，tech.list@ftchinese.com，Dowjones123

Application Loader
https://itunesconnect.apple.com/docs/UsingApplicationLoader.pdf

# 0214
## 1.继续学习go
参见goLearn系列的md

## 2.克隆了卫国哥的autograph
<https://github.com/FTChinese/autograph>

# 0215
## 1.继续学习go

## 2.毕设使用rollup解决了前后端共享代码问题。

# 0216
## 1.毕设视频使用的版权问题待问领导

## 2. ☆ 开始综述整理的特别报道模板的邮件
### 孙宇的要求：
OK，这样写个简单的说明，就像当初我告诉你加特别报道需要改哪些文件那样

给我写个邮件，列一下:

1. 特别报道需要改哪些文件
2. 哪些文件没必要再改
3. 哪些文件里冗余的过时的条件很多，可以删除
4. 简化“特别报道”制作的想法
	- 我的初步想法是，类似Pagemaker，咱们有个地方简单的设一下，时间、tag条件、相关属性，存到数据库里，然后用个JSONAPI调用，前端页面根据这个JSON显示为特别报道就OK了
	- 对了，咱不一定非得用现在Pagemaker，Pagemaker也可以改进属性和定制升级
	
### 邮件正文

#### 1. 需要修改的文件
1. \frontend\tpl\tag.html
2. \frontend\tpl\next\html\story.html

#### 2. 不用改的文件
1. \frontend\tpl\include\story\story.html

该文件已被\frontend\tpl\next\html\story.html取代，是没用的文件。

#### 3. 待确认的文件*
以下两个文件在引用关系中始终没有看到，待确认：

1. \frontend\tpl\phone\homecontent-source.html
2. \frontend\tpl\phone\nexthome.html

#### 4.各文件冗余条件删除及建议
##### 1.\frontend\tpl\tag.html
- 片段1是根据$tag_name值，设置变量$topnav,$subnav。此处失效的i $tag_name分支可以删去。
- 片段2是根据$tag_name值和当前时间，设置变量$pageId，$adchannelID。此处各分支条件中的时间基本都已经失效，如"if $tag_name=="全球商业的未来" && date("Ymd",$smarty.now) >= 20130607 && date("Ymd",$smarty.now) <= 20161231",失效的条件分支可以删掉。
- 此处的$adchannelID可以不用设置。因为特别报道后面会引入index.html文件，该文件中会引入数据$p=$nextmodel->getPublishJson($pageId)|json_decode:true，并执行了$adchannelID=$p.meta.adid。故此处设置$adchannelID实属多余

##### 2. \frontend\tpl\phone\tag.html
- 此处下的片段2——"include phone\topad.html"可以删去。同时可以删除掉文件"phone\topad.html"，因为该文件中代码已全部被注释掉。

##### 3. \frontend\tpl\index.html
- 本文件只有一个作用，即include "next\html\manual.html"。其他引入旧版模板的条件是无论如何都不会执行的，故其他语句都可以删除。

##### 4. \frontend\tpl\next\html\manual.html
- 在head标签部分下，片段2的条件为"$pageId == "home" && date("Ymd",$smarty.now) <= 20161231"，该时间已过期，可删除该片段。


##### 5. \frontend\tpl\story.html
- 如果url中无参数i，则都会执行条件分支3——“如果1>0,则include next\html\story.html",那么后面几个条件分支是无论如何都不会执行的，可以删去。

##### 6.  \frontend\tpl\next\html\story.html
- 第一个片段又设置了一遍$adchannelID=`$p.meta.adid`,冗余，可以删去。
- 最后一个片段的条件都形如" preg_match("/存储世界/is",implode(",", $story.tag)) && date("Ymd",$smarty.now) >= 20151231 && date("Ymd",$smarty.now) <= 20161231"，时间已经过期，一大段都可以删除。


#### 5. 关于“特别报道”制作的建议
##### （1）变量设置方面
建议每个特别报道的相关变量都在后端（类似pagemaker这种）设置清楚。不要有的变量从后端取，有的变量又在前端设置。这样会导致前端随时都可能冒出新的变量，且新变量一大堆，很乱。建议对现有Pagemaker进行改进，将相关属性诸如时间、tag条件等都存到数据库里，特别报道的前端页面数据都来自于这里。

例如，每个特别报道的$adchannelID来自于后端数据`$p.meta.adid`，而$pageID却是在前端设置的，且前端又经常重复设置已经从后端获取了数据的$adchannelID。如果这些变量都在后端设置清楚，前端不要再设置新变量，也不要再重复设置可以从后端获取的变量，逻辑将会清楚很多。

##### （2）分支条件设置方面
建议每个条件块的若干分支（即if...elseif...elseif...）采用的条件，最好都统一为以相同的一个变量或相同的几个变量来作为标准。而这一个或几个变量最好都来自于后端数据，或者都来自于前端设置。这样分支条件会更加清晰。

# 0217
## 1.又明白了一点模板
关键在于tag.html，根据是否有$pageId及时间，判定引入哪个模板。

## 2. go学习到map

## 3. 开始抄写卫国哥的autograph

# 0220
## 1.卫国推荐了新笔记工具
<http://www.bear-writer.com/>
## 2.继续写autograph


