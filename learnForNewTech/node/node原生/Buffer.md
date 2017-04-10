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
