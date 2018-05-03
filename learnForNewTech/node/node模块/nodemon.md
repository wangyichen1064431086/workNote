<https://www.npmjs.com/package/nodemon>

官网: <https://nodemon.io/>
文档：<https://github.com/remy/nodemon#nodemon>
Nodemon是一个实用程序,它将监视代码源中的任何更改并自动重启服务器。对于开发来说非常完美。


For use during development of a node.js based application.

用于开发基于node.js的应用程序期间。

nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

nodemon将监测nodemon开启的目录下的文件，且如果有任何文件变动，nodemon将会自动重启你的node应用程序。

nodemon does not require any changes to your code or method of development. nodemon wraps your node application and keeps an eye on any files that have changed. Remember that nodemon is a replacement wrapper for node, think of it as replacing the word "node" on the command line when you run your script.

nodemon不需要你的代码或你的开发方式做出任何的变动。nodemon包裹了你的node应用程序并且对于每个变化的文件都保持关注。记住，nodemon是node的替代包裹，可以将其视为在运行脚本时在命令行中替换单词"node"。

## Installation
### Globally
```
npm install -g nodemon
```
And nodemon will be installed globally to your system path.

### Locally
```
npm install --save-dev nodemon
```
With a local installation, nodemon will not be available in your system path. Instead, the local installation of nodemon can be run by calling it from within an npm script (such as <code>npm start</code>) or using <code>npx nodemon</code>.

## Usage
### with param in cli
```
nodemon ./server.js localhost 8080
```
此脚本的任何输出都会带有前缀[nodemon],否则所有输出（包括error)都会重复显示。

### with package.json

如果没有在命令行中指明脚本文件，nodemon会去看package.json文件，然后执行main字段的文件:
```
nodemon
```


你也可以省略package.json中的main字段，nodemon会读取package.json中的main属性并以命令行中inspect标志后面的值作为main的value：
```
nodemon --inspect ./server.js 80
```

nodemon也会寻找package.json中的scripts.start属性


## Automatic re-running & Manual restarting

暂略

## Config files
nodemon支持本地和全局的configuration文件。它们通常被命名为nodemon.json，存在于读取工作目录下或你的home目录下。本地configuration文件也可以通过--config < file > 选项指定。

配置项的优先级顺序:

- command line arguments
- local config
- global config

Eg:
```
{
  "restartable": "rs",
  "ignore": [
    ".git",
    "node_modules/**/node_modules"
  ],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  "watch": [
    "test/fixtures/",
    "test/samples/"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js,json"
}

```

### execMap
设置需要nodemon额外支持的语言。如需要nodemon支持Perl语言(扩展名为.pl)。要这样:

```
{
  "execMap": {
    "p1":"perl"
  }
}
```

### watch
nodemon默认会监测当前目录。如果你想要控制该行为，可以指明特定的目录；
```
  "watch": [
    "app",
    "libs"
  ],
```
or:
```
  nodemon --watch app --watch libs app/server.js
```
这样nodemon将只会在app目录和libs目录下有更改时重启。

### ext
By default, nodemon looks for files with the .js, .mjs, .coffee, .litcoffee, and .json extensions。该选项可指明在哪些后缀文件更改时重启:

```
"ext": "js,json"
```
Or:
```
nodemon -e js,json
```
Or:
```
nodemon --ext js,jade
```
### ignore
 by default, nodemon will ignore the .git, node_modules, bower_components, .nyc_output, coverage and .sass-cache directories

 ```
 nodemon --ignore lib/ --ignore tests/
 ``` 