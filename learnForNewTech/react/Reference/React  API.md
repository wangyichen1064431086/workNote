## React.Children
<https://reactjs.org/docs/react-api.html#reactchildren>

React.Children提供了用于处理this.props.children的一系列方法

### React.Children.map
```
React.Children.map(children, function(child));
```

### React.Children.forEach
```
React.Children.forEach(children, function(child));
```

### React.Children.count
```
React.Children.count(children)
```
返回children中的components个数

## React.cloneElement()
```
React.cloneElement(
  element,
  [props],
  [...children]
)

```

克隆并返回一个新的element,返回的element将得到原始element的props，也将得到该方法中新提供的props。新的children将替代已经存在的children。原始element上的key和ref将被保留。

和下面这种写法等价:

```
<element.type {...element.props} {...props}>{children}</element.type>

```