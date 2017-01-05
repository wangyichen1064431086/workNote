## 1. nunjucks {%- 
是去掉空格的意思，
详见<https://mozilla.github.io/nunjucks/templating.html#if>。

## 2. 在有nunjucks标签的html中，使用<!-- -->注释是会报错的，得用{# #}来注释。
详见<https://mozilla.github.io/nunjucks/templating.html#comments>

## 3. nunjucks之Filters：过滤器

详见<https://mozilla.github.io/nunjucks/templating.html#template-inheritance>

		{{ foo | title }}
		{{ foo | join(",") }}
		{{ foo | replace("foo", "bar") | capitalize }}//display"Bar" finally

## 4. Custom Filters
<https://mozilla.github.io/nunjucks/cn/api.html#custom-filters>

使用 Environment 的 addFilter 方法添加一个自定义的过滤器，过滤器时一个函数，第一个参数为目标元素，剩下的参数为传入过滤器的参数。

### Eg:
	
	var nunjucks = require('nunjucks');
	var env = new nunjucks.Environment();
	
	env.addFilter('shorten', function(str, count) {
	    return str.slice(0, count || 5);
	});

添加了一个 shorten 的过滤器，返回前 count 位数的字符，count 默认为 5，如下为如何使用：

	{# Show the first 5 characters #}
	A message for you: {{ message|shorten }}
	
	{# Show the first 20 characters #}
	A message for you: {{ message|shorten(20) }}

### Keyword/Default Arguments(自定义过滤器中的关键字参数的应用)

nunjucks 支持关键字参数，你可以在 filter 中使用他。

所有的关键字参数会以最后一个参数传入，以下为使用了关键字参数的 foo 过滤器：

	env.addFilter('foo', function(num, x, y, kwargs) {
	   return num + (kwargs.bar || 10);
	})

模板可如下使用：

	{{ 5 | foo(1, 2) }}          -> 15
	{{ 5 | foo(1, 2, bar=3) }}   -> 8

你必须在关键字参数之前传入所有的位置参数 (foo(1) 是有效的，而 foo(1, bar=10) 无效)。你也不能使用将一个位置参数当作关键字参数来用 (如 foo(1, y=1))。

## 5.Keyword Arguments(关键字参数/命名参数)

Keyword arguments look like this:

	{{ foo(1, 2, bar=3, baz=4) }}

Nunjucks converts them into a hash and passes it as the last argument. It's equivalent to this call in javascript:

	foo(1, 2, { bar: 3, baz: 4})

Since this is a standard calling convention, it works for all functions and filters if they are written to expect them. 

Macros allow you to also use keyword arguments in the definition, which allows you to specify default values. Nunjucks automatically maps the keyword arguments to the ones defined with the macro.
	
	{% macro foo(x, y, z=5, w=6) %}//使用macro定义具有关键字参数的函数，可指定参数默认值
	{{ x }}, {{ y }}, {{ z }}, {{ w}}
	{% endmacro %}
	
	{{ foo(1, 2) }}        -> 1, 2, 5, 6
	{{ foo(1, 2, w=10) }}  -> 1, 2, 5, 10

可将位置参数和关键字参数混用：
	
	{{ foo(20,y=21) }}  -> 20, 21, 5, 6

也可以直接使用位置参数:

	{{ foo(5, 6, 7, 8) }}   -> 5, 6, 7, 8

这样，你可以跳过位置参数：

	{{ foo(8, z=7) }}      -> 8, , 7, 6
	
## 6.filter

A filter block allows you to call a filter with the contents of the block. Instead passing a value with the | syntax, the render contents from the block will be passed.

	{% filter replace("force", "forth") %}
	may the force be with you 
	{% endfilter %}

->
	may the forth be with you 
	

## 7.Environment
<https://mozilla.github.io/nunjucks/api.html#environment>

Environment class is the central object which handles templates. It knows how to load your templates, and templates depend on it for inheritance and including templates.

### 1) constructor

	new Environment([loaders],[opts])

#### params
- loaders: Array, alist of loaders,即一系列下载模板文件的路径,nunjucks will walk through them in order until one of them finds a template. 详见8.loaders
- opts: Object, configuration parameters
 	- opts.autoescape:(default: true) controls if output with dangerous characters are escaped automatically（危险字符自动转义）

### 2) addFilter
	env.addFilter(name,func,[async])

添加一个自定义的filter,名叫name，当调用的时候调用函数func.如果该filter需要为异步，则async必须设置为true.

### 3) addGlobal
	env.addGlobal(name,value)

 Add a global value that will be available to all templates. 

**Note: this will overwrite any existing global called name.**

 Returns env for further method chaining.


### 4)render
	env.render(name,[context],[callback])

Render the template named ***name*** with the optional ***context*** hash. If callback is supplied, call it when done with any errors and the result (see asynchronous support), otherwise return the rendered string.

#### params
- name: The name of the template which will be rendered.
- context: The data which is used for rendering template.
- callback: If callback is supplied, call it when done with any errors and the result (see asynchronous support)

#### 使用Eg:

	var res = nunjucks.render('foo.html');
	
	var res = nunjucks.render('foo.html', { username: 'James' });
	
	nunjucks.render('async.html', function(err, res) {
	});
## 8. Loader
<https://mozilla.github.io/nunjucks/api.html#loader>

A loader is an object that takes a template name and loads it from a source, such as the filesystem or network. There are 2 kinds of builtin loaders.
 

### 1. FileSystemLoader
	new FileSystemLoader([searchPaths], [opts])

This is **only available to node**. It will load templates from the filesystem, using the searchPaths array as paths to look for templates. 

#### params
- searchPaths: Type Array, The paths to look for templates
- opts: Type Object.
	- opts.watch: If true, the system will automatically update templates
	- noCache: If true, the system will avoid using a cache and templates will be recompiled every single time

#### 用法Eg

	var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));

### 2. WebLoader
	new WebLoader([baseURL], [opts]);

This is **only available in the browser**.

#### params
- baseURL: Type String.It is the URL to load templates from (must be the same domain), and it defaults to the current relative directory.
- opts: Type Object.
	- opts.useCache: If true, templates will be forever cached and you won't see updates to them. The cache is disabled by default because there is no way to watch for changes and dirty the cache. 
	- opts.async: If true,  templates will be loaded asynchronously instead synchronously
	- opts.throwOnUndefined (default: false): throw errors when outputting a null/undefined value
	- ... 详见 <https://mozilla.github.io/nunjucks/api.html#configure>