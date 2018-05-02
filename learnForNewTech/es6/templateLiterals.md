<http://exploringjs.com/es6/ch_template-literals.html#ch_template-literals>

## 8.2 Tagged template literals

tagged template:

```
tagFunction`Hello ${firstName} ${lastName}!`;
```

在一个表达式后面放置一个template literal会触发一次函数调用， 它和参数列表（括号中的逗号分隔值）触发函数调用类似。以上代码相当于下面的函数调用（实际上，第一个参数不仅仅是一个数组，这一点稍后会解释）

```
tagFunction(['Hello','','!'],fristName,LastName)
```

tagFunction接受两种不同的data:

- Template string，如'Hello';
- Substitutions(代替物)，如firstName(就是由${}限定了的东西)

Template string是静态已知的（即在编译的时候就能知道），Substitutions在运行时才知道。tag function可以根据需要使用其参数：它可以完全忽略template string，返回任何类型的值等。

另外，tag functions对于每个template string会获得两个版本：
- 反斜杠不被解释的“原始”版本。此时，'\ n'变成 '\\ n'、长度为2的字符串。
- 一个“经过加工”的版本，其中反斜杠是特殊的（'\ n'成为只有一个换行符的字符串）。

## 8.3 Examples of using tagged template literals
Tagged template literals 允许你毫不费力地实现自定义嵌入式子语言(custom embedded sub-languages),因为JavaScript会为你解析大部分内容。你只需编写一个接收结果的函数。

### 8.3.1 Raw strings
ES6包含tag function <code> String.raw </code>, 用于原始字符串，String.raw中的反斜杠没有特殊意思：

```
const str = String.raw `This is a text
with multiple lines.
Escapes are not interpreted,
\n is not a newline.`;
```

这在你需要创建具有反斜杠的字符串的时候很有用。例如:

```
function createNumberRegExp(english) {
  const PERIOD = english ? String.raw`\.` : ',';//(A)
  return new RegExp(`[0-9]+(${PERIOD}[0-9]+)?`);
}
```
在A行中，String.raw使我们能够像在正则表达式中那样编写反斜杠。对于普通的字符串文字，我们必须逃避两次：首先，我们需要避开正则表达式的点。其次，我们需要避开字符串文字的反斜线。

...

## 8.4 Implementing tag funcitons

```
tagFunction`lit1\n${subst1} lit2 ${subst2}`
```
该文字触发以下函数调用:

```
tagFunction(['lit1\n',' lit2', ''], substr1, substr2)
```