<http://krasimirtsonev.com/blog/article/using-mocha-with-es6-spec-files>

// package.json
```
"scripts": {
  "test": "mocha --compilers js:babel-core/register ./test/header.test.js"
},
"devDependencies": {
  "babel": "6.3.13",
  "babel-core": "6.1.18",
  "babel-preset-es2015": "6.3.13",
  "mocha": "2.3.4"
  ...
}
```

//babel
```
{
  "presets": ["es2015"]
}
```