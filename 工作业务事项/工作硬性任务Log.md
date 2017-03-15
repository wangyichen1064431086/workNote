## 1. 安卓回退键bug问题。 1205——1209

## 2. 例行任务 之 添加页面模板
### 涉及的模板
——www

- \frontend\tpl\tag.html

- \frontend\tpl\include\story\story.html（没用）
- \frontend\tpl\next\html\story.html

- \frontend\tpl\phone\homecontent-source.html
- \frontend\tpl\phone\nexthome.html

——next

- \app\templates\html\story.html

### pagemaker:
<https://backyard.ftchinese.com/pagemaker/page-maker.html?page=2016g20>

必改项：

Full→ title, adid

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

### 任务记录
1. 1214 --添加“财富管理”页面
	- wealthmanage
	- 广告位ID为1704。
	- 如果条件里面有结束日期的，这里先设为2017年1月31日（活动1月15日结束）


## 4. 页面
卫国哥的组件库
<http://interactive.ftchinese.com/components/ftc-share.html>


## 5. 例行任务之广告管理
***广告系统待学***
### 1） 1230  帮销售部解决思科文章的广告id问题
科技频道<http://www.ftchinese.com/channel/technology.html>

文章<http://www.ftchinese.com/interactive/8429>

#### 问题描述：
点击文章原先的跳转链接是 http://www.ftchinese.com/interactive/8429#adchannelID=1502。

这里是科技频道对应的广告id。该频道下所有的文章中的广告id都是如此。

网址变为www7，就可以看到广告每个广告位的id。

频道的广告id会覆盖所有该频道下的文章的广告id，所以只有去掉链接的adchannelID才行。


#### 解决办法
1. 在www7打开科技频道页<http://www7.ftchinese.com/channel/technology.html>
2. 滚到最下方，打开"编辑本页"，即跳转至pagemaker页面
3. 找到该片文章，里面有一个custom link的input。默认是空白，即自动获取所属频道的广告id。 想要覆盖掉频道id就手动设置一下custom link为不带参数的http://www.ftchinese.com/interactive/8429

ok啦 

## 6.后台制作年度好文推荐分页h5
### 任务描述
登录backyard→
Interactive→
Create Interactive→
仿照Admin Interactive的"FT中文网年度好文推荐"的任意一篇文章来制作新的

### 任务记录
#### 1. 1230:制作"FT中文网年度好文推荐：中国经济"

## 7.获取story的接口

<https://backyard.ftchinese.com/falcon.php/homepage/getstoryapi/2017-2-22>

后面是年-月-日 

## 7.在电脑端看移动端正式版：
<http://app003.ftmailbox.com/androidapp.html>
