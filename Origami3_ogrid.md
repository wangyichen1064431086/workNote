### 2. o-grid
<http://registry.origami.ft.com/components/o-grid@4.2.0>
#### 2.1 DOCUMENT
<http://registry.origami.ft.com/components/o-grid@4.2.0>

o-grid是一个12竖栏响应式的、基于flex-box的栅格系统，用于展示文档、模板和模块。

其有4种模式;

模式|适用尺寸|单个栅格宽度|栅格间距宽度
----|-------|----------|----------
default|>=240px|10px|10px
S|>=490px|30px|10px
M|>=740px|40px|20px
L|>=980px|60px|20px
XL|=1220px|80px|20px
##### Quick Start
###### 自动导入

	<link rel="stylesheet" href="https://origami-build.ft.com/v2/bundles/css?modules=o-grid@^4.0.0" />
eg:

	<!DOCTYPE html>
	<html>
	<head>
		<meta  charset="utf-8">
		<title>o-grid Learning</title>
		<link rel="stylesheet"
	          href="https://origami-build.ft.com/v2/bundles/css?modules=o-grid@^4.0.0" />
	    <style>
	    	#column1{
	    		border: thin solid blue;
	    	}
	    	#column2{
	    		border:thin solid red;
	    	}
	    </style>
	</head>
	<body>
		<div class="o-grid-container">
		    <div class="o-grid-row">
		        <!-- two divs, spanning a total of 12 columns -->
		        <div id="column1" data-o-grid-colspan="8">A div, 8 columns wide</div>
		        <div id="column2" data-o-grid-colspan="4">Another div, 4 columns wide</div>
		    </div>
		</div>
		
	</body>
	</html>
###### 手动安装(太麻烦，暂略）
cd到自己的项目目录下，执行：

	bower install o-grid --sav

##### 浏览器支持
支持CSS的@media语句和box-sizing的浏览器都支持o-grid。IE8也支持。

##### 实用的属性/class
- **属性data-o-grid-colspan**


	<div class="o-grid-container">
	    <div class="o-grid-row">
	        <!-- two divs, spanning a total of 12 columns -->
	        <div id="column1" data-o-grid-colspan="8">A div, 8 columns wide</div>
	        <div id="column2" data-o-grid-colspan="4">Another div, 4 columns wide</div>
	    </div>
	</div>

##### 响应式的columns

	<div class="o-grid-container">
	    <div class="o-grid-row">
	        <!-- two divs, spanning a total of 12 columns -->
	        <div  data-o-grid-colspan="6  L8" class="first-column">A div, 8 columns wide</div>
	        <div  data-o-grid-colspan="8  L4" class="second-column">Another div, 4 columns wide</div>
	    </div>
	</div>

##### 使用数字

- {0-12} - 默认跨域的列数
- S{0-12} - number of columns to span at the small layout and up
- M{0-12} - number of columns to span at the medium layout and up
- L{0-12} - number of columns to span at the large layout and up
- XL{0-12} - number of columns to span at the extra large layout and up

eg:

	<div data-o-grid-colspan="6 L8"></div>

##### 使用keywords
- hide
- one-half
- one-third,two-thirds
- one-quarter,three-quarters
- full-width

eg:

默认为屏幕宽度一半，而L型设备宽度为2/3

	  <div  data-o-grid-colspan="one-half Ltwo-thirds" class="first-column">A div</div>


##### 更多例子
eg1:
一个column随着设备宽度变小而逐渐占据更大的宽度。

 	<div  data-o-grid-colspan="4 M3 L2 XL1" class="first-column">A div</div>

eg2:
一个column在小屏幕上宽度为auto,在M型或更大屏幕的时候占据一半的屏幕宽度。

	<div  data-o-grid-colspan="M6" class="first-column">A div</div>

##### 高级例子
###### eg1:隐藏元素
在L型屏幕时显示该column，其他时刻隐藏：

	<div  data-o-grid-colspan="hide L12 XLhide" class="first-column">A div</div>

###### eg2：居中column
只有在L型屏幕时不居中，其他时刻居中：
	
	<div data-o-grid-colspan="center Luncenter"></div>

###### eg3:push和pull column
column被后推：从第4个栅格之后开始，即占满后8个栅格
	   <div  data-o-grid-colspan="8 push4" class="first-column">A div</div>

column被前提：提到前面隐藏了两个栅格的宽度
 
	<div  data-o-grid-colspan="4 pull2" class="first-column">A div</div>

响应式的push:

	<div  data-o-grid-colspan="L8 Lpush4" class="first-column">A div</div>

###### eg4:在column前面加上空格

	<div  data-o-grid-colspan="L8 Loffset2" class="first-column">A div</div>
	
	


###### eg4:在column前添加空格

	<div data-o-grid-colspan="L8 Loffset4"></div>

###### eg5:snappy模式
The container size can snap between fixed-widths as the viewport gets larger:***不懂这个到底是干嘛的？？？***

	<!-- Make the whole document snappy -->
	<body class="o-grid-snappy">
	    <div class="o-grid-container">
	        <div class="o-grid-row">
	            …
	        </div>
	    </div>
	</body>

	<!-- Make a container snappy -->
	<div class="o-grid-container o-grid-container--snappy">
	    <div class="o-grid-row">
	        …
	    </div>
	</div>

###### eg6:Compact rows(紧凑rows）
去掉columns之间的间隔，使用o-grid-row--compact的class:

	<div class="o-grid-row o-grid-row--compact">
	    <div data-o-grid-colspan="6" class="first-column">Look 'ma, no gutters</div>
	    <div data-o-grid-colspan="6" class="second-column">Look 'pa, no gutters here either</div>
	</div>

###### eg7:Full bleed container
去掉container左右两侧的gutters，使用o-grid-container--bleed的class：

	<div class="o-grid-container o-grid-container--bleed">
	    <div class="o-grid-row o-grid-row--compact">
	        <div data-o-grid-colspan="6">Look 'ma, no gutters</div>
	        <div data-o-grid-colspan="6">Look 'pa, no gutters here either</div>
	    </div>
	</div>

#### 1.2 在ig-template中的使用方式
##### （1）安装o-grid
执行：

	 bower install

结果：

就会自动将o-grid库安装到名为bower_components文件夹下。

##### （2）在sass主文件下导入o-grid

在client/scss/main.scss中写入：

