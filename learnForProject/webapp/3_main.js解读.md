# 三.scripts\main.js
说明：

- 其中加了 "\\ wyc add"的代码行是自己加的
- 其中后面带有"√"的注释是原本就有的，应该是帆总自己写的

## 结构概述
- 文件中的函数包括三种：
	- 单一功能小函数
	- 复杂的大函数：其中会调用若干单一功能小函数
	- 包含大函数的超级大函数：其中会调用复杂的大函数级单一功能小函数


## 1.申明各种Global变量
```
	var _currentVersion = 1111; //当前的版本号
	var _localStorage = 0;
	var exp_times = Math.round(new Date().getTime() / 1000) + 86400;
	var username;
	var ori;
	var touchstartx;
	var touchendx;
	var cs;
	var lateststory = '';
	var pmessage;
	var latestunix;
	var commentfolder = '';
	var bgMode = '';
	var fontPreference = 'medium';
	var allstories = [];
	var osVersion;//存储系统版本
	var connectInternet = 'no';//标识是否连网，连网为"yes"，否则为"no"
	var uaString = navigator.userAgent || navigator.vendor || '';
	var osVersionMore = '';
	var useFTScroller = 0;//标识是否（1/0)使用了FT的scroller组件？？？
	var nativeVerticalScroll = false;
	var noFixedPosition = 0;//指示是否有绝对定位元素？？？
	var unusedEntryIndex;
	var requestTime;
	var successTime;
	var screenWidth;
	var screenHeight;
	var gInGesture = false;
	var startFreeze;
	var fixedContent;
	var headHeight;
	var fStatus = 0;
	var ftScrollerTop = 0;
	var gHomeAPIRequest;
	var gHomeAPISuccess;
	var gHomeAPIFail;
	var gDeviceType = '';
	var gStartPageTemplate; 
	var gStartPageAPI = true;
	var gHomePageStorageKey = 'homePage';
	var gNewStoryStorageKey = 'homepage';
	var gAppName = 'Web App';
	var gStartStatus = "";//描述启动时状态的字符串
	var gPullRefresh = false;
	var gVerticalScrollOpts;
	var gOnlineAPI = false;
	var gSpecial = false;
	var gDeviceId = "";
	var gShowStatusBar = 0;
	var gHomePageIsLatest = true; //The latest home page is displayed
	var gCurrentStoryId = '';
	var gNoticeAdded = false;
	var cg1 = '(not set)';
```

## 2.获取屏幕尺寸并为不同尺寸屏幕设不同的启动页面模板
```	
	//开机的时候检查屏幕宽度，以便节约流量
	//我们的基本假设是，不管横屏还是竖屏，只要宽度小于700，那就是手机；否则就是平板
	//为了减少资源消耗，在屏幕Resize和Rotate的时候，只是向GA发出流量统计数据，而不做可能消耗资源的操作

	screenWidth = $(window).width();//屏幕宽度
	screenHeight = $(window).height();//屏幕高度

	///根据屏幕是否大于700,设置gStartPageTemplate为不同的url路径字符串，即是否带有参数键值对"screentype=wide&"
	if (screenWidth >= 700) {
	    gStartPageTemplate = '/index.php/ft/channel/phonetemplate.html?channel=nexthome&screentype=wide&';
	} else {
	    gStartPageTemplate = '/index.php/ft/channel/phonetemplate.html?channel=nexthome&';
	}
```
## 3.设置另一些Global变量
```
	var gApiUrl = {
	    'efforts':0,
	    'a10001':'/index.php/jsapi/get_new_story?rows=25&',
	    'a10003':'/eaclient/apijson.php',
	    'a10007':'/eaclient/apijson.php',
	    'aBackUp':'/eaclient/apijson.php'
	};
	var gPostMethod='POST';
	var gApi001Method = 'GET';
	var gHomePageVideo = '/index.php/ft/channel/phonetemplate.html?channel=homepagevideo&';
	var gSkyZ = '/index.php/ft/channel/phonetemplate.html?channel=skyZ&';
	var giPadVideo = '/index.php/ft/channel/ipadvideo.html?';
	var gGetLastUpdateTime = '/index.php/jsapi/get_last_updatetime?';
	var gHotStory = '/index.php/jsapi/hotstory/1days?';
	var gWebRoot = '';
	var gIconImage = 'http://i.ftimg.net/picture/8/000045768_piclink.jpg';
	var gSpecialAnchors = [];
	var gTagData = [];
	var gIsInSWIFT = false;//标识是否处于在原生iOS中
```
## 4.判断是否在原生iOS中运行
```
	if (window.location.href.indexOf('isInSWIFT')>=0) {//运行时的url里含有'isInSWIFT'的话就说明在原生iOS中运行
	    gIsInSWIFT = true;
	}
```

### 疑问
这个规则“运行时的url里含有'isInSWIFT'的话就说明在原生iOS中运行”，应该是在iPhoneApp项目中定义的吧？

## 5.本地测试
```
	//在本地测试
	if (window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168') === 0 || window.location.hostname.indexOf('10.113') === 0 || window.location.hostname.indexOf('127.0') === 0) {//本机服务器地址的几种形式吧？
		///在本地测试的话就直接使用本地api下的已经通过gulpfile.js的任务ea准备好了的几个json文件
	    gApiUrl.a10001 = 'api/ea001.json';
	    gApiUrl.a10003 = 'api/ea003.json';
	    gApiUrl.a10007 = 'api/ea007.json';
	    gApiUrl.aBackUp = 'api/ea001-backup.json';

	    gPostMethod = 'GET';//gPostMethod由"POST"变为"GET"

		///在本地测试的话这几个文件也使用本地路径
	    gHomePageVideo = 'api/homepagevideo.tpl?';
	    gSkyZ = 'api/skyZ.tpl?';
	    giPadVideo = 'api/ipadvideo.tpl?';
	    gGetLastUpdateTime = 'api/get_last_updatetime.json?';
	    gHotStory = 'api/hotstory.json?';

	    gWebRoot = 'http://m.ftchinese.com';
	    if (screenWidth >= 700) {
	        gStartPageTemplate = 'api/homecontentwide.html?';
	    } else {
	        gStartPageTemplate = 'api/homecontent.html?';
	    }
	}
```
### 疑问
- 本机服务器地址的host不就是'localhost'或'127.0.0.1'吗？为何还有'192.168'或'10.113'这种形式？***待自己研究***
- 这里本地路径字符串里面干嘛加上"?"? 这种"?"出现在这里的情况是干嘛用的？

## 6.根据gCustom对象的各属性值为变量赋值
```
	//选择模板
	if (typeof window.gCustom === "object") {
	    if (typeof window.gCustom.template === "string") {
	        gStartPageTemplate = window.gCustom.template;
	    }
	    if (typeof window.gCustom.startapi === "boolean") {
	        gStartPageAPI = window.gCustom.startapi;
	    }
	    if (typeof window.gCustom.appname === "string") {
	        gAppName = window.gCustom.appname;
	    }
	    if (typeof window.gCustom.homePageStorageKey === "string") {
	        gHomePageStorageKey = window.gCustom.homePageStorageKey;
	    }
	    if (typeof window.gCustom.newStoryStorageKey === "string") {
	        gNewStoryStorageKey = window.gCustom.newStoryStorageKey;
	    }
	    if (typeof window.gCustom.pullRefresh === "boolean" && window.gCustom.pullRefresh === true) {
	        gPullRefresh = true;
	    }
	}
```
### 疑问：

- gCustom目测是个全局变量，类型为对象，在什么地方定义的？
- 这些变量g
- 
- API、gAppName分别都是指示什么的？***这个或许后面看着看着就看明白了***

## 7.设置全局变量 gVerticalScrollOpts对象

	gVerticalScrollOpts = {
	    scrollingX: false,
	    bouncing:gPullRefresh,
	    snapping: false,
	    scrollbars: true,
	    scrollBoundary: 8,
	    updateOnChanges: true,
	    updateOnWindowResize: true,
	    windowScrollingActiveFlag: "gFTScrollerActive"
	};


### 疑问：
该对象的这些属性分别是什么意思？

## 8.定义其他一些全局变量
```
	var scrollHeight=0, 
		scrollOverlay=0, //可取值0或1，分别指示有无Overlay的时候的窗口在纵轴上应该往下滚过的距离？？？window.scrollTo(0,scrollOverlay)
		readingid, 
		langmode="ch", 
		hist = [],
		pageStarted=0;
	var thisday;
	var thed;
	var themi;
	var thed;
	var gNowView = 'fullbody';//gNowView是指目前显示的Div，可能为fullbody, storyview, adview或channel，其值也即为当前body的class
 
	var sectionScroller, theScroller, storyScroller, channelScroller, thenavScroller, shareScroller, introScroller, sectionScrollerX=0;

	///长假的时候上特刊，请注意下面的代码中月份要减去一个，比如2012年10月1日，是20120901，然后查找get_story_by_tag那一行，进行下一步修改√
	var longholiday = 0;//指示是否处于长假期间
	//if (thed >= '20130109' && thed <= '20130112') {longholiday = 1};

	var thisdayunix; //今天的Unix时间戳√
	var expiredayunix; //3 * 30 * 24 * 60 * 60,本地存储过期日(三个月)的unix时间戳√

	
	///把所有的Ajax requests都放在一个数组里面，如果因为网络不好，用户要求直接转到离线阅读，则立即终止所有requests√
	var requests = [], countInsert=[];
	
	var gAppRoot=window.location.href;//当前网页的地址

	var _popstate=1;//如果是点击浏览器的前进后退按钮，则为1 √

	gAppRoot=gAppRoot.replace(/^.*\.com\//g,"").replace(/(\.html).*$/g,"$1").replace(/(\.php).*$/g,"$1").replace(/\#.*$/g,'');//对网址进行简化处理，即将xxx.xxx.com替换为空，将.htmlXXXXX替换为.html,将.phpXXXX替换为空，将#XXXX替换为空

	///如果是在阅读过程中因为点击广告等原因离开Web App，则在10分钟内重新打开程序，立即回到刚刚在读的文章 √
	//不明白上面这话是在说什么？？？
	var actionTimeStamp;
	var actionUrl="";
	var actionScroll=0;

	///如果网址中有wechatShare，则强制调用iOS原生SDK分享 √
	//不明白上面这话是在说什么 ？？？
	var iOSShareWechat = 0;


	if (JSON.parse) {$.parseJSON = JSON.parse;}//如果存在JSON.parse方法，则给这方法用另外一个名称$.parseJson替代，这样有啥意义？？？感觉好多余


	var gTouchMoveX = -1;
	var gTouchStartY = -1;
	var gTouchMoveY = -1;

	//swipe  at least gMinSwipe px to go back
	var gMinSwipe = 72;
	var gStartSwipe = 15;
	var gSwipeEdge = 30;
	var gIsSwiping = false;
	var gMoveState = 0;
	var gStartPageStorage = '';
```
### 疑问
- swipe这几个值是什么意思？目的是什么？
- 以上所有打"？？？"的地方***这些可能后面看着看着就明白了***


