# SASS学习

sass学习：

sass中文网<http://www.sass.hk/input-sass.html>（已看）

sass英文文档<http://sass-lang.com/documentation/file.SASS_REFERENCE.html>

# ReadMe
两种句法格式：.scss和.sass

.scss兼容css。

.sass是靠缩进产生块的。

### Using（Ruby下安装）
安装方法见<http://sass-lang.com/install>
#### 1. 下载并安装Ruby,
我下载的Ruby安装包在E:/DOWNLOAD

 我安装在 D:/Program Files/Ruby22-x64

安装时注意勾选添加到系统path的选项。

#### 2. 更新rubygems包：
cd到上述文件夹即：

	 D:/Program Files/Ruby22-x64/bin>

输入：

	gem install rubygems-update（如果不能识别gem则在之前添加.\)

	update_rubygems
#### 3.使用gem安装sass

	gem install sass --pre

#### 4.执行sass命令
查看sass命令：

	sass --help

编译sass文件为.css，结果直接显示在命令行中：
	
	//先cd到.scss文件所在目录
	sass style.scss 

编译sass文件为.css，结果生成新文件.css

	sass input.scss output.css


# SASS_REFERENCE
SASS是CSS的扩展，它使基本语言变得更强大和优雅。它允许你使用变量、嵌套规则、混合器、导入，并兼容CSS语法。SASS能够更好地组织大型的样式表，也使得小型样式表运行更快。

## 1. 特点
- 完全兼容CSS
- 语言的外延，例如变量、嵌套、混合器
- 很多有用的函数来操作颜色和其他值
- 高级功能，例如针对libraries的control directives
- 更是更好，更定制化的输出

## 2.语法
两种:.scss和.sass

二者可相互转换：
   
先cd到.sass或.scss所在文件夹：
	//Convert Sass to SCSS
	sass-convert style.sass style.scss//自动生成.scss文件
	
	//Convert SCSS to Sass
	sass-convert style.scss style.sass//自动生成.sass文件

## 3.使用sass


编译sass文件为.css，结果直接显示在命令行中：
	
	//先cd到.scss文件所在目录
	sass style.scss 

编译sass文件为.css，结果生成新文件.css

	sass input.scss output.css

检测sass变化，实时同步更新.css

	sass --watch input.scss:output.css

### Rack/Rails/Merb Plugin
略

### Options
可在environment.rb中配置。

文件路径在 D:/Program Files/Ruby22-x64/lib/ruby/gems/2.2.0/gems/sass-3.4.22/lib/sass/environment.rb

### Syntax Selection/Encoding部分
略

## 4.CSS Extentions
### 1. 嵌套规则
### 2. 父选择器：&
### 3. 嵌套属性
### 4.占位符选择器：%foo
SASS支持一种特殊类型的选择器，叫做“占位符选择器”。它们看起来和class、id选择器一样，只不过#或.被%替代。**它们只能和 @extend指令 一同使用。**


## 5.注释：
/* */ 和 //

## 6. SassScript
SassScript允许属性使用变量，算法和额外的函数。SassScript可以用于任何属性值。

SassScript还可以用于产生选择器和属性名称，当写混合器的时候是很有用的。

### 1. Interactive Shell(交互内核）
进入sass的Interactive Shell:

	sass -i 

随便输入命令：

	>> 1px + 1px + 1px
	3px
	>> #777 + #777
	#eeeeee
	>> #777 + #888
	#ffffff

### 2. Variables:$
定义方式：

	$width:5em;

可以在属性中引用它：
	
	$width:5em;
	
	#main{
		width:$width;
	}

变量只在它被定义在嵌套块内有效。如果它们定义在任何块的外部，则它们在任何地方都有效。它们也可以在定义时带有!global标志，这样它们也会在任何地方都有效。例如：

		#main{
			$height:12px !global;
			width:$width;
		}
		
		#sidebar{
			height:$height;
		}

变量名称中的连字符-和下划线符_是可互换使用的。
即$main-width变量你也可以通过$main_width来引用。

### 3.Data Types
SassScript支持7种主要的数据类型：