eg:
	
	//导入sass库(已安装于bower_components下）
	@import "o-grid/main";
	

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
	    .pipe(browserSync.stream({once:true}));
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
#### 1.3 源码解析bower_components/o-grid
##### （1）main.scss
导入其他.scss文件资源：

	@import 'src/scss/variables';
	@import 'sass-mq/mq';
	@import 'src/scss/main';
（该三文件源码解析详见（2）（3）（4）。）
***这里有一个导入sass-mq/mq，是因为在当前目录下找不到就直接到外层目录找吗？？？***  对的



输出关于当前layout的debug信息：

	@mixin oGridDebugInfo($layouts: $o-grid-layouts) {
		/*! DEBUG
		 * Layouts:
		 * #{inspect($layouts)}
		 */
	}
	
	@if $o-grid-debug-mode {
		@include oGridDebugInfo;
		@include mq-show-breakpoints($_o-grid-layout-names, $o-grid-layouts);
	}
	
##### (2)src/scss/_variables.scss
定义一系列变量：
##### a.响应式行为配置：
###### silent模式：

	$o-grid-is-silent: true !default;

###### offset,push,pull样式的选择器:

	$o-grid-shuffle-selectors: true !default;
	
###### human-friendly选择器:

	$o-grid-human-friendly-selectors: true !default;

###### 栅格模式:$o-grid-mode
String类型，值为fluid(default),snappy和fixed的其中一种。

	$o-grid-mode: 'fluid' !default;

- fluid:全宽为最大的layout宽度
- snappy:当$o-grid-start-snappy-mode-at定义layout之前，使用fluid模式；当$o-grid-start-snappy-mode-at(default: M)定义layout之后，在每个变大的分段使用一个更大的固定的layout。
- fixed:总是等于$o-grid-fixed-layout (default: L)定义的layout。
*** 其实没怎么看懂这几种模式的英文解释 ***

###### 当栅格有固定宽度时，默认的layout
String类型，为$o-grid-layouts的一个值。

	$o-grid-fixed-layout: 'L' !default;

###### 在fixed-width layout之间，什么时候栅格开始突变
需要其row具有'o-grid-row--snappy'样式

	$o-grid-start-snappy-mode-at: 'M' !default;


######  Show the currently active breakpoint and output loaded settings

	$o-grid-debug-mode: false !default;


###### Output IE 8-specific rules?（是否输出IE8特定规则的代码）
值为：

- false:完全不支持IE8
- only:
- inline:

	$o-grid-ie8-rules: 'inline' !default;

##### b.栅格设置和维度设置

###### columns的数量 $o-grid-columns
类型为Number:
	
	$o-grid-columns: 12 !default;

###### 最小宽度 $o-grid-min-width

	$o-grid-min-width: 240px !default;


###### layouts(页面类型）$o-grid-layouts
类型为Map

	$o-grid-layouts: (
		S:  490px,  // column-width: 30px, inner width: 470px
		M:  740px,  // column-width: 40px, inner width: 700px
		L:  980px,  // column-width: 60px, inner width: 940px
		XL: 1220px, // column-width: 80px, inner width: 1180px
	) !default;
	
###### layout的名称（页面类型名称）$_o-grid-layout-names
类型:List,值为（"S","M","L","XL")

	$_o-grid-layout-names: map-keys($o-grid-layouts);



###### gutter尺寸（间隔尺寸）$o-grid-gutters
类型：Map

	$o-grid-gutters: (
		default: 10px,
		M:       20px,
	) !default;

对$o-grid-gutters的调整：如果$o-grid-gutters中的keys不属于$o-grid-layouts中的keys,也不是"default"（即keys不是defaut,S,M,L,XL五个中的一个）,则移除这个键值对。

	@each $layout-name, $gutter-size in $o-grid-gutters {
		@if ($layout-name != 'default') and (not map-has-key($o-grid-layouts, $layout-name)) {
			$o-grid-gutters: map-remove($o-grid-gutters, $layout-name);
		}
	}

###### 最大grid宽度 $_o-grid-max-width
其值默认为最大的layout宽度（即o-grid-layouts中XL的值1220px），Number类型。

	$_o-grid-max-width: map-get($o-grid-layouts, nth($_o-grid-layout-names, -1));

如果为snappy模式，则强制将其变成最大的layout宽度，而非默认宽度。***没看懂***	

	@if $o-grid-mode == 'snappy' {
		$_o-grid-max-width: map-get($o-grid-layouts, nth($_o-grid-layout-names, -1)) !global;
	}

***关于snappy模式还不太理解***

###### 当前作用域（Current scope）:$_o-grid-scope

	$_o-grid-scope: 'global';

#### (3)sass-mq

#####  知识补充：sass-mq模块
sass-mq模块，其mq()函数是一个混合器，用于使得媒介查询操作变得很优雅。参见
<https://github.com/sass-mq/sass-mq> 
<https://www.npmjs.com/package/sass-mq>

##### README.md简介
使用basic example:

	$mq-breakpoints: (
	    mobile:  320px,
	    tablet:  740px,
	    desktop: 980px,
	    wide:    1300px
	);
	
	@import 'mq';
	
	.foo {
	    @include mq($from: mobile, $until: tablet) {
	        background: red;
	    }
	    @include mq($from: tablet) {
	        background: green;
	    }
	}

Compiles to:

	@media (min-width: 20em) and (max-width: 46.24em) {
	  .foo {
	    background: red;
	  }
	}
	@media (min-width: 46.25em) {
	  .foo {
	    background: green;
	  }
	}

更多详见 <https://github.com/sass-mq/sass-mq> 
##### sass-mq/_mq.scss
###### 设置body元素的默认文字尺寸：$mq-base-font-size

	$mq-base-font-size: 16px !default;

###### responsive mode(设置是否允许响应式模式):$mq-responsive
	
	$mq-responsive: true !default;

当将其设置为false时，可兼容不支持@media queries的浏览器(即IE <= 8, Firefox <= 3, Opera <= 9)，然后就可以为不支持@media queries的浏览器设置它们独有的样式。

