### ☆☆ 4.gulp模块
<https://github.com/gulpjs/gulp/blob/4.0/docs/API.md>

#### （1）gulp.src(globs[, options])
发射匹配的文件（以进行后续pipe操作）

eg:

	gulp.src('client/templates/*.jade')
	  .pipe(jade())
	  .pipe(minify())
	  .pipe(gulp.dest('build/minified_templates'));

#### （2）gulp.dest(path[,options])
可用管道送至此，它会将接收值写入文件。多次发射数据就可以用管道发送到多个文件夹。不存在的文件夹将会被创建。

##### eg:
	
	gulp.src('./client/templates/*.jade')
	  .pipe(jade())
	  .pipe(gulp.dest('./build/templates'))
	  .pipe(minify())
	  .pipe(gulp.dest('./build/minified_templates'));

##### 参数path:

  type为 string or function,规定要写入的文件，或者一个可以返回要写入的文件的函数。

##### 参数options:
   type 为Object，包括

- cwd：type String, 默认为process.cwd(),cwd for the output folder, only has an effect if provided output folder is relative.（***待理解***）
- mode:type String or Number,默认为input文件的mode(即file.stat.mode)
- dirMode:
- overwrite:type Boolean,默认为true,指明当写入文件路径相同时是否覆盖。

#### （3）gulp.parallel(...tasks)
并行运行任务。

##### 参数tasks
可以是任务名称，也可以是一个函数。

#### (4)gulp.watch(globs[, opts][, fn])
当文件(globs)发生变化的时候，运行fn

##### 参数globs
type为string or Array

为路径字符串，指定要检测变化的文件。

##### 参数obs
 type为object

- 
- ay（millise
- nds,default:200):触发函数之前的等待时间，单位ms
- queue(boolean,default:true):一个文件改变后是否执行函数fn。
- ignoreInitial(boolean,default:true):

##### 参数fn

type为function


#### （5）gulp.task([name,]fn)
定义一个任务或获取一个已经定义的任务

定义任务：

	gulp.task('mytask',function(){
		//Do something
	}

##### param
###### name

###### fn 
**Gulp tasks are asynchronous and Gulp uses async-done to wait for the task's completion. **

Eg:

```
	gulp.task('clean', function(done) {
		del(['.build/'], done);
	});
```

```
	gulp.task('del', (done) => {
		del(['.tmp','dist','deploy']).then( paths => {
			console.log('Deleted files:\n',paths.join('\n'));
			done();
		});
	});
```

#### （6）gulp.series(...tasks)
并行执行任务。