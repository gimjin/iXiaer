import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'
Vue.use(Vuex)

// 引入./i18n/index.js
import i18n from './i18n'

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

// 按需引入也需要iview.css，按需引入需要配置.babelrc
import 'iview/dist/styles/iview.css'
import {
  Button,
  Row,
  Col,
  Icon,
  Select,
  Option
} from 'iview';
// 全局注册组件，必须在根Vue实例 (通过 new Vue) 创建之前发生引入。
Vue.component('i-button', Button);
Vue.component('i-row', Row);
Vue.component('i-col', Col);
Vue.component('i-icon', Icon);
Vue.component('i-select', Select);
Vue.component('i-option', Option);

// 全局数据集，可响应式修改界面已绑定数据
const store = new Vuex.Store({
  // 不要在发布环境下启用严格模式！**严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production',
  // 数据存储，不能直接用store.state修改内容，需要通过mutations修改
  state: {
    describe: 'message.sison_describe',
  },
  // 修改state的唯一的入口
  mutations: {
    setDescribe(state, desc) {
      state.describe = desc
    }
  },
  // getters可以返回用state加工后的值，用箭头函数写法更简洁一些function(state) {
  getters: {
    getDescribe: state => {
      return state.describe
    }
  }
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  // 类似store绑定，可以在所有子组件export default{}内部用 this.$store.调用，外部无法访问返回Undefined
  store,
  i18n
})