- numbers(e.g. 1.2, 13, 10px)
- string,带或者不带引号(eg. "foo",'bar',baz)
- colors(e.g. blue,#04a3f9, rgba(255, 0, 0, 0.5)）
- booleans(e.g. null)
- lists,被空格或者被逗号分隔(e.g. 1.5em 1em 0 2em, Helvetica, Arial, sans-serif)
- maps:(e.g.(key1:value1,key2:value2))

#### 1.String
CSS规定了两种字符串：一种是带引号的，例如 "Lucida Grande" or 'http://sass-lang.com'，另一种是不带引号的，例如sans-serif or bold。Sass对于这两种类型都可以识别。而且通常来说，如果Sass中用的是其中一种形式，那么在其得到的CSS中也会使用那种形式。

但是有一种情况例外，就是#{},例如：


	@mixin firefox-message($selector) {
	  body.firefox #{$selector}:before {
	    content: "Hi, Firefox users!";
	  }
	}
	
	@include firefox-message(".header");
	
	//is compiled to:
	
	body.firefox .header:before {
	  content: "Hi, Firefox users!"; }

#### 2. Lists
类似JS中的数组。

##### 定义方式：

	//一维数据
	$px: 5px 10px 20px 30px;
	
	//二维数据，相当于js中的二维数组
	$px: 5px 10px, 20px 30px;
	$px: (5px 10px) (20px 30px);
##### list函数
lists本身没什么，但SassScript的list函数使得list非常有用。如nth函数可在针对一个list获取item；join函数可以将多个list拼在一起;append函数可以为list添加item；@each指令也可以为list中的每个item添加样式。



##### 包含list的list
除了包含简单值外，lists也可以包含其他的lists。1px 2px, 5px 6px就是一个具有两个项目的list,其包含了list 1px 2px和list 5px 6px。如果内层lists和外层lists具有相同的分割符，你就使用()来标出内层lists开始和结束之处。例如，（1px 2px)（5px 6px)也是一个具有两个项目的list。

##### CSS不理解(1px 2px）（5px 6px)
当lists转换为CSS时，Sass不为其添加任何括号，因为**CSS不理解它们。这说明(1px 2px）（5px 6px)和1px 2px 5px 6px在变成CSS时会变得一样。** 但是，当它们是Sass时，它们是不一样的。

##### 空list
形如()(这也是一个空map)。它们不能直接输出为CSS；如果你试图使用这种形式，如font-family:()，Sass会报错。如果一个list包含空list或null值，如1px 2px () 3px or 1px 2px null 3px，当其**转化为CSS时，这个空lists和null会被去掉**。

##### 单元素list
(1,)就是一个 包含1的list；(1 2 3,)是一个逗号分隔的list，其包含了一个空格分隔的list，其又包含了1，2和3。

#### 3.Maps
Maps代表了key和value之间的关联，其key是用于查找values的。它们在CSS中没有类似的东西，即使它们在句法上很类似于media query expressions（***？？？是啥***）。

	$map:(key1:value1,key2:value2,key3:value3);

和lists不同，**maps必须总是被括号包围，并且总是逗号分隔的**。**keys和values二者都可以是任何的SassScript对象**。一个map可能只有一个value和一个对应的key（即使那个value可以是一个list)。一个value也可能对应多个key。

和lists一样，maps多用SassScript函数操纵。map-get函数可以查找map中的值；map-merge函数可以为map添加值；@each指令可用于给map中的每个键值对添加style。map中键值对的顺序是在map被创建时就决定好了的。

**Map可以用于任何可用list的地方。当使用一个list函数，map会被当做键值对的list处理**。但是，list不可以被当做map处理，除了空list。**（）既可以代表一个没有键值对的map，也可以代表一个没有元素的list**。

注意map的key可以为任何Sass的数据类型（甚至是另一个map),且声明一个map的句法允许是任意的SassScript表达式。(***不太懂这话的意思***)。

Maps不能转换为纯CSS。使用Map作为一个变量的值或一个CSS函数的参数都会导致错误。可以使用inspect($value)函数来产生一个输出的string，这样对于调试map是很有用的。

### 4.Colors
任何CSS颜色表达式都会返回一个SassScript颜色值。

在压缩的输出模式下，Sass会输出颜色的最小的CSS表示法。例如#FF0000会在压缩模式下输出为red,但blanchedalmond会输出#FFEBCD。

人们在使用命名的颜色时遇到的一个共同问题就是：由于Sass喜欢和其他输出格式同样的输出格式，插入选择器的color会在压缩的时候变成无效的语法。为了避免这个问题，选择器中的命名颜色要打上引号。

### 5.运算符（Number Operations)
 所有数据类型都支持相等运算符(==和!=)。此外，每种数据类型拥有它自己支持的独有的运算符。

