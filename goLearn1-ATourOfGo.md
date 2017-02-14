
# A Tour of Go
<https://tour.golang.org/welcome/1>

中文版指南
<https://tour.go-zh.org/welcome/1>


用三个section来进行了对Go的交互式介绍。

第一section介绍了basic syntax(基本语法)和data structures(数据结构）;第二个section讨论了methods and interfaces;第三个section介绍了Go的concurrency primitives（并发原理）。


## What is Go?（视频笔记）
- Concurrent(并发的),garbage-collected,builds fast at scale.

		The private motivation for doing a new language was to create something that can handle the scale of programming that we have a google both in a number of lines of code and number of engineers working on the code.

- Fast,Fun, Productive language.
- Go approached interfaces
- Go support for reflection on types and values
- Go support for concurrency


## 指南的使用
本地安装：

	C:\> go get github.com/Go-zh/tour/gotour

	C:\>E:\goWork\bin\totour

打开： http://127.0.0.1:3999/basics/1

## Section1 基础
### 1.1 包、变量和函数

#### 包
- 每个Go 程序都是由包构成
- 程序从main包开始运行
- 按照约定，包名与导入路径的最后一个元素一致，如，"math/rand" 包中的源码均以 package rand 语句开始。

Code Eg:

	package main

	import (
		"fmt"
		"math/rand"
	)
	
	func main() {
		fmt.Println("My favorite number is", rand.Intn(10))
	}


#### 导入
用分组导入语句或多个导入语句：

	import (
		"fmt"
		"math"
	)

或 

	import "fmt"
	import "math"

**使用分组导入语句是更好的形式**

#### 导出名
Go中，如果一个名字以大写字母开头，它就是已导出的。如Pizza,Pi都是导出名，Pi出自math包。

如果名字未以大写字母开头，它就是未导出的。如pizza,pi。

在导入一个包时，你只能引用其中已导出的名字。任何“未导出”的名字在该包外均无法访问。

CodeEg:

	package main
	
	import (
		"fmt"
		"math"
	)
	
	func main() {
		fmt.Println(math.pi)//报错，将其改为math.Pi就行了
	}


#### 函数
- 函数可以没有参数或接受多个参数
- 类型在变量名**之后**，参考https://blog.go-zh.org/gos-declaration-syntax了解最终类型声明形式出现的原因。（***待看***）
- 当连续两个或多个函数的已命名形参类型相同时，除最后一个类型以外，其它都可以省略。

CodeEg:

	
	package main

	import "fmt"
	
	func add(x int, y int) int {
		return x + y
	}
	func subtraction(x, y int) int {
		return x-y
	}
	func main() {
		fmt.Println(add(42, 13))
		fmt.Println(subtraction(12,9))
	}

#### Multiple results(函数的多值返回)
函数可以返回任意数量的返回值。

CodeEg:

	package main
	
	import "fmt"
	
	func swap(x, y string) (string, string) {
		return y, x
	}
	
	func addAndSub(x, y int) (int, int){
		return x+y,x-y
	}
	
	func main() {
		a, b := swap("hello", "world")
		fmt.Println(a, b)
		c, d := addAndSub(4, 3)
		fmt.Println(c, d)
	}

#### Named return values(命名函数返回值)
Go的返回值可以被命名，它们会被视作定义在函数内部的顶层的变量。

return语句如果后面不接参数，则会返回已命名的返回值。即"naked" return(裸体返回）。

裸体返回只能用于short functions。 在longer functions中，使用naked return会损害可读性。


Code Eg:

	package main

	import "fmt"
	
	func split(sum int) (x, y int) {
		x = sum * 4 / 9
		y = sum - x
		return
	}
	
	func addAndSub(x,y int)(addR,subR int){
		addR = x+y
		subR = x-y
		return
	}
	
	func main() {
		fmt.Println(split(17))
		fmt.Println(addAndSub(20,10))
	}

#### Variables
- var 语句用于声明一个变量列表，跟函数的参数列表一样，类型在最后。
- var 语句can be at package or function level(可以出现在包或函数级别)

CodeEg:

	package main

	import "fmt"
	
	var c, python, java bool
	
	func main() {
		var i int
		var b int
		fmt.Println(i,b, c, python, java)
	}
	
运行结果：

	0 0 false false false

#### Variables with initializers(变量的初始化)

- 变量声明可以包含初始值，每个变量对应一个。
- 如果初始化值已存在，则可以省略类型；变量会从初始值中获得类型。

Code Eg:

	package main

	import "fmt"
	
	var i, j int = 1, 2
	var x, y = 0, "I love you"
	
	func main() {
		var c, python, java = true, false, "no!"
		fmt.Println(i, j, c, python, java,x,y)
	}
	
运行结果： 1 2 true false no! 0 I love you

#### Short variable declarations（短变量声明）
**在函数**中，简洁赋值语句 := 可在类型明确的地方代替 var 声明。

函数外的每个语句都必须以关键字开始（ var 、 func 等等）， 因此 := 结构不能在函数外使用。

Code Eg:

	package main

	import "fmt"
	
	func main() {
		var i, j int = 1, 2
		k := 3
		c, python, java := true, false, "no!"
		x,y := 888,"happy new year!"
	
		fmt.Println(i, j, k, c, python, java,x,y)
	}

#### Basic types

Go的基本类型有：

	bool

	string
	
	int  int8  int16  int32  int64
	uint uint8 uint16 uint32 uint64 uintptr
	
	byte // uint8 的别名
	
	rune // int32 的别名
	     // 表示一个 Unicode 码点
	
	float32 float64
	
	complex64 complex128

 variable declarations may be "factored" into blocks, as with import statements（同导入语句一样，变量声明也可以“分组”成语法块）

int 、 uint 和 uintptr 在 32 位系统上通常为 32 位宽，在 64 位系统上则为 64 位宽。 当你需要一个整数值时应使用 int 类型，除非你有特殊的理由使用固定大小或无符号的整数类型。

Code Eg:

	package main

	import (
		"fmt"
		"math/cmplx"
	)
	
	var (
		ToBe   bool       = false
		MaxInt uint64     = 1<<64 - 1
		z      complex128 = cmplx.Sqrt(-5 + 12i)
	)
	
	var (
		x,y= 1,"happy"
		c string = "happy Valentine's Day"
	)
	func main() {
		const f = "%T(%v)\n"
		fmt.Printf(f, ToBe, ToBe)
		fmt.Printf(f, MaxInt, MaxInt)
		fmt.Printf(f, z, z)
		fmt.Printf(f,x,x)
		fmt.Printf(f,y,y)
	}


运行结果为：

	bool(false)
	uint64(18446744073709551615)
	complex128((2+3i))
	int(1)
	string(happy)

#### Zero values（零值）
Variables declared without an explicit initial value are given their zero value.（没有明确初始值的变量声明会被赋予它们的 零值 。）

Code Eg:

	package main

	import "fmt"
	
	func main() {
		var i int
		var f float64
		var b bool
		var s string
		
		fmt.Printf("%v %v %v %q\n", i, f, b, s)
	}

运行结果为：

	0 0 false ""

#### Type Conversions（类型转换）

表达式T(v)将值v转换为类型T。

Code Eg:

	package main

	import (
		"fmt"
		"math"
	)
	
	func main() {
		var x, y int = 3, 4
		var f float64 = math.Sqrt(float64(x*x + y*y))
		var z uint = uint(f)
		var m = float32(x)
		k := float64(y)
		fmt.Println(x, y, z, m, k)
	}

运行结果：3 4 5 3 4

#### Type inference(类型推导）
在声明一个变量而不指定其类型时，即：

	1. x := 1
	2. var x = 1

两种形式，变量的类型由右值推导得出。

当等号右侧的变量已经声明了类型时，等号左侧的新变量就具有与其相同的类型：

	var i int
	j := i //j也是一个int

不过当右边包含未指明类型的数值常量时，新变量的类型就可能是 int 、 float64 或 complex128 了，这取决于常量的精度：
	
	i := 42           // int
	f := 3.142        // float64
	g := 0.867 + 0.5i // complex128

Code Eg:

	package main
	
	import "fmt"
	
	func main() {
		v := 42 // 修改这里！
		fmt.Printf("v is of type %T\n", v)//int
	}

修改1:

	v := 42.0 // 修改这里！
	fmt.Printf("v is of type %T\n", v)//float64

#### Constants(常量）
常量的声明与变量类似，只不过是使用const关键字。

常量可以是character, string, boolean, or numeric values。

常量不能用 := 语法声明。

Code Eg:

	package main

	import "fmt"
	
	const Pi = 3.14
	
	func main() {
		const World = "世界"
		fmt.Println("Hello", World)
		fmt.Println("Happy", Pi, "Day")
	
		const Truth = true
		fmt.Println("Go rules?", Truth)
		
		const today = "情人节"
		fmt.Println(today)
	}


#### Numeric Constants（数值常量）
Numeric constants are high-percision values(高精度值）。

一个未指定类型的常量由上下文来决定其类型。

**NOTE: (An int can store at maximum a 64-bit integer, and sometimes less.)**


Code Eg:

	package main

	import "fmt"
	
	const (
		Big = 1 << 100//左移100位	
		Small = Big >> 99//右移99位
	)
	
	func needInt(x int) int { return x*10 + 1 }
	func needFloat(x float64) float64 {
		return x * 0.1
	}
	
	func main() {	
		fmt.Println(Small)//2
		fmt.Println(needInt(Small))//21
		fmt.Println(needFloat(Small))//0.2
		fmt.Println(needFloat(Big))//1.2676506002282295e+29
		fmt.Println(needInt(Big))//Error: .\compile41.go:23: constant 1267650600228229401496703205376 overflows int
	}

### 1.2 控制流语句:for、if、else、else、switch和defer

#### for
- Go 只有一种循环结构： for 循环。

- 基本的 for 循环由三部分组成，它们用分号隔开：

	- 初始化语句：在第一次迭代前执行
	- 条件表达式：在每次迭代前求值
	- 后置语句：在每次迭代的结尾执行

- **初始化语句通常为一句短变量声明，该变量声明仅在 for 语句的作用域中可见。**
- for语句的初始化语句和后置语句时可选的，**条件表达式是必需的**。
- 和 C、Java、JavaScript 之类的语言不同，**Go 的 for 语句后面没有小括号，大括号 { } 则是必须的。**

Code Eg:

	package main

	import "fmt"
	
	func main() {
		sum := 0
		for i:=0;i<=100;i++{
			sum += i
		}
		fmt.Println(sum)
	}

运行结果：5050

	package main
	
	import "fmt"
	
	func main() {
		sum := 1
		for ;sum<=100; {
			sum+=sum
		}
		fmt.Println(sum)
	}

运行结果：128

#### for 可以充当Go中的"While"
去掉分号即可将for变为while

Code Eg:

	package main

	import "fmt"
	
	func main() {
		i := 1
		sum := 0
	   for i<= 100 {
	   		sum += i;
			 i++
	   }
		fmt.Println(sum)
	}

运行结果：5050

#### 无限循环

	package main
	
	func main() {
		for {
		}
	}

#### if
Go的if语句与for循环类似，表达式外无需小括号()，而大括号{}是必需的。

Code Eg:

	package main

	import (
		"fmt"
		"math"
	)
	
	func sqrt(x float64) string {
		if x < 0 {
			return sqrt(-x) + "i"
		}
		return fmt.Sprint(math.Sqrt(x))
	}
	
	func main() {
		fmt.Println(sqrt(2), sqrt(-4),sqrt(0))
	}

#### If with a short statement(if的简短语句）

Code Eg:
	
	package main
	
	import (
		"fmt"
		"math"
	)
	
	func pow(x, n, lim float64) float64 {
		if v := math.Pow(x, n); v < lim {
			return v
		}
		return lim
	}
	
	func main() {
		fmt.Println(
			pow(3, 2, 10),
			pow(3, 3, 20),
		)
	}

运行结果： 9，20

说明：math.Pow(x,n)，求x的n次方，参见<https://golang.org/pkg/math/#Pow>

#### if 和 else
在 if 的简短语句中声明的变量同样**可以在任何对应的 else 块中使用**。


Code Eg:

	package main

	import (
		"fmt"
		"math"
	)
	
	func pow(x, n, lim float64) float64 {
		if v := math.Pow(x, n); v < lim {
			return v
		} else {
			fmt.Printf("%g >= %g\n", v, lim)
		}
		// 这里开始就不能使用 v 了
		return lim
	}
	
	func main() {
		fmt.Println(
			pow(3, 2, 10),
			pow(3, 3, 20),
		)
	}

#### 练习
我们来简单练习一下函数和循环：用牛顿法实现平方根函数。

在本例中，牛顿法是通过选择一个起点 z 然后重复以下过程来求 Sqrt(x) 的近似值：


为此只需重复计算 10 次，并且观察不同的值（1，2，3，……）是如何逐步逼近结果的。 然后，修改循环条件，使得当值停止改变（或改变非常小）的时候退出循环。观察迭代次数是否变化。结果与 math.Sqrt 接近吗？

我的程序：

	package main

	import (
		"fmt"
		"math"
	)
	
	func Sqrt(x float64) float64 {
		
		rightv := math.Sqrt(x)
		z := x
		err := z-rightv
		fmt.Println(rightv)
		fmt.Println(err)
	   for err>0.001{
	   	  z = z - (z*z-x)/(2*z)
		  err = z-rightv
		  fmt.Println("err:",err)
		  fmt.Println("z:",z)
	
	   }
	   return z
	}
	
	func main() {
		fmt.Println(Sqrt(2.0))
	}