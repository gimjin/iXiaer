# iXiaer
夏尔猫舍网站 Vuejs + Webpack + iView Demo

## 修改原
安装 Nodejs环境
安装 Ruby环境
切换淘宝的原

## 安装模块
cross-env 本地安装
axios 本地安装

vue-i18n
vue-cookie

babel-loader@7 本地安装
babel-core 本地安装
babel-loader 本地安装
babel-preset-env 本地安装
babel-preset-stage-0 本地安装
babel-polyfill 本地安装

iView 本地安装
style-loader 本地安装
css-loader 本地安装
vue-style-loader 本地安装
babel-plugin-import 本地安装，用于按需引用

sass-loader 本地安装
node-sass 本地安装

url-loader 本地安装
file-loader 本地安装

webpack 本地安装
webpack-cli 本地安装
web pack-dev-server 本地安装

Vuejs 本地安装
vue-router 本地安装
@vue/devtools 本地安装
@vue/cli 全局安装  
@vue/cli-init   官方提示全局安装，所以全局安装了
vuex 本地安装

vue-loader 本地安装，必须依赖vue-template-compiler 单文件组件
vue-template-compiler 本地安装

## 组件知识点


## 知识点

mongoose？？？？？？？？数据库

iView
  响应式Layout
  按需引入Component
Javascript规范
  箭头语法 == 对象 数组 变量
  CommonJS语法
  AMD语法
Vue语法
  字面量语法 vs 动态语法 ：天气
  语法糖
  <input v-bind:value="something"  v-on:input="something = $event.target.value">
  //简写：<input :value="something"  @input="something = $event.target.value">
组件注册
  全局注册
  本地注册
  router
过度动画
  121212 图片切换
  1212121
prop
  动态prop
  prop验证
  .sync 用按钮例子
自定义事件
  绑定原生事件.native
  自定义组件的 v-model（2.2.0 新增）
动态组件 ： Hi I am Sison
其他
  对低开销的静态组件使用 v-once
  i18n
  插槽，组件的一块HTML模板，这块模板显示不显示、以及怎样显示由父组件来决定。 ： 我已被领养这句话上引用,不引入vue文件
  CSS作用域

  CommonJS
  AMD
  ES6

  Nodejs的模块系统就采用CommonJS模式。CommonJS标准规定，一个单独的文件就是一个模块，模块内将需要对外暴露的变量放到exports对象里，可以是任意对象，函数，数组等，未放到exports对象里的都是私有的。用require方法加载模块，即读取模块文件获得exports对象。

最后你发现在Larva页面浏览器刷新时，图片还是Larva的照片但是文字已经变成Sison，所以实际项目当中应该把data数据绑定动态数据
