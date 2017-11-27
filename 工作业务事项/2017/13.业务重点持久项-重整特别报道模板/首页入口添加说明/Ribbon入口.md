### 代码位置
NEXT\app\templates\partials\HomeRightRail.html的第58行左右：

```
		<%if in_array(date("Ymd"),explode(",",$ad.Ribbon)) && $smarty.get.ad != "no" && $noAd != "true"%>
		<iframe id="ribbon" class="ad-hidden hide" width="100%" height="60" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="/m/marketing/a.html#adid=100010000501&slot=986723212&pid=ribbon"></iframe><%*<!--旧的adid是10000009-->*%>
		<%/if%>
```

### cms设置排期（广告部负责）
Marketing and AD -> Fullpage AD -> Ribbon

填写投放的日期即可

### 广告部传漾投放创意（广告部负责）
它的广告码是固定的100010000501