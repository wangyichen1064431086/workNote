
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

#### switch

	package main
	
	import (
		"fmt"
		"runtime"
	)
	
	func main() {
		fmt.Print("Go runs on ")
		fmt.Println(runtime.GOOS)
		switch os := runtime.GOOS; os {
		case "darwin":
			fmt.Println("OS X.")
		case "linux":
			fmt.Println("Linux.")
		default:
			// freebsd, openbsd,
			// plan9, windows...
			fmt.Printf("%s.", os)
		}
	}

#### switch的求值顺序
switch 的 case 语句从上到下顺次执行，直到匹配成功时停止。

（例如，

	switch i {
		case 0:
		case f():
	}
在 i==0 时 f 不会被调用。）

Code Eg:

	package main

	import (
		"fmt"
		"time"
	)
	
	func main() {
		fmt.Println("When's Saturday?")
		today := time.Now().Weekday()
		fmt.Println(today)
		fmt.Println(time.Saturday)
		fmt.Println(today+2)
		switch time.Saturday {
		case today + 0:
			fmt.Println("Today.")
		case today + 1:
			fmt.Println("Tomorrow.")
		case today + 2:
			fmt.Println("In two days.")
		default:
			fmt.Println("Too far away.")
		}
	}

#### 没有条件的switch
没有条件的switch同switch true 一样。

该形式能将一长串if-else写得更清晰。

	package main

	import (
		"fmt"
		"time"
	)
	
	func main() {
		t := time.Now()
		fmt.Println(t)
		switch {
		case t.Hour() < 12:
			fmt.Println("Good morning!")
		case t.Hour() < 17:
			fmt.Println("Good afternoon.")
		case t.Hour() < 21:
			fmt.Println("Good evening.")
		default:
			fmt.Println("Good night.")
		}
	}

#### defer
A defer statement defers the execution of a function until the surrounding function returns.(defer 语句会将函数推迟到外层函数返回之后执行。)

推迟调用的函数其参数会立即求值，但直到外层函数返回前该函数都不会被调用。

Code Eg:

	package main
	
	import "fmt"
	
	func main() {
		defer fmt.Println("world")
		defer fmt.Println("hahaha")
		defer fmt.Println("lalala")
		fmt.Println("hello")
	}

运行结果：

	"hello"
	"lalala"
	"hahaha"
	"world"

#### Stacking defers(defer栈)
推迟的函数调用会被压入一个栈中。 当外层函数返回时，被推迟的函数会按照后进先出的顺序调用。

Code Eg:

	package main

	import "fmt"
	
	func main() {
		for i:=0;i<5;i++ {
			defer fmt.Println(i)
		}
	}

运行结果：4 3 2 1 0

无defer的话运行结果是 0 1 2 3 4

### 1.3 More types: structs, slices,and maps

#### Pointers(指针）
Go 具有指针。 指针保存了变量的内存地址。

类型 *T 是指向 T 类型值的指针。其零值为 nil 。

	var p *int

& 操作符会生成一个指向其操作数的指针。

	i := 42
	p = &i

*操作符表示指针指向的值。

	fmt.Println(*p)// 通过指针 p 读取 i
	*p = 21 //通过指针p设置i

This is known as "dereferencing" or "indirecting".（间接引用或重定向）

**与C不同，Go没有指针运算。

Code Eg:

	package main

	import "fmt"
	
	func main() {
		i, j := 42, 2701
	
		p := &i         // point to i
		fmt.Println(p) //0xc042004280
		fmt.Println(*p) // read i through the pointer:42
		*p = 21         // set i through the pointer
		fmt.Println(i)  // see the new value of i:21
	
		p = &j         // point to j
		*p = *p / 37   // divide j through the pointer
		fmt.Println(j) // see the new value of j//73
	}


