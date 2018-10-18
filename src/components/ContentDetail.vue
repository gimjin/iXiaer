<template>
<div id="content-detail">
  <!-- 动态组件 -->
  <component :is="say"></component>
  <!-- 具名插槽 name="info" -->
  <slot name="info"></slot>
  <!-- .sync来修改prop cat -->
  <i-button @click="nextCat()">Next</i-button>
</div>
</template>

<script>
// 简单组件无需创建.vue文件，直接定义后在components中声明
const SaySison = (
  'say-sison', {
    template: '<div>{{ $t("message.hi") }} {{ $t("message.sison") }}</div>',
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
  template: '<div>{{ $t("message.hi") }} {{ $t("message.larva") }}</div>',
}

export default {
  name: 'ContentDetail',
  // https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证
  props: ['nowCat'],
  data() {
    return {
      name: 'Sison'
    }
  },
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
        this.$emit('changeCat', 'Larva') // 触发副组件中@changeCat自定义事件
        this.$store.commit('setDescribe', this.$i18n.t("message.larva_describe")) // Vuex.store全局数据更新来响应式更新界面
      } else {
        this.$emit('update:nowCat', 'Sison')
        this.$emit('changeCat', 'Sison')
        this.$store.commit('setDescribe', this.$i18n.t("message.sison_describe"))
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
