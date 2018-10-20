# iXiaer
夏尔猫舍网站 Vuejs + Webpack + iView
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
## 小小Bug给的警告
切换到Larva界面时手动刷新浏览器时背景图片是Larva，但是其他打招呼都是Sison的。
原因是App.vue中data.name设置成静态的值'Sison'，所以建议实际项目中用后台动态数据设置。
