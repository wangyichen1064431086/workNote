## path
node原生包<https://nodejs.org/docs/latest/api/path.html>

提供关于处理文件路径和文件目录的路径的功能。

#### path.resolve():
将路径片段拼成一个完整的绝对路径。

	path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
	// if the current working directory is /home/myself/node,
	// this returns '/home/myself/node/wwwroostatic_files/gif/image.gif'

#### path.basename(path[,ext])
返回路径的最后一个部分，或者可以去掉后缀ext

	path.basename('/foo/bar/baz/asdf/quux.html')
	  // returns 'quux.html'
	
	path.basename('/foo/bar/baz/asdf/quux.html', '.html')
	  // returns 'quux'

#### path.extname(path)
<https://nodejs.org/docs/latest/api/path.html#path_path_extname_path>

参数：

- path:type为String

用法：

返回路径的扩展名：路径的最后一部分的距离字符串末尾最近的.处开始往后的一部分。如果路径的最后一部分不含有.，或者如果其最后一部分的开始的字母就是.，则会返回一个空字符串。

Eg:

	path.extname('index.html')
	// returns '.html'
	
	path.extname('index.coffee.md')
	// returns '.md'
	
	path.extname('index.')
	// returns '.'
	
	path.extname('index')
	// returns ''
	
	path.extname('.index')
	// returns ''
