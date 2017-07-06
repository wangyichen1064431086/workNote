## 参考博客原文链接
<http://www.jianshu.com/p/604305a61e57>
<http://www.hangge.com/blog/cache/detail_524.html>
在swift 3中新增加了两种访问控制权限 fileprivate和 open(共5种 open，public，internal，fileprivate，private）。下面将对这两种新增访问控制做详细介绍。

## 我的总结
### 1. private
private访问级别所修饰的属性或者方法只能在当前类里访问。

### 2. fileprivate 
fileprivate访问级别所修饰的属性或者方法在当前的Swift源文件里可以访问


### 3. internal（默认访问级别，internal修饰符可写可不写）
internal访问级别所修饰的属性或方法在源代码所在的整个模块都可以访问。
如果是框架或者库代码，则在整个框架内部都可以访问，框架由外部代码所引用时，则不可以访问。
如果是App代码，也是在整个App代码，也是在整个App内部可以访问。

### 4. public
可以被任何人访问。但其他module中不可以被override和继承，而在module内可以被override和继承。

### 5. open
可以被任何人使用，包括override和继承。

### 从高到低排序如下：
open > public > interal > fileprivate > private


