# windows命令行

## 常用指令

### 新建空文件

新建名为app.js的空文件：

```cmd
cd yourProject
cd . > app.js
```

或

```cmd
type null > app.js
```

(第二种方法在windows powershell或cmd中会报错，但是也能实现新建空文件)

### 删除文件

```cmd
del app.js
```

### 新建文件夹

新建名为store的文件夹：

```cmd
md store
```

或

```cmd
makedir store
```

## 可参考教材

《Windows命令行详解手册》 [美]William R.Stanek著