# Smarty学习笔记
smarty网站：<http://www.smarty.net/>


php文档：<>

php函数参考：<http://php.net/manual/zh/funcref.php>
# 关于Smarty

## What is Smarty?
Smarty是PHP的模板引擎，使得呈现(HTML/CSS)与应用逻辑相分离。这表示PHP代码是应用逻辑，它将从呈现隔离出来。

## 模板：两个思想阵营
提及PHP的模板制作，基本有两种思想阵营。

第一个阵营的人会大喊：“PHP是一个模板引擎"。该方法仅仅将PHP代码和HTML混合在一起。

第二个阵营大喊呈现应该避免所有的程序代码，且使用简单的标签来指明哪里的内容需要显示。

## 为什么将PHP从样板分离出来很重要？
将PHP代码从模板分离出来好处很多，其中一些是：

- **语法：** 模板通常由标记语言组成，如HTML。PHP语法适用于应用代码，但是在和HTML混合在一起的时候就很快退化。Smarty的简单的{tag}语法专门为表达呈现而设计。Smarty让你的模板专注于呈现，而更少地专注于程序代码。这就赋予了模板更快的部署和更容易的维护。使用Smarty语法不需要具备对PHP知识的了解，对于程序员和非程序员都一样直观。

- **特色：** 模板引擎在呈现方面具有很多特色，它们另外需要在你自己的应用程序代码中开发、测试和维护。Tag也掩盖了PHP语法的复杂性。例如：

	PHP代码：

		<?php echo strtolower(htmlspecialchars($title,ENT_QUOTES,UTF-8)); ?>

	Smarty写法：

		{$title|escape|lower}

	和PHP是基于C的抽象层面的语言以简化开发一样，Smarty是基于PHP的抽象层面的语言以简化模板维护。
- **沙盒化：** 当PHP和模板混合起来，什么类型的逻辑可以注入模板就没有限制了。Smarty从PHP中隔离出模板，创造了一个受控制的对于呈现和业务逻辑的分离。Smarty还具有安全特性，这可以进一步加强模板的细粒度限制。
- **可移植性：** 因为Smarty模板是与语言无关的，它们可以使用不同的编译器轻易地编译为其他语言（如javascript)，且这种熟悉的语法可以被移植到其他程序语言。

# Smarty3中文手册
<http://www.smarty.net/docs/zh_CN/>


## Smarty变量
<http://www.smarty.net/docs/zh_CN/language.syntax.variables.tpl>


## Chapter3 基本语法

### 3.1. 双引号内嵌入变量
<http://www.smarty.net/docs/zh_CN/language.syntax.quotes.tpl>

- Smarty可以识别出在双引号中嵌套的 变量值，这些变量名称必须只包括 字母、数字和下划线
- 带有其他字符的，如点号（.）或者 $object->reference形式的变量， 必须用\`单引号\`括起来。
- Smarty3中允许在双引号中嵌入Smarty的标签并运行。 如果你需要在双引号的变量上使用修饰器、插件或者PHP函数等，这是非常有用的。

#### eg:

	
	{func var="test $foo test"}              // 识别变量 $foo
	{func var="test $foo_bar test"}          // 识别变量 $foo_bar
	{func var="test `$foo[0]` test"}         // 识别变量 $foo[0]
	{func var="test `$foo[bar]` test"}       // 识别变量 $foo[bar]
	{func var="test $foo.bar test"}          // 识别变量 $foo (不是 $foo.bar)
	{func var="test `$foo.bar` test"}        // 识别变量 $foo.bar
	{func var="test `$foo.bar` test"|escape} // 引号外的修饰器!
	{func var="test {$foo|escape} test"}     // 引号内的修饰器!
	{func var="test {time()} test"}          // PHP函数结果
	{func var="test {counter} test"}         // 插件的结果
	{func var="variable foo is {if !$foo}not {/if} defined"} // Smarty区块函数

### 3.2 注释
就是在前后两个定界符内部使用 \*

#### eg:
	
	{* 这是一个注释 *}

## Chapter5 变量修饰器

### 5.1 replace
对变量进行简单的搜索和替换。

#### 参数

参数顺序|类型|必选参数|默认值|说明
-------|----|-------|-----|----
1	   |string|Yes|n/a|需要搜索并替换的字符
2	   |string	|Yes |n/a|替换用的字符



#### Eg:


	<?php
	
	$smarty->assign('articleTitle', "Child's Stool Great for Use in Garden.");
	
	?>

模板：

	{$articleTitle}
	{$articleTitle|replace:'Garden':'Vineyard'}
	{$articleTitle|replace:' ':'   '}

输出：

	
	Child's Stool Great for Use in Garden.
	Child's Stool Great for Use in Vineyard.
	Child's   Stool   Great   for   Use   in   Garden.

### 5.9 default
为变量设置默认值。 当变量是unset或者empty的字符串时，默认值将显示。 必须要有一个参数。


	<?php
	
	$smarty->assign('articleTitle', 'Dealers Will Hear Car Talk at Noon.');
	$smarty->assign('email', '');
	
	?>

模板：

	{$articleTitle|default:'no title'}
	{$myTitle|default:'no title'}
	{$email|default:'No email address available'}

输出：

	
	Dealers Will Hear Car Talk at Noon.
	no title
	No email address available
## Chapter7 内置函数
### 7.1 {foreach}
Smarty内置函数，用于循环数组，语法{foreach $arrayvar as $itemvar}或{foreach from=$myarray key="mykey" item="myitem"}，用法：

		<?php
		$arr = array('red', 'green', 'blue');
		$smarty->assign('myColors', $arr);
		?>

		<ul>
		{foreach $myColors as $color}
		    <li>{$color}</li>
		{/foreach}
		</ul>

### 7.2 {include}
{include}用于载入其他模板到当前模板中。 在包含模板中可用的变量，载入后在当前模板仍然可用。

#### 参数:
- file: {include}必须设置file 属性，设置载入的文件资源路径。
- assign:设置了可选的assign属性，将{include}模板的内容赋值到变量，而并非输出。 与 {assign}操作相似。

### 7.6 {php}

{php}标签可以允许PHP代码直接嵌到模板中使用。 这些代码是否被编码，需要取决于$php_handling 的设置。

**重要说明**

Smarty已经废弃{php}标签，强烈建议不要使用。 请把你的PHP逻辑放到PHP程序或者插件函数中实现。在Smarty 3.1，{php}仅在SmartyBC中可用。

#### 用法eg:

	{php}
	   // including a php script directly from the template.
	   include('/path/to/display_weather.php');
	{/php}
