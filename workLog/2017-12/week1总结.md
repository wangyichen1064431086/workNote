## 本周完成

### 1. 基本完成网页性能优化
参见<http://redmine.ftimg.net/issues/1717>
#### 1. 优化a.html
1. 把a.html中的js都放到scripts里面
css保留，js变成外链。此处write广告的依然保留，后部调整广告大小等方法变成外链。

2. 把a.html做成本地预览和templates两个版本
NEXT/app/m/marketing/a.html作为templates版本，还有smarty代码和js外链。
NEXT/app根目录下添加一个a.html作为本地测试版。

#### 2. 优化ad.js
去掉冗余旧广告位相关代码

#### 3. 优化adPattern的加载
adPattern的话分为adPatternsPad,adPatternsPC, adPatternsPhone三个js文件，根据后端判断设备类型然后按需加载。

后端判断设备是运用了一个比较可靠的工具http://mobiledetect.net/，后端判断代码及方法在dev_www\libs\application\core/FT_Controller.php;前端按需加载逻辑在NEXT\app\templates\partials\loadAdDataByDevice.html,后端传递给前端的判断结果值为$DEVICE。

#### 4.优化adChannel的加载
对于正式环境，直接不加载adChannel.js,因为channel号都是直接计算出来的，各个top channel、sub channel对应的title才需要这个文件，而title只是在广告位的debug信息中需要显示，那么只有www7和本地测试需要该信息。


### 优化结果

优化后在pagespeed测试结果为：优化前——94分，首屏51.4 KiB的HTML；按需加载adPatten数据后——95分，首屏47.9 KiB的HTML；正式环境去掉对adChannel的加载后——95分，首屏45.8 KiB的HTML

### 后续优化频道计算，只在一个地方计算
参见<http://redmine.ftimg.net/issues/1748>

目前有太多地方都在计算adchannel的号： NEXT\app\templates\partials\head.html、NEXT\app\templates\html\manual.html、NEXT\app\scripts\ad.js等等，而牵扯到的变量名又多又混乱：adchID、adchIDNew、adchannelID、adch、FTadchannelID。。。。没有必要搞这么多这么乱

优化清楚了，我也好在安卓端添加相关逻辑。

### 2. 完成上海地产新页面
http://cn.ft.com/m/marketing/estate_20171212.html

解决表单提交响应慢的问题——亚马逊加速问题

### 3.其他时间在学习React和阅读《你不知道的JavaScript》