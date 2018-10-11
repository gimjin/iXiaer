import Vue from 'vue';
import say from './util';
import './style/main.scss'

/* ========== 引入iView 2种方法 ========== */
import 'iview/dist/styles/iview.css';
// 第1种，全部引入iView
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'    // 使用 CSS
// Vue.use(iView)

// 第2种，按需引入iView
import {
  Button,
  Table
} from 'iview';
Vue.component('i-button', Button);
Vue.component('i-table', Table);
/* ========== 引入iView 2种方法 ========== */

var app = new Vue({
  el: '#app',
  data: {
    message: say()
  }
});
