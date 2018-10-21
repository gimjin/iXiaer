import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en_US', // 通过修改此数据切换语言
  messages: {
    en_US: {
      message: {
        lang: 'english',
        welcom: 'Welcome to iXiaer',
        hi: 'Hi, I am',
        sison: 'Sison',
        larva: 'Larva',
        sison_describe: 'Swipe left or right, I will become Larva.',
        larva_describe: 'Click button, change back to Sisson.',
        next: 'Next Cat',
        weather: 'Weather'
      }
    },
    zh_CN: {
      message: {
        lang: '中文',
        welcom: '欢迎来到夏尔猫舍',
        hi: '嗨，我叫',
        sison: '西森',
        larva: '拉哇',
        sison_describe: '往左或右滑动，我将会变成拉哇。',
        larva_describe: '点击下一只猫按钮，变回西森。',
        next: '下一只猫',
        weather: '天气'
      }
    }
  }
})
