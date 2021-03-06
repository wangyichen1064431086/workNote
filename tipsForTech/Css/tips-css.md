## 1. 滚动效果设置
直接设置：overflow-y：scroll

overflow-y|overflow-x|overflow: 如果内容溢出了元素内容区域，是否对内容的上/下|左/右边缘进行裁剪。

可取值|说明
-----|----
visible|不裁剪内容，可能会显示在内容框之外。
hidden|	裁剪内容 - 不提供滚动机制。
scroll|裁剪内容 - 提供滚动机制。
auto|如果溢出框，则应该提供滚动机制。
no-display|如果内容不适合内容框，则删除整个框。
no-content|如果内容不适合内容框，则隐藏整个内容。

## 2.关于height:100%

如果要height:100%生效，他的所有parents都要设置为height:100%而不能为min-height：100%。

## 3.关于 -webkit-overflow-scrolling
-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果.

###### 取值：

- auto:使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。
- touch:使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。

###### 浏览器兼容性

移动版 Safari  iOS 5.0+


## 4.一种上面几个元素高度固定最后一个元素高度自适应的页面布局

思路为：

- 上面几个子元素高度采用绝对高度

- 最后一个子元素高度为100%,然后给上padding-top的值为上面几个子元素高度之和

*** 该收获点待整理成博客 ***整理时参考workLog-2016-9.md的 0918日志，整理时需举例




## 5. 移动端表单点击后页面内容放大问题

解决办法：

 添加meta:

	name = "viewport"    content = "user-scalable=no"

 eg:

	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">



## 6.display:none和visibility:hidden的区别。
##### visibility:none
元素所占据的位置和大小不变，只是变成空了。

##### display:none
元素所占据的位置和大小都不存在了。下面的元素自动回升上去。


## 7.input右侧加上一个固定宽度元素的自适应布局方式：
##### （1）
- 为input外部套一个父元素，父元素有一个固定的padding-right,该值即为input右侧固定元素宽度值。父元素的position设为relative。
- 为input的width设为100%。
- 右侧固定宽度元素宽度的position为absolute。其right设为0

##### (2)
- 将input和右侧固定宽度元素放在一个共同的父元素内。
- 父元素display设为table
- input和右侧固定元素display设为table-cell
- input宽度设为100%
- 右侧固定宽度元素宽度设为1%（这样右侧固定宽度元素会是一个固定值）

##### (3)使用最新css属性：

calc

更多参考<http://blog.csdn.net/hbiao68/article/details/52683134>


## 8. history对象新添方法pushState()/replaceState()
HTML5引入了history.pushState()和history.replaceState()这两个方法，他们允许添加和修改history实体。这些方法会和window.onpopstate事件一起工作。

pushState 用于向 history 添加当前页面的记录，而 replaceState 和 pushState 的用法完全一样，唯一的区别就是它用于修改当前页面在 history 中的记录。


##### pushState方法
###### 参数
pushState()有三个参数：一个状态对象、一个标题（现在会被忽略），一个可选的URL地址。下面来单独考察这三个参数的细节：

- **状态对象（state object)** — 一个JavaScript对象，与用pushState()方法创建的新历史记录条目关联。无论何时用户导航到新创建的状态，popstate事件都会被触发，并且事件对象的state属性都包含历史记录条目的状态对象的拷贝。

	任何可序列化的对象都可以被当做状态对象。因为FireFox浏览器会把状态对象保存到用户的硬盘，这样它们就能在用户重启浏览器之后被还原，我们强行限制状态对象的大小为640k。如果你向pushState()方法传递了一个超过该限额的状态对象，该方法会抛出异常。如果你需要存储很大的数据，建议使用sessionStorage或localStorage。

- **标题（title）** — FireFox浏览器目前会忽略该参数，虽然以后可能会用上。考虑到未来可能会对该方法进行修改，传一个空字符串会比较安全。或者，你也可以传入一个简短的标题，标明将要进入的状态。

- **地址（URL）** — 新的历史记录条目的地址。浏览器不会在调用pushState()方法后加载该地址，但之后，可能会试图加载，例如用户重启浏览器。新的URL不一定是绝对路径；如果是相对路径，它将以当前URL为基准；传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。该参数是可选的；不指定的话则为文档当前URL。

###### 使用案例
假设 http://mozilla.org/foo.html 将执行如下JavaScript代码：

	var stateObj = { foo: "bar" };
	history.pushState(stateObj, "page 2", "bar.html");

这将让浏览器的地址栏显示http://mozilla.org/bar.html，但不会加载bar.html页面也不会检查bar.html是否存在。

