<http://exploringjs.com/es6/ch_destructuring.html#sec_overview-destructuring>

### 10.1.1 Object destruturing
```
const obj = { first: 'Jane', last: 'Doe' };
const {first: f, last: l} = obj;
    // f = 'Jane'; l = 'Doe'
```
**注意：** 必须确认obj中含有属性first,last,否则会报错

### 10.1.2 Array destructuring
```
  const iterable = ['a', 'b'];
  const [x, y] = iterable;
    // x = 'a'; y = 'b'
```