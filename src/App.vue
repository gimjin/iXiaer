<template>
<div id="app">
  <div class="app-box">
    <div class="app-box-front">
      <i-row type="flex" justify="space-between">
        <i-col :xs="24" :sm="4">
          <i-dropdown trigger="click">
            <i-button type="primary">
              选择语言
              <i-icon type="ios-arrow-down"></i-icon>
            </i-button>
            <i-dropdown-menu slot="list">
              <i-dropdown-item>中文</i-dropdown-item>
              <i-dropdown-item>English</i-dropdown-item>
            </i-dropdown-menu>
          </i-dropdown>
        </i-col>
        <i-col :xs="0" :sm="4">
          <display-weather></display-weather>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <transition name="fade" mode="out-in">
            <content-detail :btnText.sync="name" @changeCat='changeRouter'>
              <!-- 下面div中增加 v-once 只渲染元素和组件一次{{showDescribe}}不会被更新，静态内容可以用v-once性能优化 -->
              <div slot="info">{{showDescribe}}</div>
            </content-detail>
          </transition>
        </i-col>
      </i-row>
    </div>
    <div class="app-box-back">
      <!-- More https://cn.vuejs.org/v2/guide/transitions.html#过渡模式 -->
      <transition name="fade" mode="out-in">
        <!-- keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import router from './router'
// 注册组件
import DisplayWeather from './components/DisplayWeather.vue'

// 异步组件
// https://stackoverflow.com/questions/46602935/vue-async-components-are-loading-without-delay-regardless-of-the-the-delay-par
const cd =
  import('./components/ContentDetail.vue')
const ContentDetail = () => ({
  component: new Promise((resolve) => {
    setTimeout(() => {
      resolve(cd)
    }, 1500)
  }),
  // {}快速注册组件
  loading: Vue.component('loading-component', {
    template: '<span>Welcome to iXiaer</span>'
  }),
  error: Vue.component('error-component', {
    template: '<span>Error</span>'
  }),
  delay: 200
})

export default {
  name: 'App',
  data() {
    return {
      name: 'Sison'
    }
  },
  computed: {
    showDescribe: function() {
      return this.$store.getters.getDescribe
    }
  },
  router: router,
  // 局部注册组件，引入.vue文件
  components: {
    ContentDetail,
    DisplayWeather
  },
  methods: {
    changeRouter: function(name) {
      this.$router.push({
        path: name
      })
    }
  }
}
</script>

<style>
#app .app-box {
  display: block;
  position: relative;
  height: 720px;
}

#app .app-box .app-box-front {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 101;
}

#app .app-box .app-box-back {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}
</style>
