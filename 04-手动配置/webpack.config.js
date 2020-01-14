const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

// 使用 WEBPACK_SERVE 环境变量检测当前是否在 WEBPACK_SERVE 启动的开发环境中
const dev = Boolean(process.env.WEBPACK_SERVE)

module.exports = {
  /* 
  webpack 执行模式
  develop: 开发模式，它会在配置文件中插入调试相关的选项，比如 moduleId 使用文件路径方便调试
  production: 生产环境，webpack 会将代码做压缩等优化
  */
  mode: dev ? 'development' : 'production',

  /*
  配置 source map
  开发模式下使用 cheap-module-eval-source-map,生成的 source map 能和源码每行对应，方便打断点调试
  生产环境下使用 hidden-source-map,生成独立的 source map 文件，并且在不在 js 文件中插入 source map 路径，用于在 error 
  */
  devtool: dev ? 'cheap-module-eval-source-map' : 'hidden-source-map',

  // 配置页面入口 js 文件
  entry: './src/index.js',

  // 配置打包输出相关
  output: {
    // 打包输出目录
    path: resolve(__dirname, 'dist'),

    // 入口 js 的打包输出文件名
    filename: 'index.js'
  },

  module: {
    /*
    配置各种类文件的加载器，称之为 loader
    webpack 当遇到 import ... 时，会调用这里配置的 loader 对引用的文件进行编译 
    */
    rules: [
      {
        /*
        使用 babel编译 ES6 / ES7 / ES8 为 ES5 代码
        使用正则表达式匹配后缀名为 .js 的文件 
        */
        test: /\.js$/,

        // 排除 node_modules 目录下的文件，npm 安装的包不需要编译
        exclude: /node_modules/,

        /*
        use 指定该文件的 loader, 值可以是字符串或者数组。
        这里先使用 eslint-loader 处理，返回的结果交给 babel-loader 处理。loader 的处理顺序是从最后一个到第一个。
        eslint-loader 用来检查代码，如果有错误，编译的时候会报错。
        babel-loader 用来编译 js 文件。
        */
        use: ['babel-loader', 'eslint-loader']
      },

      {
        // 匹配 html 文件
        test: /\.html$/,
        /*
        使用 html-loader,将 html 内容存为 js 字符串，比如遇到
        import htmlString from './template.html';
        template.html 的内容会被转成一个 js 字符串，合并到 js 文件中 
        */
        use: 'html-loader'
      },

      {
        
      }
    ]
  }
}