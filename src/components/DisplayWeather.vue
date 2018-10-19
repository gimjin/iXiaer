<template>
<div id="display-weather">
  <div class="temp">{{showTemp}}</div>
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
    showTemp: function() {
      return this.$t('message.weather') + ': ' + this.tmp_max + ' ℃'
    }
  },
  // https://cn.vuejs.org/v2/api/#mounted
  // https://cn.vuejs.org/v2/guide/instance.html#生命周期图示
  // el被创建时调用该钩子，更多可以查看生命周期
  mounted: function() {
    this.$nextTick(function() {
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
    })
  }
}
</script>

<style scoped>
#display-weather .temp {
  font-size: 1.4em;
  text-align: right;
  color: white;
}
</style>
