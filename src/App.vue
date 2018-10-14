<template>
<div id="app">
  <transition name="fade">
    <h1 v-show="true">
      Hi {{msg}}, {{computedMsg}}
    </h1>
  </transition>
  <i-input v-model="msg" clearable size="large" placeholder="Enter something..." style="width: 200px" />
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    console.log('控制台点击SingleTemplate.vue查看源码');
    return {
      msg: 'Hello App!'
    };
  },
  computed: {
    computedMsg() {
      return this.msg
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    h1 {
        color: red;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