###### Breakpoint list（断点列表）：$mq-breakpoints
为你的breakpoints(设备尺寸分割点）命名，以一种在团队成员间建立一个普遍存在的语言的方式。这会提升股东、设计师、开发者、测试之间的沟通。

type:Map

	$mq-breakpoints: (
	    mobile:  320px,
	    tablet:  740px,
	    desktop: 980px,
	    wide:    1300px
	) !default;
		

###### Static breakpoint(静态断点，用于固定宽度的layout)：$mq-static-breakpoints
定义一个$mq-breakpoints中的breakpoint，其即为定宽layout的目标宽度。（如，当$mq-responsive为false的时候）

type:String

	$mq-static-breakpoint: desktop !default
	
###### Show breakpoints in the top right corner(在右上角展示breakpoints)
在开发过程中，如果你想在你的网站右上角显示当前的breakpoint,就将breakpoints添加到这个list中。***不太懂怎么用？？？***

type:Map

	$mq-show-breakpoints: () !default;

###### Customize the media type （自定义media type)
定制media type（如@media screen 或@media print）,sass-mq默认使@media all(@media all and …)。

type:String

	$mq-media-type: all !default

###### Convert pixels to ems(将px转换为em)
参数：

- $px -要转换的值，type:Number;
- $base-font-size -基准值，body的font-size,type:Number。

返回值：Number。

	@function mq-px2em($px, $base-font-size: $mq-base-font-size) {
	    @if unitless($px) {
	        @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels.";
	        @return mq-px2em($px * 1px, $base-font-size);
	    } @else if unit($px) == em {
	        @return $px;
	    }
	    @return ($px / $base-font-size) * 1em;
	}

基于的是$mq-base-font-size，即默认为16px。

###### Get a breakpoint's width（获取断点宽度值）：@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints)

参数： $name-断点名称，是$mq-breakpoints的键之一,type:String

返回：单位为px的Number,type:Number

	@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {
	    @if map-has-key($breakpoints, $name) {
	        @return map-get($breakpoints, $name);
	    } @else {
	        @warn "Breakpoint #{$name} wasn't found in $breakpoints.";
	    }
	}

###### Media Query mixin(媒体查询混合器）：@mixin mq

参数：

- $from:type为String或者Boolean,默认false,可为$mq-breakpoints之一。
- $until:type为String或者Boolean,默认false,可为$mq-breakpoints之一。
- $and:type为String或者Boolean,默认false,为其他的媒体查询参数。
- $media-type:默认为$mq-media-type(值为all)，可以为screen,print
- $breakpoints:默认为$mq-breakpoints（值为 (
mobile:  320px,
tablet:  740px,
desktop: 980px,
wide:    1300px））

		@mixin mq(
		    $from: false,
		    $until: false,
		    $and: false,
		    $media-type: $mq-media-type,
		    $breakpoints: $mq-breakpoints,
		    $responsive: $mq-responsive,
		    $static-breakpoint: $mq-static-breakpoint
		) {
		    $min-width: 0;
		    $max-width: 0;
		    $media-query: '';
		
		    // From: this breakpoint (inclusive)
		    @if $from {
		        @if type-of($from) == number {//当$from为数值时，直接转换成em单位
		            $min-width: mq-px2em($from);
		        } @else {//否则当$from为设备宽度断点名称,即mobile、tablet、desktop、wide
		            $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));
		        }
		    }
		
		    // Until: that breakpoint (exclusive)
		    @if $until {
		        @if type-of($until) == number {
		            $max-width: mq-px2em($until);
		        } @else {
		            $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) - .01em;
		        }
		    }
		
		    // Responsive support is disabled, rasterize the output outside @media blocks
		    // The browser will rely on the cascade itself.
		    @if $responsive == false {
		        $static-breakpoint-width: mq-get-breakpoint-width($static-breakpoint, $breakpoints);
		        $target-width: mq-px2em($static-breakpoint-width);
		
		        // Output only rules that start at or span our target width
		        @if (
		            $and == false
		            and $min-width <= $target-width
		            and (
		                $until == false or $max-width >= $target-width
		            )
		        ) {
		            @content;
		        }
		    }
		
		    // Responsive support is enabled, output rules inside @media queries
		    @else {
		        @if $min-width != 0 { $media-query: '#{$media-query} and (min-width: #{$min-width})'; }
		        @if $max-width != 0 { $media-query: '#{$media-query} and (max-width: #{$max-width})'; }
		        @if $and            { $media-query: '#{$media-query} and #{$and}'; }
		
		        // Remove unnecessary media query prefix 'all and '
		        @if ($media-type == 'all' and $media-query != '') {
		            $media-type: '';
		            $media-query: str-slice(unquote($media-query), 6);
		        }
		
		        @media #{$media-type + $media-query} {
		            @content;
		        }
		    }
		}

Eg scss:

	.element {
     @include mq($from: mobile) {
      color: red;
   	}
    @include mq($until: tablet) {
     color: blue;
    }
    @include mq(mobile, tablet) {
      color: green;
    }
   	@include mq($from: tablet, $and: '(orientation: landscape)') {
      color: teal;
   	}
    @include mq(950px) {
      color: hotpink;
    }
    @include mq(tablet, $media-type: screen) {
		color: hotpink;
    }
	 // Advanced use:
	 $my-breakpoints: (L: 900px, XL: 1200px);
	 @include mq(L, $breakpoints: $my-breakpoints, $static-breakpoint: L) {
	    color: hotpink;
	 }
 }

###### Add a breakpoint(添加断点）
参数：

- $name:type为String,breakpoint的名称
- $width:type为Number,breakpoint的width

	@mixin mq-add-breakpoint($name, $width) {
	    $new-breakpoint: ($name: $width);
	    $mq-breakpoints: map-merge($mq-breakpoints, $new-breakpoint) !global;
	}

###### Show the active breakpoint in the top right corner

参数：

- $show-breakpoints:type为list,默认为$mq-show-breakpoints，为要展示在右上角的breakpoints列表
- $breakpoints:type为Map,默认为$mq-breakpoints,断点名称和值

		@mixin mq-show-breakpoints($show-breakpoints: $mq-show-breakpoints, $breakpoints: $mq-breakpoints) {
		    body:before {
		        background-color: #FCF8E3;
		        border-bottom: 1px solid #FBEED5;
		        border-left: 1px solid #FBEED5;
		        color: #C09853;
		        font: small-caption;
		        padding: 3px 6px;
		        pointer-events: none;
		        position: fixed;
		        right: 0;
		        top: 0;
		        z-index: 100;
		
		        // Loop through the breakpoints that should be shown
		        @each $show-breakpoint in $show-breakpoints {
		            $width: mq-get-breakpoint-width($show-breakpoint, $breakpoints);
		            @include mq($show-breakpoint, $breakpoints: $breakpoints) {
		                content: "#{$show-breakpoint} ≥ #{$width} (#{mq-px2em($width)})";
		            }
		        }
		    }
		}
		
		@if length($mq-show-breakpoints) > 0 {
		    @include mq-show-breakpoints;
		}

