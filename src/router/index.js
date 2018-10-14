// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

// 定义 (路由) 组件。
import HelloWorld from '../components/HelloWorld.vue'
const HiWorld = { template: '<div>Hi World Successful!<router-link to="/">Go to Hello</router-link></div>' }

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hiWorld',
      name: 'HiWorld',
      component: HiWorld
    }
  ]
})
