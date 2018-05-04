<https://github.com/koajs/session>

Simple session middleware for Koa. Defaults to cookie-based sessions and supports external stores.

Koa的简单会话中间件。默认为基于cookie的会话并支持外部存储。


## Example
```
  const session = require('koa-session');
  const Koa = require('koa');
  const app = new Koa();

  app.keys = ['some secret hurr'];

  const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) cookie名称*/
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };

  app.use(session(CONFIG, app));
  // or if you prefer all default config, just use => app.use(session(app));

  app.use(ctx => {
    // ignore favicon
    if (ctx.path === '/favicon.ico') return;

    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
  });

  app.listen(3000);
  console.log('listening on port 3000');
```