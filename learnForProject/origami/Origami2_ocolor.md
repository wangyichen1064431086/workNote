### 1. colours
用法说明参考：

- <http://registry.origami.ft.com/components/o-colors>
- <https://github.com/Financial-Times/o-colors>的README.md
- ig-template/bower_components/o-colors/README.md(同上）

源码参考：

- <https://github.com/Financial-Times/o-colors>
- ig-template/bower_components/o-colors/src（同上）
该Origami模块提供了一些定义为FT数字色彩palette的变量。

#### 1.1 用法

##### case mixin方式

	.my-thing{
		@include oColorsFor(custom-box box,background border);
	}

其有两个参数：
- Use case list(用例列表)：按照喜欢的程度排列的用例列表，第一个将会被返回。
- Property list(属性列表)：你希望应用颜色的所有属性（如background,border,text)的列表。这三者分别等价于background-colour,border-color和color。默认是包含了这三个属性。

上例中设置了background和border的color,优先使用custom-box用例中，如果custom-box中的没有设置这些属性，则再从box用例中获取。

##### case function方式
如果你需要使用一个颜色值作为一个更复杂的CSS rule的一部分，比如只应用于一条边的颜色，或是一个渐变的背景颜色，就要使用oColorsGetColorFor函数。

	.my-thing{
		color:oColorsGetColorFor(article-life-arts-body article-body body, text, (default: blue));
	}

oColorsGetColorFor函数具有三个参数：

- use case list：
- 属性：你希望使用颜色的属性（background,border,或者是text)。注意和mixin方式的oColorsFor不一样，你必须只指定一个属性。
- Options:一组额外的选项的映射，它们都是可选的，包含：
	- default:规定当未指定属性的颜色时要使用的颜色名称。它也可以被设置为null或者undefined.
	
	

#### Palette colour function方式

如果你有一个颜色用例不是内置于这个colors模块的，那么可以考虑定义一个传统的用例，并使用上述case mixin或function方式。然而，如果你需要在一个单例中使用一个特定的颜色，那么可能值得试试oColorsGetPaletteColor函数，它为一个palette color返回一个CSS color。

	.my-thing{
		color:oColorsGetPaletteColor('pink-tint4');
	}

#### Predefined classes方式
默认情况下，o-colors是silent的，所以它不会输出任何classes。当使用helper classes,你需要在导入colors模块之前禁用silent模式（如果你使用了build service，你就需要做这个）：

	$o-colors-is-silent: false;

这样你就可以在你的HTML中使用预定义的classes。所有的palette colors都是可用的，通过o-colors-palette-[NAME]形式引用。且用例通过.o-colors-[USECASE]-[PROPERTY]应用到属性上：

	<p class="o-colors-body-text">Article text</p>

说明：此处body是一个use case ,text是属性（相当于color)


#### 定义传统use cases

你可以为你的特定组件或产品添加use cases。通过使用oColorsSetUseCase：

	@include oColorsSetUseCase(email,text,'grey-tint5');

其具有三个参数：

- use case:你自己独有的use case 
- property:要应用color的属性（如background,border,或text)
- color:来自palette的颜色

如果你为你的组件创造了一个use case,那么你 必须为你的use case的名称添加命名空间，并使用你组件的名称为这个命名空间命名。

#### 1.2 在ig-template中的使用方式
##### （1）安装o-colors
执行：

	 bower install

结果：

就会自动将o-color、o-assets、ftc-icons、ftc-share等库安装到名为bower_components文件夹下。

##### （2）写一个sass主文件

写一个 main.scss，放到client/scss下：

eg:
	
	//首先导入sass库(已安装于bower_components下）
	@import "o-colors/main";
	@import "o-grid/main";
	
	@import "ftc-icons/main";
	@import "ftc-share/main";
	
	//再导入自己写的sass文件（这些文件放在main.scss的当前目录下）
	@import "colors";
	@import "var-mixins";
	@import "base";
	@import "header/main";
	@import "components/main";
	@import "footer/main";

注意这里原文件名为_base.scss,_colors.scss,_var-mixins.scss。这样以下划线为开头的目的是

	如果你有一个想要导入但不想编译成CSS的SCSS或Sass文件，你可以在文件名的开头添加一个下划线。
	这样会告诉Sass不要将其编译为一般的CSS文件。然后你可以在导入文件夹的时候不带下划线。

##### （3）自己写gulpfile.js的style任务
直接在根目录ig-template下创建一个gulpfile.js,在这个文件里面定义一个能够编译sass的任务：***第92行***开始

该任务将ig-template/scss/main.scss编译生成ig-template/.tmp/styles/main.css