## 9.函数updateTimeStamp: 
用于更新时间戳。具体更新的变量有：

- 此刻的时间——themi:20160819153600
- 此刻的日期——thed:20160819
- 此刻的秒数——thisdayunix:1474271020 (当前时间的秒数的整数值————by 四舍五入处理 当前时间的毫秒数/1000）
- 到期时刻的秒数——expiredayunix:1474271020+7776000(到期时间=当前时间+3个月的时间) 3600\*24\*90=7776000
```
	function updateTimeStamp() {
	    thisday = new Date();

	    themi = thisday.getHours() * 10000 + thisday.getMinutes() * 100;//eg:153600即15：36
			
	    thed = thisday.getFullYear() * 10000 + thisday.getMonth() * 100 + thisday.getDate();//eg:20160819
	    
		themi=thed*1000000+themi;//eg:20160819153600

	    thisdayunix = Math.round(thisday.getTime() / 1000);//eg:Math.round(474271019744/1000)=1474271020

	    expiredayunix = thisdayunix + 7776000;//3个月以后的时间

	    actionTimeStamp=Math.round(thisday.getTime() / 1000);
	}
```
### 补充说明

关于时间方法：

- getTime()返回表示日期的毫秒数
- getHours()返回日期中的小时数：0~23
- getMinutes()返回日期中的分钟数：0~59
- getFullYear()返回四位数年份
- getMonth()返回日期中的月份:0~11
- getDate()返回日期月份中的天数：1~31
- Math.round()四舍五入为整数
### 依赖关系说明
处理的全局变量有： 

- thisday
- themi
- thed
- thisdayunix
- actionTimeStamp

## 10.函数startpage:启动app
```
	function startpage() {
		    var savedhomepage;
		    updateTimeStamp();//更新时间戳相关变量（详见9.）
		    gStartStatus = "startpage start";//表示开始启动

		    try {
		        updateStartStatus('running startpage');//更新“反馈问题”的a元素的href以发送问题"running startpage"。（该函数updateStartStatus详见下述11.）。
		    } catch (ignore) {
		
		    }

		    var k;
		    var oneday = '';

		    var ccode = getpvalue(window.location.href,"utm_campaign") || "";//获取当前URL中的"utm_campaign"参数的值。 （该函数getpvalue详见下述12.）

		    if (ccode !== "") {
		        setCookie("ccode", ccode, '', '/', '.ftchinese.com');//设置cookie ccode。（该函数setCookie详见下述13.）
		    }
		    username = getCookie('USER_NAME') || '';//获取cookie 'USER_NAME'的cookie值（该函数getCookie详见下述x.）
		    langmode = getCookie('langmode') || 'ch';//获取cookie 'langmode'的cookie值

		    if (historyAPI()==true) {//如果运行环境不是Android2且具有history对象。（该函数historyAPI详见下述15.）
		        k=location.href;
		        window.history.replaceState(null, null, gAppRoot + "#/home");//将当前页面在history中的记录修改为:当前网址+"#/home",同时当前url也变为这样。（history.replaceState详见下述“说明1.”）
		        window.history.pushState(null, null, k);//增加一个原gAppRoot(k就是gAppRoot)的历史记录，同时当前url变为了原gAppRoot。（history.pushState详见下述“说明2.”）
		    }


		    try {
		        window.tracker = new FTCTracker();//不懂。。。不知道在哪个FT模块定义的？？？
		        //console.log (tracker);
		    }catch(err){
		        //console.log (err);
		        trackErr(err, "FTCTracker");
		    }

		    if (useFTScroller===0) {window.scrollTo(0, 0);}//如果useFTScroller为0,则将显示的内容滚动至（0，0），但useFTScroller是表征是否使用了FT的scroller吗？？？

		    ///从网络获取数据的情况，判断其网络连接的好坏√
		
			
		    try {
		        ipadstorage.init();//（ipadstorage详见下述16.）不知道这里是干嘛的？？？
		    } catch(err) {
		        trackErr(err, "ipadStorage");
		    }


		    document.body.className = 'fullbody';
		    gNowView = 'fullbody';//当前显示的div是fullbody
		    try {
		        gStartPageStorage = localStorage.getItem(gHomePageStorageKey) || '';//获取localStorage中的gHomePageStorageKey的值
		        _localStorage=1;//这个表明获取到了gHomePageStorageKey？？
		    } catch (err) {
		        gStartPageStorage = "";
		        _localStorage=0;//这个应该是表明没获取到
		    }


		    if (isOnline() === 'no' && gStartPageStorage === '') {//当浏览器处于离线状态且没有获取到gHomePageStorageKey这个localStorage的值时

		        $('#startstatus').html('您没有联网');//将启动页面的id="startstatus"部分的内容"正在连接服务器"改写为"您没有联网",该页面在webapp\app\index.html|android.html|mba.html

		        setTimeout(function(){
		            loadHomePage('start');
		        },2000);

		    } else {
		        loadHomePage('start');
		    }

		    //if user use wifi, download the latest 25 stories
		    if (window.gConnectionType !== 'data' && window.gConnectionType !== 'no') {
		        setTimeout(function () {
		            downloadStories('start');
		        }, 1000);
		    }
		
		    try{
		        if (_localStorage===1 && localStorage.getItem(gNewStoryStorageKey)) {
		            savedhomepage = localStorage.getItem(gNewStoryStorageKey);
		            loadStoryData(savedhomepage);
		        }
		    } catch (ignore) {
		        
		    }
		
		    requestTime = new Date().getTime();
		    //gStartStatus = "startpage get_last_updatetime";
		    $.get(gGetLastUpdateTime + requestTime, function(data) {
		        lateststory = data;
		    });
		    setInterval(function() {
		        requestTime = new Date().getTime();
		        $.get(gGetLastUpdateTime + requestTime, function(data) {
		            if (lateststory !== data) {
		                loadHomePage('refresh');
		                if (window.gConnectionType !== 'data' && window.gConnectionType !== 'no') {
		                    downloadStories('refresh');
		                }
		            }
		            lateststory = data;
		            connectInternet="yes";
		            setTimeout(function(){
		                connectInternet="unknown";
		            },299000);
		        });
		        checkbreakingnews();
		    },100000);
		    if (isOnline()=="possible") {checkbreakingnews();}
		    //gStartStatus = "startpage useFTScroller";
		    if (useFTScroller === 1) {
		        try {
		            document.getElementById('fullbodycontainer').addEventListener('touchstart', function(e) {
		                gNowView = document.body.className;
		                gIsSwiping = false;
		                if (typeof window.gFTScrollerActive === "object" || $('#slideShow').hasClass('on') === true ) {
		                    gTouchStartX = -1;
		                    gTouchStartY = -1;
		                    return false;
		                }
		                gTouchStartX = e.changedTouches[0].clientX;
		                gTouchStartY = e.changedTouches[0].clientY;
		            }, false);
		
		            document.getElementById('fullbodycontainer').addEventListener('touchmove', function(e) {
		                var xDistance;
		                var yDistance;
		                gNowView = document.body.className;
		                //if (gNowView==='fullbody') {return;}
		                if ( (typeof window.gFTScrollerActive === "object" && gIsSwiping === false) || $('#slideShow').hasClass('on') === true ) {
		                    gTouchStartX = -1;
		                    gTouchMoveX = -1;
		                    gTouchStartY = -1;
		                    gTouchMoveY = -1;
		                    return false;
		                }
		                gTouchMoveX = e.changedTouches[0].clientX;
		                gTouchMoveY = e.changedTouches[0].clientY;
		                xDistance = Math.abs(gTouchMoveX - gTouchStartX);
		                yDistance = Math.abs(gTouchMoveY - gTouchStartY);
		                if (gTouchStartX !== -1) {
		                    //whether the user is swiping or scrolling
		                    if (((xDistance > gStartSwipe && gMoveState ===0) || (xDistance > gMinSwipe && gMoveState<0)) && typeof window.gFTScrollerActive !== "object" && yDistance < 30 && yDistance/xDistance < 0.5) {
		                        window.gFTScrollerActive = {};
		                        gIsSwiping = true;
		                    }
		                    //If the swiping is true
		                    if (gIsSwiping === true) {
		                        if ((gTouchMoveX - gTouchStartX > gMinSwipe && gMoveState === 0)) {
		                            if (gTouchStartX < gSwipeEdge) {
		                                if (gNowView==='fullbody') {
		                                    switchNavOverlay('on');
		                                } else {
		                                    histback('pinch');
		                                }
		                            }
		                            ga('send','event', 'App Feature', 'Swipe', 'Back');
		                            //console.log ('go right!');
		                            gTouchStartX = -1;
		                        } else if (gTouchMoveX - gTouchStartX < -gMinSwipe && gMoveState ===0){
		                            if (gNowView==='fullbody') {
		                                switchNavOverlay('off');
		                            }
		                            //console.log ('go left!');
		                            gTouchStartX = -1;
		                        } else if ((gTouchMoveX - gTouchStartX > gMinSwipe && gMoveState<0) || (gTouchMoveX - gTouchStartX < -gMinSwipe && gMoveState>0)) {
		                            //console.log ('donot go!');
		                            gTouchStartX = -1;
		                        }
		                    }
		                    //console.log (gTouchMoveX - gTouchStartX + "=" + gTouchMoveX + "-" + gTouchStartX + " scrollerflag: " + window.gFTScrollerActive + " gIsSwiping: " + gIsSwiping);
		                }
		            }, false);
		
		            document.getElementById('fullbodycontainer').addEventListener('touchend', function(e) {
		                gTouchStartX = -1;
		                gTouchMoveX = -1;
		                window.gFTScrollerActive = false;
		                gIsSwiping = false;
		            }, false);
		        } catch (ignore){
		        
		        }
		    }
		    //Delegate Click Events for Any New Development
		    //gStartStatus = "startpage inline-video-container";
		    $('body').on('click','.inline-video-container',function(){
		        var videoId = $(this).attr('video-url') || $(this).attr('id') || $(this).attr('vsource') || '';
		        var videoTitle = $(this).attr('title') || '视频';
		        var cmsId = $(this).attr('vid') || '';
		        var cmsImage = $(this).attr('image') || gIconImage;
		        if (videoId!=='') {
		            if (videoId.indexOf('http')<0 && videoId.indexOf('/')>=0) {
		                videoId = 'http://v.ftimg.net/' + videoId;
		            }
		            watchVideo(videoId, videoTitle, cmsId, videoTitle, cmsImage);
		        }
		    });
		    $('body').on('click', '.outbound-link', function(){
		        ga('send','event','Outbound Link in App', 'click', $(this).attr('href') + '/' + window.location.href);
		    });
		    //openning a page in an iframe is not viable for now in iPhone native app
		    /*
		    $('body').on('click', '#special-container a, .open-in-iframe', function(){
		        var url = $(this).attr('href');
		        var title = $(this).find('.headline').eq(0).html() || '';
		        var lead = $(this).find('.lead').eq(0).html();
		        showchannel(url,title,0,true,lead);
		        //showSlide(url,title,0, 'interactive', true);
		        return false;
		    });
		    */
		    //click navOverlay to close navigation
		    $('body').on('click', '#navOverlay', function(e){
		        var k = e.target.id;
		        if (typeof k !== 'undefined' && k === 'navOverlay') {
		            closeOverlay();
		            $(".channelNavButton").removeClass("open");
		        }
		    });
		    //gStartStatus = "startpage end";
		    //Delegate Click on Home Page
		    $("body").on("click",".track-click",function(){
		        var eventCategory,eventAction,eventLabel;
		        eventCategory = "Phone App";
		        eventAction = "Click";
		        eventLabel = $(this).attr("eventLabel") || "";
		        if (eventLabel !== "") {
		            ga('send','event',eventCategory, eventAction, eventLabel);
		        }
		    });
		    
		    //Window Oriention Change event
		    try {
		    window.addEventListener("orientationchange", function() {
		        httpspv(gDeviceType + '/rotate');
		    }, false);
		    }catch(ignore){
		
		    }
		    
		    if (gShowStatusBar == 1) {
		        $("html").addClass("show-status-bar");
		    }
		}
```
### 疑问
- window.tracker = new FTCTracker();FTCTracker是啥？？
- useFTScroller是表征是否使用了FT的scroller吗？

## 11.* 函数updateStartStatus:
(定义于app\android.html的第658行或app\index.html的第708行)

修改启动页面“报告问题”a元素的href,即修改打开的邮箱相关信息
```
	function updateStartStatus(startMessage) {
    	document.getElementById('startFeedback').href='mailto:ftchinese.feedback@gmail.com?subject=Feedback about FTC Web App - ' + startMessage + '&body=%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0AMy UA String for Your Reference: %0D%0A%0D%0A' + uaForMail + '%0D%0A%0D%0AResources version: ' + window._currentVersion + '%0D%0A%0D%0AScreen Mode: ' + screen.width + 'X' + screen.height + '%0D%0A%0D%0Amy URL: ' + location.href;
    }
```
对应html:

	<div class="backuplinks">
		<a onclick="refresh(true)">重新加载</a> &nbsp; 
		<a href="http://m.ftchinese.com/">网页版</a> &nbsp; 
		<a id="startFeedback" href="mailto:ftchinese.feedback@gmail.com?subject=Feedback about FTC Web App - from start screen">报告问题</a>
	</div>

该函数是用于更新“报告问题”那个a元素的href，所以是用户点击这个a的时候，就会发送相应的描述问题的字符串（就是这个函数的参数）到一个feedback的邮箱

### 依赖关系
单一功能小函数，不依赖任何其他函数

## 12.函数getpvalue(theurl, thep)：√
(定义于本文件，即app\scripts\main.js)

获取指定url（theurl）中的指定参数名(thep)的参数值。
```
	function getpvalue(theurl, thep) {
	    var k,thev;
	    if (theurl.toLowerCase().indexOf(thep + "=")>1) {
	        k = theurl.toLowerCase().indexOf(thep) + thep.length + 1;//被查询参数的参数值的起始位置
	        thev = theurl.toLowerCase().substring(k,theurl.length);//截取参数值起始位置到最后的字符串，也可以直接 .substring(k)
	        thev = thev.replace(/\&.*/g,"");//将该参数值后面&及其后的部分全部去掉，即得到该参数值
	    } else {
	        thev = "";
	    }
	    return thev;
	}
### 参数
- theurl:一个url字符串
- thep:一个参数的名称

### 说明

substring() 方法用于提取字符串中介于两个指定下标之间的字符。

### 依赖关系
单一功能小函数，不依赖任何其他函数

## 13.setCookie函数：
(定义于本文件的2808行。)

设置cookie

	function setCookie (name, value , sec , path , domain) {//参数依次为名称，值，有效时间(秒)，路径，域
	    try {
	        var argv = arguments,
	            argc,
	            expires = new Date(),//先将expires设置为当前时间
	            secure;
	        argc = argv.length;//参数数量
	        sec = sec ? 1000 * sec : 51840000000;//有效的毫秒数
	        expires.setTime (expires.getTime() + sec);//expires为失效时间

			//依次检查以下三个参数是否存在，处理好不存在的情况
	        path = (argc > 3) ? argv[3] : null;
	        domain = (argc > 4) ? argv[4] : null;
	        secure = (argc > 5) ? argv[5] : false;

	        document.cookie = name + "=" + escape (value) +
	            ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	            ((path == null) ? "/" : ("; path=" + path)) +
	            ((domain == null) ? "" : ("; domain=" + domain)) +
	            ((secure == true) ? "; secure" : "");
	    } catch (err) {
	        trackErr(err, "setCookie");
	    }
	}
### 说明
- 日期方法 setTime(毫秒)：以毫秒数设置日期，会改变整个日期
- escape(string) 函数可对字符串进行编码,不提倡，应该使用decodeURI()

### 依赖关系
单一功能小函数，不依赖任何其他函数


## 14.函数trackErr:
(定义于本文件2650行)
错误追踪

	function trackErr(err, err_location) {
	    var k=err.toString() + ". ua string: " + uaString + ". url: " + location.href + ". version: " + _currentVersion;
	    if (_localStorage===1) {
	        ga('send','event', 'CatchError', err_location, k);
	        fa('send','event', 'CatchError', err_location, k);
	    } else {
	        new Image().src = 'http://m.ftchinese.com/track/ga.php?utmac=MO-1608715-1&utmn=2013101610&utmr=-&utmp=%2Fphone%2Ferror%2FlocalStorage&guid=ON';
	    }
	}

***待细研究***


## 15.函数historyAPI()
检测运行环境是否有window.history这个API,且不能是Android2,如果满足以上两个条件则返回true，否则返回false。

	//运行环境检测
	function historyAPI() {
	    var ua = navigator.userAgent || navigator.vendor || "";

	     // 如果ua中含有Android 2或osVersion为Android2,则返回false
	    if (/Android 2/i.test(ua) || osVersion == "Android2") {
	        return false;
	    }

	    // 如果浏览器存在window.history且也存在window.history.pushState，则返回true
	    if (window.history && window.history.pushState) {
	        return true;
	    }
	}

### 知识说明
#### （1）navigator对象：
识别客户端浏览器的事实标准，详见《JS高级》P210
	- navigator.vendor:浏览器品牌
	- navigator.userAgent:浏览器的用户代理字符串

#### （2）history对象新添方法pushState()/replaceState()
HTML5引入了history.pushState()和history.replaceState()这两个方法，他们允许添加和修改history实体。同时，这些方法会和window.onpostate事件一起工作。

pushState 用于向 history 添加当前页面的记录，而 replaceState 和 pushState 的用法完全一样，唯一的区别就是它用于修改当前页面在 history 中的记录。

eg:
		var stateObj = { foo: "bar" };
		history.pushState(stateObj, "page 2", "bar.html");

这会使得URL栏显示http://mozilla.org/bar.html，但浏览器不会加载这个bar文件，也不会检查这个文件是否存在。

参数：pushState(stateObj,title,URL)：state对象，标题(现在是被忽略，未作处理)，URL(可选）

详见<http://www.cnblogs.com/xcsn/p/4517581.html><https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method>

### 依赖关系
- 功能定位：单一功能小函数
- 依赖函数：无
- 依赖全局变量：osVersion

## 16.* 函数ipadstorage
(定义于app\androidapptest.html中的第200行，只有该文件定义，其他index.html|android.html|mba.html都没有定义)

### 疑问：
它大概是干嘛的？看起来比较复杂……它的方法.init()啥的具体又是干啥的？

## 17.函数isOnline
（定义于本文件 即app\scripts\main.js)

判断是否处于离线状态，如果返回结果为"no",则为离线状态；返回结果为"possible",则为在线状态。

	function isOnline() {//iOS和BB10可以准确判断离线状态，某些Android设备会返回完全错误的信息
	    if ((osVersion.indexOf("ios")>=0 || osVersion == "bb10") && navigator && navigator.onLine==false) {
	        return "no";
	    }
	    return "possible";
	}

### 知识补充
- BB10是，黑莓系统
- navigator.onLine:表示浏览器是否连网，连网为true,否则为false

### 疑问
那这样就只能针对iOS和BB10判断离线状态咯？

### 依赖关系
- 功能定位：单一功能小函数
- 依赖函数：无
- 依赖全局变量：osVersion

## 18.函数loadHomePage
(定义于本文件 webapp\app\scripts\main.js第1552行)

	function loadHomePage(loadType) {
	    var dateDescription = '';
	    var dateStamp = '';
	    var homePageRequest = new Date().getTime();//当前日期时间的毫秒数
	    var connectionType = window.gConnectionType || 'unknown connection';
	    
		try {
	        updateStartStatus('running loadHomePage');//设置"发送错误报告"按钮发送的内容为'running loadHomePage'
	    } catch (ignore) {
	
	    }

	    updateTimeStamp();//更新时间戳

	    $('html').addClass('is-refreshing');//html元素增加class 'is-refreshing'

	    if (loadType === 'start') {//如果loadType为start
	        gStartStatus = 'startFromOnline start';
	        $("#startstatus").html("加载最新主页");
	    } else if (/^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/.test(loadType)) {//如果loadType是 xxxx-x/xx-x/xx 的形式
	        dateDescription = loadType.replace(/^([0-9]{4})\-([0-9]{1,2})\-([0-9]{1,2})$/, '$1年$2月$3日');将loadType替换为 xxxx年x/xx月x/xx日
	        dateStamp = '&date=' + loadType;
	        $('#homeload .loadingStatus').html('加载' + dateDescription + '主页...');//?没找到$('#homeload .loadingStatus')是在哪个文件中定义的。。。
	    } else if (loadType !== 'start') {//如果loadType不为start也不为年月日
	        $('#homeload .loadingStatus').html('加载最新主页...');
	    }

	    ga('send', 'event', 'App Home Page', 'Request', connectionType);//ga代码

	    requests.push(
	        $.ajax({

	            /// url with events and date √
	            url: gStartPageTemplate + themi + dateStamp,//即 "api/homecontentwide.html?20160820134400&date=2016-8-20"

	            success: function(data) {
	                var homePageSuccess = 0;
	                var timeSpent = homePageSuccess - homePageRequest;//homePageRequest是当前日期时间的毫秒数
	                gStartStatus = "startFromOnline success";
	                $("#startstatus").html("版面成功加载");//请求成功后"#startstatus"元素内容变为"版面成功加载"
	                connectInternet="yes";
	                setTimeout(function(){connectInternet="unknown";},300000);//5分钟后，connectInternet又由"yes"变为"unknown"
	                data = checkhttps(data);//将请求到的data中某些url替换为"https://api.ftmailbox.com/media"。（该函数checkhttps详见19.）

	                loadToHome(data, loadType);//(该函数loadToHome参见20.)
	                showDateStamp();
	                if (/^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/.test(loadType)) {
	                    gHomePageIsLatest = false;
	                } else {
	                    gHomePageIsLatest = true;
	                }
	                try {
	                    localStorage.removeItem(gHomePageStorageKey);
	                    saveLocalStorage(gHomePageStorageKey, data);
	                } catch (ignore) {
	                
	                }
	                $("#startbar").animate({width:"100%"},300,function(){
	                    $("#screenstart").remove();
	                });
	                $('html').removeClass('is-refreshing');
	                ga('send', 'event', 'App Home Page', 'Success', connectionType);
	                ga('send', 'timing', 'App', 'Home Page Request', timeSpent, connectionType);
	            },
	            error: function () {
	                gStartStatus = "startFromOnline error";
	                ga('send', 'event', 'App Home Page', 'Fail', connectionType);
	                if (loadType === 'start') {
	                    $("#startstatus").html("服务器开小差了");
	                    try {
	                        updateStartStatus('starting home failure');
	                    } catch (ignore) {
	
	                    }
	                    startFromOffline();
	                    //trackErr(gStartPageTemplate, 'Start Page Template');
	                } else {
	                    $('#homeload .loadingStatus').html('服务器开小差了！');
	                    try {
	                        updateStartStatus('refreshing home failure');
	                    } catch (ignore) {
	
	                    }
	                    //trackErr(gStartPageTemplate, 'Reload Home Page');
	                }
	                $('html').removeClass('is-refreshing');
	                setTimeout(function(){
	                    showDateStamp();
	                }, 2000);
	            }
	        })
	    );
	    if (loadType === 'start') {
	        setTimeout(function(){
	            //$('#startstatus').html(gStartStatus);
	            if (gStartStatus === 'startFromOnline start') {
	                $('#startstatus').html('准备加载缓存的内容...');
	                setTimeout(function(){
	                    if (gStartStatus === 'startFromOnline start') {
	                        startFromOffline();
	                    }
	                    //$("#screenstart").remove();
	                    $('html').removeClass('is-refreshing');
	                },2000);
	            }
	        },3000);
	    }
	}

### 说明
- id="startstatus"的元素是在webapp\app\index.html的第94行
	
		<p class=booklead id="startstatus"><span id="loadNow">正在连接服务器</span></p>

### 疑问
- 没找到$('#homeload .loadingStatus')是在哪个文件中定义的
- 关于ga函数的是在app\log\ga.js中定义的吗？这个app\log\ga.js是谷歌自己的代码吧？

### 依赖关系
- 功能定位：复杂的宏观作用大函数
- 依赖参数：loadType
- 依赖全局变量：
	- gConnectionType
	- gHomePageIsLatest
	- gHomePageStorageKey
	
- 依赖函数：
	- updateStartStatus
	- updateTimeStamp
	- ga
	- checkhttps
	- loadToHome
	- showDateStamp
	- startFromOffline


## 19. 函数checkhttps√
（定义于本文件即webapp\app\scripts\main.js的第2611行）

如果当前url包含"https:"且包含"api.ftmailbox.com",则把请求到的data中的网址替换为"https://api.ftmailbox.com/media"

	function checkhttps(data) {
	    var url = window.location.href.toLowerCase();//将当前url字母全部转换为小写
	   
		if (url.indexOf('https:') >= 0 && url.indexOf('api.ftmailbox.com') >= 0) {//如果url中包含"https:"且包含"api.ftmailbox.com"

	        data = data.replace(/http:[\/\\]+i.ftimg.net[\/\\]+/g, 'https://api.ftmailbox.com/media/').replace(/http:[\/\\]+media.ftchinese.com[\/\\]+/g, 'https://api.ftmailbox.com/media/');
			//则将data中的"http://i.ftimg.net/g"替换为"https://api.ftmailbox.com/media/",将"http://media.ftchinese.com/g"也替换为"https://api.ftmailbox.com/media"
	    }
	    return data;
	}

### 疑问
- 这里的是个GET请求，这里请求到的data到底是什么东西?（console.log出来是一堆内容html代码）"http://i.ftimg.net/g"、"http://media.ftchinese.com/g"、"https://api.ftmailbox.com/media"为什么要把前两个替换为后一个？

### 依赖关系
- 功能定位：单一功能小函数
- 依赖传入参数：http请求发送的data
- 依赖函数：无
- 依赖全局变量：无

## 20. 函数loadToHome

	function loadToHome(data, loadType) {
	    $('#homecontent').html(data);//把请求到的html内容数据写入$('#homeContent'),$('#homeContent')在webapp\app\index.html的第138行|android.html的第142行

	    if (loadType !== undefined) {
	        fillContent(loadType);//（函数fillContent参见11）
	    } else {
	        fillContent();
	    }
	    addstoryclick();
	    removeBrokenIMG();
	    //display app images when loaded
	    showAppImage('fullbody');
	    //display button to download native app
	    if (/baidu|micromessenger/i.test(uaString)) {
	        $('#download-native').removeClass('hidden');
	    } 
	}

### 说明
- $('#homeContent')在webapp\app\index.html的第138行

		<div id="homecontent"></div>

	目测是首页的全部内容部分

### 依赖关系
- 功能定位：复杂的宏观作用大函数
- 依赖参数：data（http请求传递的内容）, loadType（一个字符串）
- 依赖全局变量：无
	
- 依赖函数：
	- fillContent(也是复杂大函数）
	- addstoryclick
	- 
	- 
	- showAppImage


## 11.函数fillContent
（定义于本文件即webapp\app\scripts\main.js的第450行）
作用应该是填充首页内容部分(id="homecontent"）。其是用从数据库请求的data来填充各部分内容。

***待细看***

	function fillContent(loadType) {
 
			    var ua=navigator.userAgent || navigator.vendor || "";
			    var searchnote = '输入关键字查找文章';
			    var mpdata;
			    var hcdata;
			    var message = {};
			    var hashURI = location.hash || "";//url中#部分
			    var _channel_name;
			    var _channel_title;
			    var theTimeStamp = new Date();
			    var lastActionTime;
			    var thestoryId;
			    var parts;
			    filloneday('');
		
		$('.closestory,.back,.backbutton').unbind().bind('click',function() {histback();});//先解绑，再绑定事件click;疑问是这些 $('.closestory,.back,.backbutton')到底在哪里写着？(histback函数详见21.)
				
			    //广告点击打开iframe√
			    adclick();//修改本页面中href以"open"为开头的a的href、target属性。（函数adclick详见22.）
			
			    //从广告返回主页或文章页√
			    $('.adback').click(function() { closead();});//(函数closead详见23.）该('.adback')是在广告的iframe导入的页面代码里面吗？？？
			
			    //频道页和其他直接载入HTML的页面
			    $('.channel')//index.html|android.html中表示每个频道的菜单都有这个class,如"中国""全球""每日英语""我的FT"，就是"首页"没有这个class
					.unbind()//不带任何参数的unbind() removes all handlers attached to the elements:
					.bind("click",function() {
				        pageStarted=1;
				        _popstate=0;
				        showchannel($(this).attr('url'), $(this).html(), ($(this).hasClass('require-log-in') == true) ? 1 : 0);
				    });
				
			
			    //进入其他Webapp // each(function() {$(this)
			    $('.webapp').click(function() { gotowebapp($(this).attr('url'));});
			
			    //导航栏标红首页
			    $('.navigation .home').addClass('on');
			    
			    //首页滑动处理
			    setTimeout(function(){addHomeScroller();},10);
			    
			    //导航栏滑动处理
			    navScroller($("#fullbody"));
			    
			    //文章页不能默认上下
			    if (useFTScroller==1 && nativeVerticalScroll === false) {
			        document.getElementById('fullbodycontainer').addEventListener('touchmove', function(e) {
			            e.preventDefault();
			        });
			    } else if (nativeVerticalScroll === true) {
			        document.getElementById('contentRail').addEventListener('touchmove', function(e) {
			            e.preventDefault();
			        }); 
			    }
			
			
			    //给用户的提示
			    if (!!pmessage) {$('.bodynote').append(pmessage);} else {$('.bodynote').hide();}
			    $('#searchtxt').val(searchnote);
			    $('#searchtxt').focus(function() {
			        var it = $(this);
			        it.css('color', '#000');
			        if (it.val() == searchnote) {
			            it.val('');
			        }  
			    });
			
			    $('#searchtxt').blur(function() {
			        var it = $(this);
			        it.css('color', '#666');
			        if (it.val() == '') {
			            it.val(searchnote);
			        }
			    });
			
			    //是否已经登陆
			    checkLogin();
			
			    //读者发表评论
			    $('#addnewcomment').click(function() {
			        var usenickname = $('#name').attr('checked') == true ? 1 : 0;
			        $(this).attr('value', '正在发布中...');
			        $(this).attr('disabled', true);
			        $.ajax({
			            type: 'POST',
			            url: commentfolder + '/add',
			            data: {storyid: $('#cstoryid').val(), talk: $('#Talk').val(), use_nickname: usenickname, NickName: $('#nick_name').val()+osVersionMore} ,
			            success: function(data) {
			                if (data != 'yes') {
			                    alert('抱歉,现在我们的网站可能出现了一些小故障.您的留言可能没有发表成功,请您稍后再重新尝试发表一次。');
			                    return;
			                }
			                alert('感谢您的参与，您的评论内容已经发表成功。审核后就会立即显示!');
			                $('#addnewcomment').val('提交评论').attr('disabled', false);
			                $('#Talk').val('');
			            },
			            error: function() {
			                alert('很抱歉。由于您与 FT 网络之间的连接发生故障,发表评论失败. 请稍后再重新尝试提交.');
			                $('#addnewcomment').attr('value', '提交评论').attr('disabled', false);
			                return;
			            }
			        });
			
			    });
			
			    //查看旧刊的日历
			    
			    if (typeof loadType === 'string' && /^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/i.test(loadType)) {
			        //var parts ='04/03/2014'.split('/');
			        parts = loadType.split('-');
			        thisday = new Date(parts[0],parts[1]-1,parts[2]); 
			        //thisday = new Date(loadType);
			        //$('#o-connection-status').html(loadType);
			    } else {
			        thisday = new Date();
			    }
			    updatecalendar(thisday, 0);
			    //如果是iPhone上的Mobile Safari打开，则显示添加到主屏幕的提示
			    if (_localStorage==0) {
			        turnonOverlay('storageSetting');
			    } else if (/safari/i.test(ua) && /ios/i.test(osVersion) && iOSShareWechat===0) {
			        turnonOverlay('addHome');
			    } else if (/baidu|micromessenger/i.test(ua)) {
			        turnonOverlay('downloadNative');
			    } else if ((ua.indexOf('Android 2') !== -1 || ua.indexOf('Android 3') !== -1) && (getvalue('yourDevice')==null)) {//如果是比较老的安卓手机，则提示用旧版程序或手机站     
			        turnonOverlay('yourDevice');
			        savevalue('yourDevice',1);
			    }
			
			
			    if (historyAPI()==true) {
			        window.addEventListener("popstate", function() {
			            
			            //alert ('_popstate: ' + _popstate + "; pageStarted: " + pageStarted +  ' url: ' + location.href);
			            
			            if (pageStarted === 1) {
			                _popstate=1;
			                jumpToPage();
			            }
			            pageStarted=1;
			            _popstate=0;
			            
			        });
			    }
			
			    //反馈意见
			    $("#homepageEmail").attr("href","mailto:ftchinese.feedback@gmail.com?subject=Feedback about FTC Web App - from home page&body=%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A    ====%0A%0D%0A%0D%0ATechnical information:%0D%0A%0D%0AUser-agent: "+ua+"%0D%0A%0D%0AResources version: "+_currentVersion+"%0D%0A%0D%0AScreen Mode: "+$(window).width()+"X"+$(window).height()+"%0D%0A%0D%0Amy URL: " + location.href);
			    
			    //点击设置的背景则关闭设置菜单
			    $(".overlay").unbind().bind("click",function(e){
			        //console.log ($(this).attr('class'));
			        if ($(this).hasClass("always-on")===true) {
			            return false;
			        }
			       	if (/\b(cell)\b/.test(e.target.className)) {
			            if ($(this).hasClass('close-self-only')===true) {
			                $(this).removeClass('on');
			            } else {
			                closeOverlay();
			            }
			        }
			    });
			
			    //获取读者的字号偏好
				if (getvalue("fontPreference") && getvalue("fontPreference")!=null && getvalue("fontPreference")!="") {
					fontPreference=getvalue("fontPreference");
				}
				$("#fullbodycontainer").attr("class",fontPreference);
				$(".fontpreferences div").unbind().bind("click",function(){
					$(".fontpreferences div").removeClass("-selected");
					$(this).addClass("-selected");
					fontPreference=$(this).attr("id");
				});
				$(".fontpreferences div").removeClass("-selected");
				$(".fontpreferences ."+fontPreference).addClass("-selected");
			    $("#currentFont").html($("#"+fontPreference).html());
			
			    //获取读者对背景色的偏好
			    if (getvalue("bgMode") && getvalue("bgMode")!=null && getvalue("bgMode")!="") {
			        bgMode=getvalue("bgMode");
			        if (bgMode==null || bgMode=="") {
			            bgMode="";
			        }
					$("html").removeClass("white").removeClass("pink").removeClass("night").addClass(bgMode);
			        $("#"+bgMode).addClass("-selected");
				}
			    
			    if (location.href.indexOf("android")>0) {
			        if (gNoticeAdded === false) {
			            gNoticeAdded = true;
			            $('#setting .nightreading').after('<div class="nightreading notificationOn" id="notification"><strong>通知</strong><span class="displayvalue" onclick="switchNotification()"><span class="ui-toggle"><span class="ui-toggle-button2"></span><span class="ui-toggle-label ui-toggle-label-on">开</span><span class="ui-toggle-label ui-toggle-label-off">关</span></span></span></div>');
			        }
			        $('#setting .description').remove();
			        if (window.ftjavacriptapp !== undefined) {
			            if (ftjavacriptapp.is_push()=='0') {
			                ftjavacriptapp.set_push('0');
			                $("#notification").addClass('notificationOn');
			            } else {
			                ftjavacriptapp.set_push('1');
			                $("#notification").removeClass('notificationOn');
			            }
			        }
			    }
			    //点击文章页底部可以翻页
			    $("#storyScroller").unbind().bind("click",function(e){
			        var k=e.clientY, h, x=e.clientX, w=$(window).width(), doScroll=0;
			        h = (typeof storyScroller === 'object' && useFTScroller === 1) ? $(this).innerHeight() : $(window).height()-45;
			        if (k>0 && h>50 && (typeof storyScroller === 'object' || useFTScroller===0 || nativeVerticalScroll === true)) {
			            if (k/h>0.8) {
			                h=h-40;
			                doScroll=1;
			            } else if (k/h<0.2) {
			                h=-h+40;
			                doScroll=1;
			            } else if (x/w<0.2 && !/\b(link)\b/.test(e.target.className) && noFixedPosition==1) {
			                histback();
			                return false;
			            }
			            //alert (k + "/" + h + "/" + doScroll);
			            if (doScroll===1) {
			                if (useFTScroller===1) {
			                    if (nativeVerticalScroll === true) {
			                        $('#storyScroller').animate({ scrollTop: this.scrollTop + h }, '500');
			                    } else {
			                        storyScroller.scrollBy(0,h,500);    
			                    }
			                } else {
			                    $('html,body').animate({ scrollTop: window.pageYOffset + h }, '300');
			                }
			            }
			        }
			    });
			    
			    //如果不是原生应用，隐藏到App Store的链接
			    if (location.href.indexOf("phoneapp.html")<0 || osVersion.indexOf("ios")<0) {
			        $(".nativeButton").hide();
			    }
				
				//点击分享文本框全选
				$('input[type="text"].paste,textarea.paste').off().on('keypress focus click',function(){
			        var l=$(this).val().length;
			        if (l<1) {l=1;}
					$(this).get(0).selectionStart=0;
					$(this).get(0).selectionEnd=l;
			        if ($(this).attr("id")=="shareMobile") {
			            $("#openWeChat").show();
			        }
			        if (osVersion.indexOf("ios")<0){
			            $("#openWeChat").removeAttr("class").removeAttr("href");
			        }
				});
			
			    //热门文章
			    if (isOnline()=="no" && _localStorage===1) {        
			        mpdata = getvalue('smostpopular');
			        fillArticles(mpdata, 'popoular');
			        hcdata = getvalue('mostcomment');
			        fillArticles(hcdata, 'comment');
			    }else{
			        //十大热门文章
			        $.get(gHotStory + themi, function(data) {
			            fillArticles(data, 'popoular');
			            try {
			                localStorage.removeItem('smostpopular');
			                saveLocalStorage('smostpopular', data);
			            } catch (ignore) {
			            
			            }
			        });
			        message.head = {};
			        // 评论最多文章
			        message.head.transactiontype = '10003';
			        message.head.source = 'web';
			        message.body = {};
			        message.body.ielement = {};
			        message.body.ielement.days = 7;
			
			        $.ajax({
			            method: gPostMethod,
			            url: gApiUrl.a10003,
			            data: JSON.stringify(message),
			            dataType: "json"
			        }).done(function(data, textStatus) {
			            if (textStatus == 'success' && data.body.oelement.errorcode === 0) {
			                var hotdata = JSON.stringify(data.body.odatalist);
			                fillArticles(data.body.odatalist, 'comment');
			                localStorage.removeItem('mostcomment');
			                saveLocalStorage('mostcomment', hotdata);
			            }
			        }).fail(function(jqXHR){
			            trackErr(message.head.transactiontype, "Most Commented");
			        });
			    }
			    
			    //点击刷新
			    // $(".loadingStory").unbind().bind("click",function(){
			    //     refresh();
			    // });
			
			    //iOS原生应用分享功能
			    if (gIsInSWIFT === true) {
			        $('#shareButton, #shareButton2').attr('onclick','').wrap('<a id="iOSAction"></a>');
			        $('#video-share').attr('onclick','').wrap('<a id="iOS-video-action"></a>');
			    }
			
			    //跳到页面
			    if (hashURI.indexOf("story/")>=0) {
			        pageStarted=1;
			        _popstate=0;
			        readstory(hashURI.replace(/^.*story\//g, ""));
			    } else if (hashURI.indexOf("channel/")>0) {
			        _popstate=0;
			        _channel_name = hashURI.slice(1).replace("channel/", "").replace(/&title=.*$/g,"").replace(/\/+/g,"/");
			        _channel_title= decodeURIComponent(getpvalue(hashURI,"title"));
			        if (_channel_title=="") {_channel_title="FT中文网";}
			        showchannel (_channel_name,_channel_title);
			    } else {        
			        actionTimeStamp=Math.round(theTimeStamp.getTime() / 1000);
			        lastActionTime=getvalue("actionTimeStamp") || 0;
			        lastActionTime=parseInt(lastActionTime,10);
			        actionUrl=getvalue("actionUrl") || "";
			        if (lastActionTime!="" && lastActionTime!=0 && actionTimeStamp-lastActionTime<10*60 && actionUrl.indexOf("storypage/")>=0) {
			            savevalue("actionUrl","");
			            savevalue("actionTimeStamp",actionTimeStamp);
			            thestoryId=actionUrl.replace(/^.*storypage\//g, "");
			            _popstate=0;
			            readstory(thestoryId);
			        }
			    }
			    //设定右栏滚动的上限和下限
			    freezeCheck();
			    freezeRail();
			    //禁止长按按钮弹出默认的选择框
			        //禁止长按按钮弹出默认的选择框
			    $('#fullbody,#channelview,#contentRail,#navOverlay').disableSelection();
			    //gStartStatus = "fillContent end";
			
			    // 特别报导
			    // 这段代码直接放到模版里面了
			    /*
			    gSpecialAnchors = [];
			    if ($(".specialanchor").length>0) {
			        $('.specialanchor').each(function(){
			            var adId = $(this).attr('adid') || '';
			            var sTag = $(this).attr('tag') || '';
			            var sTitle = $(this).attr('title') || '';
			            gSpecialAnchors.push({
			                "tag": sTag,
			                "title": sTitle,
			                "adid": adId
			            });
			        });
			    }
			    */
			}

### 说明
- unbind(): Event handlers attached with .bind() can be removed with .unbind(). In the simplest case, with no arguments, .unbind() removes all handlers attached to the elements。详见 <http://api.jquery.com/unbind/>

### 疑问

- 绑定
- 
- 
- 事件的元素$('.closestory,.back,.backbutton')，它们都在哪里？

### 依赖关系
- 功能定位：复杂的宏观作用大函数
- 依赖参数： loadType（一个字符串）
- 依赖全局变量：
	- ftjavacriptapp
- 依赖函数：
	- filloneday
	- histback
	- adclick
	- closead
	- showchannel:该函数本身也是个复杂大函数
	- gotowebapp
	- addHomeScroller
	- navScroller
	- checkLogin
	- updatecalendar(thisday,0)
	- turnonOverlay
	- savevalue
	- historyAPI
	- jumpToPage
	- closeOverlay
	- isOnline
	- fillArticles
	- saveLocalStorage
	- trackErr
	- refresh
	- showchannel
	- savevalue
	- freezeCheck
	- freezRail
	
	

## 21.函数histback
（定义于本文件，即webapp\app\scripts\main.js的3161行）

大概是后退按钮的后退轨迹设计（猜的）

//如果是从文章回退到channel，则不必调用showchannel，否则需要调用showchannel

	function histback(gesture) {//参数gesture这个单词是姿态、手势的意思……所以这里gesture参数可以为什么值？？？
	    var thispage,previouspage,theid, index = 0, nonStoryIndex=-1;

	    closeOverlay();//关闭弹窗等（函数closeOverlay详见X.）

	    if (hist.length >= 2) {//hist是最开始定义的全局变量，是一个数组。

	        thispage = hist.shift();//shift（）是删除并返回数组的第一个元素

	        if (gesture !== undefined && gesture === "pinch" && thispage.url.indexOf('story') === 0) {//如果gesture为"pinck"且当前页面的url以"story"为开头。 （PS:这里“gesture！==undefined”完全多余）

	            for (index = 0; index < hist.length; ++index) {
	                if (hist[index].url.indexOf('story') !== 0) {
	                    nonStoryIndex = index;//url中不带"story"的页面的索引值记录为nonStoryIndex
	                    break;//遇到这种url不带"story"的就跳出循环
	                }
	            }

	            hist = (nonStoryIndex >= 0) ? hist.slice(nonStoryIndex) : [];//将hist数组只保留nonStoryIndex之后的元素

	            //alert (hist[nonStoryIndex].url + ":" + hist.length + ":" + nonStoryIndex);
	        }

	        previouspage = hist.shift();//取出hist的第一个元素为previouspage ---为什么现在其第一个元素（即是第一个nonStory的元素）就是previouspage?

	        //alert (previouspage.url);

	        if (previouspage.length === 0) {//如果没有previouspage,即hist为空（因为previouspage=hist.shift()，只有hist为空，previouspage才为空）

	            backhome();//返回首页

	        } else if (previouspage.url.indexOf('story') === 0) {
	            theid = previouspage.url.replace(/story\//g, '');
	            readstory(theid);
	        } else {
	            document.body.className = 'channelview';
	            gNowView = 'channelview';
	            if (useFTScroller===0) {setTimeout(function() {window.scrollTo(0, scrollHeight);},10);}
	            hist = [];
	            hist.unshift({'url': previouspage.url, 'title': previouspage.title});
	            httpspv(gDeviceType + '/channelpage'+previouspage.url);
	            recordAction('/phone/homepage');
	            if (thispage.url.indexOf('story') < 0) {
	                showchannel(previouspage.url, previouspage.title);
	                hist = [];
	            }
	        }
	    } else {
	        if (hist.length > 0) {previouspage = hist.shift();}
	        backhome();
	    }
	}

***待细研究***

## 22.函数adclick
如果当前url中含有"phone.html"，将本页面中href以"open"为开头的a元素的href、target属性进行处理。

	function adclick() {
	    var lo = window.location.href.toLowerCase();//把当前url变为小写
		if (lo.indexOf('phone.html') > 0) {//如果当前url中包含"phone.html"
	    	$('a[href^="open"]').each(function(){//选取每一个属性href以"open"开始的a元素
	        	var thelink=$(this).attr("href");//获取href值
	        	thelink=thelink.replace(/openads:\/\//g, '').replace(/opensafari:\/\//g, '');//将href值中的"openads://"替换为"opensafari://"
	        	$(this).attr("href",thelink).attr("target","_blank");//设置该a元素的href为新的替换处理后的thelink，然后设置"target"值为"_blank"
	        });
		}
	}


### 疑问
1. 当前url为什么会包含"phone.html"？——可以参见gulpfile.js中的任务copy，即有把index.html拷贝为phone.html的步骤。问题是为什么要对这种为"phone.html"的情况特殊处理？
2. 这里a替换后的href含有"opensafari://",这是否表明是从safari浏览器中打开这个链接？？

### 函数依赖关系
单一功能小函数

## 23. 函数closead
从广告中返回文章页时发生的事件。

	function closead() {
	    document.body.className = gNowView;//gNowView可能为fullbody, storyview, adview或channel

	    if (useFTScroller===0) {//如果useFTScroller为0，则10s后窗口滚动到(0,scrollHeight)
			setTimeout(function() {
				window.scrollTo(0, scrollHeight);
			},10);
		}

	    $('body').css('background', '#FFF1E0');//FT粉
	    $('#adiframe').attr('src', '');

	    //记录首页PV√
	    httpspv(gDeviceType + '/homepage');//(函数httpspv详见24.）

	    recordAction('/phone/homepage');//设置localStorage:'actionUrl'='/phone/homepage'（函数recordAction详见24.）
	}

### 依赖关系
复杂功能函数

依赖函数：

- httpspv
- recoredAction


## 24.函数httpspv
（定义于本文件第2673行）

貌似是用于流量追踪。

***暂略，待再细研究***

	//流量追踪
	function httpspv(theurl) {
	    if (theurl.indexOf("storypage")>0) {
		    document.title = $("#storyview .storytitle").html() + " - FT中文网手机应用";
	    } else if (theurl.indexOf("channelpage")>0) {
	        theurl = theurl.replace(/[0-9\=\?\&]+$/,"");
		    document.title = $(".channeltitle").html() + " - FT中文网手机应用";
	    } else if (theurl.indexOf("photo")<0 && theurl.indexOf("interactive")<0 && theurl.indexOf("video")<0){
	        document.title = gAppName;
	    }
	    var vtype="member", nowV, pagetype, userId = getCookie('USER_ID') || '', ftcteam='';
	
	    if (username === undefined || username== null || username == "") {
	        vtype="visitor";
	    }
	    if (theurl.indexOf("story")>=0) {
	        pagetype="Story";
	    } else if (theurl.indexOf("interactive")>=0){
	        pagetype="Interactive";
	        ftcteam="product";
	    } else if (theurl.indexOf("photo")>=0){
	        pagetype="Photo";
	        ftcteam="product";
	    } else if (theurl.indexOf("video")>=0){
	        pagetype="Video";
	        ftcteam="video";
	    } else if (theurl.indexOf("search")>=0){
	        pagetype="Search";
	    } else if (theurl.indexOf("comment")>=0){
	        pagetype="coment";
	    } else if (theurl.indexOf("column")>=0){
	        pagetype="Column";
	    } else if (theurl.indexOf("tag")>=0){
	        pagetype="Tag";
	    } else if (theurl.indexOf("topic")>=0){
	        pagetype="Topic";
	    } else if (theurl.indexOf("channel")>=0){
	        pagetype="Channel";
	    } else if (theurl.indexOf("home")>=0) {
	        pagetype="App Home";
	    } else {
	        pagetype="";
	    }
	    try {
	        ga('set', 'dimension7', _currentVersion.toString());
	        ga('set', 'dimension2', vtype);
	        if (userId !== "") {ga('set', 'dimension14', userId);}
	        ga('set', 'dimension4', pagetype);
	        if (ftcteam !== "") {ga('set', 'dimension5', ftcteam);}
	        ga('set', 'dimension17', langmode);
	        if (theurl.indexOf("interactive")>=0){
	            if (typeof window.interactiveType === 'string') {
	                cg1 = window.interactiveType;
	                ga('set', 'contentGroup1', cg1); 
	            }
	        } else if (cg1 !== '(not set)'){
	            cg1 = '(not set)';
	            ga('set', 'contentGroup1', null);
	        }
	
	    } catch(ignore) {
	    }
	    if (_localStorage===1) {
	        try {
	            tracker.push(theurl);
	        }catch(err){
	            ga('require', 'displayfeatures');
	            ga('send', 'pageview',  '/missed'+theurl);
	            fa('send', 'pageview',  '/missed'+theurl);
	            trackErr(err, "trackerpush");
	        }
	    } else {
	        new Image().src = 'http://m.ftchinese.com/track/ga.php?utmac=MO-1608715-1&utmn=2013101610&utmr=-&utmp=%2Fmissed'+theurl+'&guid=ON';
	    }
	    nowV = $("body").attr("class") || "";
	    if (nowV !== "storyview") {
	        gSpecial = false;
	    }    
	    if (isOnline()=="possible") {        
	        screenWidth = $(window).width();
	        $('#'+nowV).find('.adiframe').each(function(index) {
	            var adHeight=$(this).attr('type') || 0, adFrame=$(this).attr('frame') || "", adwidth=$(this).attr('adwidth') || "300", FrameID, adOverlay="", forPhone;
	            adHeight = parseInt(adHeight,10);
	            forPhone = ($(this).hasClass("for-phone") === true) ? true : false; 
	            if ((adHeight>90 && screenWidth>=700 && forPhone===false) || (adHeight<90 && screenWidth<700) || (adHeight === 90 && (screenWidth===768 || screenWidth===1024)) || (forPhone === true && screenWidth<700) || adHeight ===0) {
	                if ($(this).find("iframe").length>0) {
	                    FrameID = $(this).find("iframe").eq(0).attr("id");
	                    document.getElementById(FrameID).contentDocument.location.reload(true);
	                } else {
	                    if (useFTScroller===1) {adOverlay = '<a target=_blank class="ad-overlay"></a>';}
	                    $(this).html('<iframe id="' + nowV + index + '" src="/phone/ad.html?isad=0#adtype=' + adFrame + '&adid=' + nowV + index + '" frameborder=0  marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width="'+adwidth+'" height="100%"></iframe>' + adOverlay);
	                    $(this).attr("id","ad-" + nowV + index);
	                }
	            }
	            if (useFTScroller===1) {
	                if ($(this).offset().top >= 0 && $(this).offset().top <= screenWidth) {
	                    $(this).addClass("loaded-in-view");
	                } else {
	                    $(this).removeClass("loaded-in-view");
	                }
	            }
	        });
	    }
	    setTimeout (function (){freezeCheck();},200);
	}
	
## 24.函数recordAction(theAction)
设置两个localStorage:"actionUrl"=theAction（参数值）;"actionTimeStamp"=actionTimeStamp(时间戳）

	function recordAction(theAction) {
	    var theTimeStamp = new Date();
	    actionTimeStamp=Math.round(theTimeStamp.getTime() / 1000);//当前时间的秒数
	    savevalue("actionUrl",theAction);//(函数savevalue详见25.）
	    savevalue("actionTimeStamp",actionTimeStamp);
	}
### 依赖关系：
单一功能小函数。

依赖函数：

- savevalue
## 25.函数savevalue(thekey,thevalue)√
保存localStorage:thekey=thevalue

	function savevalue(thekey,thevalue) {
	    try {
	        saveLocalStorage(thekey, thevalue);//（函数saveLocalStorage详见26.）
	    } catch (err) {
	        setCookie(thekey, thevalue, '', '/');
	    }
	}

## 26.函数saveLocalStorage(theKey,thevalue)√

	function saveLocalStorage(thekey,thevalue) {
	    try {
	        localStorage.removeItem(thekey);//这句话真多余，本来localStorage中同样的key自然就会以新值覆盖
			localStorage.setItem(thekey, thevalue);
	    } catch (ignore) {
	    }
	}

### 疑问
- ***以上25.、26.两个函数是否太啰嗦了？？？没必要搞这么多行代码吧？建议合并成一个函数***
- 这里都要把localStorage相关方法放在try...catch...是因为怕浏览器不支持吧？（参见《JS高级》P638）

## 27.函数getValue(thekey) √
实现localStorage的getItem()

	function getvalue(thekey) {
	    var thevalue="";
	    try {
	        thevalue=localStorage.getItem(thekey);
	    } catch (err) {
	        thevalue=getCookie(thekey);
	    }
	    return thevalue;
	}

## 28.函数showchannel

	function showchannel(url, channel, requireLogin, openIniFrame, channelDescription) {
	    if (requireLogin !== undefined && requireLogin === 1 && (username === undefined || username ==="")) {//这句有点啰嗦吧，requireLogin===1那肯定它就不等于undefined了啊

	        $('#popup-title').html("提示");//<div id="popup-title">提示</div>,位于index.html的第647行和android.html的609行

	        $('#popup-description').html("对不起，您需要先登录才能使用这个功能");//<div id="popup-description" class="padding"></div>,位于index.html的第649行；android.html的第611行


	        $('#popup-content').html("
				<div class='standalonebutton'>
					<button class='ui-light-btn' onclick=\"turnonOverlay('loginBox');\">登陆</button>
				</div>
				<div class='standalonebutton last-child'>
					<button class='ui-light-btn' onclick=\"$('#popup').removeClass('on');\">取消</button>
				</div>");
	        $('#popup').addClass('on');
	        return;
	    }

	    var channelView = $('#channelview'),//id="channelview"的div在index.html的第238行

	        chview,
	        theurl, 
	        urlPure,
	        current_Page, 
	        pageurl, 
	        h,
	        storyid, 
	        it, 
	        pvurl,
	        navClass,
	        navTitle;

	    var channelHeight = $(window).height() - 45;//为何要减45，这是频道菜单栏的高度吗？？？
	    var channelDetail = channelDescription || '';//channelDescription是本函数参数
	    var orignialUrl = url;//url是本函数参数
	
	    //extract tag information from url√
	    gTagData = url.replace(/^.*channel=/,'').replace(/^.*tag\//,'').replace(/\?.*$/g,'');//从url中提取tag信息 即url中channel等于的值。

	    gTagData = decodeURIComponent(gTagData);

	    if (gTagData !== '') {
	        gTagData = gTagData.split(',');//把字符串分割为字符串数组
	    } else {
	        gTagData = [];
	    }
	 
	
	    if (channelView.find("#channelScroller").length<=0) {//如果id为channelView的这一div下面没有("#channelScroller")
	        channelView.html("
				<div id=channelScroller>
					<div id=channelContent>
					</div>
				</div>");
	    }

	    chview = channelView.find("#channelContent");//chview是刚刚动态添加到channelView下的（"#channelScroller"）下的("#channelContent)

	    if (useFTScroller===0) {
	        if ($("body").hasClass('storyview')==false) {scrollHeight = window.pageYOffset;}//pageYOffset为当前页面相对于窗口显示区左上角的 Y 位置。---问题是这里的页面最上一部分是固定的，这个winidow.pageYOffset永远是0啊？？？
	    }
	    closeOverlay();//取消弹窗的展示等(函数closeOverlay参见29.)


	    document.body.className = 'channelview';//将body的className设置为'channelview'
	    gNowView = 'channelview';//gNowView的值和body是同步的

	    if (useFTScroller===0) {
	        window.scrollTo(0, 0);
	    }
	    
	    navClass = getURLParameter(url, "navClass");//获取url中参数"navClass"的值
	    navTitle = getURLParameter(url, "navTitle");//获取url中参数"navTitle"的值，这俩url参数分别是什么意义？？？

	    $("#navList li").removeClass("on");// $("#navList li")就是index.html的导航菜单栏（位于662行起)

	    if (navClass !== null) {
	        $("#navList li." + navClass).addClassl("on");//如果url中有navClass这个参数，则为class含有navClass的“#navList li"添加class "on"
	    }

	    if (navTitle !== null) {
	        channel = navTitle; //如果url中有navTitle这个参数，则为变量channel赋值为navTitle
	    }

	    document.getElementById('header-title').innerHTML = channel;//元素<div class="header-title" id="header-title"></div>内填入channel值，即频道页头部的频道名称栏（html在index.html的第249行）。
	    
	    chview.html('<div class="loader-container"><div class="loader">正在读取文章数据...</div></div><div class="standalonebutton"><button class="ui-light-btn" onclick="backhome()">返回</button></div>');//读取频道页内容时显示在"#header-title"下方的元素即class="loader-container),这时候的"loader-container"除了有一行“正在读取文章数据..."的字以外，还有一个"返回"按钮。

	
	    //每次打开的时候都取新的链接，所以在网址后面要添加一个随机参数√
	    themi = thisday.getHours() * 10000 + thisday.getMinutes() * 100;
	    thed = thisday.getFullYear() * 10000 + thisday.getMonth() * 100 + thisday.getDate();
	    themi=thed*1000000+themi;//这些都是那几个时间戳变量

		//为url添加时间戳形式的随机参数，分为url已有参数（即有?)和没有参数两种情况来添
	    if (url.indexOf("?")>0) {
	        url=url+"&"+themi;
	    } else {
	        url=url+"?"+themi;
	    }
	
	
	
	    //记录频道页浏览历史    
	    if (hist && ((hist[0] && hist[0].url != url) || hist.length==0)) {//(hist已经至少有一个元素，且hist[0]的url不等于当前url)或(hist还为空）
	        hist.unshift({'url': url, 'title': channel});//unshift是向数组的开头添加一个元素。可见该hist数组每个元素是一个对象。
			
	        if (historyAPI()==true && _popstate==0) {//如果有window.history这个对象存在，且_popstate为0(函数historyAPI参见15.) _popstate到底是干嘛用的？？？

	            theurl="#/channel/"+url;
	            urlPure=url.replace(/[\?\&][0-9]+$/g,"");
	            if (location.href.indexOf(urlPure)<0) {
	                window.history.pushState(null, null, gAppRoot + theurl);
	            }
	    }


	    _popstate=0;
	
	    if (typeof openIniFrame !== 'undefined' && openIniFrame === true) {
	        chview.html('<iframe src="' + url + '" width="100%" height="' + channelHeight + 'px" border=0 frameborder=0></iframe>');
	    } else {
	        $.ajax({
	            method: 'GET',
	            url: url, 
	        }).done(function(data, textStatus) {
	            var pageTitle;
	            //$("#progressbar").animate({width:"100%"},300,function(){
	            data = checkhttps(data);
	            chview.html(data);
	            $('.channeltitle').html(channel);
	
	            //频道页中的分页
	            if (chview.find('.pagination').length>0) {
	                $('.p_input').parent().hide();
	                current_Page=chview.find('.pagination span').html();
	                current_Page=parseInt(current_Page, 10);
	                chview.find('.pagination a').each(function() {
	                    it = $(this);
	                    pageurl = '/index.php/ft' + it.attr('href') + '&i=2';
	                    pageTitle = it.attr('href') || '';
	                    pageTitle = pageTitle.replace(/^.*\/tag\//g,"").replace(/\?.*$/g,"");
	                    pageTitle = decodeURIComponent(pageTitle);
	                    it.removeAttr('href').addClass('channel').attr('url', pageurl).attr('title',pageTitle);
	                    if (it.html()=="余下全文" || it.html()==">>" || it.html()=="<<") {
	                        it.remove();
	                    }
	                    h=it.html();
	                    h=parseInt(h, 10);
	                    if (current_Page>0 && h>0) {
	                        it.remove();
	                    }
	                });
	            }
	
	            //点击story阅读全文
	            chview.find('.story').click(function() {
	                storyid = $(this).attr('storyid');
	                readstory(storyid);
	            });
	            adclick();
	            chview.find('.navigation .channel').each(function() {
	                it = $(this);
	                if (it.html() == channel) {it.addClass('on');}
	            });
	            chview.find('.channel').bind('click',function(){
	                var p=$(this).attr("title") || $(this).html() || "FT中文网";
	                showchannel($(this).attr('url'), p, ($(this).hasClass('require-log-in') == true) ? 1 : 0);
	            });
	            //startslides();
	
	            //记录频道页面PV
	            pvurl=url;
	            if (url.indexOf("myftread")>0) {pvurl=url.replace(/\&/g,"|");}
	            httpspv(gDeviceType + '/channelpage'+ pvurl);
	            //记录文章被阅读
	            recordAction('/phone/channelpage'+ pvurl);
	
	            chview.find('.storytop').prepend('<div class=channelleft><div class=channelback><span class=backarrow></span><span class=backto>返回首页</span></div></div>');
	            if (hist.length > 1) {
	                $('#channelview .backto').html('后退');
	            } else {
	                $('#channelview .backto').html('返回首页');
	            }
	            $('.channelback').unbind().bind('click',function() {histback();});
	            //显示视频或互动的评论
	            $("#slideShow #common-comment-container").remove();
	            if ($('#commoncomments').length == 1 && window.topic_object_id != undefined) {
	                loadcomment(window.topic_object_id, 'commoncomments', 'common');
	            }
	            //处理外部和内部链接
	            handlelinks();
	            //处理频道页的滑动
	            addChannelScroller();
	            //如果频道页有Navigation
	            navScroller($("#channelview"));
	            checkLogin();
	        }).fail(function(){
	            chview.html('<div id="head"><div class="header"><div class="channeltitle">'+ channel + '</div></div></div><div class="loader-container"><div class="highlight">获取内容失败！</div></div><div class="standalonebutton"><button class="ui-light-btn" id="reload-channel">重试</button></div>');
	            $('#reload-channel').unbind().bind('click', function(){
	                showchannel(originalUrl, channel, requireLogin, openIniFrame, channelDescription);
	            });
	        });
	    }
	    url=url.replace(/\?.*$/,'');
	    updateShare(url, url, '', '', channel, channel, gIconImage, channelDetail, channel+ ' ' +url);
	    pauseallvideo();
		removeBrokenIMG();
	}
### 依赖关系
- 功能定位：复杂的宏观作用大函数
- 依赖传入参数：url,channel,requireLogin,openIniframe,channelDescription
- 依赖全局变量：
- 依赖函数；
	- turnonOverlay
	- closeOverlay
	- getURLParameter
	- historyAPI
	- 
	- ---自己调用自己，递归？？
	- httpspv
	- recordAction
	- handlelinks
	- addChannelScroller
	- navScroller
	- checkLogin
	- updateShare
	- pauseallvideo
	- removeBrokenIMG

## 29.函数closeOverlay()
***宏观作用待总结成一句话***

	function closeOverlay() {
	    pauseallvideo();//暂停页面中所有的video元素。（函数pauseallvideo详见30.）

	    $(".overlay").removeClass("on");//移除样式包含"overlay"的元素的样式"on".class为overlay的是各种弹窗，在index.html中有好多个。

	    $("button.open").removeClass("open");//移除button元素中的open样式

	    if (noFixedPosition==1) {//如果没有position为fixed的元素？？？
	        window.scrollTo(0, scrollOverlay);
	        scrollOverlay=0;
	    }
	    $("#videoContent").empty();//删除$("#videoContent")下所有的子节点
	}
### 说明
- jQuery文档处理方法empty():删除匹配的元素的所有子节点

## 30.函数pauseallvideo()
暂停页面中的所有video元素。

	function pauseallvideo() {
		$("video").each(function(){this.pause();});
	}

## 31.函数backhome()
该函数总体作用就是回到首页，即点击绑定了backhome()函数的元素，就会回到首页。
***具体细节待研究***

	function backhome() {
	    closeOverlay();
	    gTagData = [];
		document.body.className = 'fullbody';
	    gNowView = 'fullbody';
	    $("#navList li").removeClass("on");
	    $("#navList li.homesvg").addClass("on");
	    if (useFTScroller===0) {setTimeout(function() {window.scrollTo(0, scrollHeight);},10);}
	    hist = [];
	    setTimeout(function() {
	        addHomeScroller();
	        navScroller($("#fullbody"));
	        $('#channelContent').empty();
	    },10);
	    //记录首页PV
	    httpspv(gDeviceType + '/homepage');
	    recordAction('/phone/homepage');
	    // check if its already present
	    if (historyAPI()==true) {
	        window.history.replaceState(null, null, gAppRoot + "#/home");
	    }
	    _popstate=0;
	    document.getElementById('header-title').innerHTML = '';
	}