## 1. 在主html文件webapp/app/index.html中：


### 1.1 存在若干空的广告位div,eg:

#### (1) line169：

```
<div class="adiframe banner" type="fullwidth" frame="100%"></div>

```
***这个frame是个自定义属性吧？？？***

#### (2) line193
```
<div class="adiframe banner" type="50" frame="banner-bottom-story"></div>
```

#### (3) line243
```
<div class="adiframe halfpage" type="600" frame="ad300x600"></div>   
```

#### (4)line260
```
<!--ad iframe view start-->
<div id=adview>
<div><iframe id=adiframe></iframe></div>
</div>
```


### 1.2 导入app/scripts/trackadview.js和app/scripts/main.js

#### line 875
```
<script type="text/javascript" src="scripts/trackadview.js"></script>
 ...
<script type="text/javascript" src="scripts/main.js"></script>
```

## 2.在main.js中：
### 2.1 调用了函数httpspv中，其中调用了函数updateAds();

#### (1) line373行
调用函数httpspv

```
    //Window Oriention Change event
    try {
    window.addEventListener("orientationchange", function() {
        httpspv(gDeviceType + '/rotate');
    }, false);
    }catch(ignore){

    }
```

#### (2) line2963行：
定义的函数httpspv（作用概括：流量追踪）中调用了函数updateAds:
```
function httpspv(theurl) {
    ...
    updateAds();
    ...
}
```

***函数updateAds()来自trackadview.js，详见3.***。

### 2.2 函数loadHomePage中通过ajax请求了gStartPageTemplate，
#### (1)line252、line255、line282、line1721、line3861
这几个地方是在不同情况下调用了函数loadHomePage：
```
  loadHomePage(theday);
```

#### (2)line1530
定义函数loadHomepage，其中进行了Ajax请求：请求gStartPageTemplate模板
```
    $.ajax({
        // url with events and date
        url: gStartPageTemplate + themi + dateStamp,
        success: function(data) {
            ...
```

#### (3)line68、line113
定义gStartPageTemplate.

line68:定义线上状态下宽屏和正常屏的gStartPageTemplate

```
    if (screenWidth >= 700) {
        gStartPageTemplate = '/index.php/ft/channel/phonetemplate.html?channel='+homeFileName+fullScreenAdPara+'&screentype=wide&';
    } else {
        gStartPageTemplate = '/index.php/ft/channel/phonetemplate.html?channel='+homeFileName+fullScreenAdPara+'&';
    }
```

line113:定义本地测试状态下的宽屏和正常屏的gStartPageTemplate

```
    if (screenWidth >= 700) {
        gStartPageTemplate = 'api/homecontentwide.html?';
    } else {
        gStartPageTemplate = 'api/homecontent.html?';
    }
```

可总结为：

- 其在本地为'api/homecontent.html'；
- 在线上为'/index.php/ft/channel/phonetemplate.html?channel='+homeFileName+fullScreenAdPara+'&screentype=wide&'；然后线上还引用了frontend/tpl/phone/nexthome.html


## 3. 在trackadview.js中：
#### （1）line116
定义了函数updateAds,详细注释见说明文件***《2-trackadview.js》***

函数updateAds：在所有广告位以iframe的方式插入（还没有iframe元素）或更新（已经有了iframe元素）广告素材。

在其中对某些条件下的iframe 进行了处理：
```
  $(this).html('<iframe id = "fullbody0" src = "/phone/ad.html?isad=0&v=1142#adtype=ad300&adid=fullbody0" frameborder=0  marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width="300" height="100%">');
```
 即交给phone/ad.html处理。这个详见***《3-ad.html》***

## 4.frontend/tpl/phone/nexthome.html
有一段关于广告的代码：
  ```
  window.gSpecialAnchors = [];

  //MARK:取出页面中的带有specialanchor的class的div(这几个div高度为0，放在移动端DOM的最下方），根据这些di的属性adid、tag、title，得到gSpecialAnchors每一项的值。
  if ($(".specialanchor").length>0) {
      $('.specialanchor').each(function(){
          var adId = $(this).attr('adid') || '';
          var sTag = $(this).attr('tag') || '';
          var sTitle = $(this).attr('title') || '';
          var channelInfo = $(this).attr('channel') || '';
          if (adId !== '') {
              gSpecialAnchors.push({
                  "tag": sTag,
                  "title": sTitle,
                  "adid": adId,
                  "channel": channelInfo
              });
          }
      });
  }
</script>
```
## 5.phone/ad.html
这个详见***《3-ad.html》***

其中有向传漾服务器请求一段代码，见《3-ad.html》的line299:

```
    var dolphineInlineScript = ...<script src = 'http://dolphin.ftimg.net/s?z=ft&c=.....'></script>
```
其实就是去传漾的系统里面根据src的参数找到相应的代码模板片段（对于每个广告位，都会请求到一段来自传漾的对应广告的script代码片段）。该script片段负责:
1. 导入广告img、长、宽等关于广告内容信息的数据（在该片段模板中以变量形式存在，然后需要销售手动输入）
2. 向传漾服务器发送图像ping以统计广告被看到的次数（在该片段模板中以公共部分的形式存在）。
