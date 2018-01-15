
参考：<http://exploringjs.com/es6/ch_promises.html>

Promises用于发送一个异步完成的结果，是替代回调函数的另一种选择。可以把Promise理解为一种异步函数。

以下函数通过一个Promise来异步地返回一个结果

	function asyncFunc() {
	    return new Promise(
	        function (resolve, reject) {
	            ···
	            resolve(result);
	            ···
	            reject(error);
	        });
	}

你可以这样调用它：
	
	asyncFunc()
	.then(result => { ··· })
	.catch(error => { ··· });

> **NOTE**
> promise正常情况下结果只能用.then(result =>)来获取。
> 特殊情况下，在[co](https://www.npmjs.com/package/co)工具中,使用yield可以得到Promise的结果。

### 1. Chaining then() calls(链式调用then)

then() 总是返回一个Promise,这使得你可以链式调用：

```
	asyncFunc1()----设这是一个得到一个promise P，它会resolve出来result1
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

```
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
