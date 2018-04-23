Koa应用是一个**包含中间件generator方法数组的对象**。

当请求到来时，这些方法会以**stack-like**的顺序执行。

Koa的一大设计理念：通过其他底层中间件提供高级语法糖。

这些常见功能都由中间件来实现:
- 内容协商(content-negotation)
- 缓存控制(cache freshness)
- 反向代理(proxy support)

> ***Tips*** 反向代理（Reverse Proxy）方式是指以**代理服务器**来**接受internet上的连接请求**，然后将请求**转发给内部网络上的服务器**，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。