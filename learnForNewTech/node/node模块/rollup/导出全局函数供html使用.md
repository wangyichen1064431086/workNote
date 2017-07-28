### gulpfile.js任务
```
gulp.task('script',() => {
  // TODO:关于rollup需要再认真学习一下
   return rollup({
     entry:'client/js/main.js',
     cache: cache,
     plugins:[
       babel({//这里需要配置文件.babelrc
         exclude:'node_modules/**'
       }),
       nodeResolve({
         jsnext:true,
       })
     ]
   }).then(function(bundle) {
     cache = bundle;//Cache for later use
     return bundle.write({//返回promise，以便下一步then()
       dest: '.tmp/scripts/main.js',
       format: 'iife',
       sourceMap: true,
       moduleName:'myJsModule',
     });
   }).then(() => {
     browserSync.reload();
   }).catch(err => {
     console.log(err);
   });
});
```
注意使用字段moduleName指代该编译出来的js模块

### 原client/js/main.js:
```
export {
    sendImpToThirdParty,
    findTop,
    closeOverlay
};
```
导出html需要用到的函数或其他变量

### 在html或其他js中使用：
```
<div onclick="myJsModule.closeOverlay()"></div>
```