eg:

	gulp.task('styles', function styles() {
	  const DEST = '.tmp/styles';
	
	  return gulp.src('client/scss/main.scss')//寻找这个main.scss@import的资源是先在该main.scss文件所在目录下找，然后再去includePaths规定的目录（此处为bower_components文件夹)下寻找
	    .pipe($.changed(DEST))
	    .pipe($.plumber())
	    .pipe($.sourcemaps.init({loadMaps:true}))
	    .pipe($.sass({//编译sass
	      outputStyle: 'expanded',
	      precision: 10,
	      includePaths: ['bower_components']
	    }).on('error', $.sass.logError))
	    .pipe($.postcss([
	      cssnext({
	        features: {
	          colorRgba: false
	        }
	      })
	    ]))
	    .pipe($.size({
	      gzip: true,
	      showFiles: true
	    }))
	    .pipe($.sourcemaps.write('./'))
	    .pipe(gulp.dest(DEST))
	    .pipe(browserSync.stream({once:true}));browserSync.stream():
	});

执行该任务：

	gulp style

结果：

.tpm/styles里面就有了真正的css文件

##### （4）在html中引入css文件
该html是该项目主html，位于ig-template/.tmp/index.html。

将编译好的css文件引入到html中：***第31行***。即真正引入的是css而非sass文件。

eg:

	<link rel="stylesheet" type="text/css" href="styles/main.css">
 
然后这个html文件中就可以用这个main.css里面自己写的样式，如o-header之类的

#### 1.3 源码解析
##### （1）o-colors/main.scss

首先，为$o-colors-is-silent变量声明默认值：***还没太懂设置这个变量的意义***

	$o-colors-is-silent: true !default

接着，导入o-colors资源中的scss文件：

	@import 'src/scss/palette';
	@import 'src/scss/use-cases';
	@import 'src/scss/functions';
	@import 'src/scss/mixins';

（这4个文件源码解读查看(2)~(5)）。

接着，处理$o-colors-is-silent为false的情况：


	@if ($o-colors-is-silent == false) {
		@each $usecase, $props in $o-colors-usecases {
			@each $prop, $color in $props {//两层each循环
				#{'.o-colors-' + $usecase + '-' + $prop} {
					@if $prop == text or $prop == all {
						color: oColorsGetPaletteColor($color);
					}
					@if $prop == background or $prop == all {
						background-color: oColorsGetPaletteColor($color);
					}
					@if $prop == border or $prop == all {
						border-color: oColorsGetPaletteColor($color);
					}
				}
			}
		}
		@each $name, $csscolor in $o-colors-palette {
			#{'.o-colors-palette-' + $name} {
				background-color: $csscolor;
			}
		}
	
		// Set silent mode back on to avoid multiple outputs of helper classes
		$o-colors-is-silent: true;
}

如果为false,则最后得到一系列如下样式，样式数目为所有usecase中的所有prop数目之和

	.o-colors-usecase-prop{
		color/background-color/border-color: ;
	}
***疑问：这里就是还不理解这个$o-colors-is-silent的作用？？？***
#####  （2）bower_components/src/scss/palette.scss
###### 设置变量$o-colors-palette，即ft调色板map
其为FT color palettee,形如：

	$o-colors-palette:
	（'transparent':           transparent,
	'inherit':               inherit,

	// Primary Palette
	'pink':                  #fff1e0,
	'black':                 #000000,
	'white':                 #ffffff,
	'blue':                  #2e6e9e,
	'dark-blue':             #275e86,
	'claret':                #9e2f50,
	'orange':                #d66d06）

##### (3)src/scss/use-cases.scss
###### 设置变量$o-colors-usecases,即用例map
其为FT color use cases，形如：
	
	$o-colors-usecases：
	（page:                     (background: 'pink', text: 'grey-tint5'),
	box:                      (background: 'pink-tint1'),
	link:                     (text: 'teal-1'),
	link-hover:               (text: 'grey-tint4'),
	link-title:               (text: 'grey-tint5'),
	link-title-hover:         (text: 'blue'),
	tag-link:                 (text: 'claret'),
	tag-link-hover:           (text: 'claret-inverse'),
	title:                    (text: 'black'),
	body:                     (text: 'grey-tint5'),
	muted:                    (text: 'pink-tint3'),
	product-brand:            (background: 'claret'),
	section-life-arts:        (all: 'section-purple'),
	section-life-arts-alt:    (all: 'section-light-purple'))
	
说明：这里的all属性，包含 background-color/border-color/text三个属性。
##### （4）src/scss/functions.scss
定义一系列处理颜色的函数。
###### 定义函数 oColorsGetPaletteColor
	
用于获取palette中指定键的颜色值。

	@function oColorsGetPaletteColor($name) {
		@if (map-has-key($o-colors-palette, $name)) {
			@return map-get($o-colors-palette, $name);
		} @else {
			@warn "Color name '#{inspect($name)}' is not defined in the palette";
			@return null;
		}
	}

