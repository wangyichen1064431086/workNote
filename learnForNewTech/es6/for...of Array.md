```js
const arr = ['a', 'b', 'c'];
for (const elem of arr) {
    console.log(elem);
}
```

If you want both index and value of each array element, for-of has got you covered, too, via the new Array method entries() and destructuring:
```js
for (const [index, elem] of arr.entries()) {
    console.log(index+'. '+elem);
}
```