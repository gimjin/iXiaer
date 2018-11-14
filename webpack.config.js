var path = require('path')
var webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ['babel-polyfill', './src/main.js'], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  output: {
    path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
    publicPath: '/dist/', // 通过devServer访问路径上的虚拟目录
    filename: '[name].js' // 打包后的文件名
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [{
        // vue-loader必须和VueLoaderPlugin()一起使用
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
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
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          outputPath: './images',
          publicPath: '/dist/images/', // 如果有CDN可以修改此路径
          limit: '8192', //文件大小大于limit 8Kb，url-loader会调用file-loader进行处理
          name: '[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(ttf|woff)$/,
        loader: 'file-loader',
        options: {
          outputPath: './fonts',
          publicPath: '/dist/fonts/', // 不写publicPath也能正常找到fonts目录
          name: '[name].[ext]?[hash:8]'
        }
      },
    ]
  },
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
