const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: ['babel-polyfill', './src/main.js'], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  output: {
    path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
    publicPath: '/', // 通过devServer访问路径上的虚拟目录
    filename: devMode ? '[name].js?[hash:6]' : '[hash].js',// 打包后的文件名
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
          MiniCssExtractPlugin.loader,
          'css-loader',
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
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          outputPath: './images',
          publicPath: '/images/', // 如果有CDN可以修改此路径
          limit: '8192', //文件大小大于limit 8Kb，url-loader会调用file-loader进行处理
          name: devMode ? '[name].[ext]?[hash:8]' : '[hash].[ext]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: './fonts',
          publicPath: '/fonts/', // 不写publicPath也能正常找到fonts目录
          name: devMode ? '[name].[ext]?[hash:8]' : '[hash].[ext]'
        }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css?[hash:8]' : '[hash].css',
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      meta: {
        'charset': 'UTF-8',
        'viewport': 'width=device-width, initial-scale=1.0',
        'Content-Security-Policy': {
          'http-equiv': 'X-UA-Compatible',
          'content': 'ie=edge'
        },
        'favicon': '/static/favicon.ico'
      },
      title: 'iXiaer.com'
    }),
    new CopyWebpackPlugin([{
      from: 'static/',
      to: 'static/'
    }], {})
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
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
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
  devtool: devMode ? 'source-map' : ''
}
