<template>
<div id="display-weather">
  <div>{{showTemp}}</div>
</div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios'

export default {
  name: 'DisplayWeather',
  data() {
    return {
      tmp_max: 'n/a'
    }
  },
  methods: {
    setTemp: function(tmp) {
      this.tmp_max = tmp
    }
  },
  // 调用{{showTemp}}读取数据时执行
  computed: {
    showTemp : function(){
      // axios不支持jsonp跨域，如果要跨域请把.get注释更换，和webpack.config.js中devServer注释开启
      // 此处为了不依赖服务端(Apache/devServer/...)的配置，直接读取同域中的json文件
      axios
        .get('/static/weather.json')
        // .get('/s6/weather/forecast?location=auto_ip&key=08a24d345402482c8a616ed761403d81')
        .then(response => {
          this.setTemp(response.data.HeWeather6[0].daily_forecast[0].tmp_max)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
      return 'Wuhan: ' + this.tmp_max + ' ℃'
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
