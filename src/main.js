import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
// 引入./i18n/index.js
import i18n from './i18n'
import VueCookie from 'vue-cookie'
import iView from 'iView'
import 'iview/dist/styles/iview.css'
import './assets/fonts/icons.css'

Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(iView)

// 全局数据集，可响应式修改界面已绑定数据
const store = new Vuex.Store({
  // 不要在发布环境下启用严格模式！**严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production',
  // 数据存储，不能直接用store.state修改内容，需要通过mutations修改
  state: {
    describe: 'message.sison_describe'
  },
  // 修改state的唯一的入口
  mutations: {
    setDescribe (state, desc) {
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

const vm = new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  // 类似store绑定，可以在所有子组件export default{}内部用 this.$store.调用，外部无法访问返回Undefined
  store,
  i18n
})

Vue.use(vm)
