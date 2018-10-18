<template>
<div id="image-sison">
  <img :src="url" />
</div>
</template>

<script>
export default {
  name: 'ImageSison',
  data() {
    return {
      url: require('../assets/sison.png')
    }
  }
}

</script>

<style lang="sass" scoped>

</style>
