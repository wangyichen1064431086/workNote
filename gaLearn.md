教程：
<https://analyticsacademy.withgoogle.com/course/1/unit/1/lesson/1>

官方文档：


1. 帮助中心：
总目录：<https://support.google.com/analytics#topic=>
Set up Analytics：<https://support.google.com/analytics#topic=3544906>
<https://support.google.com/analytics/answer/1008015?hl=zh-Hans&ref_topic=3544906>
<https://support.google.com/analytics?hl=en#topic=>

2. googledeveloper document
<https://developers.google.com/analytics/devguides/collection/analyticsjs/events>

3. googledeveloper document
api的相关文档在<https://developers.google.com/analytics/devguides/reporting/core/v4/>

# Part1 Set up Analytics （from 帮助中心）

## 一、[Get started with Analytics](https://support.google.com/analytics/answer/1008015?hl=en&ref_topic=3544906)
### 1.create a new Analytics account
<https://support.google.com/analytics/answer/1042508>
选择“管理”标签设置新的媒体账户资源

最多可有100个Analytics account

### 2. Set up a property
<https://support.google.com/analytics/answer/1042508>
每个Analytics account最多能有50个 properties.

#### （1）create new property

如果你在这个Analytics Account下没有编辑properties的权限，你不会看到Create new property选项。

####  (2) select Websit or Mobile app
设置要追踪的网站

#### （3）enter the Website or App Name
如果你计划要跟踪多个网站或app，则对其起的名字应当描述性很强。

#### （4）(web only)Enter the WebSite URL
输入域你网站地址URL。如果URL格式不对则这个property不会被创建。


#### （5） Select an Industry Category

####  (6) Select the Reporting Time Zone
选择时区

#### （7） Click Get Tracking ID
点击获取Tracking ID按钮后，你的property就创建成功了。你还必须要拷贝tracking code 来获取数据。


### 3. Set up Analytics tracking
<https://support.google.com/analytics/answer/1008080>
#### (1)find tracking code
在Property之下，选择Tracking info > Tracking code

#### (2)Choose how to set up tracking
Analytics中有好几种搜集数据的方式。这取决于你要跟踪的是网址，app还是其它。

选择 Static website:

复制Tracking code,粘贴到\</head\>标签前面。 Tracking Code Eg:

	 <script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	
	  ga('create', 'UA-88244820-1', 'auto');
	  ga('send', 'pageview');
	</script>

NOTE: Paste this code to ***every webpage*** you want to track.

#### （3）Verify the tracking code is working(核实tracking code工作了）
<https://support.google.com/analytics/answer/1008015?hl=en&ref_topic=3544906>

##### 方式1： Check your Real-Time reports
1.登录google Analytics,选择 Accout > Property > Views

2.切换到REPORTING标签。

3.选择 Real-Time > Overview

##### 方式2： Use Google Tag Assistant to verify your setup
使用Google Tag Assistant扩展插件。
<https://support.google.com/analytics/answer/6280771>

待更详细研究


### 4. Manage and configure Analytics
<https://support.google.com/analytics/answer/1102154>

管理和配置accounts,properties,views。

- Account:最高level。（如一个组织，公司等所有网站、app总称）。一个account包含若干properties。
- Property:每个property通常代表一个具体的网址或者一个移动端app。每个Property包含若干view。
- view: 一个Property的数据报告的子集。


### 5. Reporting views
<https://support.google.com/analytics/topic/6014102>

