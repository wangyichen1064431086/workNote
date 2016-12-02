# 1008

## 1. 继续写webapp-wyc

# 1010

## 1. 修复ios10带来的radio页面不滚动问题

参见工作日志0918。

问题：

该页面文字部分无法滚动。

修改：

	.player-list {
        overflow:hidden;
        overflow-y: scroll;
        height: 100%;
        /*-webkit-overflow-scrolling: touch;*/
      }

注释掉了-webkit-overflow-scrolling:touch,或将该属性值改为auto。

关于该属性参见<https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-overflow-scrolling#Browser_Compatibility>

再修改：

恢复使用FTScroller。没有使用的帆总之前的版本放在myftwork\added\radio_oli1010.html







## 2.收到全屏广告新图
最后什么也没有做，Viky直接传到广告系统就可以用了。

# 1011
## 1. 修改webapp项目，使得其主页、文章页的固定部分使用position:fixed；然后，滚动部分就用天然的页面滚动方式。


# 1012
## 1. 继续学webapp项目

## 2. 跟卫国哥学习ftc-toggle
卫国哥写的模块网站：<http://interactive.ftchinese.com/components/ftc-toggle.html>

ftc-toggle项目的Git: <https://github.com/FTChinese/ftc-toggle>

# 1013
## 1. 帆总介绍swift
swift教程资源：

<https://www.coursera.org/specializations/app-development>

<www.lynda.com> 搜索swift，看有没有办法免费学习

## 2.继续学习ftc-toggle

## 3.看《你不知道的JavaScript》揣摩类的理论

# 1014
## 1.继续写ftc-toggle-wyc
### Nunjucks：
文档<http://mozilla.github.io/nunjucks/cn/api.html#render>

### 关于ES6的Promise：
文档<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise>

新收获：Promise 对象是一个**返回值的代理**，这个返回值在promise对象创建时未必已知。它允许你为异步操作的成功返回值或失败信息指定处理方法。 这使得异步方法可以像同步方法那样返回值：异步方法会返回一个包含了原返回值的 promise 对象来替代原返回值。

### 关于ES6的export:
文档:<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export>

### 关于ES6的import:
文档：<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import>



# 1015
## 1.继续ftc-toggle-wyc
### ES6的yield
<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield>

yield 关键字使生成器函数暂停执行，并返回跟在它后面的表达式的当前值. 可以把它想成是 return 关键字的一个基于生成器的版本.

yield 关键字实际返回一个对象，包含两个属性, value 和 done.  value 属性为 yield expression 的值,  done 是一个布尔值用来指示生成器函数是否已经全部完成.

一旦在 yield expression 处暂停,  除非外部调用生成器的 next() 方法，否则生成器的代码将不能继续执行. 这使得可以对生成器的执行以及渐进式的返回值进行直接控制.

### ES6生成器
<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*>

#### 简介
function* 声明（function关键字后跟一个星号）定义一个generator（生成器）函数，返回一个Generator对象。

生成器是一种可以从中退出并在之后重新进入的函数。生成器的环境（绑定的变量）会在每次执行后被保存，下次进入时可继续使用。

调用一个生成器函数并不马上执行它的主体，而是返回一个这个生成器函数的迭代器（iterator）对象。当这个迭代器的next()方法被调用时，生成器函数的主体会被执行直至第一个yield表达式，该表达式定义了迭代器返回的值，或者，被 yield*委派至另一个生成器函数。next()方法返回一个对象，该对象有一个value属性，表示产出的值，和一个done属性，表示生成器是否已经产出了它最后的值。

#### 语法
	function* name([param[, param[, ... param]]]) { statements }

#### eg1:

	function* idMaker(){
		var index = 0;
		while(index<3){
			yield index++;
		}
	}
	
	var gen = idMaker();
	
	console.log(gen.next().value);//0
	console.log(gen.next().value);//1
	console.log(gen.next().value);//2
	console.log(gen.next().value);//undefined


