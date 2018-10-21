# iXiaer
夏尔猫舍App（Vuejs + Webpack + iView）
https://kimseongrim.github.io

## 安装Nodejs 和 Ruby
> * 推荐安装node版本v10.11.0
> * 推荐安装ruby版本v2.3.7p456

## 已安装的插件及依赖
> * 为确保下载项目时正常运行，所有的插件都是用--save-dev本地安装，无需安装插件
> * 查看package.json了解所有插件，关于每个插件的作用请Baidu或Google
> * npm国内非常慢，建议切换淘宝的源，请访问 https://npm.taobao.org

## 运行iXiaer
```shell
$ cd iXiaer
$ npm run dev
```
## App技术知识点
* main.js
> * 全局数据集Vuex在New Vue()绑定store，子模块中this.\$store访问
> * 按需引入iView
> * cookie，Vue.use(VueCookie)后直接可以在子组件中this.\$cookie访问

* App.vue
> * iView Grid栅格做响应式布局，与其他iView组件使用
> * &lt;transition> 动画，有css3 animation和transition的所有功能，理论上可以做所有动画（请参考官网教程>过渡 & 动画）
> * &lt;keep-alive> keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
> * &lt;router-view> 组件切换功能，有点类似HTML iFrame或者 Android fragment
> * 同步导入组件 与 异步导入组件
> * @import 导入scss文件
> * this.\$i18n.locale = 'en_US' 切换国际化语言方法
> * &lt;v-touch> 实现Swipe, Tap, Double Tap等操作

* components/ContentDetail.vue
> * 动态组件 &lt;component :is"comp"></component>
> * 插槽 &lt;slot name="info">&lt;/slot>
> * 自定义事件 this.\$emit('myEvent') &lt;div @myEvent=""> 另外：.sync符号是自定义时间的一种语法糖
> * i18n国际化，{{ $t("message.hi") }} 引用i18n/index.js内容

* components/ImageSison.vue
> * @loaded()事件同HTML中onload()
> * iVIew LoadingBar 页面顶部显示进度条，与控制进度条
> * require('../assets/sison.jpg') 会通过url-loader引入更新
> * HTML 标签中使用 @ : 符号语法糖 @click 其实是 v-on:click，:style 其实是 v-bind:style的写法。更多 https://cn.vuejs.org/v2/api/#v-bind
> * &lt;style scoped> scoped是作用域标签，里面所有的声明只在此组件生效

* components/DisplayWeather.vue
> * axios 异步请求数据用法
> * mounted & computed 生命周期回调函数，同样也可以setter&getter来写此Demo中的例子 https://cn.vuejs.org/v2/guide/computed.html#计算属性的-setter
> * this.\$nextTick DOM被渲染时的钩子函数nextTick
> * {{showTemp}} 其实是最简单的JavaScript表达式。更多参考模版语法 https://cn.vuejs.org/v2/guide/syntax.html

## 小小Bug给的警告
切换到Larva界面时手动刷新浏览器时背景图片是Larva，但是其他打招呼都是Sison的。
原因是App.vue中data.name设置成静态的值'Sison'，所以建议实际项目中用后台动态数据设置。
