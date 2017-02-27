## 1.关于某全局变量
对于可能没有声明的全局变量xxx:

必须采用:

	if(window.xxx){
		window.xxx...
	}
	
	
才不会报错。

否则，会报没有声明xxx的错。