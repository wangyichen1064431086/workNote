## 4.Globals
<https://nodejs.org/dist/latest-v6.x/docs/api/globals.html>
### __dirname
<String>

The directory name of the current module. 
This the same as the **path.dirname()** of the **__filename**.

***注意__dirname与process.cwd()的区别：一个是当前js模块的路径，一个是正在运行的node进程的路径***

#### Example: running node example.js from /Users/mjr
```
console.log(__dirname);
// Prints: /Users/mjr

console.log(path.dirname(__filename));
// Prints: /Users/mjr

console.log(__filename);
// Prints: /Users/mjr/example.js
```