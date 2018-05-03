## 3. process 进程
<https://nodejs.org/dist/latest-v6.x/docs/api/process.html>

The process object is a global that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require().

process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。


### process.cwd()
Returns: <String>The current working directory of the Node.js process.

### process.env
<Object>

The process.env property returns an object containing the user environment. 

process.env属性返回一个包含用户环境信息的对象。

**NOTE** It is possible to modify this object, but such modifications will not be reflected outside the Node.js process. 