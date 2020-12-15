console.log(process.env.NODE_ENV);
const port = process.env.port || 1234;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  // __dirname:项目的路径
  return path.join(__dirname, dir);
}

// 全局样式 变量、函数
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('src/styles/variables.less'),
        resolve('src/styles/mixin.less'),
      ],
    });
}

module.exports = {
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'h5',
  productionSourceMap: false, // 生产环境是否 生成SourceMap
  publicPath: '/',
  devServer: {
    port,
    // 启动之后 自动打开浏览器
    open: false,
    // 报错的时候全屏显示错误
    overlay: {
      warnings: false,
      errors: true,
    },
    // host:'0.0.0.0',
    // hot: true,
    // hotOnly: false,
    // https: false,
    // 代理
    proxy: {
      '/api': {
        target: 'https://xwx.xzytest.cn',
        // target: 'http://192.168.2.25:7100',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
    },
  },
  css: {

  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        assets: resolve('src/assets'),
        store: resolve('src/store'),
        views: resolve('src/views'),
        api: resolve('src/api'),
        components: resolve('src/components'),
        utils: resolve('src/utils'),
        styles: resolve('src/styles'),
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('public/index.html'),
        inject: true,
        favicon: path.resolve('public/favicon.ico')
      }),
    ]
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('less').oneOf(type)));
  },
};
