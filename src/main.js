import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import i18n from './i18n/i18n.js'

import 'iview/dist/styles/iview.css'
import {
  Button,
  Row,
  Col,
  Icon,
  Select,
  Option
} from 'iview';

// 全局注册组件，必须在根 Vue 实例 (通过 new Vue) 创建之前发生引入。
Vue.component('i-button', Button);
Vue.component('i-row', Row);
Vue.component('i-col', Col);
Vue.component('i-icon', Icon);
Vue.component('i-select', Select);
Vue.component('i-option', Option);

// 全局数据集，可响应式修改bbbbbbbbbbbbbbbbbbbb
const store = new Vuex.Store({
  // 不要在发布环境下启用严格模式！**严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production',
  // 类似变量
  state: {
    describe: i18n.t("message.sison_describe")
  },
  // 修改state的唯一的入口
  mutations: {
    setDescribe(state, desc) {
      state.describe = desc
    },
  },
  // getter类似computed，是计算state的值
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
  // 类似store绑定，可以在所有子组件export default{}中用 this.$store.调用
  store,
  i18n
})
