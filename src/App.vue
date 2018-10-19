<template>
<div id="app">
  <div class="app-box">
    <div class="app-box-front">
      <i-row type="flex">
        <!-- https://www.iviewui.com/components/grid 响应式页面配置方法-->
        <!-- Safari：开发 > 进入响应式设计模式，看手机上效果时天气预报信息会消失  -->
        <i-col :xs="24" :sm="12" style="height: 12em">
          <!-- https://cn.vuejs.org/v2/api/#v-on @on-change等同于v-on:change是一种语法糖 -->
          <i-select v-model="lang" @on-change="translate(lang)" style="width:150px">
            <i-option v-for="item in langList" :value="item.value" :key="item.value">{{item.label}}</i-option>
          </i-select>
        </i-col>
        <i-col :xs="0" :sm="12">
          <display-weather></display-weather>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <transition name="fade" mode="out-in">
            <!-- 通过.sync修饰符子组件可更新父组件的data值，下面是更新了name -->
            <content-detail :nowCat.sync="name" @changeCat='changeRouter'>
              <!-- 下面div中增加 v-once 只渲染元素和组件一次{{showDescribe}}不会被更新，静态内容可以用v-once性能优化 -->
              <!-- slot是插槽，很不错的例子可以直观的了解插槽 https://segmentfault.com/a/1190000012996217 -->
              <div slot="info" class="desc">
                <!-- {{ $t() }} 是vue-i18n国际化的写法，()里面的内容是从Vuex.store读取指向码，这里只是返回文本 -->
                {{ $t(this.$store.getters.getDescribe) }}
              </div>
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
          <!-- 在./router/index.js中已经配置好路径，自定义方法changeRouter()切换router -->
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import router from './router' // 指向目录默认读取index.js
// 同步导入组件
import DisplayWeather from './components/DisplayWeather.vue'

// 异步导入组件
// https://stackoverflow.com/questions/46602935/vue-async-components-are-loading-without-delay-regardless-of-the-the-delay-par
const ContentDetail = () => ({
  component: new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        import('./components/ContentDetail.vue'))
    }, 1500)
  }),
  // {}快速注册组件
  loading: Vue.component('loading-component', {
    template: '<span class="welcom">{{ $t("message.welcom") }}</span>'
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
      langList: [{
          value: 'en_US',
          label: 'English'
        },
        {
          value: 'zh_CN',
          label: '中文'
        },
      ],
      lang: this.$cookie.get('lang'),
      name: 'Sison'
    }
  },
  // 局部注册组件
  components: {
    // html中可以直接编写<content-detail></content-detail>
    ContentDetail,
    DisplayWeather
  },
  methods: {
    // 切换语言
    translate: function(lang) {
      if (lang == 'en_US') {
        // 语言设置成英文
        this.$i18n.locale = 'en_US'
        this.$cookie.set('lang', 'en_US', 365)
      } else {
        this.$i18n.locale = 'zh_CN'
        this.$cookie.set('lang', 'zh_CN', 365)
      }
    },
    changeRouter: function(name) {
      // 切换Router
      router.push({
        path: this.name
      })
    }
  },
  // 组件创建时钩子函数/回调函数
  mounted: function() {
    this.$nextTick(function() {
      // 初始化国际化
      if (!this.$cookie.get('lang')) {
        this.$cookie.set('lang', 'en_US', 365)
      }
      this.$i18n.locale = this.$cookie.get('lang')
    })
  },
  // 绑定router，在所有子组件中可以使用this.$router访问
  router
}
</script>

<!-- scoped 为组件样式设置作用域 https://cn.vuejs.org/v2/style-guide/ -->
<style scoped>
#app .app-box {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#app .app-box .app-box-front {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 101;
  padding: 20px;
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

.welcom {
  font-size: 4em;
  color: white;
}
</style>