#### 1）算术运算符
SassScript的number类型支持标准的算术运算符（+，-，*，/,%)。Sass在算术运算时，是可以保留单位的。但是你不能操作带不兼容单位的数据，比如同时给一个number添加了px和em单位，或 

	10 px *10px==100px*Px //错误

注意px*px 是一个无效的css单位。

关系运算符(<,>,<=,>=)也是支持number的。

##### 除法和/符号
CSS允许/出现在属性值中，其实作为一种分隔数据的方式。由于SassScript是CSS属性语法的一种拓展，它在支持/用于除法的同时也必须支持此事。这说明，默认地，在SassScript中，如果两个number在被/分隔，它们也会在生成的CSS中保持这种样子。

然而，有三种/被解释为除号的情况：

1. 如果某个值或某值中的一部分是存储在变量中的，或者是通过一个函数返回的。
2. 如果某个值是被括号包围的，除了列表之外。
3. 如果某个值是作为另外一个算术表达式的一部分。

Eg:

	p{
		font:10px/8px; // no division
		$width:1000px;
		width:$width/2; //Uses avariable,does division
		width:round(1.5)/2;//Uses a function,does division
		height:(500px/2);//Uses parentheses,does division
		margin-left:5px+8px/2px;//Uses+,does division
		font:(italic bold 10px/8px);//In a list,parenthese don't count
	}

编译结果为：

	p{
		font:10px/8px; // no division
		$width:1000px;
		width:$width/2; //Uses avariable,does division
		width:round(1.5)/2;//Uses a function,does division
		height:(500px/2);//Uses parentheses,does division
		margin-left:5px+8px/2px;//Uses+,does division
		font:(italic bold 10px/8px);//In a list,parenthese don't count
	}

如果你想要对变量使用纯CSS的/，你可以使用#{}来插入变量。例如：

	a{
		$font-size:12px;
		$line-height:30px;
		font:#{$font-size}/#{$line-height};
	}

编译结果为：

	a {
  		font: 12px/30px;
	 }


##### 减法，负数和-

CSS和Sass中的-有很多不同的意思。它可以是减法运算符（如5px-3px)，在负数的首部（如-3px),一元操作符（如 -$var),或者标识符的一部分（如 font-weight）。多数情况这样的区分是很清楚的，但也有些棘手的情况。一般地，遵守以下规则是最安全的：

- 当-作为减法运算符时，你在-的两侧都使用空格
- 当-作为负数或一元操作符时，你在-的前面使用空格后面不使用空格
- 当-在空格分隔的list中作为一元操作符时，你使用括号将其包围起来，如 10px (-$var)。

-的不同意义按照下面的优先级选取：

1. -作为标识符的一部分。如 a-1。这表明a-1是一个不带引号的字符串。唯一的例外是单位；Sass一般允许任何有效的标识符作为标识符使用，但是标识符可能不会包含后面紧跟着数字的连字符。这表明5px-3px和5px - 3px是一样的。
2. -在两个数字之间且没有空格。这表明是一个减号，故 1-2和1 - 2是一样的。
3. -在number开头。这表明是一个负数，所以1 -2是一个list，其包含1和-2。
4. -在两个number之间，且忽略空格。这表明是一个减号，所以1 -$var和1 - $var是一样的。
5. -在一个值之前。这表明是一个一元否定运算符；也就是说，其返回的是该值的负数。


#### 2）颜色操作符（Color Operations)
所有的算术运算符也支持颜色值，此时其实际上是分段函数。这表示其会轮流得到red,green 和 blue。eg:

	p{
		color:#010203 + #040506;
	}

编译结果为：

	p {
  		color: #050709; 
	}


通常，color函数会比color算术操作要用的更多，它们会得到相同的结果。

算术运算符也用于numbers和colors之间，也是分段的。eg:

	p{
		color:#010203 * 2;
	}

编译结果为：

	p {
  		color: #020406; 
	}


注意具有alpha通道的color（通过rgba或者hsla函数来创建）必须含有同样的alpha值，以便在进行color算术运算的时候对它进行操作。但计算并不会影响alpha值。eg:

	p{
		color:rgba(255,0,0,0.75)+rgba(0,255,0,0.75);
	}

编译结果为：
	
	p {
  		color: rgba(255, 255, 0, 0.75);
	 }

alpha通道可以通过使用opacity和transparentize函数来调整。eg:

	$translucent-red:rgba(255,0,0,0.5);

	p {
	  color: opacify($translucent-red,0.3);
	  background-color:transparentize($translucent-red,0.25);
	}

