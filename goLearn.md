# 资源链接
## 官网
<https://golang.org/#>
## doc
<https://golang.org/doc/>


# Getting Started
## Install go
1. Download the msi <https://storage.googleapis.com/golang/go1.7.5.windows-amd64.msi>

2. 点击安装到c:\go
3. 自动生成环境变量 GOROOT  C:\Go\

## Test Installation
1. Create a workspace,eg: E:\goWork
2. 设置环境变量：GOPATH为E:\goWork\
3. 创建目录E:\goWork\src\github.com\wangyichen1064431086\hello
4. 在该目录下创建文件hello.go,内容为：

		package main
		
		import "fmt"
		
		func main(){
			fmt.Printf("hello,world\n")
		}

5. compile it with the go tool:

		C:\> go install \github.com\wangyichen1064431086\hello

6. 执行编译结果：

		C:\> E:\goWork\bin\hello

	得到：
		hello,world

# A Tour of Go(官网Featured video视频笔记)
## What is Go?
- Concurrent(并发的),garbage-collected,builds fast at scale.

		The private motivation for doing a new language was to create something that can handle the scale of programming that we have a google both in a number of lines of code and number of engineers working on the code.

- Fast,Fun, Productive language.
- Go approached interfaces
- Go support for reflection on types and values
- Go support for concurrency

# How to Write Go Code
<https://golang.org/doc/code.html>
## Code organization
- Go programmers typically keep all their Go code in a single workspace.
- A workspace contains many version control repositories (managed by Git, for example).
- Each repository contains one or more packages.
- Each package consists of one or more Go source files in a single directory.
- The path to a package's directory determines its import path.

### Workspace
A directory hierarchy with 3 directories at its root:

- src: contains Go source file
- pkg: contains package objects
- bin: contains executable commands

### GOPATH 环境变量
指明你workspace的位置。这是开发Go 代码时你需要设置的唯一一个环境变量。

### Import paths
An import path 是一个字符串，独一无二地定义了一个package。一个package的import path是和它在workspace中的位置或者在远程仓库中的位置相一致的。

### First Program
见E:/goWork/src/github.com/wangyichen10644321086/hello/hello.go

### First Library
见E:/goWork/src/github.com/wangyichen10644321086/stringutil/stringutil.go

### Package names
The first statement in a Go source file must be:
	
	package name

Executable commands must always use 

	package main.

There is no requirement that package names be unique across all packages linked into a single binary, only that **the import paths (their full file names) be unique**.

### Testing
见E:\goWork\src\github.com\wangyichen1064431086\stringutil\reverse_test.go

### Remote packages

  	go get github.com/golang/example/hello

go get will **fetch,build,install** it automatically

然后执行:

	E:\> goWork\bin\hello

得到：

	Hello,Go examples!