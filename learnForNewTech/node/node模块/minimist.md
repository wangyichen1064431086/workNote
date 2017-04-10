## minimist
<https://www.npmjs.com/package/minimist>

解析命令行参数

#### eg:

parse.js中写入代码：

	var argv = require('minimist')(process.argv.slice(2));
	console.dir(argv);//显示一个对象所有的属性和方法

运行命令：

$ node example/parse.js -a beep -b boop
{ _: [], a: 'beep', b: 'boop' }

#### 深度Eg:(来自ig-template的gulp.js中）

gulp.js:

	const knownOptions = {
	  string: 'input',
	  default: {input: 'example'},
	  alias: {i: 'input'}
	};
	
	const argv = minimist(process.argv.slice(2), knownOptions);

当前你执行的命令行是：

	gulp serve -i example.json
	//example.json为默认值，你可以用自己的json文件替代即 gulp serve -i your-data-file-name.json

相关值结果为：
	
	process.argv: (type为Array)
	C:\Program Files\nodejs\node.exe,C:\Program Files\nodejs\node_modules\gulp\bin\gulp.js,serve,-i,example.json

	process.argv.slice(2): (type为Array)
	serve,-i,example.json

	argv:(type为object)
	{_:['serve'],i:'example.json',input:'example.json'}

	argv_:(type为Array)
	serve
	
	argv_[0] or taskName:(type为String)
	serve

	argv.i:(type为String)
	example.json

#### 方法

	 var minimist=require('minimist');
	 var argv=minimist(args,opts={});

该minimist方法会返回一个对象argv，该对象是由数组args填充而成的（具体怎么填充，详见上述 深度Eg)。

argv._为argv对象中属性名为空的属性值组成的数组。

Number型参数将会作为Number返回，除非为该参数设置了opts.string或者opts.boolean。

命令行中‘--’之后的参数都不会被解析，会作为argv._的最后一个数值。

options 可以为：

- opts.string:一个字符串或字符串数组，指定总是作为字符串处理的参数名称。
- opts.boolean:一个布尔值、字符串或字符串数组，指定总是作为布尔值处理的参数。如果指定，则将把所有带连字符（连字符为--非=)的参数当做布尔值处理。
- opts.alias:一个对象，将一些字符串作为别名映射为一个或一组参数名称
- opts.default:一个对象，将一些参数名称映射为默认值。
- opts.stopEarly
- opts[--]

#### 补充其他知识点

process.argv 一个包含node.js命令行参数的数组。第一个元素会是 'node'， 第二个元素将是 .Js 文件的名称。接下来的元素依次是命令行传入的参数。该值可作为arg