编译结果为：

	p {
	  color: rgba(255, 0, 0, 0.8);
	  background-color: rgba(255, 0, 0, 0.25);
	 }

#### 3）字符串操作符（String Operations)
+ 操作符可以用于连接字符串：

	p{
		cursor:e + -resize;
	}

其可被编译为：

	p {
  		cursor: e-resize; 
	}

注意，带引号的字符串添加到不带引号的字符串（即呆一会的字符串在+的左边），结果就是一个带引号的字符串。同样地，不带引号的字符串添加到带引号的字符串，结果就是一个不带引号的字符串。eg:

	p:before{
		content:"Foo "+Bar;
		font-family:sans-+"serif";
	}

编译结果为：

	p:before {
	  content: "Foo Bar";
	  font-family: sans-serif;
	 }

默认地，如果两个值后面有放置了一个值，那么它们通过空格连接起来。

	p{
		margin:3px+4px auto;
	}

编译结果为：

	p {
  		margin: 7px auto; 
	}

对于一个文本字符串，使用#{}插值符号可以在其中放置动态值，eg:

	p{
		content:"I ate #{5+10} pies!"
	}

编译结果为：

	p {
  		content: "I ate 15 pies!"; 
	}

null会被当做空字符串插入，eg:

	$value:null;
	p:before{
		content:"I ate #{$value} pies!"
	}

编译结果为：

	p:before {
  		content: "I ate  pies!"; 
	}

#### 4）Boolean操作符
SassScript支持对booleen值使用 and ,or 和 not操作符

#### 5）List操作符
Lists不支持任何特殊的操作符。其实，它们是被list functions操纵的。

### 6.Parentheses(括号）
括号用于影响操作顺序。eg:

	p{
		width:1em+(2em * 3);
	}

编译结果为：

	p {
  		width: 7em; 
	}



### 7.Functions
详见<http://sass-lang.com/documentation/Sass/Script/Functions.html>
#### 1.hsl($hue,$saturation,$lightness)
创建一个颜色，通过（色度，饱和度，亮度）。

Eg:

	p {
 	 	color:hsl(0,100%,50%); 
	}

编译结果：

	p {
 	 	color: red; 
	}

#### Keyword Arguments(关键字参数）
Sass函数也可以通过显示的关键字函数来调用。上例也可以写作：

	p {
	  color: hsl($hue: 0, $saturation: 100%, $lightness: 50%);
	}

虽然这样不太简洁了，但是可以让样式表更易阅读。它也使得函数展现出更灵活的外观。

命名参数可以按照任何顺序传递，且具有默认值的参数可以省略。因为命名参数就是变量名称，下划线和连接号都可以使用。


#### 2. map_merge($map1,$map2)
合并两个map形成一个新map。返回的map中，$map1中的键顺序不变，$map2中的键将覆盖$map1中相同的键。$map2中的新键将添加在$map1的尾部。

这是为一个map添加新键值对的最好的方式。

Eg：

	map-merge(("foo": 1), ("bar": 2)) => ("foo": 1, "bar": 2)
	map-merge(("foo": 1, "bar": 2), ("bar": 3)) => ("foo": 1, "bar": 3)

#### 3. map_has_key($map, $key)
返回一个map中是否有某个键的值。

Examples:
	
	map-has-key(("foo": 1, "bar": 2), "foo") => true
	map-has-key(("foo": 1, "bar": 2), "baz") => false

#### 4.	map_get($map, $key)
返回一个map中给定键的值。如果map不含这个键，则返回null。

Examples:

	map-get(("foo": 1, "bar": 2), "foo") => 1
	map-get(("foo": 1, "bar": 2), "bar") => 2
	map-get(("foo": 1, "bar": 2), "baz") => null


### 5.interpolation:#{}
你们还可以在选择器和属性名中使用#{}句法。

Eg:

	 $name:foo;
	 $attr:border;
	 p.#{$name}{
	 	#{$attr}-color:blue;
	 }

编译结果为：

	p.foo {
  		border-color: blue; 
	}

也可以使用#{}来插入属性值。在大多情况下，这样不比使用变量好，但是使用#{}确实表明它附近的任何操作符都将被当做纯CSS处理。例如：

	 p {
	  $font-size: 12px;
	  $line-height: 30px;
	  font: #{$font-size}/#{$line-height};
	}

