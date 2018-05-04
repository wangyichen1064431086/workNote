util 模块主要用于支持 Node.js 内部 API 的需求。 大部分实用工具也可用于应用程序与模块开发者。 它可以通过以下方式使用：

```
const util = require('util');
```

### util.promisify(original)
<https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original>
<http://nodejs.cn/api/util.html#util_util_promisify_original>

@param original: TYPE function
@Returns: TYPE function

Takes a function following the common error-first callback style, i.e. taking a (err, value) => ... callback as the last argument, and returns a version that returns promises.

以一个错误优先风格的函数，即形如(err, value) => callback 的函数作为最后一个参数，然后返回一个返回promises的版本。