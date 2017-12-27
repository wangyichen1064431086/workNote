## 文档
<https://reactjs.org/docs/jsx-in-depth.html>

## JSX In Depth
Fundamentally, JSX just provides syntactic sugar for the React.createElement(component, props, ...children) function.

从根本上说，JSX就是为React.createElement(component, props, ...children)提供了语法糖。

JSX code:
```
<MyButton color="blue" shadowSize={2}>
    Click Me
</MyButton>
```

compiles into:
```
React.createElement(
    MyButton,
    {color:'blue', shadowSize:2},
    'Click Me'
)
```

You can also use the self-closing form of the tag if there are no children. So:

在没有children的情况下，你也可以使用自闭合形式的标签：
```
<div className="sideBar" />
```

compiles into:
```
React.createElement(
    'div',
    {className: 'sidebar'},
    null
)
```

### Specifying The React Element Type
The first part of a JSX tag determines the type of the React element.

JSX标签的第一部分决定了该React element的类型。

Capitalized types indicate that the JSX tag is referring to a React component. These tags get compiled into a direct reference to the named variable, so if you use the JSX <Foo /> expression, Foo must be in scope.

大写的类型表示JSX标签指的是一个React组件。这些标签被直接编译为对指定变量的引用，所以，如果你使用JSX <Foo />表达式，那么变量Foo必须在作用域范围内。

### React Must Be in Scope
Since JSX compiles into calls to React.createElement, the React library must also always be in scope from your JSX code.

由于JSX编译为对React.createElement的调用，故React库必须始终位于你的JSX代码的作用域范围内。

For example, both of the imports are necessary in this code, even though React and CustomButton are not directly referenced from JavaScript:

例如，在下列中虽然React和CustomButton都没有直接通过JavaScript引用，但它俩的imports都是必须的。

```
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

If you don’t use a JavaScript bundler and loaded React from a < script> tag, it is already in scope as the React global.

如果你不使用JavaScript模块，而是从< script>标签加载React，则全局变量React已经存在于作用域范围内。

### Using Dot Notation for JSX Type 为JSX Type使用点符号

You can also refer to a React component using dot-notation from within JSX. This is convenient if you have a single module that exports many React components. For example, if MyComponents.DatePicker is a component, you can use it directly from JSX with:

您也可以在JSX中使用点符号来引用React组件。 如果你有一个导出许多React组件的模块，使用点符号就很方便。 例如，如果MyComponents.DatePicker是一个组件，你可以直接以JSX方式使用它：

```
import React from 'react';

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return (
            <div>
                Imagine a {props.color} datepicker here.
            </div>
        );
    }
}

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" /> ;
}

```

### User-Defined Components Must Be Capitalized: 用户自定义组件必须大写
When an element type starts with a lowercase letter, it refers to a built-in component like < div> or < span> and results in a string 'div' or 'span' passed to React.createElement. Types that start with a capital letter like <Foo /> compile to React.createElement(Foo) and correspond to a component defined or imported in your JavaScript file.

当element type以小写字母开头时，它指的是像< div>或者< span>这样的内置组件，然后生成字符串'div'或'span'传递给React.createElement.以大写字母（如< Foo />)开头的type会编译为React.createElement(Foo),并对应于JavaScript文件中定义或导入的component。

We recommend naming components with a capital letter. If you do have a component that starts with a lowercase letter, assign it to a capitalized variable before using it in JSX.

我们建议用大写字母命名组件。如果你确实有一个小写字母开头的组件，那么请在用JSX使用它之前先将它赋值给一个大写字母开头的变量。

### Choosing the Type at Runtime:在运行时就选择好Type
You cannot use a general expression as the React element type. If you do want to use a general expression to indicate the type of the element, just assign it to a capitalized variable first. This often comes up when you want to render a different component based on a prop:

您不能使用通用表达式作为React元素类型。 如果您确实想使用通用表达式来不是元素的类型，只需将其先分配给首字母大写的变量即可。 当你想渲染一个基于prop的不同的组件时：

```
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}
```

To fix this, we will assign the type to a capitalized variable first:

为了纠正它，我们将先把该type赋值给一个首字母大写的变量：

```
import React from 'react';
import {PhotoStory, VideoStory} from './stories';

const components = {
    photo: PhotoStory,
    video: VideoStory
}

function Story(props) {
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />;
}
```

### Props in JSX