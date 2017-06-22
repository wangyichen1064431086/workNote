### 不同文件之间引用全局变量会报错
在没定义该变量的文件中会报：“xxx is not defined”

#### 解决办法
在jhint配置文件.jshintrc中的"globals"下增加该变量字段