编译结果为：

	p {
  		font: 12px/30px; 
	}
#### 6. map-keys()
输出一个map的keys组成的list

Examples:

	map-keys(("foo": 1, "bar": 2)) 
	=> "foo", "bar"

参数：Map

返回：List

#### 7.map_remove()
返回一个移除了指定keys的map。

Examples:

	map-remove(("foo": 1, "bar": 2), "bar") => ("foo": 1)
	map-remove(("foo": 1, "bar": 2, "baz": 3), "bar", "baz") => ("foo": 1)
	map-remove(("foo": 1, "bar": 2), "baz") => ("foo": 1, "bar": 2)

#### 8.nth($list, $n)
得到list中的第n项。

	Examples:
	
	nth(10px 20px 30px, 1) => 10px
	nth((Helvetica, Arial, sans-serif), 3) => sans-serif
	nth((width: 10px, length: 20px), 2) => length, 20px
#### 9.unit($number)
返回number的单位。

Examples:

	unit(100) => ""
	unit(100px) => "px"
	unit(3em) => "em"
	unit(10px * 5em) => "em*px"
	unit(10px * 5em / 30cm / 1rem) => "em*px/cm*rem"

#### 10.unitless($number)
返回一个number是否具有单位。

Examples:

	unitless(100) => true
	unitless(100px) => false

#### 11.type_of($value)
返回一个值的类型

Examples:

	type-of(100px)  => number
	type-of(asdf)   => string
	type-of("asdf") => string
	type-of(true)   => bool
	type-of(#fff)   => color
	type-of(blue)   => color

#### 12. index($list,$value)
返回一个value在一个list中的位置。如果找不到该value则返回null。

和其他语言不同，Sass的list的第一项索引为1，第二项索引为2。

还可以返回map中的键值对的位置。

Examples:

	index(1px solid red, solid) => 2
	index(1px solid red, dashed) => null
	index((width: 10px, height: 20px), (height 20px)) => 2

#### 13. if($condition,$if-true,$if-false)
基于$condition是否为true,返回两个值（一个是为true返回，一个部位true返回）。和@if一样，所有除了false和null以外的其他值都被看作是true。

Examples:

	if(true, 1px, 2px) => 1px
	if(false, 1px, 2px) => 2px

#### 14. percentage($number)
将一个无单位的Number转换为百分数

参数：
	
	$number:类型Number
	
Examples:

	percentage(0.2) => 20%
	percentage(100px / 50px) => 200%

#### 15. unquote($string)
移除一个字符串的引号。如果这个字符串已经是没有引号的，那么就原封不动返回原值。

Examples:

	unquote("foo") => foo
	unquote(foo) => foo

### 6.SassScript中的&
就像它在选择器中的用法一样，SassScript中的&指的是当前元素的父元素。

如果没有父元素，&的值就为null。

### 7.变量的默认值：！default
你可以给变量的值添加!default标记。这表示如果一个变量已经被赋值了，那么它不会被再次赋为!default标记的值，但是如果它到目前为止还没有一个值，则它会被赋值为!default标记的值。

Eg:

	$content:"First content";
	$content:"Second content?" !default;
	$new_content:"First time reference" !default;
	
	#main{
		content:$content;
		new-content:$new_content;
	}

编译结果为：

	#main {
	  content: "First content";
	  new-content: "First time reference"; 
	}

为null的变量被当做还没有赋值处理，故会被赋值为!default标记的值。

Eg:

	$content:null;
	$content:"Non-null content?" !default;
	
	#main{
		content:$content;
	}

编译结果为：

	#main {
  		content: "Non-null content?"; 
	}

### 8.@规则及其指令

Sass支持所有的CSS3的@规则，还有一些额外的Sass特有的叫做"directives"的指令。

#### 1）@import
Sass扩展了CSS的@import规则，允许其导入SCSS和Sass文件。所有导入的SCSS和Sass文件都将被整合到一个CSS导出文件中。除此之外，任何在被导入的文件中定义的变量或混合器都可以应用到这个整合形成的主文件中。

Sass是在当前目录下寻找其他Sass文件的。其他搜寻路径需要指定:load_path的option参数，或命令行中的--load-path参数。

@import指定一个要导入的文件名称。默认的，它找到Sass文件后就直接导入，但是在一些情况下，它会编译成为CSS的@import规则：

- 文件扩展名为.css
- 文件名以http://开始
- 文件名是一个url
- @import具有任意的媒体查询限制