eg:

		@include mq-show-breakpoints((L, XL), (S: 300px, L: 800px, XL: 1200px));

#### (2)src/scss/_main.scss

##### 1.添加o-Grid的layout:@mixin oGridAddLayout

定义：

	@mixin oGridAddLayout($layout-name, $layout-width, $gutter-width: null) {
		$temp-layouts: ();
		$temp-gutters: (default: oGridGutter());//oGridGutter()函数，参见本节2.的定义
		
		///在当前位置添加一个新的layout(页面类型)
		///我们想要$o-grid-layouts和$o-grid-gutters能够从小页面类型到大页面类型的顺序排列
		@for $index from 1 through length($o-grid-layouts) {
			$previous-layout-width: if($index == 1, 0, map-get($o-grid-layouts, nth($_o-grid-layout-names, $index - 1)));//$previous-layout-width：如果此处是第一个页面类型宽度，则值为0,否则就是上一个页面类型宽度
			
			$current-layout-name: nth($_o-grid-layout-names, $index);//$current-layout-name:当前index的页面类型名称

			$current-layout-width: map-get($o-grid-layouts, $current-layout-name);//$current-layout-width:当前index的页面类型宽度
	
			$current-gutter-width: map-get($o-grid-gutters, $current-layout-name);//当前index的间隔宽度
	
			@if not ($previous-layout-width > $layout-width or $current-layout-width < $layout-width) {//如果新添类型的宽度不是（小于$previous-layout-width，或大于 $current-layout-width），也就是: $previous-layout-width<新添类型的宽度<$current-layout-width
				$temp-layouts: map-merge($temp-layouts, ($layout-name: $layout-width));//为$temp-layouts添加新添页面类型的宽度map
				$temp-gutters: map-merge($temp-gutters, ($layout-name: $gutter-width));//为$temp-gutters添加新添页面类型的间隔map
			}
	
			$temp-layouts: map-merge($temp-layouts, ($current-layout-name: $current-layout-width));//为$temp-layouts添加map:($current-layout-name: $current-layout-width)
	
			@if $current-gutter-width {
				$temp-gutters: map-merge($temp-gutters, ($current-layout-name: $current-gutter-width));
			}//为$temp-gutters添加map: ($current-layout-name: $current-gutter-width)
		}
		$o-grid-layouts: $temp-layouts !global;//将循环后得到的插入了新添页面类型的宽度map的$temp-layouts作为新的$o-grid-layouts值
		$_o-grid-layout-names: map-keys($o-grid-layouts) !global;//根据新的$o-grid-layouts得到新的$_o-grid-layout-names，即页面类型的称列表
	
		@if $gutter-width {
			$o-grid-gutters: $temp-gutters !global;
		}//将循环后得到的插入了新添页面类型的间隔map的$temp-gutters作为新的$o-grid-gutters值（有if条件是因为默认$gutter-width为null，如果添加的是个为null的$gutter-width，就不必再更改$o-grid-gutters了）
	
		$_o-grid-max-width: map-get($o-grid-layouts, nth($_o-grid-layout-names, -1)) !global;//根据新的$o-grid-layouts得到新的页面类型的中的宽度最大值$_o-grid-max-width
	}

参数：

- $layout-name:新添页面类型的名称,类型String(eg. s)
- $layout-width:新添页面类型的width，类型Number,单位px
- $gutter-width:新添页面类型的间距宽度，默认为null，类型为Number,单位px


scss用法示例：

	@include oGridAddLayout($layout-name: P, $layout-width: 600px);
	@include oGridAddLayout($layout-name: XXL, $layout-width: 1600px, $gutter-width: 30px);

##### 2. 获取某种页面类型的间隔:@funciton oGridGutter

定义：

	@function oGridGutter($layout-name: default) {
		// This layout was assigned a gutter directly
		@if map-get($o-grid-gutters, $layout-name) {
			@return map-get($o-grid-gutters, $layout-name);
		}
	
		// Checking the position of the layout in the list of layouts
		$layout-index: index($_o-grid-layout-names, $layout-name);
	
		// 如果$layout名称是s(即index为1）,那么就返回$o-grid-gutters的default值。
		@if $layout-index == 1 {
			@return oGridGutter();
		}
	
		// 如果没找到这个$layout名称，则返回更小一号的$layout的间距
		$layout: nth($_o-grid-layout-names, $layout-index - 1);
		@return oGridGutter($layout);
	}

补充说明:
- $o-grid-gutters是在_variables.scss文件中定义好的，内容为：

		$o-grid-gutters: (
			default: 10px,
			M:       20px,
		) !default;

- $_o-grid-layout-names是layout的名称，已在_variables.scss文件中定义好。类型:List,值为（"S","M","L","XL")

参数：

- $layout-name,类型为String|null|Boolean，值为页面类型名称中的一种（即$_o-grid-layout-names中的一种）

##### 3.获取某一页面类型在不同栅格模式(fixed,snappy or fluid)下中可取到的最大宽度：@function oGridGetMaxWidthForLayout


###### 定义：

	@function oGridGetMaxWidthForLayout($layout-name, $grid-mode: $o-grid-mode) {
		$grid-is-responsive: $grid-mode != 'fixed';//通过$gird-mode是否等于"fixed"判断其是否为响应式，即在其不等于"fixed"时，值为true
	    
		$index: index($_o-grid-layout-names, $layout-name);//该页面类型名称在页面类型名称列表$_o-grid-layout-names的index
	
		///情况1：$layout-name为最大的那种页面类型名称
		@if $index == length($_o-grid-layout-names) {
			@return $_o-grid-max-width;
		}//如果该页面类型名称位于页面类型名称列表的最后一个，则直接返回$_o-grid-max-width
	
		///情况2：$layout-name不是最大的那种页面类型名称
		@if $grid-is-responsive {//当页面栅格模式为响应式的，即fluid或snappy:
			$next-layout: nth($_o-grid-layout-names, $index + 1);//比当前页面类型尺寸大一个等级的页面类型的名称
			@return map-get($o-grid-layouts, $next-layout);//返回比当前页面类型尺寸大一个等级的页面宽度
		} @else {//当页面栅格模式为非响应式，即fixed模式:
			@return map-get($o-grid-layouts, $layout-name);//直接返回当前页面类型的宽度
		}
	}

