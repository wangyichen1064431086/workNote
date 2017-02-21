# 资源
<https://nodejs.org/dist/latest-v7.x/docs/doc/api/>


# 理论学习
参考《深入浅出nodeJS》

## 1.4 Node的特点
### 1. 异步I/O
最简单的例子，就是读取多个文件的时候：

- 异步I/O的耗时是最慢的那个文件读取的耗时。
- 同步I/O的耗时是所有文件读取的耗时之和。

### 2. 事件与回调函数

### 3. 单线程

单线程就是在特定的时刻只有特定的代码被执行。


#### Tips：既然JS是单线程运行的，那诸如Ajax请求这种是怎样异步实现的？
Ajax确实是异步的，***它是由浏览器新开一个线程请求（JS是单线程的，但浏览器是多线程的）or Ajax本身就不是线程是I/O***（待琢磨），事件回调的时候是放入Event loop单线程事件队列等候处理。


我们写的js代码就像是一个国王，而nodejs给国王提供了很多仆人。早上，一个仆人叫醒了国王，问他有什么需要。国王给他一份清单，上面列举了所有需要完成的任务，然后睡回笼觉去了。当国王回去睡觉之后，仆人才离开国王，拿着清单，给其它的仆人一个个布置任务。仆人们各自忙各自的去了，直到完成了自己的任务后，才回来把结果禀告给国王。国王一次只召见一个人，其它的人就在外面排着队等着。国王处理完这个结果后，可能给他布置一个新的任务，或者就直接让他走了，然后再召见下一个人。等所有的结果都处理完了，国王就继续睡觉去了。直接有新的仆人完成任务后过来找他。这就是国王的幸福生活。


这段话对于理解nodejs的运行方式非常重要。

**I/O是I/O，线程是线程，线程是跟CPU相关的,I/O是跟CPU无关的**。


## 1.5 Node的应用场景
- I/O密集型
- 等等等等



# Process
## process.env
The process.env property returns an object containing the user environment.


eg:

	{
	  TERM: 'xterm-256color',
	  SHELL: '/usr/local/bin/bash',
	  USER: 'maciej',
	  PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
	  PWD: '/Users/maciej',
	  EDITOR: 'vim',
	  SHLVL: '1',
	  HOME: '/Users/maciej',
	  LOGNAME: 'maciej',
	  _: '/usr/local/bin/node'
	}

可以修改这个obj。

# 官网文档
<https://nodejs.org/dist/latest-v7.x/docs/api/>

## 1. Buffer
在ES6引入TypedArray之前，JavaScript语言没有阅读或操纵二进制数据流的机制。 Buffer类作为Node.js的API被引入，其可以和一些context（如TCP流，以及文件系统）中的字节流进行交互。

现在，TypedArray被加入到ES6中， 而Buffer类使用Uint8Array API(Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。),从某种程度上说会对Node.js的应用案例更加优化和合适。


### Class:Buffer

#### Class Method: Buffer.byteLength(string[, encoding])
##### 作用：
返回一个字符串的byte数目
##### params
- string <String> | <Buffer> | <TypedArray> | <DataView> | <ArrayBuffer> A value to calculate the length of
- encoding <String> If string is a string, this is its encoding. Default: 'utf8'
- Returns: <Integer> The number of bytes contained within string

## 2. Modules

### Accessing the main module

When a file is run directly from Node.js, **require.main** is set to its module. That means that you can determine whether a file has been run directly by testing.That means that you can determine whether a file has been run directly by testing:

	require.main === module

For a file foo.js, this will be **true** if run via 
	
	node foo.js

but **false** if run by 
	
	require('./foo').

