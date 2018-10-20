<template>
<div id="image-larva" :style="urlStyle">
  <img :src="url" @load="loaded" width="0" height="0" />
</div>
</template>

<script>
import { LoadingBar } from 'iView'

export default {
  name: 'ImageLarva',
  data() {
    return {
      url: require('../assets/larva.jpg')
    }
  },
  computed: {
    urlStyle: function() {
      return 'background:url(' + this.url + ') center'
    }
  },
  methods: {
    loaded: function() {
      // 结束进度条
      LoadingBar.finish()
    }
  },
  mounted: function() {
    // 启动进度条
    LoadingBar.start()
  },
}
</script>

<style scoped>
#image-larva {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
