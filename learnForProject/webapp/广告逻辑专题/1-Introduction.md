## 1. 在主html文件webapp/app/index.html中：


### 1.1 存在若干空的广告位div,eg:

(1) line168：

```
<div class="adiframe banner" type="fullwidth" frame="100%"></div>

```

(2) line192
```
<div class="adiframe banner" type="50" frame="banner-bottom-story"></div>
```

(3) line241
```
<div class="adiframe halfpage" type="600" frame="ad300x600"></div>   
```

(4)line260
```
<!--ad iframe view start-->
<div id=adview>
<div><iframe id=adiframe></iframe></div>
</div>
```


### 1.2 导入app/scripts/trackadview.js和app/scripts/main.js

line 873
```
<script type="text/javascript" src="scripts/trackadview.js"></script>
 ...
<script type="text/javascript" src="scripts/main.js"></script>
```

## 2.在main.js中定义了函数httpspv
### 2.1 函数httpspv中调用了函数updateAds();

函数updateAds()来自trackadview.js。

### 2.2 函数loadHomePage中通过ajax请求了gStartPageTemplate，
- 其在本地为'api/homecontent.html'；
- 在线上为'/index.php/ft/channel/phonetemplate.html?channel='+homeFileName+fullScreenAdPara+'&screentype=wide&'；然后线上还引用了frontend/tpl/phone/nexthome.html


## 3. trackadview.js中定义了函数updateAds
在其中对某些条件下的iframe 进行了处理：
```
  $(this).html('<iframe id = "fullbody0" src = "/phone/ad.html?isad=0&v=1142#adtype=ad300&adid=fullbody0" frameborder=0  marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width="300" height="100%">');
 ```
 即交给phone/ad.html处理。

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

