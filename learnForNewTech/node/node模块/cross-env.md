# cross-env

<https://www.npmjs.com/package/cross-env>

## 针对问题

当您使用NODE_ENV = production设置环境变量时，大多数Windows命令提示都会窒息。 （例外是Windows上的Bash，它使用本地Bash。）同样，Windows和POSIX命令如何使用环境变量也是不同的。 使用POSIX，您可以使用：$ ENV_VAR并在使用％ENV_VAR％的窗口上使用。

## 解决办法

ross-env使得它可以让你有一个单一的命令，而不用担心为平台设置或使用环境变量。 只要将它设置为像在POSIX系统上运行一样，cross-env将负责正确设置它。

在package.json中这样写:

```json
"scripts": {
  "start": "cross-env NODE_ENV=development node server.js"
}
```

那么在server.js中可以打印出当前NODE_ENV值:

```js
console.log(process.env.NODE_ENV);
```