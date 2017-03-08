## Learned:

### 1.
一开始的项目文件中必须有.babelrc，否则gulp命令无法执行。

### 2. 苹果图标apple-touch-icon-precomposed和apple-touch-icon

用法：

			<link rel="apple-touch-icon-precomposed" href="https://s.fting.net/img/ipad_icon.png"/>

苹果safari浏览器定义的这两种属性是为了苹果移动设备（ipod、ipad、iphone）对移动网站-mobile web进行收藏（“添加到桌面图标”）的时候增加的图标定义属性，当你建立一个移动网站（俗称：手机站，mobile web），避免不了为移动站的图标进行设置。

- 使用apple-touch-icon属性为“增加高光光亮的图标”；
- 使用apple-touch-icon-precomposed属性为“设计原图图标”；

苹果的文档<https://developer.apple.com/safari/resources/#documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html>

### 3.window.applicationCache
是window对象本身的属性。返回关于应用程序缓存的对象。

<https://developer.mozilla.org/en-US/docs/Web/API/Window/applicationCache>

### 4.try...catch对于异步编程不一定适用
调用async方法后，callback被存放起来，直到下一个事件循环才会取出来执行。尝试对异步方法进行try...catch操作只能捕获档次事件循环内的异常，对callback执行时抛出的异常将无能为力。

详见《深入浅出Node.js》P71

### 5.eval(string)方法
将字符串参数按照JavaScript代码执行。

#### 用法eg:

	eval(new String("2 + 2")); // returns a String object containing "2 + 2"
	eval("2 + 2");             // returns 4


### 6.history对象新添方法pushState()/replaceState()
HTML5引入了history.pushState()和history.replaceState()这两个方法，他们允许添加和修改history实体。同时，这些方法会和window.onpostate事件一起工作。

pushState 用于向 history 添加当前页面的记录，而 replaceState 和 pushState 的用法完全一样，唯一的区别就是它用于修改当前页面在 history 中的记录。

eg:
		var stateObj = { foo: "bar" };
		history.pushState(stateObj, "page 2", "bar.html");

这会使得URL栏显示http://mozilla.org/bar.html，但浏览器不会加载这个bar文件，也不会检查这个文件是否存在。

参数：pushState(stateObj,title,URL)：state对象，标题(现在是被忽略，未作处理)，URL(可选）

详见<http://www.cnblogs.com/xcsn/p/4517581.html><https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method>

## Queries:
### 1. 在index.html中，为什么内嵌的script要放在 \</body\>和\</html\>之间？
好奇怪的写法。。

## To be studied
### 1. 邮箱相关信息的href编写方法待研究

### 2. ga需要专门来研究，从ga文档开始看起

### 3. window.applicationCache的用法
对照webapp-wyc\app\phone\inner.js中处理缓存的try...catch