<template>
<div id="content-detail">
  <!-- 动态组件 -->
  <component :is="'Say' + name"></component>
  <!-- 具名插槽 name="info" -->
  <slot name="info"></slot>
  <!-- .sync来修改prop btnText -->
  <i-button @click="changeCat(name)">{{btnText}}</i-button>
</div>
</template>

<script>
// 简单组件无需创建.vue文件，直接定义后在components中声明
const SaySison = (
  'say-sison', {
    template: '<div>Hi I am Sison</div>',
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
  template: '<div>Hi I am Larva</div>',
}

export default {
  name: 'ContentDetail',
  // https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证
  props: ['btnText'],
  data() {
    return {
      name: 'Sison'
    }
  },
  components: {
    SaySison,
    SayLarva
  },
  methods: {
    changeCat: function(name) {
      if (name == 'Sison') {
        this.name = 'Larva'
        this.$emit('update:btnText', name) // 更新按钮文字
        this.$emit('changeCat', this.name) // 通知切换背景图片
        this.$store.commit('setDescribe', 'I recently pretty and looks like a huski.') // Vuex.store全局数据更新来响应式更新界面
      } else {
        this.name = 'Sison'
        this.$emit('update:btnText', name)
        this.$emit('changeCat', this.name)
        this.$store.commit('setDescribe', 'My father and mother are very good to me.')
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
