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
/* w.innerHeight:667
 * e.clientHeight:667
 * g.clientHeight:9099
*/
var gAdImpressionExpose = 0.5;
var gScrollerHeight = windowHeight - gBottomBarHeight;//667-45=622


// MARK: - 刷新广告位
function updateAds() {
    /*
     * 依赖:
     *      - 全局变量gSpecial,定义于main.js
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
            currentViewPortAds = $('#'+nowV).find('.adiframe');//将当前view下的广告位div元素存储到currentViewPortAds中,在fullbody下有7个adiframe的div:
            /** 
             <div class="adiframe banner loaded-in-view" type="50" frame="ad300" id="ad-fullbody0" data-adid="20220101" style="width: 100%; height: 94px;">
             </div>
             <div class="adiframe banner loaded-in-view" type="50" frame="banner-paid-post-home" style="padding-bottom: 50%; box-sizing: border-box; display: none; width: 100%; height: 188px;" id="ad-fullbody1" data-adid="20220121">
             </div>
             <div class="adiframe mpu-phone for-phone" type="250" frame="ad300x250-home" id="ad-fullbody2" data-adid="20220003" style="height: 250px;">
             </div>
             <div class="adiframe banner" type="50" frame="banner-bottom-home" id="ad-fullbody3" data-adid="20220114" style="width: 100%; height: 94px;">
             </div>
             <div class="adiframe mpu loaded-in-view" type="250" frame="ad300x250">
             </div>
             <div class="adiframe mpu loaded-in-view" type="250" frame="ad300x250-2">
             </div>
             <div class="adiframe hidden loaded-in-view" type="0" adwidth="0" frame="fullScreen" id="ad-fullbody6" data-adid="20220107">
             </div>
            */
        }
        nowV = nowV.replace(/\-/g, '');
        currentViewPortAds.each(function(index) {

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
            forPhone = ($(this).hasClass("for-phone") === true) ? true : false;//fullbody中的adiframe的div只有第三个含有class"for-phone"
            
            if ((adHeight === 'fullwidth' && screenWidth<=490) || (adHeight>90 && screenWidth>=700 && forPhone===false) || (adHeight<90 && screenWidth<700) || (adHeight === 90 && (screenWidth===768 || screenWidth===1024)) || (forPhone === true && screenWidth<700) || adHeight ===0) {
                //QUEST:这个条件是干嘛？控制不同的设备大小吗？

                if ($(this).find("iframe").length>0) {
                    //MARK:如果当前 样式含adiframe的div 已经有后代元素iframe

                    FrameID = $(this).find("iframe").eq(0).attr("id");//取出当前样式含adiframe的div的第一个后代元素iframe的id值
                    document.getElementById(FrameID).contentDocument.location.reload(true);
                    /*
                     * HTMLIFrameElement.contentDocument 返回一个 Document，该内联frame嵌套的浏览上下文中活跃的document对象。
                     * Location.reload(true):重新加载来自当前 URL的资源。参数为true表明该方法引发的刷新一定会从服务器上加载数据。如果是 false或没有制定这个参数，浏览器可能从缓存当中加载页面。
                    */
                } else {
                    //MARK:如果当前 样式含adiframe的div 没有后代元素iframe,则用$(this).html()写入iframe

                    if (useFTScroller===1 || nowV === 'story-column-flow') {//如果使用了FTScroller或当前view为'story-column-flow'
                     //QUEST:'story-column-flow'是啥view??
                        adOverlay = '<a target=_blank class="ad-overlay"></a>';
                    }

                    $(this).html('<iframe id="' + nowV + index + '" src="/phone/ad.html?isad=0&v=' + _currentVersion + '#adtype=' + adFrame + '&adid=' + nowV + index + '" frameborder=0  marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width="'+adwidth+'" height="100%"></iframe>' + adOverlay);
                    /* 以fullbody的第一个为例：
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