#### eg2:

	function* anotherGenerator(i){
		yield i+1;
		yield i+2;
		yield i+3;
	}
	
	function* generator(i){
		yield i;
		yield* anotherGenerator(i);
		yield i+10;
	}
	
	var newgen = generator(10);
	
	console.log(newgen.next());//{value:10,done:false}
	console.log(newgen.next());//{value:11,done:false}
	console.log(newgen.next());//{value:12,done:false}
	console.log(newgen.next());//{value:13,done:false}
	console.log(newgen.next());//{value:20,done:false}
	console.log(newgen.next());//{value:undefined,done:true}


### 迭代器和生成器
<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generators.3A_a_better_way_to_build_Iterators>

#### 迭代器

一个迭代器对象 ，知道如何每次访问集合中的一项， 并记录它的当前在序列中所在的位置。在  JavaScript 中 迭代器是一个对象，它提供了一个 next() 方法，返回序列中的下一项。这个方法返回包含done和value两个属性的对象。

	function makeIterator(array){
		var nextIndex = 0;
	
		return {
			next:function(){
				return nextIndex<array.length?{value:array[nextIndex++],done:false}:{done:true};
			}
		}
	}
	
	var it = makeIterator(['yo','ya']);
	console.log(it.next().value);//yo
	console.log(it.next().value);//ya
	console.log(it.next().done);//true

#### 生成器（Generators）: 一个更好的方法来构建迭代器
虽然迭代器是一个有用的工具，但是由于需要显示地维持他们的内部状态，所以他们的构造需要仔细的规划（难）。生成器给你提供了一个强大的选择：它允许你通过写一个可以保存自己状态的的简单函数来定义一个迭代算法。

一个生成器其实是一种特殊类型的函数（这个函数作为一个为迭代器工作的工厂），一个函数如果它里面包含了一个或一个以上的yield表达式，那么这个函数就成为一个生成器了。

# 1018
## 1. 就自己写的webapp-screenstart项目，问卫国哥关于面向对象的js写法问题

## 2. 修改webapp项目滑动bug

***注意：修改后提交时建一个git分支***

### 1.首页菜单添加收起来的实时效果反馈

### 2.文章页添加退回的实时效果反馈


### 3*.自己修改时发现的其他bug

# 1021
## 1.继续解决页面滑动问题

## Learned
1.
- Chrome浏览器同时支持-webkit-transition和transition。
- 当二者同时设置时，以-webkit-transition为准。且此时Element.style["transition"]，Element.style["-webkit-transition"]，Element.style["webkitTranstition"],Element.style.transition，Element.style.webkitTransition也都为值为-webkit-transition的值。

# 1024
## 1.参考FTScroller.js为滑动添加更细致的控制

# 1025
## 1. 写完webapp/app/script/swipe.js
将其的速度控制分为3大情况，一共7个条件分支。

## 2. 学习《你所不知道的javascirpt》上卷

## 3.继续测试webapp
待修改：将所有的removeProperty使用removeAttribute替代。

将-webkit-user-select: none;写到css里面

# 1026
## 1.发现Element.removeAttribute("style")会有一定延迟，但是IDE
<https://www.zhihu.com/question/20529237>

其他bug:

首页滑动左侧菜单的时候，如果还没有滑动完，就点开了一篇文章。那么首页菜单就划不回去了。因为基准页判断错误。

## 2.最新bug
有个地方会卡了。

# 1028
## 1. 完成webapp的sliding effect

## 2. 待解决bug
### 1. _isSwiping应该有三种状态

# 1031
## 1. 解决竖着滑动后再横着滑时还是可以竖着滑动的问题
<https://itunes.apple.com/us/course/developing-ios-9-apps-swift/id1104579961>

## 2. 学习SWIFT,使用Mac系统
教程：iTunes→ iTunes U→
Developing iOS with SWIFT

<https://itunes.apple.com/us/course/developing-ios-9-apps-swift/id1104579961>