### 1.fetch
<https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API>

GlobalFetch的fetch()方法用于发起获取资源的请求。

它返回一个**promise**,这个promise会在请求响应后被resolve,并传回Response对象。

当遇到网络错误时，fetch()返回的promise会被reject,并传回TypeError。

成功的fetch()检查不仅要包括promise被resolve,还要包括Response.ok属性为true.

#### 语法：

	fetch(input, init).then(function(response){...});

##### params:

###### (1） input

定义要获取的资源。这可能是：

- 一个 USVString 字符串，包含要获取资源的 URL。
- 一个 Request 对象。

###### (2) init(可选）

一个配置项对象，包括所有对请求的设置。可选的参数有：

- method: 请求使用的方法，如 GET、POST。
- headers: 请求的头信息，形式为 Headers 对象或 ByteString。
- body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。（也就是POST方法发送的信息）
- mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
- credentials: 请求的 credentials，如 omit、same-origin 或者 include。
- cache:  请求的 cache 模式: default, no-store, reload, no-cache, force-cache, or only-if-cached.

##### 返回值

一个 Promise，resolve 时回传 Response 对象。


#### 用法示例

	function postData(url, data) {
		return 	fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((response) => {
			console.log('Getting response from server');
			return response.json();
		});
	}


#### 补充说明：
- fetch最开始是浏览器的东西，然后通过node-fetch可以用到node端
- fetch在浏览器端的跨域规则是和Ajax一样的，所有的浏览器端的跨域请求能否实现是由其被请求的服务器决定的
- 在后端不涉及跨不跨域的问题， 在node端可以随便请求任何url.