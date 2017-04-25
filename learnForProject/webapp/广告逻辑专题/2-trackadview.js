//MARK:定义一些global variables
var gViewableAds = [];
var gCurrentScroller = '';
var gHeaderHeight = 44;//app首页导航条(即那个"首页""中国""全球"的导航条)高度，其为<ul class = "navigation">...</ul>
var gBottomBarHeight = 45;//app首页最下一个标签栏（即写着"每日英语""FT商学院"的tab）的高度，其id="contentRail"
var w = window;
var d = document;
var e = d.documentElement;
var g = d.getElementsByTagName('body')[0];
var windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;//667,屏幕高度
/* w.innerHeight:即window.innerHeight:667
 * e.clientHeight:即document.documentElement.clientHeight:667
 * g.clientHeight:即document.body.clientHeight:9099
*/
var gAdImpressionExpose = 0.5;
var gScrollerHeight = windowHeight - gBottomBarHeight;//可滚动区域的高度：667-45=622


// MARK: - 刷新广告位
function updateAds() {
    /*
     * 依赖:
     *      - 全局变量gSpecial,声明于main.js，这里只用到了gSpecial已经声明好了这个特点，gSpecial会在这里根据不同条件进行重新赋值。
     *      - 函数isOnline，定义于main.js,判断是否连网，可能值为"no"或"possible"
     *      - 全局变量_currentVersion，定义于main.js，为1142
     * 
    */
    var nowV = $("body").attr("class") || "";//可能为"fullbody"、"channelview"、"storyview"
    var isColumnFlow = false;
    var currentViewPortAds;//MARK:存储所有的广告位div
    if (nowV !== "storyview") {
        // MARK:如果当前不为"storyview"，设置gSpecial为false,
        gSpecial = false;
    }
 
    if (isOnline()=="possible") {//如果当前连网了       
        screenWidth = $(window).width();//375
        if (nowV === 'story-column-flow') {
            currentViewPortAds = $('#'+nowV).find('.cf-render-area .adiframe');
        } else {
            currentViewPortAds = $('#'+nowV).find('.adiframe');//将当前view下的广告位div元素存储到currentViewPortAds中,在fullbody下有5个adiframe的div:
            /** 
             * //顶部banner广告：
             <div class="adiframe banner loaded-in-view" type="50" frame="ad300" id="ad-fullbody0" data-adid="20220101" style="width: 100%; height: 94px;">
                <iframe id="fullbody0" src="/phone/ad.html?isad=0&amp;v=1172#adtype=ad300&amp;adid=fullbody0" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" width="100%" height="100%" style="width: 100%;">
                    #document
                </iframe>
             </div>
                /// 这里iframe的src链接到的就是广告材料，广告材料地址为 http://app003.ftmailbox.com/phone/ad.html?isad=0&v=1172#adtype=ad300&adid=fullbody0

             * //中间的mpu广告：
             <div class="adiframe mpu-phone for-phone" type="250" frame="ad300x250-home" id="ad-fullbody1" data-adid="20220003" style="height: 250px;">
                <iframe ...>
                    #document...
                </iframe>
             </div>

             * //底部的banner广告：
             <div class="adiframe banner" type="50" frame="banner-bottom-home" id="ad-fullbody2" data-adid="20220114" style="width: 100%; height: 94px;">
                <iframe ...>
                    #document...
                </iframe>
             </div>

             * //两个空的广告位
             <div class="adiframe mpu" type="250" frame="ad300x250" id="ad-fullbody3" data-adid="20210003" style="height: 250px;">
                <iframe ...>
                    空的
                </iframe>
             </div>

             * 
             <div class="adiframe mpu" type="250" frame="ad300x250-2" id="ad-fullbody4" data-adid="20210004" style="height: 250px;">
                <iframe ...>
                    空的
                </iframe>
            </div>
            */
            //QUEST:这些adiframe的div到底都写在哪里？看了android.html/index.html中似乎和在chrome模拟器中得到的不一样。。。。
        }
        nowV = nowV.replace(/\-/g, '');
        currentViewPortAds.each(function(index) {
            //分别处理这五个广告位，以上述currentViewPortsAds中的五个<div class = 'adiframe ...>的中的第1个为例：
            var adHeight=$(this).attr('type') || 0;//50
            var adFrame=$(this).attr('frame') || '';//"ad300"
            var adwidth=$(this).attr('adwidth') || '300';//'300'
            var FrameID;
            var adOverlay="";
            var forPhone;
            if (adHeight !== 'fullwidth' && adHeight !== '50') {
              adHeight = parseInt(adHeight,10);//300
            } else {
              adwidth = '100%';
            }
            forPhone = ($(this).hasClass("for-phone") === true) ? true : false;//五个.adiframe的div只有第儿个含有class"for-phone"
            
            if ((adHeight === 'fullwidth' && screenWidth<=490) || (adHeight>90 && screenWidth>=700 && forPhone===false) || (adHeight<90 && screenWidth<700) || (adHeight === 90 && (screenWidth===768 || screenWidth===1024)) || (forPhone === true && screenWidth<700) || adHeight ===0) {
                //QUEST:这个条件是干嘛？控制不同的设备大小吗？能否概括出这句话的作用？

                if ($(this).find("iframe").length>0) {
                    //MARK:如果当前样式含adiframe的div 已经有后代元素iframe，直接重新从这个iframe的src指向的服务器上的广告素材地址加载广告

                    FrameID = $(this).find("iframe").eq(0).attr("id");//取出当前样式含adiframe的div的第一个后代元素iframe的id值
                    document.getElementById(FrameID).contentDocument.location.reload(true);
                    /*
                     * HTMLIFrameElement.contentDocument 返回一个 Document，其为该内联frame嵌套的浏览上下文中活跃的document对象。
                     * Location.reload(true):重新加载来自当前 URL的资源。参数为true表明该方法引发的刷新一定会从服务器上加载数据。如果是 false或没有制定这个参数，浏览器可能从缓存当中加载页面。
                    */
                } else {
                    //MARK:如果当前样式含adiframe的div 没有后代元素iframe,则用$(this).html()写入iframe

                    if (useFTScroller===1 || nowV === 'story-column-flow') {//如果使用了FTScroller或当前view为'story-column-flow'
                     //QUEST:'story-column-flow'是啥view??
                        adOverlay = '<a target=_blank class="ad-overlay"></a>';
                    }

                    $(this).html('<iframe id="' + nowV + index + '" src="/phone/ad.html?isad=0&v=' + _currentVersion + '#adtype=' + adFrame + '&adid=' + nowV + index + '" frameborder=0  marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width="'+adwidth+'" height="100%"></iframe>' + adOverlay);
                    /* 以fullbody的第一个为例，得到：
                       <iframe id = "fullbody0" src = "/phone/ad.html?isad=0&v=1142#adtype=ad300&adid=fullbody0" frameborder=0  marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width="300" height="100%">
                       </iframe>
                       // MARK：转到/phone/ad.html来作为iframe的内容
                    */
                    //console.log ($(this).html());
                    $(this).attr("id","ad-" + nowV + index);//设置当前 样式含adiframe的div 的id = "ad-fullbody0"
                }
            }
            if (useFTScroller===1 || nowV === 'story-column-flow') {
                // MARK:如果使用了FTScroller或当前view为'story-column-flow'...
                // QUEST:不懂这一段是在处理什么情况。。。
                if ($(this).offset().top >= 0 && $(this).offset().top <= screenWidth) {
                    $(this).addClass("loaded-in-view");
                } else {
                    $(this).removeClass("loaded-in-view");
                }
            }
        });

      // MARK: - when ad position is updated, create the ad positions again. 
      createViewableAds();
    }
}


