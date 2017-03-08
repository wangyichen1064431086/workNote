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

compiles:

	C:\> go build github.com/user/stringutil

Or, if you are working in the package's source directory, just:

	go build


**NOTE:This won't produce an output file. To do that, you must use go install, which places the package object inside the pkg directory of the workspace.(go build并不产生新文件，只有使用go install才会在pkg目录下生成。)**

修改 hello.go 为：

	package main

	import (
		"fmt"
		"github.com/wangyichen1064431086/stringutil"
	)
	func main() {
	    fmt.Printf(stringutil.Reverse("！oG, olleH"))
	}

执行：

	C:\> go install github.com/user/hello

产生:

- pkg/windows_amd64/github.com/wangyichen1064431086/stringutil.a
- bin/hello.exe

再执行：

	C:\> E:\goWork\bin\hello

产生文件

### Package names
The first statement in a Go source file must be:
	
	package name

Executable commands must always use (就是可执行文件必须是main而不能用其他name)

	package main.

There is no requirement that package names be unique across all packages linked into a single binary, only that **the import paths (their full file names) be unique**.

### Testing
见E:\goWork\src\github.com\wangyichen1064431086\stringutil\reverse_test.go

#### run:

	go test github.com/wangyichen1064431086/stringutil

you are running the go tool from the package directory, you can omit the package path:

    go test

### Remote packages

  	go get github.com/golang/example/hello

go get will **fetch,build,install** it automatically

然后执行:

	E:\> goWork\bin\hello

得到：

	Hello,Go examples!