###### 补充说明
因为

	$o-grid-layouts: (
		S:  490px,  // column-width: 30px, inner width: 470px
		M:  740px,  // column-width: 40px, inner width: 700px
		L:  980px,  // column-width: 60px, inner width: 940px
		XL: 1220px, // column-width: 80px, inner width: 1180px
	) !default;

故在响应式的栅格模式下（即o-gird-mode为fluid或snappy时），其各个页面类型可取的区间为：

	- S:[490,740)
	- M:[740,980)
	- L:[980,1220)
	- XL:1220

显然，最大类型可取到的最大尺寸为它自己的值，其他类型可取到的最大尺寸为下一个页面类型的值（其实因为是开区间，所以不能取到，只能无限接近）。

而在非响应式的栅格模式下（即o-grid-mode为fixed),其各个页面类型可取的值为断点式的：
	
	- S:490
	- M:740
	- L:980
	- XL:1220

显然，每种页面类型可取到的最大尺寸就是它自己的值（最小尺寸也是它自己的值）


###### 参数：

- $layout-name:类型String,为页面类型名称中的一种
- $grid-mode:类型String，为栅格模式，默认为$o-grid-mode(其值可以为fluid(default),snappy和fixed)


###### scss用法示例：

	.my-large-container { width: oGridGetMaxWidthForLayout(L); }


##### 4.把一个元素在栅格系统中所占的宽度描述转换为百分比：@function oGridColspan

###### 定义：

	@function oGridColspan($span, $total-cols: $o-grid-columns) {

		///将一些HTML相关API里会涉及的数字描述转换为纯数字
		@if $span == 'one-half'       { $span: 1/2; }
		@if $span == 'one-quarter'    { $span: 1/4; }
		@if $span == 'one-third'      { $span: 1/3; }
		@if $span == 'two-thirds'     { $span: 2/3; }
		@if $span == 'three-quarters' { $span: 3/4; }
	
		@if $span == 'full-width' {
			@return 100%;
		} @else {
			@if $span >= 1 {
				///如果$span值大于1，则将它作为columns的数量处理，则将为其占columns总数的百分比
				@return percentage($span / $total-cols);
			} @else {
				///其他情况（即$span值为0~1的分数或小数），则直接将分数或小数转换为百分数
				@return percentage($span);
			}
		}
	}
###### 参数

- $span:类型Number|String,元素跨过的column个数
- $total-cols:类型Number,栅格规定的column总数，默认为$o-grid-colums（其在_variables.scss中有定义，默认为12）

###### example
	 .one-half   { width: oGridColspan(1/2); }      // 50%
	 .other-half { width: oGridColspan(one-half); } // 50%
	 .sidebar    { width: oGridColspan(5); }        // 41.66667%
	 .two-thirds { width: oGridColspan(2/3); }      // 66.66667%
	 .4-out-of-6 { width: oGridColspan(4, 6); }     // 66.66667%

##### 5.将样式运用到给定的页面类型尺寸上@mixin oGridRespondTo
其是作为sass-mq模块的mq()混合器的外包装。

***mq混合器待再研究***


###### 定义

	@mixin oGridRespondTo($from: false, $until: false) {
		$grid-is-responsive: $o-grid-mode != 'fixed';//页面栅格模式是否为响应式
	
		$original-scope: $_o-grid-scope;//当前作用域即$_o-grid-scope，其值为'global'(在_variables.scss中有定义);

		$_o-grid-scope: 'respondTo' !global;//重新定义$_o-grid-scope的值为"respondTo",且为全局变量
	
		@include mq(//包含mq混合器
			$from: $from,
			$until: $until,
			$responsive: $grid-is-responsive,
			$breakpoints: $o-grid-layouts,
			$static-breakpoint: $o-grid-fixed-layout
		) {
			@content;
		}
	
		$_o-grid-scope: $original-scope !global;//将$_o-grid-scope的值恢复为默认的"global"
	}


###### 参数
- $from:页面类型中的一种（即$o-grid-layouts中的一种）
- $until:页面类型中的一种

###### scss用法示例

	///当页面类型为M或比M尺寸还大时，将元素的颜色变为红色
	@include oGridRespondTo(M) {
	  	element {
	  		color: red;
	  	}
	  }
	 // 当页面类型尺寸小于等于M时，将元素的颜色变为蓝色
	  element {
	  	@include oGridRespondTo($until: M) {
	  		color: blue;
	  	}
	}
	 // 当页面类型尺寸在S到M的区间时，将元素的颜色变为绿色
	element {
	  	@include oGridRespondTo($from: S, $until: M) {
	  		color: green;
	  	}
	  }
##### 5. 针对IE8的样式混合器:@mixin oGridTargetIE8

###### 定义

	@mixin oGridTargetIE8 {
		@if 'global' == $_o-grid-scope {
			@if 'inline' == $o-grid-ie8-rules {//当$o-grid-scope为'global'，且$o-grid-ie8-rules为'inline'，则表明该页面是在IE8上
				@media \0screen {//IE hack方法，\0screen是仅IE8识别
					@content;
				}
			}
			@if 'only' == $o-grid-ie8-rules {
				@content;
			}
		}
	}
###### 补充说明

- $o-grid-ie8-rules变量用于规定是否输出IE8特定样式，值可为$false,$only,$inline
- 更多有关@media的IE hack的方法参见<http://blog.sina.com.cn/s/blog_6d208b470102v35u.html>
- @content:可以为混合器传递一个样式块，以放置在混合器包含的一些样式中。这些样式将会出现在混合器中任何@content指令出现的地方。这使得定义和选择器与指令相关的抽象物成为可能。

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

##### 6.Target styles at modern browsers that support @media queries properly：@mixin oGridTargetModernBrowsers

###### 定义
	
	@mixin oGridTargetModernBrowsers {
		
		@if $_o-grid-scope == 'respondTo' {
			@content;
		} @else {
			@if not ('only' == $o-grid-ie8-rules) {
				@media only screen {
					@content;
				}
			}
		}
	}

***涉及@content的5.和6.待再研究***

