## 8. Loader
<https://mozilla.github.io/nunjucks/api.html#loader>

A loader is an object that takes a template name and loads it from a source, such as the filesystem or network. There are 2 kinds of builtin loaders.
 

### 1. FileSystemLoader
	new FileSystemLoader([searchPaths], [opts])

This is **only available to node**. It will load templates from the filesystem, using the searchPaths array as paths to look for templates. 

#### params
- searchPaths: Type Array, The paths to look for templates
- opts: Type Object.
	- opts.watch: If true, the system will automatically update templates***这样会导致任务挂在那儿，所以我们设置为false，然后通过gulp.watch来监控***
	- opts.noCache: If true, the system will avoid using a cache and templates will be recompiled every single time

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