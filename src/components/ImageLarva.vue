<template>
<div id="image-larva" :style="urlStyle"></div>
</template>

<script>
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
  mounted: function() {
    // this.nextTick(function() {
      alert('数据已经更新')
    // })
  }
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
