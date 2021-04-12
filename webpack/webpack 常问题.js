/**
 *  webpack 与 grunt、gulp 的不同点
 */
// grunt 和 gulp 是基于 任务和流的，类似 jq，找到一个(或一类)文件，对其做一系列链式操作，更新流上的数据。整条链式操作构成一个任务，多个任务就构成了整个 web 的构建流程。
// webpack 是基于入口的。webpack 会自动地递归解析入口所需要加载的所有资源文件，然后用不同的 loader 处理不同文件，用 plugin 扩展功能。

/**
 * 对比 rollup，为什么最终使用 webpack
 */
// webpack 适用于大型复杂的前端站点构建
// rollup 适用于基础库的打包

/**
 * module chunk bundle 意义和区别
 */
// module -> 各个源码文件 -> webpack 中一切皆为模块
// chunk -> 多模块合成 -> entry import() splitChunk
// bundle -> 最终输出文件 

/**
 * babel-runtime 和 babel-polyfill 区别
 */
// babel-runtime 不会污染全局
// babel-polyfill 会污染全局
// 第三方库要 babel-runtime

/**
 * 为什么 Proxy 不能被 Polyfill
 */
// Class -> function
// Promise -> callback
// Proxy 不能用 Object.defineProperty 模拟

/**
 * ES6 Module 和 Commonjs 区别
 */
// ES6 Module 静态引入，编译时引入
// Commonjs 动态引入，执行时引入
// 只有 ES6 Module 才能金泰分析，实现 tree-shaking

/**
 * 常见的 loader，解决了什么问题
 */
// file-loader: 将文件夹输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
// url-loader: 和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入
// source-map-loader: 加载额外的 Source Map 文件，方便调试
// image-loader: 加载并压缩图片文件
// babel-loader: 低版本代码兼容
// css-loader: 加载 css，支持模块化、压缩、文件导入等特性
// style-loader: 把 css 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
// eslint-loader: 通过 ESLint 检查 JavaScript 代码

/**
 * loader 和 plugin 的不同
 */
// loader: 加载器。WebPack将一切文件视作模块，但 Webpack 原生只能解析 js 文件，如果想将其他文件也打包，就会用到 loader。
// 即 loader 的作用就是让 webpack 拥有了加载和解析非 JavaScript 文件的能力

// plugin: 插件。plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。在 webpack 运行的声明周期中会广播许多事件，plugin 可以监听这些事件，
// 在合适的时机通过 Webpack 提供的 API 改变输出结果。

/**
 * webpack 构建流程
 */
// 1. 初始化参数: 从配置文件 + shell 命令合并参数
// 2. 开始编译: 根据参数初始化编译对象 -> 加载 plugin -> 执行 run 方法开始执行编译
// 3. 确定入口: 根据配置中 entry 找到所有入口文件
// 4. 编译模块: entry -> loader -> 递归
// 5. 完成模块编译: loader -> 编译后的内容和他们之间的依赖关系
// 6. 输入资源: 根据入口和模块的依赖关系 -> 组装为一个个 chunk -> 转换单独文件到输出列表
// 7. 输出完成: 确定好输出内容后，根据配置输出的路径和文件名，将文件写入文件系统

/**
 * 是否写过 loader 和 plugin？描述编写 loader 或 plugin 的思路
 */
// loader 将源文件 -> 转义为新文件内容 -> 通过链式操作编译源文件
// 编写 loader 时需遵循但一原则，每个 loader 只做一种转义工作。
// 拿到源文件内容 source -> [1. 通过返回值将处理后的内容输出；2. 调用 this.callback() 将内容返回给 webpack；3. 通过 this.async() 生成一个 callback 函数 -> 将 callback 处理后的内容输出]
// 开发 loader 的工具函数集 -> loader-utils

// plugin 相对 loader 来说比较灵活，在 webpack 运行的声明周期中会广播出许多事件，plugin 可监听这些事件，在合适时机通过 api 改变输出结果

/**
 * webpack 热更新的实现原理
 */
// 1. 在 webpack 的 watch 模式下 -> webpack 监听文件变化 -> 根据配置对模块重新编译打包 -> 将打包后的代码通过简单的 JavaScript 对象保存到内存
// 2. webpack-dev-server 和 webpack 之间的接口交互 -> 根据 api 变化通知 webpack -> 打包到内存
// 3. webpack-dev-server 对文件变化的监控 -> devServer.watchContentBase: true -> Server监听这些配置文件夹中静态文件的变化 -> 通知浏览器进行 live reload
// 4. webpack-dev-server 通过 sockjs 在浏览器和服务端建立长链接 -> Server 通知各个状态信息 + 传递新模块的 hash 值 -> 浏览器根据信息做不同操作
// 5. 客户端 HMR 中接收新模块的 hash -> 向 server 发起请求 -> 获取最新模块代码
// 6. HotModulePlugin 对比新旧模块，决定是否更新 -> 检查模块之间的依赖关系 -> 更新模块和模块间的依赖引用
// 7. HMR 失败 -> live reload (浏览器刷新) -> 获取最新打包代码

/**
 * 利用 webpack 优化前端性能
 */
// 1. 压缩代码。利用 webpack 的 UglifyJsPlugin 和 ParallelUglifyPlugin 压缩 JS 文件，利用 cssnano 压缩 css
// 2. cdn 加速，构建时讲台资源路径修改为 cdn 上的路径
// 3. tree shaking，删除未被启用的代码
// 4. 公共代码提取

/**
 * 如何提高 webpack 构建速度
 */
// 1. 多入口情况下，使用 CommonsChunkPlugin 提取公共代码
// 2. 通过 externals 配置来提取常用库
// 3. 利用 DllPlugin 和 DllReferencePlugin 预编译资源模块，通过 DllPlugin 来对那些我们引用但是绝对不会修改的 npm 包进行预编译，再功过 DllReferencePlugin 将预编译的模块加载进来
// 4. 使用 Happypack 实现多线程加速编译
// 5. 使用 webpack-uglify-parallel 提升 uglifyPlugin 压缩速度
// 6. 使用 Tree-shaking 和 Scope Hoisting 删除多余代码

/**
 * npm 打包注意点? 如何利用webpack来更好的构建？
 */
// 1. 支持 CommonJS 规范
// 2. 打包结果应该为 ES5
// 3. npm 包应尽量小
// 4. 发布模块不应将依赖模块一同打包
// 5. ui 组件类的模块应将依赖的其他资源文件包含在发布模块里

// Commonjs模块化规范的解决方案: 设置 output.libraryTarget = "commonjs2" 使输出代码符合 CommonJS2 模块化规范，以供给其他模块导入使用
// 输入 ES5 解决方案: babel + source-map
// npm包尽量小解决方案: babel 配置 transform-runtime
// 发布模块不应将依赖模块一同打包解决方案: externals 配置告诉 webpack 哪些模块不需要打包
// 依赖的资源文件打包的解决方案: css-loader + extract-text-webpack-plugin

/*
    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    module.exports = {
    module: {
        rules: [{ test: /\.css/, use: ExtractTextPlugin.extract({ use: ["css-loader"] }) }]
    },
    plugins: [new ExtractTextPlugin({ filename: "index.css" })]
    };
*/

