const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //每次清空 dist 文件夹插件

module.exports = {
  mode: 'development', // 开发模式
  entry: { // 入口文件
    main: path.resolve(__dirname, './src/index.js'),
    header: path.resolve(__dirname, './src/header.js')
  }, 
  output: {
    filename: '[name].[hash:8].js', // 打包后的文件名称
    path: path.resolve(__dirname, './dist') // 打包后的目录
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] //从右向左解析原则
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'] //从右向左解析原则
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my-index',
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      title: 'my-title',
      template: path.resolve(__dirname, './public/header.html'),
      filename: 'header.html',
      chunks: ['header']
    }),
    new CleanWebpackPlugin()
  ]
}