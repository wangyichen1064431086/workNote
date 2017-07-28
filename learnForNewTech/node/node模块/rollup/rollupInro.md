## rollup
<https://www.npmjs.com/package/rollup>

新一代ES6的模块打包机

rollup的JavaScript API<https://github.com/rollup/rollup/wiki/JavaScript-API>

Rollup exports an object with a single method, rollup:

### 用法eg
```	
	var rollup = require( 'rollup' );
	var cache;

	rollup.rollup({
	  entry: 'main.js',
	  cache: cache
	}).then( function ( bundle ) {
	 	// Generate bundle + sourcemap
	  var result = bundle.generate({
	    // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
	    format: 'cjs'
	  });
	
	  // Cache our bundle for later use (optional)
	  cache = bundle;
	
	  fs.writeFileSync( 'bundle.js', result.code );
	
	  // Alternatively, let Rollup do it for you
	  // (this returns a promise). This is much
	  // easier if you're generating a sourcemap
	  bundle.write({
	    format: 'cjs',
	    dest: 'bundle.js'
	  });
	});
```
### rollup.rollup(options)
Returns a Promise that resolves with a bundle. 

####  options
##### entry:string 必须。这个项目包的入口。（e.g.你的main.js或app.js或index.js)

##### cache:Object  一个之前的包，使用它来加速打包后面的包。

##### external: Array of strings. A list of IDs of modules that should remain external to the bundle. The IDs should be either:
  1. the name of an external dependency
  2. a resolved ID (like an absolute path to a file)

##### paths: Function  that takes an ID and returns a path, or Object of **id: path pairs**(拥有id:path形式键值对的Object).

##### plugins:Array。一个插件对象的数组
<https://github.com/rollup/rollup/wiki/Plugins>

Plugins allow you to customise Rollup's behaviour by, for example, transpiling code before bundling, or finding third-party modules in your "node_modules" folder.

eg:

    ```
    rollup({
      entry: 'main.js',
      plugins: [
        nodeResolve({ jsnext: true, main: true }),
        commonjs({ include: 'node_modules/**' })
      ]
    }).then(...);
    ```

###### List of plugins
1. babel:transpile code with Babel

rollup-plugin-babel:
    <https://github.com/rollup/rollup-plugin-babel>

2. node-resolve – use the Node.js module resolution algorithm (e.g. modules from node_modules, installed with npm)

rollup-plugin-node-resolve:<https://github.com/rollup/rollup-plugin-node-resolve>

Locate modules using the Node resolution algorithm, for using third party modules in node_modules


#### bundle.generate( options )
返回一个object。

#### bundle.write( options )
和bundle.generate相似，除了它是写一个文件。返回一个Promise。

- format:string。产生的项目包的格式。可以为amd/cjs/es/life/umd
- sourceMap:boolean。是否产生一个sourcemap。
- dest:要写入的文件。