##### 7.为比例和居中相关的样式起的human friendly的名称：@mixin _oGridHumanFriendlyKeywords
621行起，待再研究
###### 定义

	@mixin _oGridHumanFriendlyKeywords($layout-name: null) {
		[data-o-grid-colspan~="#{$layout-name}hide"] {
			display: none;
		}
	
		// Center and un-center
		[data-o-grid-colspan~="#{$layout-name}center"] {
			@include oGridCenter;
		}
		
		@if $layout-name != null {//由于[data-o-grid-colspan~="uncenter"]没有什么意义，我们只允许"uncenter"和一种页面类型结合起来用（e.g.XLuncenter)
			[data-o-grid-colspan~="#{$layout-name}uncenter"] {
				@include oGridUncenter;
			}
		}
	
		// Portions
		@each $human-friendly-name in (full-width, one-half, one-third, two-thirds, one-quarter, three-quarters) {
			[data-o-grid-colspan~="#{$layout-name}#{$human-friendly-name}"] {
				display: block;
	
				// Define width in %
				@include _oGridFixSafariWrap($human-friendly-name);//_oGridFixSafariWrap混合器用于修复Safari中的一个bug,Safari中item不能被恰当地wrap,详见22.
				min-width: oGridColspan($human-friendly-name);//函数oGridColspan：将一个元素在栅格系统中所占的宽度描述转换为百分比，详见4.
				max-width: oGridColspan($human-friendly-name);
				width: oGridColspan($human-friendly-name);
			}
		}
	}

###### 补充说明
- [attr~=value]为CSS属性选择器，表示一个元素具有一个属性attr,它的值是用空格分隔的单词列表，其中之一为该value
- oGridCenter和oGtridUncenter混合器的定义方式:

		/// Center column
		@mixin oGridCenter {
			margin-left: auto;
			margin-right: auto;
			float: none;
		}
		
		/// Uncenter column
		@mixin oGridUncenter {
			margin-left: 0;
			margin-right: 0;
			float: left;
		}
- human friendly名称有hide、 full-width、 one-half、one-third、 two-thirds、 one-quarter、 three-quarters、 center、uncenter

##### 9.使用pull,push,offset拖拽columns:@mixin _oGridShuffleColumns

###### 定义
	@mixin _oGridShuffleColumns($layout-name: null) {
		@for $colspan from 0 through ($o-grid-columns - 1) {//$o-grid-columns为columns的数量，默认为12;此处$colspan就从0-11遍历
			[data-o-grid-colspan~="#{$layout-name}push#{$colspan}"] {//属性data-o-grid-colspan值形如Lpush4
				@include oGridPush($colspan);//混合器oGridPush定义见下
			}
			[data-o-grid-colspan~="#{$layout-name}pull#{$colspan}"] {//属性data-o-grid-colspan值形如Lpull4
				@include oGridPull($colspan);//混合器oGridPull定义见下
			}
			[data-o-grid-colspan~="#{$layout-name}offset#{$colspan}"] {//属性data-o-grid-colspan值形如Loffset4
				@include oGridOffset($colspan);////混合器oGridOffset定义见下
			}
		}
	}

###### 参数
- $layout-name,类型为String,默认为null

##### 10.规定columns的宽度（包括基本的列的width和响应式页面类型的列的width）:@mixin oGridColspan
###### 定义

	@mixin oGridColspan($span: null, $width-only: false) {
		@if not $width-only {//如果$width-only为false
			position: relative; // 用于使用push和pull
			float: left;
			box-sizing: border-box;
			flex: 1 1 0%;//关于flex属性见下方补充说明
	
			@include oGridTargetIE8 {
				min-width: 0 !important;
			}
	
			@if $o-grid-mode == 'fixed' {//当页面栅格模式为fixed
				padding-left: oGridGutter($o-grid-fixed-layout);//将padding-left设置为$o-grid-fixed-layout页面类型（默认为L)的栅格间距
			} @else {//当页面模式为snappy或fluid
				@each $layout-name in map-keys($o-grid-gutters) {//遍历$o-grid-gutters这个规定栅格间距的map
					@if $layout-name == 'default' {
						padding-left: oGridGutter();
					} @else {
						@include oGridRespondTo($layout-name) {//当页面尺寸大于$layout-name指定类型时，应用该$layout-name类型的栅格间距
							padding-left: oGridGutter($layout-name);
						}
					}
				}
	
				@include oGridTargetIE8 {//为IE8的fixed模式规定栅格间距
					padding-left: oGridGutter($o-grid-fixed-layout);
				}
			}
		}
		@if $span {//如果参数$span不为null
			@include _oGridColumnWidth($span);//混合器_oGridColumnWidth定义方式见下
		}
	}
###### 补充说明
- flex属性：其是flex-grow flex-shrink flex-basis的简写，flex-grow定义项目放大比例;flex-shrink定义项目的缩小比例；flex-basis定义了在分配多余空间前，项目占据的主轴空间。
- 函数oGridGutter，获取某种页面类型的栅格间隔
- 变量$o-grid-fixed-layout变量：当页面为fixed是页面类型的默认值，默认为L,_variables.scss中有定义
- 函数oGridGutter($layout-name: default):获取某种页面类型的间隔
- 变量$o-grid-gutters： 规定了各种页面类型的默认间隔尺寸，类型：Map

			$o-grid-gutters: (
				default: 10px,
				M:       20px,
			) !default;
- 混合器oGridRespondTo($from: false, $until: false)：将样式应用到指明的页面类型上
- 混合器oGridTargetIE8：为IE8定义样式
###### 参数
- $span:类型Number|Map，默认值null

###### scss用法示例

	// @example scss Block has column styles
	 el { @include oGridColspan(); }
	
	// @example scss 4-column wide block
	 el { @include oGridColspan(4); }
	
	/// @example scss Half-width block
	  el { @include oGridColspan(1/2); }
	
	/// @example scss Block is full-width by default, 8-column wide on Medium layouts and hidden on Large layouts
	  el { @include oGridColspan((default: 12, M: 8, L: hide)); }

##### 11.规定跨浏览器的列宽布局样式：@mixin _oGridColumnWidth($span)

