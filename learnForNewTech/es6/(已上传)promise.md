## Propmise基本用法
参考：<http://exploringjs.com/es6/ch_promises.html>

Promises用于发送一个异步完成的结果，是替代回调函数的另一种选择。可以把Promise理解为一种异步函数。

以下函数通过一个Promise来异步地返回一个结果

```js
function asyncFunc() {
	return new Promise(
		function (resolve, reject) {
			···
			resolve(result);
			···
			reject(error);
		});
}
```

你可以这样调用它：

```js
asyncFunc()
.then(result => { ··· })
.catch(error => { ··· });
```

> **NOTE**
> promise正常情况下结果只能用.then(result =>)来获取。
> 特殊情况下，在[co](https://www.npmjs.com/package/co)工具中,使用yield可以得到Promise的结果。

### 1. Chaining then() calls(链式调用then)

then() 总是返回一个Promise,这使得你可以链式调用：

```js
asyncFunc1()//----设该函数会得到一个promise P，它会resolve出来result1
.then(result1 => {
	// Use result1
	return asyncFunction2(); // 得到一个promise A, 它会resolve出来result2
})
.then(result2 => { // 
	// Use result2
})
.catch(error => {
	// Handle errors of asyncFunc1() and asyncFunc2()
});
```

Promise P在.then()之后返回了什么东西取决于then中的函数做了什么：

- 如果then()中的函数返回的是一个Promise（如A）, 则这个 Promise的resolve的结果值传递为P的resolve结果值。
- 如果then()中的函数返回了一个不同的值,则这个值会变成P的resolve值。
- 如果then()中的函数抛出了一个意外，则P会因为这个意外而被rejected。

### 2. Executing asynchronous functions in parallel(并行执行异步函数）

如果你通过then()链式调用Promise，它们就会按顺序执行，一个时间只执行一个Promise

如果你不这样采用链式调用，而是立即调用它们，则它们会并行执行。

而Promise.all()使得你可以一次性获得所有结果。其输入是一个由一系列Promises组成的数组，其输出是一个单个的Promise,其resolve的结果值是一个由一系列结果组成的数组。

```js
Promise.all([
asyncFunc1(),
asyncFunc2(),
])
.then(([result1,result2]) => {

})
.catch(err => {
// Receives first rejection among the Promises
});
```

## Promise对象详述
Promise对象用于表示一个异步操作的最终状态(完成或失败)，以及其返回的值。

Eg:使用Promise构造函数构造一个promise对象实例:

```js
var promise1 = new Promise(function(resolve, reject) {
	setTimeout(resolve, 1000, 'foo');//即1s后执行resolve(1)
});

console.log(promise1);//Promise {<resolved>: "foo"}
```

Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象。

一个 Promise有以下几种状态:

- pending: 初始状态，既不是成功，也不是失败状态。
- fulfilled: 意味着操作成功完成。
- rejected: 意味着操作失败。


### 语法

```js
new Promise(function(resolve, reject){})
```

param:

- executor: 带有resolve和reject两个参数的函数.Promise构造函数执行时立即调用executor 函数， resolve 和 reject 两个函数作为参数传递给executor（executor 函数在Promise构造函数返回新建对象前被调用）。executor 内部通常会执行一些异步操作，一旦完成，可以调用resolve函数来将promise状态改成fulfilled，或者在发生错误时将它的状态改为rejected。

### Promise静态方法

#### 1. Promise.all(iterable)
这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。Promise.all方法常被用于处理多个promise对象的状态集合。

#### 2. Promise.race(iterable)


#### 3. Promise.reject(reason)

#### 4. Promise.resolve(value)

### Promise实例方法
#### 1. Promise.prototype.catch(onRejected)

#### 2. Promise.prototype.then(onFulfilled, onRejected)

#### 3. Promise.prototype.finally(onFinnaly)
## 待补充
<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise>
<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises>