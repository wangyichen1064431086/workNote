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

		C:\> go install github.com\wangyichen1064431086\hello

6. 执行编译结果：

		C:\> E:\goWork\bin\hello

	得到：
		hello,world


