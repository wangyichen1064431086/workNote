
### 三、常用配置选项
```js
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import minify from 'rollup-plugin-minify-es';
import cssdiscardcomments from 'postcss-discard-comments';

export default {
  input: './src/js/Login.js',//这个包的入口点
  output:[
    {
      name:'FtcLogin',//生成包的名称，代表你的 iife/umd 包，同一页上的其他脚本可以访问它。对于es无效
      sourcemap: true,//如果为 true，将创建一个单独的sourcemap文件；如果为'inline'，sourcemap将作为数据URI附加到生成的output文件中。
      
      globals:{ //全局模块，用于umd/iife
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      /* 使用globals的必要性：
      此处相当于告诉Rollup, 'react-dom'模块的id等同于ReactDOM,'react'模块的id等同于'React'。
      Rollup需要知道React对应于包外的内容 - 换句话说，这个全局变量名React指的是什么。这就是global的意义所在。如果你没有包含全局变量选项，Rollup将根据你编写的代码进行猜测，但它会警告你它正在猜测 - 
      */

      file: './build/index.js', //要写入的文件。也可用于生成 sourcemaps。比如这里设置了sourcemap，那么最后sourcemap的文件就是'./build/index.js.map'

      format: 'umd' //生成的包的格式。下列之一:
      /**
       * amd-异步模块定义，用于像RequireJS这样的模块加载器
       * cjs-CommonJS,适用于Node和Browserify/Webpack
       * es-ES模块文件
       * iife-具有自动执行功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
       * umd-通用模块定义，以amd,cjs和iife为一体
       */
      
    },
    {
      sourcemap: true,
      file: './build/index.es.js',
      format: 'es'
    },
  ],


  plugins: [ //插件对象数组。记住要调用导入的插件函数，如commonjs()而非commonjs
    
    postcss({//PostCSS是一个使用JS插件转换样式的工具。这些插件可以检查你的CSS，支持变量和mixins，转换未来的CSS语法，内联图像等。
      modules: true

      plugins: [
        cssdiscardcomments()//移除css里面的comments
      ]
    }),
    
    babel({
      exclude: 'node_modules/**'
    }),
    /*
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    */
    resolve({
      jsnext: true,
      main:true
    }),
    commonjs({
      /*
      namedExports: {
        'node_modules/immutable/dist/immutable.js':['Seq']
      }
      */
    }),
    minify({ //压缩代码，去掉console。对于es和umd都有用
      compress: {
        drop_console:true
      }
    })
  ],

  external: ['react', 'react-dom','prop-types','classnames','react-css-modules'],//外链。列出外部依赖的模块ID, 模块ID应该是1. 外部依赖模块的名称 2.一个可以被找到的文件路径（文件的绝对路径）。
  /* NOTE:使用external的必要性：
  这样可以告诉rollup这些是外部依赖包，不要打包进最后的bundle中。这样就可以使得到的bundle很小。
  例如：当我external为空时，得到的文件大小有500K+;当external包含react和react-dom时，得到的文件大小是100K+;当external包含全部外部依赖时，得到的文件只有10K+.
  这些依赖的包只要写在package.json的dependency字段就可以在安装本包的时候自动安装这些依赖包
  */

  
}

```

### 四、几个难点

#### 1. globas和external的区别
