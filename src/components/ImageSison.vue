<template>
<div id="image-sison" :style="urlStyle"></div>
</template>

<script>
export default {
  name: 'ImageSison',
  data() {
    return {
      // require()访问时会经过url-loader, 会对文件及路径做处理
      url: require('../assets/sison.jpg')
    }
  },
  computed: {
    urlStyle: function(){
      return 'background:url('  + this.url +  ') center'
    }
  }
}

</script>

<style scoped>
#image-sison {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