然后导航到其他页面后点击回退按钮的回退顺序是： 其他页面→
（点击回退按钮）→
bar.html→
（点击回退按钮）→
foo.html

假设现在用户导航到了http://google.com，然后点击了后退按钮，此时，地址栏将会显示http://mozilla.org/bar.html，并且页面会触发popstate事件，该事件中的状态对象（state object）包含stateObj的一个拷贝。该页面看起来像foo.html，尽管页面内容可能在popstate事件中被修改。

如果我们再次点击后退按钮，URL将变回http://mozilla.org/foo.html，文档将触发另一个popstate事件，这次的状态对象为null。回退同样不会改变文档内容。

详见<http://www.cnblogs.com/xcsn/p/4517581.html><https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method>

##### replaceState()方法

history.replaceState()操作类似于history.pushState()，不同之处在于replaceState()方法会修改当前历史记录条目而并非创建新的条目。

##### window.onpopstate事件
详见<https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onpopstate>

每当处于激活状态的历史记录条目发生变化时,popstate事件就会在对应window对象上触发. 如果当前处于激活状态的历史记录条目是由history.pushState()方法创建,或者由history.replaceState()方法修改过的, 则popstate事件对象的state属性包含了这个历史记录条目的state对象的一个拷贝.

调用history.pushState()或者history.replaceState()不会触发popstate事件. **popstate事件只会在浏览器某些行为下触发, 比如点击后退按钮(或者在JavaScript中调用history.back()方法)**.

###### Example
假如当前网页地址为http://example.com/example.html,则运行下述代码后:
	
	window.onpopstate = function(event) {
	  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	};
	//绑定事件处理函数. 
	history.pushState({page: 1}, "title 1", "?page=1");    //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
	history.pushState({page: 2}, "title 2", "?page=2");    //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
	history.replaceState({page: 3}, "title 3", "?page=3"); //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
	history.back(); // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
	history.back(); // 弹出 "location: http://example.com/example.html, state: null
	history.go(2);  // 弹出 "location: http://example.com/example.html?page=3, state: {"page":

即便进入了那些非pushState和replaceState方法作用过的(比如http://example.com/example.html)没有state对象关联的那些网页, popstate事件也仍然会被触发.

## 9.未经声明的变量在严格模式下会报reference错误
直接在Chrome等下不声明变量就会报错。

解决方法放在

	try{
		...
	}catch(e){
		console.log("There is no XX")
	}


## 10. 查看兼容性网站

<http://jscc.info/>

<http://caniuse.com/#search=onpopstate>

## 11.Simulating Named Parameters in JavaScript(模仿命名参数）

和其他语言不同，JS对于命名参数没有原生支持。但是有一个相当优雅的模拟：每个实参都是一个对象字面量的属性，该对象字面量会作为一个单一的正式的参数传递给别调用函数。

使用该技术时，你可以像这样调用selectEntris函数：

	selectEntries({start:3, end:20, step:2});

这个函数接收一个带有属性start,end,step的对象。你可以省略其中任意属性：

	selectEntries({ step: 2 });
	selectEntries({ end: 20, start: 3 });
	selectEntries();


在ES5中，你得这样定义selectEntries():

	function selectEntries(options) {
	    options = options || {};
	    var start = options.start || 0;
	    var end = options.end || -1;
	    var step = options.step || 1;
	    ···
	}

在ES6中，你可以使用destructing（解构赋值）来定义，像这样：

	function selectEntries({ start=0, end=-1, step=1 }) {
	    ···
	}

但是如果你不带任何参数调用selectEntries()，这个解构赋值就失败了，因为你不能用undefinded来给object赋值。 这个问题可以通过默认值来修复。在下面的code中，如果调用时不带参数的话，这个object会获取{}
	
	function selectEntries({start=0,end=-1,step=1}={}){
	 ...
	}

你也可以将positional parameters和named parameters一起使用。

	someFunc(posArg1, { namedArg1:7, name2Arg2:true } )


## 12.增强的模块模式写法 --- On 1207
使用闭包，然后得到的对象拥有**私有变量**（外界访问不到的）和**特权方法**（开发给外界的）。

##### 理论参考
《JavaScript高级程序设计》P189-192： 模块模式，增强的模块模式

##### 实战应用
E:\FT\next-signup

模块模式创建对象的方法在client/js/set-default.js写的setDefault模块。

该方法的调用实例在client/js/input-validator.js的class InputValidator中，这里的第7行使用setDefault(setting).to({})。


## 13.全局gulp#4.0下可以运行gulp3.9的函数。--- On 1207

## 14.开服务器本地测试时可能会受浏览器缓存文件的影响。--- On 1207

## 15. fetch
### 概念和用法
Fetch 提供了对 Request 和 Response （以及其他与网络请求有关的）对象通用的定义。发送请求或者获取资源，需要使用 GlobalFetch.fetch 方法。

fetch() 必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 promise 对象，resolve 对应请求的 Response。你也可以传一个可选的第二个参数—— init（参考 Request）。

一旦 Response 被返回，就有一些方法可以使用了，比如定义内容或者处理方法（参考 Body）。

你也可以通过 Request() 和 Response() 的构造函数直接创建请求和响应，但是我们不建议这么做。


### 1. GlobalFetch.fetch()
GlobalFetch 的 fetch() 方法用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 Response 对象。

当遇到网络错误时，fetch() 返回的 promise 会被 reject，并传回 TypeError，虽然这也可能因为权限或其它问题导致。成功的 fetch() 检查不仅要包括 promise 被 resolve，还要包括 Response.ok 属性为 true。HTTP 404 状态并不被认为是网络错误。

#### 语法：

	fetch(input,init).then(function(response){...});

##### 参数
###### input:
定义要获取的资源，可能是：
- 一个USV字符串，包含要获取资源的URL
- 一个Request对象
###### init(可选）：
一个配置项对象，包括对所有请求的设置。可选参数有：
- method: 请求使用的方法，如 GET、POST。
- headers: 请求的头信息，形式为 Headers 对象或 ByteString。
- body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
- mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
- credentials: 请求的 credentials，如 omit、same-origin 或者 include。
- cache:  请求的 cache 模式: default, no-store, reload, no-cache, force-cache, or only-if-cached.

##### 返回值
一个Promise,resolve时回传Response对象。

#### 示例1

	var myImage = document.querySelector('img');
	
	var myRequest = new Request('flowers.jpg');
	
	fetch(myRequest).then(function(response) {
	  return response.blob();
	}).then(function(response) {
	  var objectURL = URL.createObjectURL(response);
	  myImage.src = objectURL;
	});

#### 示例2

	var myImage = document.querySelector('img');

	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'image/jpeg');
	
	var myInit = { method: 'GET',
	               headers: myHeaders,
	               mode: 'cors',
	               cache: 'default' };
	
	var myRequest = new Request('flowers.jpg');
	
	fetch(myRequest,myInit).then(function(response) {
	  ... 
	});