a reporting view is the level in an Analytics where you can access reports and analysis tool.(view的层级，是你可以获取报告和分析工具的地方）


#### About views
<https://support.google.com/analytics/answer/2649553?hl=en&ref_topic=6014102>

Analytics会自动为你的account中的每一个property创建一个未过滤的view，但是你可以在一个property中建立多个views。你发送给Analytics property的任何数据都会自动出现在所有views中。

#### Add a new view
<https://support.google.com/analytics/answer/1009714?hl=en&ref_topic=6014102>

每个property最多能添加25个view。

##### (1) Edit permission to add views
<https://support.google.com/analytics/answer/2884495>

ADMIN 选项卡 → User Management（可在Acount,property或view下） →四种权限

Manage users,Edit,Collaborate,Read&Analyze.

Parent permission are inherited by default(account>property>view),为下级设置的权限自动取代从上级继承来的权限。
 
##### (2) select the account and property to which you wish to add a view

##### (3) In the VIEW column,click the dropdown menu.Click Create new view

##### (4) Select either  Web Sit view or App view


##### (5) Enter a Name

##### (6) Select the Reporting Time Zone

##### (7) Click Create View


#### Edit view settings
<https://support.google.com/analytics/answer/1010249?hl=en&ref_topic=6014102>

Update view name,time zone and other settings.

##### (1) Select the **Admin** tab and navigate to the view.

##### (2) In the **View** column, click **View Settings**


##### (3) 对**View Settings**的一切进行设置。

其中如果打开Site search Tracking,你就可以看到用户怎样在你的网站中搜索。详见<https://support.google.com/analytics/answer/1012264>待研究。

## 二、 [Find your way around Analytics](https://support.google.com/analytics/answer/2604608?hl=en&ref_topic=3544906)

### 2.1 Navigation links

provide 4 main product areas:

#### Home: 
a list of your Accounts and Properties.

<https://support.google.com/analytics/answer/2456466>

- Can choose hierarchical(accounts appear as folders; properties appear as folders within accounts; reporting views appear within properties) or flat mode(all reporting views appear in a list).
- Click a view takes you to the reports for that view.
- Can mark any item with star.
- Can show All or star.
- Can use the search bar to locate an item by name.

####   Reporting:
Gives you Analytics reports and dashboards

####  Customization:
 Lets you create custom reports<https://support.google.com/analytics/answer/1033013>（待看）

and gives unsampled reports<https://support.google.com/analytics/answer/2601061>(待看）

####  Admin:
where you manage Analytics
<https://support.google.com/analytics/answer/1102154>（待看）


### 2.2 Accounts,Settings,and Diagnostics
In top right corner.


### 2.3 Report navigation
This is where you access all of your reports.


#### Dash boards
let you see your most important reports in a glance.

[About Dashboards](https://support.google.com/analytics/answer/1068216)（待看）

#### Shortcuts
For faster access to the reports you use most often.

### 2.4 Report header
Appears at some report in Analytics. The header includes the report title and controls that act on the report as a whole.

- Email: let you share a report with people
- Export: export your report data for use in other applications, such as Excel.
- Add to Dashboard: embed the current report in a dashboard
- Shortcut: creates a link to the current configuration of this report
- date selector:lets you change the date range of the report. You can compare two dates, or two ranges of dates.

### 2.5 Add segments
A segment is a subset of your Analytics data. Adding one or more segments to a report can help you compare and contrast your data in meaningful ways.

[About segments](https://support.google.com/analytics/answer/3123951)(待看）

### 2.6 Report tabs
Where your report data begins. Most(not all)　standard reports contain an **Explorer** tab.

Typically,it has 2 parts:

- a data graph
- a data table


# Part 2 Report and analyze (from 帮助中心）

## 1. Monitor account health and performance
<https://support.google.com/analytics/topic/1727147?hl=en&ref_topic=3544907>

### 1.1 Real-Time 
#### 1.1.1 About Real-Time
<https://support.google.com/analytics/answer/1638635?hl=en&ref_topic=1638563>

Real-Time allows you to monitor activity as it happens on your site or app. The reports are updated continuously and each hit is reported seconds after it occurs. For example, you can see how many people are on your site right now, which pages or events they're interacting with, and which goal conversions have occurred.


#### 1.1.2  Real-Time reports
<https://support.google.com/analytics/answer/1638637>


##### Six reports
- Overview
- Locations
- Traffic Sources
- Content
- Events
- Conversions

All display these data:

- the number of active users,
- the number of hits during each of the most recent 30 minutes
- the number of hits during each of the most recent 60 seconds

##### Overview report
 Shows:

- the referrals for active users. 
- the pages through which these users entered your site 
- their geographic locations.

##### Locations
 Shows:

-  the geographic locations of your active users
-  how many pages/screens were viewed from each city during the past 30 minutes

##### Traffic Source 
This report is only displayed for web properties.

Use the Real-Time Traffic Sources report to see which mediums and sources referred the users who are on your site right now.


##### Content/Screens
To see which pages/screens have been viewed during the past 30 minutes


##### Events
To see the real time firing of events(实时触发的事件）。

The table shows the top 20 event categories over the past 30 minutes, sorted by the number of users who have interacted with that event.（展示了过去30min排名前20的事件类别)

(其他待看）


## 2. Behavior reports
<https://support.google.com/analytics/topic/1120718?hl=en&ref_topic=3544907>

### 2.1  Event Tracking

#### 2.1.1 About Events
Events are user interactions with content that can be tracked independently from a web page or a screen load

##### See Event Data
Sign in and navigate to your view > select the **Reporting** tab > **Behavior** > **Events**

##### Anatomy of Events(解剖事件）
An Event has 4 components:

- Category
- Action
- Label(optional,but recommended)
- Value(optional)

##### Category
As a way to group objects that you want to track.Typically, you will use the same category times over related UI elements that you want to group under a given category.（几个不同事件如果都与一个元素相关，则可以用一个Category名称）

##### For Eg:

you might set up a video "play" button on your site so that it sends an Event hit with the following values:
	
	Category: "Videos"
	Action: "Play"
	Label: "Baby's First Birthday"

you also want to track how many times the video is downloaded. You could use:

	Category: "Videos"
	Action: "Downloaded"
	Label: "Gone With the Wind"

##### Action
You will use the action parameter to name **the type of event** you want to track for a particular web object.

###### For example,
with a single "Videos" category, you can track a number of specific events with this parameter, such as "play","stop","pause".

###### NOTE: 2 important features:
- All actions are listed independently from their parent categories.
- A unique event is determined by a unique action name.

##### Label
With labels, you can provide additional information for events that you want to track,such as the movie title in the video examples.

###### For example 
Suppose you have five video players on your page that you want to track interaction with. Each one of these players can use the "Videos" category with the "Play" action, but each could also have a separate label (such as the movie name) 

	Category: "Videos", Action: "Play", Label: "Gone With the Wind"
	Category: "Videos", Action: "Play", Label: "Huckleberry Finn"

###### NOTE:2 important features:
- **All labels are listed independently from their parent categories and actions**
- **A unique event is determined in part by a unique label name.** You can use duplicate label names across categories and actions, but this can **affect how unique events are calculated**.

##### Action and Label best practices
- **Action names should be relevant to your report data**. Event Tracking combines metrics for the same action name across two different categories. (两个不同category相同action的事件会加在一起)
- **Use action names globally to either aggregate or distinguish user interaction**（action name 用于全局地收集或区分用户行为）
- ** Unique events are incremented by unique actions **

##### Value
Value differs from the other components in that it is an **integer** rather than string, so use it to assign a numerical value to a tracked page object.（可以给它传递一个number型的变量） 

###### For example
You could use it to provide the time in seconds for an player to load.

	Category: "Videos", Action: "Video Load Time", Label: "Gone With the Wind", Value: downloadTime

##### Non-Interaction Events
This parameter allows you to determine how you want bounce rate(弹出率） defined for pages on your site that also include event tracking.
（待研究）

##### Implicit Count


（下文待看）

#### 2.1.2 Set up Event Tracking
<https://support.google.com/analytics/answer/1136960?hl=en&ref_topic=1033067>

To see data in your Events reports, you need to **add code** to your site or app to collect Event data.

##### Tracking setup(web)
You need to add JavaScript to your site that sends Analytics the details of each Event that is triggered.

Event Tracking documentation
<https://developers.google.com/analytics/devguides/collection/analyticsjs/events>
见下Part3 2.2


##### Tracking setup(app)
(暂略，待看）

#### 2.1.3 Unique Events and Unique Dimension Combinations
<https://support.google.com/analytics/answer/7084499?hl=en&ref_topic=1033067>
（暂略，待看）

看 3.1.1 Event Flow report

### 2.2 Behavior Flow
#### 2.2.1 About the Behavior Flow report
<https://support.google.com/analytics/answer/2785577?hl=en&ref_topic=2996562>

See how your users traverse and interact with your site.

The Behavior Flow report visualizes the path users traveled from one page or Event to the next. This report can help you discover what content keeps users engaged with your site. The Behavior Flow report can also help identify potential content issues.
###### Requirements
1. Must have set up be tracking Events before they appear in the Behavior Flow report.
2. Must have set up **Content Groupings**

（未看完，待接着看）



## 3. Flow visualiztion reports

### 3.1 Events Flow
#### 3.1.1 About the Events Flow report
<https://support.google.com/analytics/answer/2521316?hl=en&ref_topic=2521315>

See how users interact with your site via Events.

Use the Events Flow report to visualize the order in which users trigger the Events on your site. he Events Flow report can help you discover which Event content keeps users engaged with your site, and see the paths users take from one popular Event to the next.

##### prerequisites
First set up Events.

##### Access the Events Flow report
**Reporting** tab > **Behavior** > **Events** > **Events Flow**

##### What can I do with the Events Flow report?
Use the Events Flow Report to investigate questions like:

- Is there an Event that is always triggered first? Does it lead users to more Events?
- Is there an Event that’s triggered multiple times in a session?
- Is there a Category of Events that’s more popular than another type of Event - are videos triggered more frequently and lead to more engagement than gadgets?
- Using Default or Segments, is there a type of user that triggers Events differently than other segments?

##### How to use the Events Flow report?
###### Some tips
- Each node in the Events Flow report represents an Event triggered by a user. 
- All Events in the first column of the flow represent any Event that users triggered before other Events.Events in the second column were triggered second, and so on through the report.
- Events triggered most frequently appear closer to the top of each column and those triggered less often appear towards the bottom.

###### Change the level of detail
- Use **level of detail** drop-down menu to change the report display
- The **Adjust the number of connections displayed in the graph** slider increases or decreases the connections between nodes, giving you a finer- or coarser-grained view of the Events flow.
- Use the **Select the level of detail for event nodes** options,then you can organize the report by grouping Events into nodes based on Category, Category/Action, or Category/Action/Label.

###### Examine nodes and connections
- Click a node to display a context menu, letting you investigate traffic flowing to and from a particular Event.
- Click a connection to highlight only the Events related to that connection.

## 4. Conversion reports（转换）
In Analytics, a conversion is the completion of an activity that is important to the success of your business, such as a completed sign up for your email newsletter (a Goal conversion) or a purchase (a Transaction, sometimes called an Ecommerce conversion).（在分析中，转换是一个activity的完成，对您的业务的成功很重要，如完成注册电子邮件（一个目标转换），或是一个购买（一个事物，有时被称为电子商务转换）。


### 4.1 Goals

#### 4.1.1 Create and manage goals
<https://support.google.com/analytics/topic/6150889?hl=en&ref_topic=1007030>

##### About goals
<https://support.google.com/analytics/answer/1012040?hl=en&ref_topic=6150889>

Examples of goals include making a purchase (for an ecommerce site), completing a game level (for a mobile gaming app), or submitting a contact information form (for a marketing or lead generation site).(目标的例子包括购买(对于一个电子商务网站来说),达到一个游戏的level(对于一个手机游戏应用程序来说),或者提交联系人信息(对于一个市场营销或引导网站)。)


###### How goals work
- Goals are configured at the view level.
-  Goals can be applied to specific pages or screens your users visit, how many pages/screens they view in a session, how long they stay on your site or app, and the events they trigger while they are there.
-  Every goal can have a monetary value(金钱值）, so you can see how much that conversion is worth to your business. Using values for goals lets you focus on the highest value conversions, such as transactions with a minimum purchase amount.
-  When a visitor to your site or user of your app performs **an action defined as a goal**, Analytics records that as a conversion. 

###### Goal types

Goal Type | Description | Example
----------|----------|-------
Destination|A sepecific location loads(一个特定location的加载）|Thank you for registering! web page or app screen
Pages/Screens per session(若干时间平均看了多少pages/screens)|A user views a specific number of pages or screens|5 pages or screens have been loaded
Duration|（待研究）
Event|（待研究）

###### Smart Goals
Designed to help AdWords advertisers.
(暂略，待看）

###### Funnels for Destination goals
With a Destination goal, you can specify the path you expect traffic to take. (对于一个Destination类型的goal,你可以指定一个你希望流量加载的路径）

This path is called a funnel（漏斗）。

When you specify steps in a funnel, Analytics can record where users enter and exit the path on the way towards your goal.(当你为一个funnel指定steps的时候，Analytics可以记录用户从什么地方进入和退出到达你的目标之前的路径。）

[Funnel Visualization vs. Goal Flow](https://support.google.com/analytics/answer/2976313)


###### Goal value
When you set up a goal, you have the option of assigning a monetary amount to the conversion. Each time the goal is completed by a user, this amount is recorded and then added together and seen in your reports as the Goal Value.

(待继续阅读）



###### Goal ID and goal sets
- Every goal you create is assigned a numeric ID, from 1 to 20.(你创建的每个goal都会被分配一个数值的ID,从1~20）
-  Goals are grouped into sets of up to 5 individual goals.（Goals 可以被分组，每组最多5个单个的goal).
-  Goal sets allow you to categorize the different types of goals for your site. (Goal的设置允许你将你网站不同类型的goals分类）


###### Reporting on goals
 **Conversion** > **goals**


###### Limits of goals



##### Create, edit, and share goals
<https://support.google.com/analytics/answer/1032415?hl=en&ref_topic=6150889>

You need **Edit permission** at the view level to perform the tasks or use the features described in this article.(在view层面需要Edit权限）

###### Create a new goal
1. select ** Admin ** tab, navigate to the desired account,property and view
2. click **Goals**
3. click **+NEW GOAL** or **Import from Gallery** to create a new goal

3 basic options for creating goals:
- using a goal template
- creating custom goals
- creating Smart Goals

###### Option1: Goals from a template






# Part 3 开发者指南 (from developers.google)
<https://developers.google.com/analytics/devguides/collection/analyticsjs>

## 1. 基本知识

### 1.1 将 analytics.js 添加到网站中
Analytics.js 库是一种可用于衡量用户与您网站的互动情况的 JavaScript 库。


#### 跟踪代码段
- 将此代码添加到 \</head\>之前
- 用您希望跟踪的 Google Analytics（分析）媒体资源 ID（也称为“跟踪 ID”）替换字符串 'UA-XXXXX-Y'。
- 这里的跟踪ID和跟踪代码段都可以在 ga的Account>Property> Tracking Info查找到。
	<!-- Google Analytics -->
		<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		
		ga('create', 'UA-XXXXX-Y', 'auto');
		ga('send', 'pageview');
	</script>
	<!-- End Google Analytics -->

以上代码进行了以下四项操作：

1. 创建了一个 <script> 元素，并开始从 https://www.google-analytics.com/analytics.js 异步下载 analytics.js JavaScript 库。
2. 初始化了一个全局函数 ga（也称为 ga() 命令队列），您可以通过该函数来安排要在 analytics.js 库加载完毕可供使用时执行的命令。
3. 在 ga() 命令队列中添加一条命令，为通过 'UA-XXXXX-Y' 参数指定的媒体资源创建一个新的跟踪器对象。
4. 在 ga() 命令队列中添加另一条命令，为当前页面向 Google Analytics（分析）发送网页浏览数据。

### 1.2 analytics.js的工作原理
<https://developers.google.com/analytics/devguides/collection/analyticsjs/how-analyticsjs-works>

需要使用 analytics.js 进行的所有跟踪几乎都可以使用 ga() 命令队列完成。

(详细待整理）


## 2. 跟踪常见的用户互动
### 2.1 网页跟踪
<https://developers.google.com/analytics/devguides/collection/analyticsjs/pages>
通过网页跟踪来衡量网站上特定网页获得的浏览次数

#### 概览
JavaScript跟踪代码段中包含创建跟踪器对象的命令。之后有一个向 Google Analytics发送网页浏览的命令。

在创建跟踪器时，JS 会基于浏览器的具体情况设置跟踪器中的若干字段。如title 字段会设为 document.title 的值，location 字段会设为 document.location。

#### 实现
可以通过使用 send 命令并将 hitType 指定为 pageview 来发送网页浏览匹配。针对 pageview 匹配类型的 send 命令使用以下签名：

	ga('send', 'pageview', [page], [fieldsObject]);

默认的跟踪器不会设置 page 字段，但如果您手动设置了该字段，其值将会取代 location 字段的值，在报告中用作网页路径。

#### 示例

	ga('send', 'pageview', location.pathname);

注意，在使用所有 send 命令时，通过便捷参数传递的字段也可以通过 fieldsObject 指定。上述命令可改写为：

	ga('send', {
	  hitType: 'pageview',
	  page: location.pathname
	});

#### 修改页面地址
（暂略，待看）


### 2.2 事件跟踪
#### 实现
可以使用 send 命令并将 hitType 指定为 event 来发送事件匹配。针对 event 匹配类型的 send 命令使用以下签名：

	ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);

#### 示例

	ga('send', 'event', 'Videos', 'play', 'Fall Campaign');

通过便捷参数传递的字段也可以通过fieldsObject指定，即可改写为：

	ga('send', {
	  hitType: 'event',
	  eventCategory: 'Videos',
	  eventAction: 'play',
	  eventLabel: 'Fall Campaign'
	});