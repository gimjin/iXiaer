import Vue from 'vue';
import say from './assets/util';
import getData from './assets/util';
import './assets/main.scss'
import App from './App.vue';
import router from './router'

// 按需引入iView
import 'iview/dist/styles/iview.css';
import {
  Button,
  Input
} from 'iview';
Vue.component('i-input', Input);
Vue.component('i-button', Button);

// 自定义组件
Vue.component('i-logo', {
  props: {
    imgWidth: String,
    imgHeight: {
      type: String,
      default: '300'
    }
  }, //html 属性值
  template: '<img :width="imgWidth" :height="imgHeight" :src="url" />',
  data() {
    return {
      url: require('./assets/logo.png')
    }
  }
})

var androidApp = new Vue({
  el: '#androidApp',
  data() {
    return {
      message: say(),
      dynamicNum: '100'
    }
  },
  methods: {
    async fetchData() {
      const data = await getData();
      this.message = data;
    }
  },
  created() {
    this.fetchData();
  }
});

// 单文件组件
new Vue({
  el: '#app',
  router: router,
  components: {
    App
  },
  template: '<App/>'
})
