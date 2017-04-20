## 1.关于某全局变量
对于可能没有声明的全局变量xxx:

必须采用:

	if(window.xxx){
		window.xxx...
	}
	
	
才不会报错。

否则，会报没有声明xxx的错。

## 2.jQurey API: .each(function(index,element) {})
 .each()：jQuery的API：对所有匹配元素执行给定的函数

**这里的参数element是DOM对象非jQuery对象，故要使用$(DOM对象)来将其转换成jQuery对象**
        
## 3.现在浏览器已经支持除了export/import之外的es6了。