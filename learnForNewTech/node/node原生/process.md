## 3. process
<https://nodejs.org/dist/latest-v6.x/docs/api/process.html>

The process object is a global that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require().

### process.cwd()
Returns: <String>The current working directory of the Node.js process.

### process.env
<Object>

The process.env property returns an object containing the user environment. 

**NOTE** It is possible to modify this object, but such modifications will not be reflected outside the Node.js process. 