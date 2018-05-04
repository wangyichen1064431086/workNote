<https://github.com/koajs/bodyparser>

A body parser for koa, base on co-body. support json, form and text type body.

## Usage
```
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');

var app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
});
```
> MyNote:正常来说，ctx.body是等同于response.body的，这里有了bodyparser，才能得到ctx.request.body
 