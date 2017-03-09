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
函数httpspv中调用了函数updateAds();

函数updateAds()来自trackadview.js。

## 3. trackadview.js中定义了函数updateAds
在其中对某些条件下的iframe 进行了处理：
```
  $(this).html('<iframe id = "fullbody0" src = "/phone/ad.html?isad=0&v=1142#adtype=ad300&adid=fullbody0" frameborder=0  marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width="300" height="100%">');
 ```
 即交给phone/ad.html处理。

 ## 4.phone/ad.html

