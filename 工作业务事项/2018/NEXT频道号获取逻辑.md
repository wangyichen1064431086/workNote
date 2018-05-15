## 频道计算相关的文件只有两个:loadAdDataByDevice.html和ad.js：
### 1. NEXT\app\templates\partials\loadAdDataByDevice.html
这里由于主要是获取广告相关数据。故把从smarty到js的频道号传值设在这里：
```
  var adchID = '<%$adchannelID|default:$adchId%>';
```
**注意：**
smarty模板层面对页面设置的频道号都是设置$adchannelID

### 2.NEXT\app\scripts\ad.js
```
var adChannelId = getAdChannelId();
```
这里获取最终的adChannelId,其依赖于已经存在的adchID，并有很多细节上的调整。
**注意：**
广告最终依赖此处生成的adChannelId。如果想在js层面进一步修正adChannelId，修改此函数getAdChannelId()即可。

## 两个文件的引用顺序：
所有文件都要先引用loadAdDataByDevice.html，再引用key.js(包含ad.js)