map-has-key这种SASSScript函数参见学习笔记《SASS学习.md》。
###### 定义函数  _oColorsGetUseCase
用于从$o-colors-usecases中获取指定usecase的指定property值：

	@function _oColorsGetUseCase($usecase, $property) {
		@if (not map-has-key($o-colors-usecases, $usecase)) {
			@return null;
		}
	
		$props: map-get($o-colors-usecases, $usecase);
		//获取$-o-colors-usecases中指定键$usecase的值，结果应该是一个($属性，$颜色)的键值对
	
		$color: map-get($props, $property);
		//获取$props中指定键的值，结果应该是一个颜色值。
	
		@if ($color == null and $property != 'all') {
			$color: map-get($props, all);
			//如果指定的$property不为all，则通过查找属性all来找到颜色值，因为all其实包含了该指定属性名称
		}
	
		@if (map-has-key($props, '_deprecated')) {//这句话还不是很懂
			@warn "Color use case '#{inspect($usecase)}' is deprecated (property '#{inspect($property)}' was requested): #{inspect(map-get($props, '_deprecated'))}";
		}
	
		@return $color;
	}

###### 定义函数oColorsGetColorFor
获取一串usecase中第一个具有指定属性颜色值的属性的颜色值

	@function oColorsGetColorFor($namelist, $property: all, $options: ('default': false)) {
		$default: map-get($options, 'default');//$default为$options中'default'的值
		$color: null;
	
		@each $name in $namelist {//遍历$namelist中的所有$name
			@if ($color == null) {
				$color: _oColorsGetUseCase($name, $property);
				//将$color设置为名为$name的usecase的指定的$property的颜色值，最终$name为$property的颜色值不为空的第一值
			}
		}
	
		@if ($color == null) {
			@if ($default or $default == null) {
				@return $default;//若遍历完$namelist还没获取到$property的颜色值，则返回$default值
			} @else {
				$warn: "Undefined use-case: can't resolve use case list '#{inspect($namelist)}'";
	
				@if ($property) {
					$warn: $warn + " for property '#{inspect($property)}'";
				}
	
				@warn $warn;
			}
		}
	
		@return oColorsGetPaletteColor($color);//返回该颜色名称在palettecolor中的颜色值（十六进制值）
	}

##### （5）src/scss/mixins.scss
定义一些混合器。
###### 定义混合器oCorlorsSetColor
设置新的palette color，并将其添加到已有的$o-colors-palette中。

	@mixin oColorsSetColor($name, $color) {//SASS的@mixin混合器
		$newcolor: ($name: $color);
		$o-colors-palette: map-merge($o-colors-palette, $newcolor) !global;// 将新$newcolor: ($name: $color)这个新map添加到已有map $o-colors-palette中。
	}

###### 定义混合器oColorsSetUseCase
设置一个新的user case，并将其添加到已有的$o-colors-usecases

	@mixin oColorsSetUseCase($usecase, $property, $color) {
		$propmap: ($property: $color);
	
		// The use-case already exists,
		// combine its existing properties with the new one
		@if (map-has-key($o-colors-usecases, $usecase)) {//如果$o-colors-usecases具有$usecase这个键
			$propmap: map-merge(map-get($o-colors-usecases, $usecase), $propmap);//用新的键值覆盖久的键值
		}
	
		$newmap: ($usecase: $propmap);
	
		// Add the use-case and its properties to the global use-case map
		$o-colors-usecases: map-merge($o-colors-usecases, $newmap) !global;
		//$o-color-usecases本身就是（键：（键：值））形式的map
	}


###### 定义混合器oColorsFor
使用某些use cases定义的属性的颜色值定义background-color、color和border-color属性。

	@mixin oColorsFor($useCaseList, $propertyList: all) {
		// Fail silently when a use case doesn't exist,
		// taking advantage of how Sass treats the `null` keyword:
		//
		// 		$foo: null;
		// 		el { color: $foo; } // outputs nothing
		$args: (default: null);
	
		@if ($propertyList == 'all' or index($propertyList, 'background')) {
			background-color: oColorsGetColorFor($useCaseList, background, $options: $args);
		}
		//函数oColorsGetColorFor（定义于functions.scss）：获取一串usecase中第一个具有指定属性颜色值的属性的颜色值
		@if ($propertyList == 'all' or index($propertyList, 'text')) {
			color: oColorsGetColorFor($useCaseList, text, $options: $args);
		}
		@if ($propertyList == 'all' or index($propertyList, 'border')) {
			border-color: oColorsGetColorFor($useCaseList, border, $options: $args);
		}
	}

用法示例：

	.my-thing {
 	 	@include oColorsFor(custom-box box);
	 }
    .my-other-thing {
   		@include oColorsFor(custom-box box, background border);
  	 }