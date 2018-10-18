// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import ImageDefault from '../components/ImageSison.vue';
import ImageSison from '../components/ImageSison.vue';
import ImageLarva from '../components/ImageLarva.vue';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ImageDefault',
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
