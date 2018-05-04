<https://github.com/koajs/static>

用于serve静态文件的koa middleware

语法：
```
app.use(require('koa-static')(root,opts));


 @param root:root directory,nothing above this root can be served

 @param opt:options object
  opt={
			maxage:浏览器缓存的最大时间，ms为单位,
			hidden:是否允许隐藏文件的传输，默认为false,
			index:默认的文件名称，默认为'index.html'

		}

```

用法示例：
```
	const koa = require('koa');
	const app = koa();

	const serve = require('koa-static');

	app.use(serve('public',{
		index:false
	}));
```