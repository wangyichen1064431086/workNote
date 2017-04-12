## fs-jetpack
<https://www.npmjs.com/package/fs-jetpack>

比node自带fs要更好的fs system API
### Sync & Async

API has the same set of synchronous and asynchronous methods. All **async methods are promise based(异步方法）** (no callbacks).即异步方法返回的是promise,同步方法返回nothing。


### API
#### 1. write(path,data,[options])
#### asynchronous: writeAsync(path,data,[options])

Writes data to file. If any parent directory in path doesn't exist it will be created (like mkdir -p).


##### arguments:
- path: path to file.
- data: data to be written. This could be String, Buffer, Object or Array (if last two used, the data will be outputted into file as JSON).
- options (optional) Object with possible fields:

	- atomic: (default false) if set to true the file will be written using strategy which is much more resistant to data loss. 
	- jsonIndent: (defaults to 2) if writing JSON data this tells how many spaces should one indentation have.

##### returns:
Nothing.

##### Eg:

	fs.writeAsync(`${graphicsDir}/${filename}`,svgString,'utf8')
        .then(() => {
            return {
                name: filename,
                size: humanReadableSize(svgString)
            };
        });
        
#### 2.read(path, [returnAs])

#### asynchronous: readAsync(path, [returnAs])

Reads content of file.

##### arguments:
- path: path to file.
- returnAs: (optional) how the content of file should be returned. Is a string with possible values:

  - 'utf8': (default) content will be returned as UTF-8 String.
  - 'buffer': content will be returned as a Buffer.
  'json': content will be returned as parsed JSON object.
  'jsonWithDates': content will be returned as parsed JSON object, and date strings in ISO format will be automatically turned into Date objects.

##### returns:
File content in specified format, or undefined if file doesn't exist.


#### 3.inspect(path, [options])/inspectAsync(path, [options])
##### arguments:
- path: path to inspect.
- options (optional).
##### returns:


同步：返回一个obj，其包含了关于该文件的如下信息：

	{
	  name: "my_dir",
	  type: "file", // possible values: "file", "dir", "symlink" 
	  size: 123, // size in bytes, this is returned only for files 
	  // if checksum option was specified: 
	  md5: '900150983cd24fb0d6963f7d28e17f72',
	  // if mode option was set to true: 
	  mode: 33204,
	  // if times option was set to true: 
	  accessTime: [object Date],
	  modifyTime: [object Date],
	  changeTime: [object Date]
	}
		
异步：返回包含以上obj的resolve的promise