#### Structs(结构体）
A struct is a collection of fields(一个结构体就是字段的集合）

type声明用于定义类型。

Code Eg:

	package main

	import "fmt"
	
	type Vertex struct {
		X int
		Y int
	}
	
	type Circle struct {
		centerx float32
		centery float32
		radius float32
	}
	
	func main() {
		fmt.Println(Vertex{1, 2})
		fmt.Println(Circle{3,4,5})
	}	

运行结果：

	{1 2}
	{3 4 5}



#### 结构体字段
使用点号来访问。

	package main

	import "fmt"
	
	type Vertex struct {
		X int
		Y int
	}
	
	type Circle struct {
		centerx float32
		centery float32
		radius float32
	}
	
	func main() {
		v := Vertex{1, 2}
		v.X = 4
		fmt.Println(v.X)
		c := Circle{3,4,5}
		c.centerx = 3.5
		fmt.Println(c.centerx)
	}

#### 结构体指针
结构体字段可以通过结构体指针来访问。

如果我们有一个指向结构体的指针 p ，那么可以通过 (*p).X 来访问其字段 X 。 不过这么写太啰嗦了，所以语言也允许我们使用隐式间接引用，直接写 p.X 就可以。

Code Eg:

	package main

	import "fmt"
	
	type Circle struct {
		centerx float32
		centery float32
		radius float32
	}
	
	func main() {
		c := Circle{3,4,5}
		p := &c
		fmt.Println(p.radius)//5
	}

#### Struct Literals（结构体文法）

结构体文法通过直接列出字段的值来新分配一个结构体。

Code Eg:

	package main

	import "fmt"
	
	type Vertex struct {
		X, Y int
	}
	
	var (
		v1 = Vertex{1, 2}  // has type Vertex
		v2 = Vertex{X: 1}  // Y:0 is implicit
		v3 = Vertex{}      // X:0 and Y:0
		v4 = Vertex{X:3,Y:4}
		v5 = Vertex{Y:5,X:2}
		p  = &Vertex{1, 2} // has type *Vertex
	)
	
	func main() {
		fmt.Println(v1, v2, v3,v4,v5, p)
	}

运行结果： {1 2} {1 0} {0 0} {3 4} {2 5} &{1 2}

#### Arrays
类型[n]T 表示拥有n个T类型的值的数组。

表达式

	var a [10]int

将变量 a 声明为拥有有 10 个整数的数组。

数组的长度是其类型的一部分，因此数组不能改变大小。 这看起来是个限制，不过没关系， Go 提供了更加便利的方式来使用数组。

Code Eg:

	package main
	
	import "fmt"
	
	func main() {
		var a [2]string
		a[0] = "Hello"
		a[1] = "World"
		fmt.Println(a[0], a[1])
		fmt.Println(a)
	
		primes := [6]int{2, 3, 5, 7, 11, 13}
		fmt.Println(primes)
		
		p := [6]int {2,3,4}
		fmt.Println(p)
	}

运行结果

	Hello World
	[Hello World]
	[2 3 5 7 11 13]
	[2 3 4 0 0 0]

#### Slices（切片）
每个数组的大小都是**固定**的。 而**切片则为数组元素提供动态大小的、灵活的视角**。 在实践中，**切片比数组更常用**。

类型[]T表示一个元素类型为T的切片

以下表达式为数组a的前五个元素创建了一个切片：

	a[0:5]

Code Eg:

	package main

	import "fmt"
	
	func main() {
		primes := [6]int{2, 3, 5, 7, 11, 13}
	
		var a []int = primes[1:4]
		fmt.Println(a)//[3 5 7]
	}

#### Slices are like references to arrays（切片就像数组的引用）

- 切片并不存储任何数据， 它只是描述了底层数组中的一段。

- 更改切片的元素会修改其底层数组中对应的元素。

- 与它共享底层数组的切片都会观测到这些修改。

Code Eg:

	package main

	import "fmt"
	
	func main() {
		names := [4]string{
			"John",
			"Paul",
			"George",
			"Ringo",
		}
		fmt.Println(names)
	
		a := names[0:2]
		b := names[1:3]
		fmt.Println(a, b)
	
		b[0] = "XXX"
		fmt.Println(a, b)
		fmt.Println(names)
	}

运行结果：

	[John Paul George Ringo]
	[John Paul] [Paul George]
	[John XXX] [XXX George]
	[John XXX George Ringo]

#### Slice literals（切片文法）
切片文法类似于没有长度的数组文法

这是一个数组文法：

	[3]bool{true, true, false}

下面这样则会创建一个和上面相同的数组，然后构建一个引用了它的切片：

	[]bool{true, true, false}


Code Eg:

	package main

	import "fmt"
	
	func main() {
		q := []int{2, 3, 5, 7, 11, 13}
		fmt.Println(q)
	
		r := []bool{true, false, true, true, false, true}
		fmt.Println(r)
	
		s := []struct {
			i int
			b bool
		}{
			{2, true},
			{3, false},
			{5, true},
			{7, true},
			{11, false},
			{13, true},
		}
		fmt.Println(s)
	}

#### Slice defaults（切片的默认行为）
在进行切片时，你可以利用它的默认行为来忽略上下界。

切片**下界的默认值为 0 ，上界则是该切片的长度。**

	var a [10]int

对a 来说，以下切片是等价的：

	a[0:10]
	a[:10]
	a[0:]
	a[:]

#### Slice length and capacity(切片的长度与容量)
切片的长度就是它所包含的元素个数。

切片的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数。

切片 s 的长度和容量可通过表达式 len(s) 和 cap(s) 来获取。

#### nil切片
切片的零值是nil。

其长度和容量为0且没有底层数组。

Code Eg:

	package main

	import "fmt"
	
	func main() {
		var s []float32
		fmt.Println(len(s),cap(s))
		if s == nil {
			fmt.Println("nil!")
		}
	}

#### Creating a slice with make
切片可用内建函数make创建。

make 函数会分配一个元素为零值的数组并返回一个引用了它的切片：

	a := make([]int,5)//len(a)=5

要指定它的容量，需向 make 传入第三个参数：
	
	b := make([]int, 0, 5) // len(b)=0, cap(b)=5


#### Slices of slices
切片可包含任何类型，甚至包括它的切片。

Code Eg:

	package main

	import (
		"fmt"
		"strings"
	)
	
	func main() {
		board := [][]string{
			[]string{"_", "_", "_"},
			[]string{"_", "_", "_"},
			[]string{"_", "_", "_"},
		}
	
		board[0][0] = "X"
		board[2][2] = "O"
		board[1][2] = "X"
		board[1][0] = "O"
		board[0][2] = "X"
	
		for i := 0; i < len(board); i++ {
			fmt.Printf("%s\n", strings.Join(board[i], " "))
		}
		
		ss := [][]int{
			[]int{1,2,3},
			[]int{4,5},
			[]int{6,7,8,9},
		}
		for i := 0;i<len(ss);i++{
			fmt.Println(ss[i])
		}
	}

运行结果：

	X _ X
	O _ X
	_ _ O
	[1 2 3]
	[4 5]
	[6 7 8 9]

#### 向切片追加元素

内建函数append

#### Range
for 循环的range形式可遍历切片或映射。

此时每次迭代都会返回两个值。当第一个值为当前元素的下标，第二个值为该下标所对应元素的一份副本。

Code Eg:

	package main

	import "fmt"
	
	var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
	
	func main() {
		for i, v := range pow {
			fmt.Printf("2**%d = %d\n", i, v)
		}
	}

可将下标或值赋予_来忽略它：

	for _, value := range pow {
		fmt.Printf("%d\n", value)
	}

#### 练习：切片
暂略

#### Maps
A map maps keys to values

看到这里了 <https://tour.go-zh.org/moretypes/16>