<https://github.com/postcss/postcss>

官网:<http://postcss.org/>

postcss是一个用JS插件转换样式的工具。这些插件可以使您的CSS支持variables和mixins，编译未来的CSS语法，内嵌图片，等等。

### 插件
目前，PostCSS拥有超过200个插件。

#### 插件系列1:在今天使用未来的CSS
##### postcss-cssnext
<http://cssnext.io/>
<https://github.com/MoOx/postcss-cssnext/blob/master/src/features.js>

###### 用法
Eg：
```
  .pipe($.postcss([
      cssnext({
        features: {
          colorRgba: false//好像是为true的话会给你转成rgb
        }
      })
    ]))
```
关于属性colorRgba:
  colorRgba: (options) => require("postcss-color-rgba-fallback")(options),

  <https://npmjs.com/package/postcss-color-rgba-fallback>
  PostCSS插件将rgba（）转换为十六进制。将其设为false，则表明不用转