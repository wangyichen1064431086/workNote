### 5.Arraw functions
<http://exploringjs.com/es6/ch_arrow-functions.html#ch_arrow-functions>
#### 1. Overview
使用箭头函数的两个好处：

##### (1) 比传统函数的写法更简略
```
		const arr = [1, 2, 3];
		const squares = arr.map(x => x * x);
		
		// Traditional function expression:
		const squares = arr.map(function (x) { return x * x });
```

##### 2 其内的this是来自其外部环境的，即取消了传统函数屏蔽外部环境的this的作用。


#### 2. 对于好处2的细致说明
暂略，待整理

#### 3. 箭头函数的语法
指定参数：

	() => {...} // 没有参数
	 x => {...} // 一个参数
	(x,y) =>｛...｝//两个参数


指定函数体：
	
	x => {return x*x} //使用block
	x => x*x //使用表达式，等价于上面一行的写法

##### （1） 当参数只有1个时可省略圆括号

	[1,2,3].map(x=>2*x)
	result:[2,4,6]

但需要注意，有些例外情况，即使只有一个参数，你也需要加上括弧。例如，

1. 如果你要destructure一个单个参数的时候：

	[[1,2],[3,4]].map(([a,b]) => a+b)
	result:[3,7]

2. 如果这个单一参数具有一个默认值的时候（当参数值为undefined的时候采用默认值）

	[1,undefined,3].map((x='yes') => x)
	result: [1,'yes',3]



#### 4.Lexical variables(词法变量）
暂略，待整理

#### 5.Syntax pitfalls(语法陷阱)

##### 1. 箭头函数捆绑是很松散的

	你需要将箭头函数用()括起来：
		
		console.log(typeof () => {}) //SyntaxError
		console.log(typeof (() => {})) // OK

##### 2. 不能在箭头函数的参数后面换行
		
		const func1 = (x, y) // SyntaxError
	=> {
	    return x + y;
	};
	const func2 = (x, y) => // OK
	{
	    return x + y;
	};
	const func3 = (x, y) => { // OK
	    return x + y;
	};
	
	const func4 = (x, y) // SyntaxError
	=> x + y;
	const func5 = (x, y) => // OK
	x + y;
	Line breaks inside parameter definitions are OK:
	
	const func6 = ( // OK
	    x,
	    y
	) => {
	  	return x+y;
	}		
##### 3. You can’t use statements as expression bodies
###### 	Expressions vs statements
	Expressions(表达式)产生值,eg:
		 
		3 + 4
		foo(7)
		'abc'.length

	statements(声明)做事情，eg:
	
		while (true) { ··· }
		return 123;

    大多数表达式可以作为声明使用，只需在声明的位置提及它们：
		
		function bar() {
		    3 + 4;
		    foo(7);
		    'abc'.length;
		}
		
###### 箭头函数的函数体
如果expression箭头函数的函数体，你不需要{}，eg:

	asyncFunc.then(x => console.log(x));

如果statements是就函数的主体，你需要{}，eg:

	asyncFunc.catch(x=> {throw x});


	
##### 4.返回对象字面量
除expression(表达式）外，你需要使用{}，这意味着：如果你想要函数体是一个对象字面量，那么你需要{}（因为对象字面量是statement，而不是expression)

The body of this arrow function is a block with the label bar and the expression statement 123.

		const f = x => { bar: 123 }
	
The body of this arrow function is an expression, an object literal:

		const f = x => ({ bar: 123 })
