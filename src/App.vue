<template>
<div id="app">
  <h1>
    Hi {{msg}}
  </h1>
  <i-input v-model="msg" clearable size="large" placeholder="Enter something..." style="width: 200px" />
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
</style>