###### 定义：

	@mixin _oGridColumnWidth($span) {
		///特殊情况：$span为hidden的话，column是隐藏的
		@if $span == 'hide' {
			display: none;
			
		} @else {

			///当$span为Number或一个Key，那么我们输出该宽度的默认值
			@if type-of($span) == number or type-of($span) == string {
	
				display: block;
	
				@include _oGridFixSafariWrap($span);//详见22.该行就是为修正一个Safari的bug
				min-width: oGridColspan($span);//详见10，oGridColspan函数其就是规定某一宽度的column
				max-width: oGridColspan($span);
	
				// For IE8
				width: oGridColspan($span);
			}
		}
	
		///如果$span是Map,那么我们依次处理所有的页面类型
		@if type-of($span) == map {
			@each $layout-name, $layout-span in $span {
				@if $layout-name == 'default' {
					@include _oGridColumnWidth($layout-span);//该混合器中调用自身混合器
				} @else {

					///如果$layout-span为'hide':
					@if $layout-span == 'hide' {

					    ///该处是针对IE8:当该页面类型的宽度比fixed模式的页面类型宽度的最大值要小时，display为none
						@if index($_o-grid-layout-names, $layout-name) <= index($_o-grid-layout-names, $o-grid-fixed-layout) {
							@include oGridTargetIE8 {
								display: none;
							}
						}

						///当页面类型宽度大于$layout-name页面类型时，display为none
						@include oGridRespondTo($layout-name) {
							display: none;
						}

					  ///当$layout-span不为'hide':
					} @else {

						///当页面类型宽度大于$layout-name页面类型时，display为block
						@include oGridRespondTo($layout-name) {
							display: block;
	
							@include _oGridFixSafariWrap($layout-span);
							min-width: oGridColspan($layout-span);
							max-width: oGridColspan($layout-span);
						}
						
						///针对IE8:只有在页面类型宽度比fixed模式的页面类型的最大宽度小
						@if index($_o-grid-layout-names, $layout-name) <= index($_o-grid-layout-names, $o-grid-fixed-layout) {
							@include oGridTargetIE8 {
								display: block;
								width: oGridColspan($layout-span);
							}
						}
					}
				}
			}
		}
	}

###### 补充说明
- 混合器oGridRespondTo($from: false, $until: false)：将样式应用到指明范围的页面类型上
- 混合器oGridColspan($span: null, $width-only: false)：规定columns的宽度（包括基本的列的width和响应式页面类型的列的width）
###### 参数
- $span,类型Number|Map

###### scss应用示例

	   el { @include _oGridColumnWidth(4); }
	   el { @include _oGridColumnWidth(1/2); }
	   el { @include _oGridColumnWidth(hide); }
	   el { @include _oGridColumnWidth((default: 12, M: 8, L: hide)); }

##### 12.定义Grid container的样式 @mixin oGridContainer
###### 定义

	@mixin oGridContainer($grid-mode: $o-grid-mode, $bleed: false) {
		position: relative;
		box-sizing: border-box;
		margin-left: auto;//margin:0 auto 起到一个水平方向居中的作用
		margin-right: auto;
		min-width: $o-grid-min-width;//变量$o-grid-min-width默认为240px，其在_variables.scss中有定义

		///旧浏览器只得到一个固定宽度的layout
		max-width: oGridGetMaxWidthForLayout($o-grid-fixed-layout);
	
		///如果参数$bleed为true,则该容器左右都没有padding
		@if $bleed {
			padding-left: 0;
			padding-right: 0;
		}
	

		///如果页面模式为fixed
		@if $grid-mode == 'fixed' {

			width: oGridGetMaxWidthForLayout($o-grid-fixed-layout, $grid-mode: 'fixed');//宽度为该页面类型中可取的最大宽度

			///如果在页面模式为fixed情况下，参数$bleed为false
			@if not $bleed {
				padding-left: oGridGutter($o-grid-fixed-layout);//该容器的左右padding都为fixed情况下的栅格间距
				padding-right: oGridGutter($o-grid-fixed-layout);
			}

		///如果页面模式为fluid或snappy
		} @else {
			max-width: $_o-grid-max-width;//默认为XL宽度1220px
	
			@each $layout-name in map-keys($o-grid-gutters) {

				///在$layout-name为default，且$bleed为false时，左右padding值为Gutter里面的default值 
				@if $layout-name == 'default' {
					@if not $bleed {
						padding-left: oGridGutter();
						padding-right: oGridGutter();
					}


				///在$layout-name为一个具体页面类型时:
				} @else {
					@include oGridRespondTo($layout-name) {
						@if not $bleed {
							padding-left: oGridGutter($layout-name);
							padding-right: oGridGutter($layout-name);
						}
					}
				}
			}
	
			@each $layout-name in $_o-grid-layout-names {
				@if index($_o-grid-layout-names, $layout-name) >= index($_o-grid-layout-names, $o-grid-start-snappy-mode-at) {
					@include oGridRespondTo($layout-name) {
						
						///如果页面栅格模式为snappy，则所有的rows都得是snappy
						@if $grid-mode == 'snappy' {
							max-width: map-get($o-grid-layouts, $layout-name);
						}
						@if $grid-mode == 'fluid' {
							
							///如果页面栅格模式为fluid,则使用一个class来规定一个或多个rows为snappy的
							.o-grid-snappy &,
							&--snappy {
								max-width: map-get($o-grid-layouts, $layout-name);
							}
						}
					}
				}
			}
	
			///针对IE8:采用fixed的栅格模式
			@include oGridTargetIE8 {
				@if not $bleed {
					padding-left: oGridGutter($o-grid-fixed-layout);
					padding-right: oGridGutter($o-grid-fixed-layout);
				}
				width: oGridGetMaxWidthForLayout($o-grid-fixed-layout, $grid-mode: 'fixed');
			}
		}

###### 知识补充
- 变量$o-grid-fixed-layout：当页面为fixed时页面类型的默认值，默认为L,_variables.scss中有定义
- @function oGridGetMaxWidthForLayout($layout-name, $grid-mode: $o-grid-mode)： 获取某一页面类型中可取到的最大宽度：
- @funciton oGridGutter($layout-name: default)：获取某种页面类型的栅格间距
- 变量$_o-grid-max-width:其值默认为最大的layout宽度（即o-grid-layouts中XL的值1220px）
###### 参数
- $grid-mode:type为String,默认为$o-grid-mode（为snappy,fluid或fixed)
- $bleed:type为Boolean,默认为false

##### 13.定义基本的row 样式的混合器:@mixin oGridRow

###### 定义

	@mixin oGridRow {
		clear: both;
		flex-wrap: wrap; 
	
		& {
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			@media print {
				display: inherit;
			}
		}
	
		@if $o-grid-mode == 'fixed' {
			margin-left: -1 * oGridGutter($o-grid-fixed-layout);
		} @else {
			@each $layout-name in map-keys($o-grid-gutters) {
				@if $layout-name == 'default' {
					margin-left: -1 * oGridGutter();
				} @else {
					@include oGridRespondTo($layout-name) {
						margin-left: -1 * oGridGutter($layout-name);
					}
				}
			}
	
			@include oGridTargetIE8 {
				margin-left: -1 * oGridGutter($o-grid-fixed-layout);
			}
		}
	
		// Clearfix for IE9 and below
		zoom: 1;//缩放因子为1
	
		&:before,
		&:after {
			content: '';
			display: table;//只在flexbox不被支持的情况下，希望display为table
			& {
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
			}
		}
		&:after {
			clear: both;
		}
	}
