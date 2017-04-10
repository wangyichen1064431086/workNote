## gulp-mustache
将mustache模板渲染进入html

eg:
	var mustache = require("gulp-mustache");

	gulp.src("./templates/*.mustache")
	.pipe(mustache({
		msg: "Hello Gulp!",
		nested_value: "I am nested.",
		another_value: "1 2 3"
	},{},{
		some_inner_partial: "<p>{{nested_value}}</p>",
		another_partial: "<div>{{another_value}}</div>"
	})).pipe(gulp.dest("./dist"));

#### API：mustache(view,options,partials)
##### view
为hash或string类型，default：undifined

view对象包含所有模板的变量，并将这些变量作为键。如果你为它传递了一个字符串，则该字符串为包含了view的变量的json文件的路径。
##### optioins
为hash类型。

options对象指定配置该插件的一些参数。

- options.extension: string类型，指定输出文件的扩展名，默认为当前文档的扩展名。
- options.tags:Array类型，默认是undefined，指定mustache的分隔符。它必须是一个数组，其第一项为开始标签，第二个为结束标签。例如：

		['{{custom', 'custom}}']
##### partials
为hash类型，default为{}

其指定mustach模板中的局部模板。
