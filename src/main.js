import Vue from 'vue';
import say from './util';
import getData from './util';
import SingleTemplate from './components/SingleTemplate.vue';
import './style/main.scss'

// 按需引入iView
import 'iview/dist/styles/iview.css';
import {
  Button,
  Input
} from 'iview';
Vue.component('i-button', Button);
Vue.component('i-input', Input);
// 自定义组件
Vue.component('i-logo', {
  template: '<img width="100" height="100" :src="url" />',
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
      message: say()
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
var iOSApp = new Vue({
  el: '#iOSApp',
  template: '<SingleTemplate/>',
  components: {
    SingleTemplate
  }
})
