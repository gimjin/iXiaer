const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

// 判断开发模式或生产模式
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    // 项目的打包文件路径
    path: path.resolve(__dirname, './dist'),
    // 通过devServer访问路径上的虚拟目录
    publicPath: '/',
    // 打包后的文件名
    filename: devMode ? '[name].js?[hash:8]' : '[hash].js',
  },
  module: {
    rules: [{
        // vue-loader必须和VueLoaderPlugin()一起使用
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          // 类似vue-style-loader和style-loader，区别在于会生成单独的css文件，文件配置参考plugin配置
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 已配置 autoprefixer 自动添加-webkit -ms 等前缀兼容浏览器（浏览器列表设置.browserslistrc）
          // 配置文件 postcss.config.js
          'postcss-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.js$/,
        // 支持ES6或更新的JS语法，配置文件.babelrc
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          // 在dist目录中创建assets目录存放所有图片
          outputPath: './images',
          // 浏览器访问地址，如 http://localhost.com/assets/
          publicPath: '/images/',
          // limit 16Kb 会用base64图片减少http请求数量，所以要求UI设计师提供的多彩icon大小要小于16Kb
          // 雪碧图只有在icon量巨大的项目使用，单彩icon用fontcustom方案
          limit: '16384',
          name: devMode ? '[name].[ext]?[hash:8]' : '[hash].[ext]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: './fonts',
          publicPath: '/fonts/',
          name: devMode ? '[name].[ext]?[hash:8]' : '[hash].[ext]'
        }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 创建css独立文件
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css?[hash:8]' : '[hash].css',
    }),
    // npm run dev/build时删除dist目录，保证没有残留文件
    new CleanWebpackPlugin(['dist']),
    // 生成的js和css文件时自动加入并生成index.html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // .hbs是handlebars.js模版名称
      template: 'index.hbs',
      title: 'iXiaer.com',
      meta: {
        'charset': 'UTF-8',
        'viewport': 'width=device-width, initial-scale=1.0',
        'Content-Security-Policy': {
          'http-equiv': 'X-UA-Compatible',
          'content': 'ie=edge'
        },
        'favicon': '/static/favicon.ico'
      }
    }),
    new CopyWebpackPlugin([{
      // static/ 目录复制到 dist/static
      from: 'static/',
      to: 'static/'
    }], {}),
    new WebpackShellPlugin({
      // svg转换成font，配置文件fontcustom.yml
      onBuildStart: ['fontcustom compile'],
      onBuildEnd: ['echo "Webpack build end."']
    })
  ],
  optimization: {
    minimizer: [
      // JS压缩，其实不写Webpack 4.x会在生产模式中自动执行
      new UglifyJsPlugin({}),
      // CSS压缩
      new OptimizeCSSAssetsPlugin({})
    ],
    // 根据Chuncks拆分文件，解决入口文件太大的问题
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // runtime用到的js文件单独剥离出来，解决入口文件太大的问题
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
  resolve: {
    alias: {
      // Vuejs 区分 Full 与 Runtime-only 版本，加入下面语句选择 Full版本编译
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    // 如果为 true ，页面出错不会弹出 404 页面
    historyApiFallback: true,
    // 如果为 true ，在浏览器上全屏显示编译的errors或warnings
    overlay: true
  },
  // 生产模式时关闭source-map
  devtool: devMode ? 'source-map' : ''
}
