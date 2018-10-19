<template>
<div id="content-detail">
  <!-- 用:is 动态切换组件 -->
  <component :is="say"></component>
  <!-- 具名插槽 slot="info"的嵌套内容会在此显示 -->
  <slot name="info"></slot><br/>
  <!-- .sync来修改prop cat -->
  <i-button @click="nextCat()" size="large" type="warning">{{ $t('message.next') }}</i-button>
</div>
</template>

<script>
// 简单组件无需创建.vue文件，直接定义后在components中声明
const SaySison = (
  'say-sison', {
    template: '<div class="hi">{{ $t("message.hi") }} {{ $t("message.sison") }}</div>',
    // props: [],
    // methods: {
    //   myMethods: function(args) {
    //     console.log(args);
    //   }
    // },
    // data() {
    //   return {
    //     msg: 'Hi'
    //   }
    // }
  }
)
const SayLarva = {
  template: '<div class="hi">{{ $t("message.hi") }} {{ $t("message.larva") }}</div>',
}

export default {
  name: 'ContentDetail',
  // https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证
  props: ['nowCat'],
  computed: {
    say: function(){
      return 'Say' + this.nowCat
    }
  },
  components: {
    SaySison,
    SayLarva
  },
  methods: {
    nextCat: function() {
      if (this.nowCat == 'Sison') {
        this.$emit('update:nowCat', 'Larva') // 用.sync更新父组件的name属性
        this.$emit('changeCat') // 触发副组件中@changeCat自定义事件
        this.$store.commit('setDescribe', 'message.larva_describe') // Vuex.store全局数据响应式更新状态
      } else {
        this.$emit('update:nowCat', 'Sison')
        this.$emit('changeCat')
        this.$store.commit('setDescribe', 'message.sison_describe')
      }
    }
  }
}
</script>

<!-- 通过sass代码编写css -->
<style lang="scss" scoped>
#content-detail {
  margin-left: 2em;
  .hi {
    font-size: 5em;
    color: white;
  }
  .desc {
    font-size: 1.4em;
    color: white;
  }
}
</style>
