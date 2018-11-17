<template>
  <div id="app">
    <v-touch
      :swipe-options="{ direction: 'horizontal' }"
      @swipeleft="swipeChangeRouter"
      @swiperight="swipeChangeRouter"
    >
      <div class="app-box">
        <div class="app-box-front">
          <i class="icon-add" />
          <div id="test">
            <img src="./assets/color-icons/icon-cloud-with-rain.png">
          </div>
          <Row type="flex">
            <!-- https://www.iviewui.com/components/grid 响应式页面配置方法 -->
            <!-- Safari：开发 > 进入响应式设计模式，看手机上效果时天气预报信息会消失 -->
            <i-col
              :xs="{ span: 24 }"
              :sm="{ span: 12 }"
              class-name="gap"
            >
              <!-- https://cn.vuejs.org/v2/api/#v-on @on-change等同于v-on:change是一种语法糖 -->
              <Select
                v-model="lang"
                style="width: 150px;"
                @on-change="translate(lang)"
              >
                <Option
                  v-for="item in langList"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </i-col>
            <i-col
              :xs="0"
              :sm="12"
            >
              <display-weather />
            </i-col>
          </Row>
          <Row>
            <i-col span="24">
              <transition
                name="fade"
                mode="out-in"
              >
                <!-- 通过.sync修饰符子组件可更新父组件的data值，下面是更新了name -->
                <content-detail
                  :now-cat.sync="name"
                  @changeCat="changeRouter"
                >
                  <!-- 下面div中增加 v-once 只渲染元素和组件一次{{showDescribe}}不会被更新，静态内容可以用v-once性能优化 -->
                  <!-- slot是插槽，很不错的例子可以直观的了解插槽 https://segmentfault.com/a/1190000012996217 -->
                  <div
                    slot="info"
                    class="desc"
                  >
                    <!-- {{ $t() }} 是vue-i18n国际化的写法，()里面的内容是从Vuex.store读取指向码，这里只是返回文本 -->
                    {{ $t(this.$store.getters.getDescribe) }}
                  </div>
                </content-detail>
              </transition>
            </i-col>
          </Row>
        </div>
        <div class="app-box-back">
          <!-- More https://cn.vuejs.org/v2/guide/transitions.html#过渡模式 -->
          <!-- 动画，有css3 animation和transition的所有功能，理论上可以做所有动画（请参考官网教程>过渡 & 动画） -->
          <transition
            name="fade"
            mode="out-in"
          >
            <!-- keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。 -->
            <keep-alive>
              <!-- 在./router/index.js中已经配置好路径，自定义方法changeRouter()切换router -->
              <router-view />
            </keep-alive>
          </transition>
        </div>
      </div>
    </v-touch>
  </div>
</template>

<script>
import Vue from 'vue'
// 指向目录默认读取index.js
import router from './router'
// 同步导入组件
import DisplayWeather from './components/DisplayWeather.vue'

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {
  name: 'v-touch'
})

// 异步导入组件
// https://stackoverflow.com/questions/46602935/vue-async-components-are-loading-without-delay-regardless-of-the-the-delay-par
const ContentDetail = () => ({
  component: new Promise(resolve => {
    setTimeout(() => {
      resolve(require('./components/ContentDetail.vue'))
    }, 1500)
  }),
  // {}快速注册组件
  loading: Vue.component('loading-component', {
    template: '<div class="welcom">{{ $t("message.welcom") }}</div>'
  }),
  error: Vue.component('error-component', {
    template: '<span>Error</span>'
  }),
  delay: 200
})

export default {
  name: 'App',
  // 局部注册组件
  components: {
    // html中可以直接编写<content-detail></content-detail>
    ContentDetail,
    DisplayWeather
  },
  data () {
    return {
      langList: [
        {
          value: 'en_US',
          label: 'English'
        },
        {
          value: 'zh_CN',
          label: '中文'
        }
      ],
      lang: '',
      name: 'Sison'
    }
  },
  // 组件创建时钩子函数/回调函数
  mounted () {
    // 保存国际化状态
    if (!this.$cookie.get('lang')) {
      this.$cookie.set('lang', 'en_US', 365)
    }

    // 初始化国际化
    this.lang = this.$cookie.get('lang')
    this.$i18n.locale = this.$cookie.get('lang')
  },
  methods: {
    // 切换语言
    translate (lang) {
      if (lang === 'en_US') {
        // 语言设置成英文
        this.$i18n.locale = 'en_US'
        this.$cookie.set('lang', 'en_US', 365)
      } else {
        this.$i18n.locale = 'zh_CN'
        this.$cookie.set('lang', 'zh_CN', 365)
      }
    },
    changeRouter () {
      // 切换Router
      router.push({
        path: this.name === 'Sison' ? '/' : this.name
      })
    },
    swipeChangeRouter () {
      if (this.name === 'Sison') {
        this.name = 'Larva'
        this.$store.commit('setDescribe', 'message.larva_describe')
      } else {
        this.name = 'Sison'
        this.$store.commit('setDescribe', 'message.sison_describe')
      }

      this.changeRouter()
    }
  },
  // 绑定router，在所有子组件中可以使用this.$router访问
  router
}
</script>

<!-- scoped 为组件样式设置作用域 https://cn.vuejs.org/v2/style-guide/ -->
<style lang="scss" scoped>
@import './assets/main.scss';

// 引入node_modules时需要用到 ～ 符号
@import '~retinajs/dist/_retina.scss';

#test {
  @include retina(
    './assets/images/google-logo.png',
    3,
    cover,
    center center no-repeat
  );

  transform: scale(0.5);
  display: flex;
}
</style>
