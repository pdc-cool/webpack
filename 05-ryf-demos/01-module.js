/**
 * 验证 commonjs 模块化输出对象 module.export 
 */
const jquery = require('jquery')

exports.$ = jquery

console.log(module)

// 可以利用 module.parent 是否为 null，判断该模块是否为入口文件
// 所有的模块都缓存在 require.cache 中，可以使用 delete require.cache[moduleName] 删除

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key]
})

// require.main 判断模块是否直接执行(node module.js)，还是被调用执行
require.main === module
// true
// 调用执行的时候(通过 require 加载脚本执行),上面的表达式返回 false

// require() 内部的处理流程: require 命令是 CommonJS 规范之中用来加载其他模块的命令。它其实不是一个全局命令，而是指向当前模块的 module.require 命令，而后者调用 Node 的内部命令 Module._load
Module._load = function (request, parent, isMain) {
  // 1. 检查 Module._cache ，是否缓存之中有指定的模块
  // 2. 如果缓存之中没有，创建一个新的 Module 实例
  // 3. 将它保存到缓存
  // 4. 使用 module.load() 加载指定的模块文件，读取文件内容之后，使用 module.compile() 执行文件代码(同步执行)
  // 5. 如果加载/解析过程中报错，就从缓存删除该模块
  // 6. 返回该模块的 module.exports
}

// 采用 module.compile() 执行指定的模块的脚本，逻辑如下
Module.prototype._compile = function(content, filename) {
  // 1. 生成一个 require 函数，指向 module.require
  // 2. 加载其他辅助方法到 require
  // 3. 将文件内容放到一个函数之中，该函数可调用 require
  // 4. 执行该函数
}

// 由上步骤: require 函数及其辅助方法主要如下
// 1. require(): 加载外部模块
// 2. require.resolve(): 将模块名解析到一个绝对路径
// 3. require.main: 指向主模块
// 4. require.cache: 指向所有缓存的模块
// 5. require.extentions: 根据文件的后缀名，调用不同的执行函数 