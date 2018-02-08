入门：<http://exploringjs.com/es6/ch_core-features.html#sec_from-concat-to-spread>
### ES5 – concat():
```
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

console.log(arr1.concat(arr2, arr3));
    // [ 'a', 'b', 'c', 'd', 'e' ]
```

### ES6 – spread operator:
```
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

console.log([...arr1, ...arr2, ...arr3]);
    // [ 'a', 'b', 'c', 'd', 'e' ]
```

## MORE
<http://exploringjs.com/es6/ch_parameter-handling.html#sec_spread-operator>