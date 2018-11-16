// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'
import ImageSison from '../components/ImageSison.vue'
import ImageLarva from '../components/ImageLarva.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'ImageSison',
      component: ImageSison
    },
    {
      path: '/Sison',
      name: 'ImageSison',
      component: ImageSison
    },
    {
      path: '/Larva',
      name: 'ImageLarva',
      component: ImageLarva
    }
  ]
})