###### 补充说明
- 获取某种页面类型的间隔:@funciton oGridGutter
- flex-wrap属性：默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。可取值：nowrap(默认，不换行）|wrap(换行，第一行在上方)|wrap-reverse（换行，第一行在下方）
###### 参数
-  $grid-mode：类型String，默认值$o-grid-mode

##### 14.从一行中移除列与列间的间隔：@mixin oGridRowCompact

###### 定义
	@mixin oGridRowCompact($column-selector: "[o-grid-colspan]") {
		margin-left: 0;
	
		> #{unquote($column-selector)} {//选择当前元素的具有o-grid-colspan属性的子元素
			padding-left: 0;
		}
	}
###### 参数
- $column-selector:类型String,为column元素的选择器（***不知道对不对***），默认值为"[o-grid-colspan]"（即具有属性o-grid-colspan的元素）

##### 15.移除行的样式：@mixin oGridResetRow 
###### 定义

	@mixin oGridResetRow {
		clear: none;//元素不用清楚浮动
		display: block;
		flex-wrap: nowrap;//项目不换行
		margin-left: 0;
	
		&:before,
		&:after {
			display: none;
		}
	}
###### 补充说明
- flex-wrap属性：默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。可取值：nowrap(默认，不换行）|wrap(换行，第一行在上方)|wrap-reverse（换行，第一行在下方）
- CSS clear属性指定：一个元素是紧挨着前面的浮动元素，还是必须移动到它们的下面（浮动被清除）。


##### 16. 居中列:@mixin oGridCenter
###### 定义
	
	@mixin oGridCenter {
		margin-left: auto;
		margin-right: auto;
		float: none;
	}

##### 17. 使列不居中:@mixin oGridUncenter
###### 定义

	@mixin oGridUncenter {
		margin-left: 0;
		margin-right: 0;
		float: left;
	}

#####  18.移除列的样式
###### 定义

	@mixin oGridResetColumn {
		padding-left: 0;
		padding-right: 0;
		float: none;
		width: auto;
		min-width: 0;
		max-width: none;
		flex: none;//flex快捷值none代表(0 0 auto）
	}

##### 19.视觉上重排序pull:@mixin oGridPull
###### 定义

	@mixin oGridPull($columns) {
		right: oGridColspan($columns);//函数oGridColspan:把一个元素在栅格系统中所占的宽度描述转换为百分比
		left: auto;
	}

##### 20.offset(偏移），即在一个column之前添加空格:
###### 定义
	@mixin oGridOffset($columns) {
		margin-left: oGridColspan($columns);//函数oGridColspan:把一个元素在栅格系统中所占的宽度描述转换为百分比
	}

###### 参数
- $columns:类型Number

##### 21.移除给定页面类型宽度和间距的修改器：@mixin _oGridModifiersForLayout

###### 定义

	@mixin _oGridModifiersForLayout($layout-name) {
		@if $o-grid-human-friendly-selectors == true {
			@include _oGridHumanFriendlyKeywords($layout-name);
		}
	
		@if $o-grid-shuffle-selectors == true {
			@include _oGridShuffleColumns($layout-name);
		}
	
		[data-o-grid-colspan~="#{$layout-name}0"] {
			display: none;
		}
	
		@for $colspan from 1 through $o-grid-columns {
			[data-o-grid-colspan~="#{$layout-name}#{$colspan}"] {
				// scss-lint:disable DeclarationOrder
	
				// Restore visibility from `display: none`
				// if `data-o-grid-colspan` was set to `0` or `hide`
				display: block;
	
				// Apply width in %
				@include _oGridFixSafariWrap($colspan);
				min-width: oGridColspan($colspan);
				max-width: oGridColspan($colspan);
				width: oGridColspan($colspan);
			}
		}
	}

###### 参数
- $layout-name:类型String,是$o-grid-layouts的其中一种

##### 22.修复Safari中的一个bug,那里的items不能正确地wrap

	@mixin _oGridFixSafariWrap($args...) {
		flex-basis: oGridColspan($args...);
	}

###### 补充说明：
- flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。详见<http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html>

##### 23. 产生帮助指明栅格宽度的css类的混合器：@mixin oGridGenerate
661行起，待再认真研究。
###### 定义
	@mixin oGridGenerate {
		///基本的页面类型样式
		.o-grid-container {
			@include oGridContainer($o-grid-mode);
		}
		.o-grid-container--bleed {
			padding-left: 0;
			padding-right: 0;
		}
		.o-grid-row {
			@include oGridRow;
		}
		[data-o-grid-colspan] {
			@include oGridColspan();
		}
	
	
		[data-o-grid-colspan~="0"] {
			display: none;
		}
		@for $colspan from 1 through $o-grid-columns {
			[data-o-grid-colspan~="#{$colspan}"] {
				@include oGridColspan($colspan, $width-only: true);
			}
		}
	
		// Compact, gutterless row of columns
		.o-grid-row--compact {
			margin-left: 0;
	
			> [data-o-grid-colspan] {
				padding-left: 0;
			}
		}
	
		@if $o-grid-human-friendly-selectors == true {
			// one-half, one-third, three-quarters, center, uncenter…
			@include _oGridHumanFriendlyKeywords;
		}
	
		@if $o-grid-shuffle-selectors == true {
			// pull, push, offset
			@include _oGridShuffleColumns;
		}
	
		// For IE 8, output grid helper classes and data- attributes
		// for the layout defined in $o-grid-fixed-layout
		@include oGridTargetIE8 {
			// Output grid modifiers for layouts up to the fixed layout displayed by IE8
			$last-layout-index: index($_o-grid-layout-names, $o-grid-fixed-layout);
			@for $index from 1 through $last-layout-index {
				@include _oGridModifiersForLayout(nth($_o-grid-layout-names, $index));
			}
		}
	
		// In browsers that support @media queries,
		// output grid helper classes and data- attributes for all layouts
		@each $layout-name in $_o-grid-layout-names {
			@include oGridRespondTo($layout-name) {
				@include _oGridModifiersForLayout($layout-name);
			}
		}
	}