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
There are several different ways to specify props in JSX.

#### JavaScript Expressions as Props
You can pass any JavaScript expression as a prop, by surrounding it with {}. For example, in this JSX:

可以将任何JavaScript表达式用{}括起来，赋值给prop。Eg:

```
<MyComponent foo={1+2+3+4} />
```

For MyComponent, the value of props.foo will be 10 because the expression 1 + 2 + 3 + 4 gets evaluated.

props.foo的值最终为10。

if statements and for loops are not expressions in JavaScript, so they can’t be used in JSX directly. Instead, you can put these in the surrounding code. For example:

在JavaScript中，if说明和for循环不是表达式，所以它们不能直接被用到JSX中。但是，你可以将它们放在JSX的外围代码中。Eg:

```
function NumberDescriber(props) {
    let description;
    if (props.number % 2 ==0) {
        description = <strong>even</strong>;
    } else {
        description = <i>odd</i>;
    }
    return <div>{props.number} is an {description} number</div>;
}
```

#### String Literals 字符串字面量
You can pass a string literal as a prop. These two JSX expressions are equivalent:

你以将一个字符串字面量赋值给prop。一下两种JSX表达式是等价的:

```
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />
```

When you pass a string literal, its value is HTML-unescaped. So these two JSX expressions are equivalent:

当你传递一个字符串字面量时，它的值是未转义的HTML。所以以下两种JSX是等价的:

```
<MyComponent message="&lt;3" />
<MyComponent message={'<3'} />
```

This behavior is usually not relevant. It’s only mentioned here for completeness.

这种行为其实并不是重点。这里提一下只是为了我们表述的完整性。

#### Props Default to "True" : Props默认值为true
If you pass no value for a prop, it defaults to true. These two JSX expressions are equivalent:

如果你的prop没有值，那么它默认是true。以下两个表达式是等价的。

```
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```

In general, we don’t recommend using this because it can be confused with the ES6 object shorthand {foo} which is short for {foo: foo} rather than {foo: true}. This behavior is just there so that it matches the behavior of HTML.

通常，我们不推荐这样写（没有值的prop），因为它会和ES6的对象简写——{foo}是{foo:foo}的简写，而非{foo:true}——混淆。这种行为之所以存在仅仅是为了和HTML的行为一致。

#### Spread Attributes:属性展开
If you already have props as an object, and you want to pass it in JSX, you can use ... as a “spread” operator to pass the whole props object. These two components are equivalent:

如果你已经有了一个对象形式的props, 而且你想在JSX中使用它，你可以使用...作为一个“展开”操作符来传递整个props对象。以下两种组件是等价的：

```
function App1() {
    return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
    const props = {firstName: 'Ben', lastName:'Hector'};
    return <Greeting {...props} />;
}
```

You can also pick specific props that your component will consume while passing all other props using the spread operator.

你也可以选择你的组件将使用的特定props，同时使用展开操作符传递其他所有props。

```
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className}  {...other} />;
}

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
```

In the example above, the kind prop is safely consumed and is not passed on to the < button> element in the DOM. All other props are passed via the ...other object making this component really flexible. You can see that it passes an onClick and children props.

在上面的例子中，kind prop可以安全地被使用，并且不会被传递给DOM中的< button>元素。 其他所有props都通过...other对象传递，这就使得这个组件非常灵活。 你可以看到它传递了一个onClick prop和children prop。

Spread attributes can be useful but they also make it easy to pass unnecessary props to components that don’t care about them or to pass invalid HTML attributes to the DOM. We recommend using this syntax sparingly.

扩展属性可以是非常有用的，但它们也可以很容易地将非必需的props传递给不关心它们的组件, 或将无效的HTML属性传递给DOM。 我们建议少用这个语法。

### JSX Children



