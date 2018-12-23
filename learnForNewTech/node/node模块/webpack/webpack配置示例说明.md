参见：<https://webpack.docschina.org/configuration/>

```js
const path = require('path');
const webpack = require('webpack');
const sassLoader = 'style-loader!css-loader?modules&importLoaders&localIdentName=[name]__[local]__[hash:base64:5]!sass-loader?sourceMap=true&sourceMapContents=true';
const sassLoaderDemo = 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true';
module.exports = {
  mode:'development',
 /* https://webpack.docschina.org/concepts/mode/#src/components/Sidebar/Sidebar.jsx
  - development：会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
  - production：会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
  - none：不选用任何默认优化选项
 */


  devtool: 'cheap-module-eval-source-map',
  /*https://webpack.docschina.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx
  *此选项控制是否生成，以及如何生成 source map。
  通过为浏览器devtools添加元信息来增强调试功能) 
   - 不同值的sourcemap构建速度、品质不同，在生产环境一般使用cheap-source-map
  */
  entry: [
    //'webpack-hot-middleware/client',
    './demo/src/app.js'
  ],
  /*
  * 入口文件路径
  * 对于多入口的写法
  entry: {
   manage_adfornews: ['./client/js/manage/adfornews.js','./client/scss/app.scss'],
   manage_adforradio:['./client/js/manage/adforradio.js','./client/scss/app.scss']
  }
  */

  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, '.tmp'),//所有输出文件的目标路径,必须是绝对路径
    filename: 'bundle.js',
    /* 输出文件的名称
     - filename: '[name].js'用于多个入口chunk
     - filename:"[chunkhash].js", // 使用基于每个 chunk 内容的 hash
     - filename: '[name].[hash].bundle.js'//使用每次构建过程中，唯一的 hash 生成
    */
    publicPath: '/static/',
    /*此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」
    - "https://cdn.example.com/static/", //CDN路径
    - '',//相对于HTML页面
    - '/static/',//相对于服务的路径
    */
  },

  module: {
    //这些选项决定了如何处理项目中的不同类型的模块

    rules: //type array. 创建模块时，匹配请求的规则数组。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。


     [{
      test:/\.jsx?$/,//匹配.js和.jsx结尾的文件
      /*
      Rule.test 是 Rule.resource.test 的简写。
      */
      include: [//包含的资源路径
        path.join(__dirname, 'demo','src'),
        path.join(__dirname, 'src', 'js')
      ],
      loaders: ['babel-loader']
      /*Rule.loaders is an alias to Rule.use.
      loader 用于对模块的源代码进行转换
      */
    }, {
      test: /\.scss$/,
      include: [
        path.join(__dirname, 'src', 'scss'),
        //path.resolve(__dirname, 'node_modules')
      ],
      loader: sassLoader
    },{
      test: /\.scss$/,
      include: [
        path.join(__dirname, 'demo'),
        //path.resolve(__dirname, 'node_modules')
      ],
      loader: sassLoaderDemo
    }]
  },

  resolve: { 
    //这些选项能设置模块如何被解析
    
    alias: {
      //Create aliases to import or require certain modules more easily. Eg: in app.js, "import React from '../node_modules/react';" can now be written as "import React from 'react"
      //创建 import 或 require 的别名，来确保模块引入变得更简单。
      'react': path.join(__dirname,'node_modules','react')
    },
    extensions: [
      //Enables users to leave off the extension when importing.(省略引入文件的后缀)
      '.js', '.jsx','.scss','.css'
    ]
  },

  plugins: [//一些插件
    //new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
```