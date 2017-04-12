### 8.gulp-changed
只处理改变了的文件。这样就不会在处理没有变化的文件上浪费时间。这个插件默认只能检测文件流中的文件是否改变。

#### （1）changed(destination,options)

##### 参数destination
type string or function,规定目标文件目录，和gulp.dest()一样。

它是会将现有文件和目标文件进行比较的。

##### 参数options
- cwd
- extension:目标文件的扩展名
- hasChanged: type function,默认为changed.
- 
- 
- mpareLastModifiedTime，是一个用于决定源文件和目标文件是否相同的函数。