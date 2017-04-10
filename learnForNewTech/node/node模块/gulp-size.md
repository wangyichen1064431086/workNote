## gulp-size
展示你的本项目文件的大小

API:
#### （1）$.size(options)

##### 参数options

- title:string,Default为'',用于起个标题
- gzip:boolean,Default为false，用于决定是否展示该项目的压缩文件大小作为替代
- pretty:boolean,Default为true,用于决定是否使用更完美的格式展示大小（例如，1337B→1.34kB)
- showFiles:boolean,Default为false,用于决定是否展示每一个文件大小（默认是只有总文件大小）
- showTotal:boolean,Default为true,用于决定是否展示总文件大小
#### （2）$.size.size:
number,文件总的bytes大小
#### （3）$.size.prettysize
.size的prettied版