function createViewableAds() {
  // initiate the array for all viewable ad units
  gViewableAds = [];//存储5个广告位中的相关信息，每个广告位的信息为该数组的一项（Type Object)

  // make sure gNowView matches gCurrentScroller
  if (gNowView === 'fullbody') {
    gCurrentScroller = 'homeScroller';//id为gCurrentScroller的部分就是id为gNowView的直接子元素，基本上是整个可滚动区域
  } else if (gNowView === 'storyview') {
    gCurrentScroller = 'storyScroller';
      scrollEle(storyScroller, 'storyScroller');
      /**
       * 函数scrollEle定义于main.js，就是一个scrollTo的机制，具体是想实现什么先放着。QEUST：概括scrollEle是想实现什么
       */
  } else if (gNowView === 'channelview') {
    gCurrentScroller = 'channelScroller';
  }
  var viewablesCollection = document.getElementById(gCurrentScroller).querySelectorAll('.adiframe');//还是那五个广告位，应该和函数updateAd中的 $('#'+nowV).find('.adiframe')得到的结果一样。

  for (var adCount=0; adCount < viewablesCollection.length; adCount ++) {
    var currentViewableAd = {};//存储这5个广告位中当前广告位的相关信息
    currentViewableAd.top = viewablesCollection[adCount].offsetTop || '';//广告位距离顶端的距离
    currentViewableAd.height = viewablesCollection[adCount].offsetHeight || 0;//广告位的高度
    currentViewableAd.status = 'created';
    if (typeof currentViewableAd.top === 'number' && currentViewableAd.top >= 0) {
      currentViewableAd.id = 'ad-' + gNowView + adCount;//以fullbody的顶部banner为例，为'ad-fullbody-0'
      gViewableAds.push(currentViewableAd);
    }
  }
}
