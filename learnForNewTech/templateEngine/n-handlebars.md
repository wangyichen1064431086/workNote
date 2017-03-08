# n-handlebars

扩展的handlebars。

	require('n-handlebars')(app, options);

options对象属性包括：

	- directory
	- partialDir
	- ...


当应用目录中所有的部分注册后，返回一个promise。

## Express applications

	require('n-handlebars').standalone(options)

和其他的所有next模块一起使用handlebars实例，但不使用partials，用：

	require('n-handlebars').handlebars

## 客户端的javascript

	require('n-handlebars')(options)

此处的options有以下属性：

- helpers: 哪些要添加到handlebars里面的依赖。

返回一个handlebars实例。


# Helpers
## Inheritance helpers(关于继承的帮助文档）
### Block inheritance（区块继承）

有两种方式：

- outputBlock 用在母模板中，来指明哪里的内容要被输出。
- defineBlock 用在子模板中，来定义期望输出插入到Block中的内容。

parent.html:

	<header>thing</header>
	
	{{#outputBlock 'my-block'}}
		default content
	{{/outputBlock}}
	
	<footer>thing</footer>

child.html:

	{{#defineBlock 'my-block'}}
	Mustaches to process:{{someVar}}
	{{/defineBlock}}
	{{>parent}}

### usePartial（引用部分）

允许基于一般变量值来选择一个partial。

 	{{{usePartial variable path='path/to/partial'}}}


如果variable的值是foobar,则会成为 path/to/partial/foobar。注意'>'并不存在于path中，你通常需要3重{}。


## Content helper（关于内容的帮助文档）
### dateformat（日期格式）

以字符串形式输出日期对象。

输出一个isoString:

	{{#dateformat}}
		{{a date object}}
	{{/dateformat}}

输出一个形如 'Tuesday, 3 February, 2014'的日期格式：

	{{#dateformat "dddd,d mmmm,yyy"}}
		{{a date object}}
	{{/dateformat}}

### encode（编码）

给字符串编码，以更安全地输出到html中。

和encodeURIComponet(q)输出一样的东西：

	{{encode q mode="uriComponent"}}
		outputs the result of encodeURIComponent(q)

（或者：）

	{{encode q}}
		outputs the result of encodeURIComponent(q)

### paragraphs（段落）

从一个更大的html块中输出一些段落。

输出第一个body的段落。索引从0开始。注意三重{}:

	{{{paragraphs body start=0 end=1}}}


### removeImageTags（移除image标签）

从一个html块中剥去所有的image标签：

	{{{removeImageTags body}}}



### resize
替换一个图片的url，使其能够有一个新的尺寸。

	{{#resize 200}}
		http://images.com/pic.jpg
	{{/resize}}

### json
以json的形式输出object。

在html的属性里或其他地方使用：

	{{json obj}}

用于输出未编码的json:

### concat:
连结字符串

	{{concat str1 str2}}



### decodeHtmlEntities(解码html实体）

暂略

## Logic helper(逻辑方面的帮助文档）

### ifEquals
如果一个东西等于一个值，那么就输出内容：

	{{#ifEquals thing 'value'}}
		some content
	{{else}}
		some fallback content
	{{/ifEquals}}

### unlessEquals
如果一个东西不等于一个值，那么就输出内容：

	{{#unlessEquals thing 'value'}}
	some content
		{{else}}
		some fallback content
	{{/unlessEquals}}

### ifAll
如果一系列东西里面至少有一个是true的，那么就输出内容：

	{{#ifSome thing1 thing2 thing3}}
		some content
		{{else}}
		some fallback content
	{{/ifSome}}


### ifBool
如果满足一个复杂的布尔逻辑表达式，则输出内容。使用字符串格式化函数来产生表达式。

	 {{#ifBool thing1 thing2 "($0 && $1)"}}
		some content
		{{else}}
		some fallback content
	{{/ifBool}}

## Iteration helpers(迭代帮助文档）

循环遍历一些item集合。

	{{#slice items limit="2" offset="4"}}
		some content
	{{/slice}}