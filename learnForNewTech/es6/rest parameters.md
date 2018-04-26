<http://exploringjs.com/es6/ch_core-features.html#sec_from-arguments-to-rest>

在ES5中，如果你想要一个function接受任意数量的参数，你必须使用特殊变量arguments：

```
  function logAllArguments() {
    for (var i=0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
  }
```

在ES6中，你可以使用...声明一个rest parameter(剩余参数):

```
function logAllArguments(...args) {
  for (const arg of args) {
    console.log(arg)
  }
}
```

剩余参数还可以用于你指向替代后面的参数的时候:

```
function format(pattern, ...args) {

}
```

此args等同于ES5中的:
```
function format(pattern) {
  var args = [].slice.call(arguments, 1)
}
```