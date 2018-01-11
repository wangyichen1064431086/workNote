## 相关博客
Using setTimeout to speed up window.onload: <https://mathiasbynens.be/notes/settimeout-onload>


## 认识Load & DOMContenLoaded 
### DOMContentLoaded
mdn:<https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded>

The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. A very different event load should be used only to detect a fully-loaded page. It is an incredibly popular mistake to use load where DOMContentLoaded would be much more appropriate, so be cautious.


当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。另一个不同的事件 load 应该仅用于检测一个完全加载的页面。 在使用 DOMContentLoaded 更加合适的情况下使用 load 是一个令人难以置信的流行的错误，所以要谨慎。

### load
mdn:<https://developer.mozilla.org/zh-CN/docs/Web/Events/load>

The load event is fired when a resource and its dependent resources have finished loading.
当一个资源及其依赖资源已完成加载时，将触发load事件。

## 异步脚本和延迟脚本与load和DOMContentLoaded的关系
### async
一定会在load事件之前执行，可能会在DOMContentLoaded之前或之后执行

### defer
按照h5规范，两个defer脚本会安装它们出现的先后顺序执行，两个脚本会在DOMContentLoaded之前执行。

但事实上，defer脚本不一定会按顺序执行，也不一定会在DOMContentLoaded之前执行。**疑问：在load之前还是之后执行呢？**

