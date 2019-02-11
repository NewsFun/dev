// vue.config.js
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('views', resolve('src/views'));
  },
  css: {
    // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
    // 也可以是传递给 extract-text-webpack-plugin 的选项对象
    sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
    loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
    modules: false
  },
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  lintOnSave: true, // 设置为true,eslint-loader 会将 lint 错误输出为编译警告，且不会使得编译失败；设置为'error'，将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败
  productionSourceMap: false, // 是否为生产环境构建生成sourceMap?
  devServer: {
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    open: true, // 项目启动后自动打开浏览器
    disableHostCheck: true,
    proxy: {
      '/superlearnAPI': {
        target: 'https://test.superlearn.com',
        changeOrigin: true,
        pathRewrite: {
          '^/superlearnAPI': ''
        }
      },
      '/api': {
        target: 'https://gre-api-test.superlearn.com',
        changeOrigin: true
      }
    }
  }
};