### 2. Response对象
<https://developer.mozilla.org/zh-CN/docs/Web/API/Responsee>

Fetch API 的Response接口呈现了对一次请求的响应数据

你可以使用Response.Response() 构造函数来创建一个Response对象，但一般更可能遇到的情况是，其他的API操作返回了一个Response对象，例如一个service worker 的Fetchevent.respondWith，或者一个简单的 GlobalFetch.fetch()

#### 语法
##### 构造函数
	
	Response.Response()

创建一个新的Response对象


##### 属性：
- Response.type(只读）：包含Response的类型 (例如, basic, cors).
- Response.url(只读）：包含Response的URL
- Response.status(只读）：包含Response的状态码 (例如, 200 成功).
- Response.ok(只读）：包含了一个布尔值来标示该Response成功(状态码200-299) 还是失败.
- Response.statusText:包含了与该Response状态码一致的状态信息 (例如, OK对应200).

#####方法：
- Body.blob()：读取 Response对象并且将它设置为已读（因为Responses对象被设置为了 stream 的方式，所以它们只能被读取一次） ,并返回一个被解析为Blob格式的promise对象
- Body.json()：读取 Response对象并且将它设置为已读（因为Responses对象被设置为了 stream 的方式，所以它们只能被读取一次） ,并返回一个被解析为JSON格式的promise对象
- Body.text()：读取 Response对象并且将它设置为已读（因为Responses对象被设置为了 stream 的方式，所以它们只能被读取一次） ,并返回一个被解析为USVString格式的promise对象

## 16.margin的折叠
同级和包含级的两个元素margin会折叠，取最大的margin值

而padding不会折叠

## 17.关于margin:xx auto的居中方法的使用

### 1. max-width设置后只能用该方法
设置max-width后，设置text-align:center,无法居中。

应该在设置max-width后，使用margin:xx auto来居中。

Example:

	.word {
		margin:0 auto;
		width:100%;
		max-width:600px;
	}

### 2.该方法只能针对display:block元素
像img这种行内元素是不行的，想要生效，必须设置img的display:block

## 18.关于width:100%
一般的元素，如header,article,p,div都是content-box.

故width:100%，设置之后是内容部分达到父元素宽度100%,那么padding和margin部分将会溢出。

正确的办法是不要设置width:100%