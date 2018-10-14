<template>
<div id="helloWorld">
  Hello World Successful！
  <!-- <router-link to="/hiWorld">Go to Hi</router-link> -->
  <a href="#" v-on:click="gth()">Go to Hi</a>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    gth() {
      this.$router.push('hiWorld')
      store.commit('increment')
      // 访问getters
      console.log(store.getters.computCount)
    }
  }
}

// vuex demo
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // 类似Comput，是计算state的值
  getters: {
    computCount: state => {
      return state.count+100
    }
  }
})

store.commit('increment')
console.log(store.state.count)

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  color: #42b983;
}
</style>
