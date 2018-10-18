<template>
<div id="image-larva">
  <img :src="url" />
</div>
</template>

<script>
export default {
  name: 'ImageLarva',
  data() {
    return {
      url: require('../assets/larva.png')
    }
  }
}

</script>

<style lang="sass" scoped>

</style>