如果不在上述情况之内，且文件扩展名为.scss或.sass，那么Sass或SCSS文件将会被导入。如果没有指定扩展名（只指定了文件名称），那么Sass会尽量寻找具有该名称的.scss或.sass文件并导入它们。

Eg：

	@import "foo.scss";

或

	@import "foo";

都会导入foo.scss。

然而：

	@import "foo.css";
	@import "foo" screen;
	@import "http://foo.com/bar";
	@import url(foo);

会编译成：

	@import "foo.css";
	@import "foo" screen;
	@import "http://foo.com/bar";
	@import url(foo);

也可以使用一个@import导入多个文件。

Eg:

	@import "rounded-corners","text-shadow"
会导入所有名为"rounded-corners","text-shadow"的文件。


@import也可能会包含#{}插入值，但只对特定的限制生效。它对动态导入一个基于变量的Sass文件无效；仅对导入CSS文件有效。像这样，它只对url()方式有效。

Eg:

	$family:unquote("Droid+Sans");
	@import url("http://fonts.googleapis.com/css?family=#{$family}");

编译结果为：

	@import url("http://fonts.googleapis.com/css?family=Droid+Sans");

##### Partials

如果你有一个想要导入但不想编译成CSS的SCSS或Sass文件，你可以在文件名的开头添加一个下划线。这样会告诉Sass不要将其编译为一般的CSS文件。然后你可以在导入文件夹的时候不带下划线。

例如，你有一个_colors.scss文件。你可以通过

	@import "colors";

这样_colors.scss就会被导入。

注意你不能在同一个目录下同时有带下划线和不带下划线的同名文件。例如，_colors.scss的目录下不能也有colors.scss。


##### 被嵌套的@import
虽然多数时间在文档顶部只有@imports就可以了，但用CSS rules和@media rules将其包围也是可以的。和最基本的@import一样，这种写法包括了被导入文件的内容。

例如，example.scss文件包含：

	.example{
		color:red;
	}

然后style.scss中包含：
	
	#main{
		@import "example";
	}

编译结果为：

	#main .example {
  		color: red; 
	}

	
**只允许写在文档最基层的directives，例如@mixin或@charset,不允许写在被嵌套的@import导入的文件中**。

另外**在混合器或控制器指令中不能嵌套@import**。


#### 2）@media

@media指令在Sass中和在纯CSS种表现一致，只有一个额外的能力：它们可以嵌套在CSS规则中。如果@media指令在一条CSS规则内部，它就会冒泡到样式表的顶层。这就使得添加特定媒体样式变得很简单，不需要重复写一遍选择器或者打断样式表的正常流。

Eg:

	.sidebar{
		width:300px;
		@media screen and (orientation:landscape){
			width:500px;
		}
	}


编译结果为：

	.sidebar {
	  width: 300px; }
	  @media screen and (orientation: landscape) {
	    .sidebar {
	      width: 500px; } }

@media语句也可以嵌套在另一个@media之中，然后这俩就会通过and操作符结合起来。

Eg:
	@media screen{
		.sidebar{
			@media (orientation:landscape){
				width:500px;
			}
		}
	}

编译结果为：

	@media screen and (orientation: landscape) {
	  .sidebar {
	    width: 500px; } }

@media可以包含SassScript表达式（包括变量，函数，操作符）。

Eg:

	$media:screen;
	$feature:-webkit-min-device-pixel-ratio;
	$value:1.5;
	
	@media #{$media} and ($feature:$value){
		.sidebar{
			width:500px;
		}
	}

编译结果为：

	@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
	  .sidebar {
	    width: 500px; } }


#### 3）@extend
设计一个页面的时候经常会遇到这样的情况：一个class可能在他自己独有的样式外，还需具有另一个class的所有样式。最常用的方法是在html中使用一个通用的class和特殊的class。例如，我们设计一个普通错误和特殊错误：

	<div class="error seriousError">
	  Oh no! You've been hacked!
	</div>

我们的样式表会长这样：
	
	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	.seriousError {
	  border-width: 3px;
	}
		
这样就需要一直记得使用.error和.seriousError。这是一个持久的麻烦。

@extend指令避免了这些问题，它会告诉Sass一个选择器要继承另一个选择器的样式。

Eg:

	.error{
		border:1px #f00;
		background-color:#fdd;
	}
	
	.seriouserror{
		@extend .error;
		border-width:3px;
	}

编译结果为：

	.error, .seriousError {
	  border: 1px #f00;
	  background-color: #fdd; }
	
	.seriousError {
	  border-width: 3px; }

即所有具有.seriouserror的元素都会具有.error样式。

另外一个规则是，具有.error的样式也都会应用于.seriouse;

	.error.intrusion{
		background-image:url("/image/hacked.png")
	}

编译结果为：

	.error.intrusion, .intrusion.seriousError {
  		background-image: url("/image/hacked.png"); }

即具有.seriousError和.intrusion的元素也具有hacked.png背景。

##### 延伸到复杂选择器
样式选择器并不是唯一的可以被extend的选择器。

Eg:

	a:hover{
		text-decoration:underline;
	}

编译结果为：

	.hoverlink{
		@extend a:hover;
	}

	a:hover, .hoverlink {
  		text-decoration: underline; }

和class选择器一样，这表明a:hover中的所有样式都会应用于.hoverlink。


而且**如果a:hover具有其他相关选择器，那其中定义的样式也都会应用到.hoverlink中**。Eg:

	.hoverlink{
		@extend a:hover;
	}
	
	.comment a.user:hover{
		font-weight:bold;
	}

编译结果为：

	.comment a.user:hover, .comment .user.hoverlink {
  		font-weight: bold; }

##### 多个extend
一个选择器可以extend多个选择器。这样它就会继承所有extend到的选择器的样式。Eg:

	.error{
		border:1px #f00;
		background-color:#fdd;
	}
	.attention{
		font-size:3em;
		background-color:#ff0;
	}
	.seriousError{
		@extend .error;
		@extend .attention;
		border-width:3px;
	}

编译结果为：

	.error, .seriousError {
	  border: 1px #f00;
	  background-color: #fdd; }
	
	.attention, .seriousError {
	  font-size: 3em;
	  background-color: #ff0; }
	
	.seriousError {
	  border-width: 3px; }

**多个extend可以使用逗号分隔的list**。Eg:
	@extend .error,.attention

等价于

	@extend.error;@extend.attention


##### 连锁extend

这样也可以：一个选择器extend另一个选择器，然后另一个选择器再extend第三个。Eg:

	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	.seriousError {
	  @extend .error;
	  border-width: 3px;
	}
	.criticalError {
	  @extend .seriousError;
	  position: fixed;
	  top: 10%;
	  bottom: 10%;
	  left: 10%;
	  right: 10%;
	}

编译结果为：

	.error, .seriousError, .criticalError {
	  border: 1px #f00;
	  background-color: #fdd; }
	
	.seriousError, .criticalError {
	  border-width: 3px; }
	
	.criticalError {
	  position: fixed;
	  top: 10%;
	  bottom: 10%;
	  left: 10%;
	  right: 10%; }

##### 顺序选择器（Selector Sequences)
先略吧

#### 4）@at-root
@at-root指令会产生更多在document根层次的规则，而非在它父选择器之下。Eg:

	.parent {
	  ...
	  @at-root .child { ... }
	}

编译结果为:

	.parent { ... }
	.child { ... }
Eg2:

	.parent {
	  ...
	  @at-root {
	    .child1 { ... }
	    .child2 { ... }
	  }
	  .step-child { ... }
	}

编译结果为:

	.parent { ... }
	.child1 { ... }
	.child2 { ... }
	.parent .step-child { ... }

##### @at-root (without: ...) and @at-root (with: ...)
暂略

#### 5)@debug
@debug指令会将SassScript表达式的值打印到标准错误输出流。Eg:

	@debug 10em+12em;

outputs:(**显示在命令行中**）

	Line 1 DEBUG: 22em



#### 6）@warn
暂略

#### 7）@error
暂略

### 9.控制指令、表达式

控制指令是高级功能，且在日常的样式中不常见。

#### 1）if()

	if(true, 1px, 2px) => 1px
	if(false, 1px, 2px) => 2px

#### 2）@if
Eg:

	p{
		@if 1+1==2{
			border:1px solid;
		}
		@if 5<3{
			border:2px dotted;
		}
		@if null{
			 border:3px double;
		}
	}

编译结果为：

	p {
 	 border: 1px solid; }

@if后面可以接@else if和@else,Eg:

	$type: monster;
	p {
	  @if $type == ocean {
	    color: blue;
	  } @else if $type == matador {
	    color: red;
	  } @else if $type == monster {
	    color: green;
	  } @else {
	    color: black;
	  }
	}

编译结果为：

	p {
  		color: green; }

#### 4）@for

Eg:

	@for $i from 1 through 3{
		.item-#{$i}{
			width:2em*$i;
		}
	}

编译结果为：

	.item-1 {
	  width: 2em; }
	
	.item-2 {
	  width: 4em; }
	
	.item-3 {
	  width: 6em; }

如果第一句话为

	@for $i from 3 through 1

则结果从.item-3到.item-1倒序排列。

#### 5）@each 多重赋值（Multiple Assignment)

eg:

	@each $animal,$color,$cursor in(puma,black,default),
	(sea-slug,blue,pointer),
	(egret,white,move){
		.#{$animal}-icon{
			background-image:url('/images/#{$animal}.png');
			border:2px solid $color;
			cursor:$cursor;
		}
	}
编译结果为：

	.puma-icon {
	  background-image: url("/images/puma.png");
	  border: 2px solid black;
	  cursor: default; }
	
	.sea-slug-icon {
	  background-image: url("/images/sea-slug.png");
	  border: 2px solid blue;
	  cursor: pointer; }
	
	.egret-icon {
	  background-image: url("/images/egret.png");
	  border: 2px solid white;
	  cursor: move; }


由于maps是键值对的list,故多重赋值也可以使用map,Eg:

	@each $header,$size in(h1:2em,h2:1.5em,h3:1.2em){
		#{$header}{
			font-size:$size;
		}
	}

编译结果为：

	h1 {
	  font-size: 2em; }
	
	h2 {
	  font-size: 1.5em; }
	
	h3 {
	  font-size: 1.2em; }

#### 6）@while

Eg:

	$i: 6;
	@while $i > 0 {
	  .item-#{$i} { width: 2em * $i; }
	  $i: $i - 2;
	}

编译结果为：

	.item-6 {
	  width: 12em; }
	
	.item-4 {
	  width: 8em; }
	
	.item-2 {
	  width: 4em; }

### 10. 混合器指令

#### 1）定义一个混合器：@mixin

Eg:

	@mixin large-text{
		font:{
			family:Arial;
			size:20px;
			weight:bold;
		}
		color:#ff0000;
	}

混合器中也可以包含选择器，Eg:

	@mixin clearfix{
		display:inline-block;
		&:after{
			content:".";
			display:block;
			height:0;
			clear:both;
			visibility:hidden;
		}
		* html & {
			height:1px;
		}
	}

混合器的名称中连字符合下划线也是混用的。

#### 2） 包含一个混合器：@include

Eg:

	.page-title{
		@include large-text;
		padding:4px;
		margin-top:10px;
	}

编译结果为：

	.page-title {
	  font-family: Arial;
	  font-size: 20px;
	  font-weight: bold;
	  color: #ff0000;
	  padding: 4px;
	  margin-top: 10px; }

混合器也可以位于任何css rule之外（也就是说，也可以位于document根上），Eg:

	@mixin silly-links{
		a{
			color:blue;
			background-color:red;
		}
	}
	
	@include silly-links;

编译结果为：

	a {
	  color: blue;
	  background-color: red; }

混合器也可以包含其他混合器。Eg:

	@mixin compound {
	  @include highlighted-background;
	  @include header-text;
	}
	
	@mixin highlighted-background { background-color: #fc0; }
	@mixin header-text { font-size: 20px; }
	
	.showmix{
		@include compound;
	}

编译结果为：
	
	.showmix {
	  background-color: #fc0;
	  font-size: 20px; }

#### 3)带参数的混合器(Arguments）

暂略
#### 4）@content:为一个混合器传递内容块
可以为混合器传递一个样式块，以放置在混合器包含的一些样式中。这些样式将会出现在混合器中任何@content指令出现的地方。这使得定义和选择器与指令相关的抽象物成为可能。

example:

	@mixin apply-to-ie6-only {
	  * html {
	    @content;
	  }
	}
	@include apply-to-ie6-only {
	  #logo {
	    background-image: url(/logo.gif);
	  }
	}

编译结果为：

	* html #logo {
	  background-image: url(/logo.gif);
	}


### 11.函数指令

#### @function,@return

Eg:

	$grid-width:40px;
	$gutter-width:10px;
	
	@function grid-width($n){
		@return $n * $grid-width + ($n - 1) * $gutter-width;
	}
	
	#sidebbar{
		width:grid-width(5);
	}

编译结果：

	#sidebbar {
  		width: 240px; }

### 12.输出风格(Output Style)
